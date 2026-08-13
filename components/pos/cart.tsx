"use client";

import { CartItemRow } from "@/components/pos/cart-item";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/utils";
import type { CartItem } from "@/hooks/use-cart";

export function Cart({
  items,
  subtotal,
  itemCount,
  onSetQuantity,
  onRemove,
  onCheckout,
  onClear,
}: {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
  onSetQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onCheckout: () => void;
  onClear: () => void;
}) {
  if (items.length === 0) {
    return (
      <div className="flex h-full min-h-[200px] flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-center text-sm text-zinc-500">
        <span className="mb-2 text-3xl">🧺</span>
        <p>El carrito está vacío.</p>
        <p>Toca un producto para agregarlo.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white">
      <div className="max-h-[45vh] flex-1 divide-y divide-zinc-100 overflow-y-auto px-4">
        {items.map((item) => (
          <CartItemRow
            key={item.productId}
            item={item}
            onSetQuantity={onSetQuantity}
            onRemove={onRemove}
          />
        ))}
      </div>

      <div className="border-t border-zinc-200 p-4">
        <div className="mb-1 flex justify-between text-sm text-zinc-600">
          <span>Productos</span>
          <span>{itemCount}</span>
        </div>
        <div className="mb-4 flex items-baseline justify-between">
          <span className="font-medium text-zinc-900">Total</span>
          <span className="text-xl font-bold text-zinc-900">
            {formatMoney(subtotal)}
          </span>
        </div>
        <Button size="lg" className="w-full" onClick={onCheckout}>
          Cobrar
        </Button>
        <button
          type="button"
          onClick={onClear}
          className="mt-2 w-full text-center text-xs text-zinc-500 transition-colors hover:text-zinc-700"
        >
          Vaciar carrito
        </button>
      </div>
    </div>
  );
}
