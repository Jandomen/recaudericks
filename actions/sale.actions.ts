"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { ROLES } from "@/constants/roles";
import {
  PAYMENT_METHODS,
  type PaymentMethod,
} from "@/constants/payment-methods";
import { UNITS, type Unit } from "@/constants/units";
import { requireRole } from "@/lib/permissions";
import { createSale } from "@/services/sale.service";
import type { CreateSaleResult } from "@/types/sale";

const saleItemSchema = z.object({
  productId: z.string().min(1, "Producto inválido"),
  name: z.string().min(1, "Producto inválido"),
  unit: z.enum(Object.values(UNITS) as [Unit, ...Unit[]]),
  price: z.number().int().nonnegative(),
  quantity: z.number().int().positive(),
});

const saleSchema = z.object({
  items: z.array(saleItemSchema).min(1, "Agrega al menos un producto"),
  paymentMethod: z.enum(
    Object.values(PAYMENT_METHODS) as [PaymentMethod, ...PaymentMethod[]]
  ),
  amountReceived: z.number().int().nonnegative(),
  change: z.number().int().nonnegative(),
});

export async function createSaleAction(
  input: unknown
): Promise<CreateSaleResult> {
  const { userId } = await requireRole([ROLES.ADMIN, ROLES.CAJERO]);

  const validated = saleSchema.safeParse(input);

  if (!validated.success) {
    return {
      ok: false,
      message: "La información de la venta es inválida.",
    };
  }

  const data = validated.data;
  const subtotal = data.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  try {
    const sale = await createSale({
      items: data.items,
      subtotal,
      total: subtotal,
      paymentMethod: data.paymentMethod,
      amountReceived: data.amountReceived,
      change: data.change,
      sellerId: userId,
    });

    revalidatePath("/ventas");
    revalidatePath("/pos");

    return { ok: true, saleId: sale._id };
  } catch (error) {
    console.error("Error al registrar la venta:", error);
    const message =
      error instanceof Error
        ? error.message
        : "No se pudo registrar la venta. Intenta de nuevo.";
    return { ok: false, message };
  }
}
