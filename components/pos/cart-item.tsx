"use client";

import { formatMoney } from "@/lib/utils";
import type { CartItem } from "@/hooks/use-cart";

export function CartItemRow({
  item,
  onSetQuantity,
  onRemove,
}: {
  item: CartItem;
  onSetQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-zinc-900">
          {item.name}
        </p>
        <p className="text-xs text-zinc-500">
          {formatMoney(item.price)} × {item.quantity} {item.unit}
        </p>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onSetQuantity(item.productId, item.quantity - 1)}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-300 text-zinc-600 hover:bg-zinc-50"
          aria-label="Disminuir cantidad"
        >
          −
        </button>
        <span className="w-6 text-center text-sm text-zinc-900">
          {item.quantity}
        </span>
        <button
          type="button"
          onClick={() => onSetQuantity(item.productId, item.quantity + 1)}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-300 text-zinc-600 hover:bg-zinc-50"
          aria-label="Aumentar cantidad"
        >
          +
        </button>
      </div>

      <span className="w-20 text-right text-sm font-semibold text-zinc-900">
        {formatMoney(item.price * item.quantity)}
      </span>

      <button
        type="button"
        onClick={() => onRemove(item.productId)}
        className="text-red-500 transition-colors hover:text-red-700"
        aria-label="Quitar producto"
      >
        ✕
      </button>
    </div>
  );
}
