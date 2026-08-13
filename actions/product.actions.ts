"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ROLES } from "@/constants/roles";
import { UNITS, type Unit } from "@/constants/units";
import { requireRole } from "@/lib/permissions";
import { priceToCents } from "@/lib/utils";
import {
  createProduct,
  deactivateProduct,
  updateProduct,
} from "@/services/product.service";
import type { ProductFormState } from "@/types/product";

const productSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(100, "El nombre es muy largo"),
  categoryId: z.string().min(1, "Selecciona una categoría"),
  price: z
    .string()
    .min(1, "Ingresa un precio")
    .refine(
      (value) => {
        const num = Number.parseFloat(value);
        return !Number.isNaN(num) && num >= 0;
      },
      { message: "Precio inválido" }
    ),
  unit: z.enum(Object.values(UNITS) as [Unit, ...Unit[]]),
  active: z.boolean(),
  stock: z.string().optional(),
});

function parseStock(value: string | undefined): number {
  const num = Number.parseInt(value ?? "0", 10);
  if (Number.isNaN(num) || num < 0) return 0;
  return num;
}

export async function createProductAction(
  _prevState: ProductFormState | undefined,
  formData: FormData
): Promise<ProductFormState> {
  await requireRole([ROLES.ADMIN]);

  const validated = productSchema.safeParse({
    name: formData.get("name"),
    categoryId: formData.get("categoryId"),
    price: formData.get("price"),
    unit: formData.get("unit"),
    active: formData.get("active") === "on",
    stock: formData.get("stock"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const data = validated.data;

  try {
    await createProduct({
      name: data.name.trim(),
      categoryId: data.categoryId,
      price: priceToCents(data.price),
      unit: data.unit,
      active: data.active,
      stock: parseStock(data.stock),
    });
  } catch (error) {
    console.error("Error al crear producto:", error);
    return { message: "No se pudo guardar el producto. Intenta de nuevo." };
  }

  revalidatePath("/productos");
  redirect("/productos");
}

export async function updateProductAction(
  productId: string,
  _prevState: ProductFormState | undefined,
  formData: FormData
): Promise<ProductFormState> {
  await requireRole([ROLES.ADMIN]);

  const validated = productSchema.safeParse({
    name: formData.get("name"),
    categoryId: formData.get("categoryId"),
    price: formData.get("price"),
    unit: formData.get("unit"),
    active: formData.get("active") === "on",
    stock: formData.get("stock"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const data = validated.data;

  try {
    const updated = await updateProduct(productId, {
      name: data.name.trim(),
      categoryId: data.categoryId,
      price: priceToCents(data.price),
      unit: data.unit,
      active: data.active,
      stock: parseStock(data.stock),
    });

    if (!updated) {
      return { message: "El producto no existe." };
    }
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return { message: "No se pudo actualizar el producto. Intenta de nuevo." };
  }

  revalidatePath("/productos");
  redirect("/productos");
}

export async function deleteProductAction(productId: string) {
  await requireRole([ROLES.ADMIN]);

  await deactivateProduct(productId);

  revalidatePath("/productos");
}
