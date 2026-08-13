import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { createSale, getSales } from "@/services/sale.service";
import type { SaleInput } from "@/types/sale";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);

  try {
    const sales = await getSales({
      date: searchParams.get("date") ?? undefined,
    });
    return NextResponse.json(sales);
  } catch (error) {
    console.error("Error al obtener las ventas:", error);
    return NextResponse.json(
      { error: "No se pudieron obtener las ventas" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await request.json();
  const items = Array.isArray(body.items) ? body.items : [];

  if (items.length === 0) {
    return NextResponse.json(
      { error: "La venta debe incluir al menos un producto" },
      { status: 400 }
    );
  }

  const subtotal = items.reduce(
    (sum: number, item: { price: number; quantity: number }) =>
      sum + item.price * item.quantity,
    0
  );

  try {
    const sale = await createSale({
      items,
      subtotal,
      total: subtotal,
      paymentMethod: body.paymentMethod ?? "efectivo",
      amountReceived: body.amountReceived ?? subtotal,
      change: body.change ?? 0,
      sellerId: session.userId,
    } as SaleInput);

    return NextResponse.json(sale, { status: 201 });
  } catch (error) {
    console.error("Error al crear la venta:", error);
    const message =
      error instanceof Error
        ? error.message
        : "No se pudo crear la venta";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
