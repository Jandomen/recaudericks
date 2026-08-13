import Link from "next/link";
import { DeleteProductButton } from "@/components/products/delete-product-button";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { formatMoney } from "@/lib/utils";
import type { Category, Product } from "@/types/product";

export function ProductsTable({
  products,
  categories,
  searchQuery,
  categoryId,
}: {
  products: Product[];
  categories: Category[];
  searchQuery?: string;
  categoryId?: string;
}) {
  return (
    <div className="space-y-4">
      <form
        action="/productos"
        method="get"
        className="flex flex-wrap items-center gap-3"
      >
        <input
          name="q"
          defaultValue={searchQuery}
          placeholder="Buscar producto..."
          className="h-10 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30 sm:w-64"
        />
        <select
          name="category"
          defaultValue={categoryId ?? ""}
          className="h-10 rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-700 focus:border-green-500 focus:outline-none"
        >
          <option value="">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="h-10 rounded-md bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-700"
        >
          Buscar
        </button>
      </form>

      {products.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-10 text-center text-sm text-zinc-500">
          No hay productos que coincidan con la búsqueda.
        </div>
      ) : (
        <Table className="min-w-[640px]">
          <THead>
            <TR>
              <TH>Nombre</TH>
              <TH>Categoría</TH>
              <TH>Precio</TH>
              <TH>Unidad</TH>
              <TH>Stock</TH>
              <TH>Estado</TH>
              <TH className="text-right">Acciones</TH>
            </TR>
          </THead>
          <TBody>
            {products.map((product) => (
              <TR key={product._id}>
                <TD className="font-medium text-zinc-900">{product.name}</TD>
                <TD>{product.categoryName}</TD>
                <TD>{formatMoney(product.price)}</TD>
                <TD>{product.unit}</TD>
                <TD>
                  {product.stock} {product.unit}
                </TD>
                <TD>
                  {product.active ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                      🟢 Activo
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-500">
                      ⚪ Inactivo
                    </span>
                  )}
                </TD>
                <TD className="text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/productos/${product._id}`}
                      className="text-sm text-green-600 transition-colors hover:text-green-700"
                    >
                      Editar
                    </Link>
                    <DeleteProductButton
                      id={product._id}
                      name={product.name}
                    />
                  </div>
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      )}
    </div>
  );
}
