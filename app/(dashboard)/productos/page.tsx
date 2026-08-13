import type { Metadata } from "next";
import Link from "next/link";
import { ProductsTable } from "@/components/products/products-table";
import { getCategories, getProducts } from "@/services/product.service";

export const metadata: Metadata = {
  title: "Productos",
};

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category } = await searchParams;

  const [products, categories] = await Promise.all([
    getProducts({ search: q, categoryId: category }),
    getCategories(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900">Productos</h2>
          <p className="text-sm text-zinc-500">
            {products.length} producto(s)
          </p>
        </div>
        <Link
          href="/productos/nuevo"
          className="inline-flex h-10 items-center rounded-md bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-700"
        >
          Nuevo producto
        </Link>
      </div>

      <ProductsTable
        products={products}
        categories={categories}
        searchQuery={q}
        categoryId={category}
      />
    </div>
  );
}
