import type { Metadata } from "next";
import { PosClient } from "@/components/pos/pos-client";
import { getUser } from "@/lib/auth";
import { getCategories, getProducts } from "@/services/product.service";

export const metadata: Metadata = {
  title: "Punto de venta",
};

export default async function PosPage() {
  const user = await getUser();

  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <PosClient
      products={products}
      categories={categories}
      cashierName={user?.name ?? ""}
    />
  );
}
