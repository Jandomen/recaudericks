import { NextResponse } from "next/server";
import { ROLES } from "@/constants/roles";
import { getSession } from "@/lib/auth";
import {
  createProduct,
  getProducts,
} from "@/services/product.service";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const products = await getProducts({
    search: searchParams.get("q") ?? undefined,
    categoryId: searchParams.get("category") ?? undefined,
  });

  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  if (session.role !== ROLES.ADMIN) {
    return NextResponse.json({ error: "Sin permisos" }, { status: 403 });
  }

  const body = await request.json();

  try {
    const product = await createProduct({
      name: body.name,
      categoryId: body.categoryId,
      price: body.price,
      unit: body.unit,
      active: body.active ?? true,
      stock: body.stock ?? 0,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error al crear producto:", error);
    return NextResponse.json(
      { error: "No se pudo crear el producto" },
      { status: 400 }
    );
  }
}
