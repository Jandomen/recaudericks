"use client";

import { formatMoney } from "@/lib/utils";
import type { CartItem } from "@/hooks/use-cart";
import type { Product } from "@/types/product";

export function ProductGrid({
  products,
  onAdd,
}: {
  products: Product[];
  onAdd: (item: CartItem) => void;
}) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-10 text-center text-sm text-zinc-500">
        No hay productos que coincidan con la búsqueda.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => {
        const outOfStock = product.stock <= 0;
        return (
          <button
            key={product._id}
            type="button"
            disabled={outOfStock}
            onClick={() =>
              onAdd({
                productId: product._id,
                name: product.name,
                unit: product.unit,
                price: product.price,
                stock: product.stock,
                quantity: 1,
              })
            }
            className="rounded-xl border border-zinc-200 bg-white p-4 text-left transition-shadow hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
          >
            <p className="font-medium text-zinc-900">{product.name}</p>
            <p className="mt-1 text-sm font-semibold text-green-700">
              {formatMoney(product.price)}{" "}
              <span className="text-xs font-normal text-zinc-500">
                / {product.unit}
              </span>
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              {outOfStock
                ? "Sin existencias"
                : `${product.stock} ${product.unit} disponibles`}
            </p>
          </button>
        );
      })}
    </div>
  );
}
