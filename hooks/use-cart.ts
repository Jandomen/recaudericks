"use client";

import { useCallback, useMemo, useState } from "react";
import type { Unit } from "@/constants/units";

export interface CartItem {
  productId: string;
  name: string;
  unit: Unit;
  price: number;
  stock: number;
  quantity: number;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((product: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === product.productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(0, Math.min(quantity, item.stock)) }
          : item
      )
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  return {
    items,
    addItem,
    removeItem,
    setQuantity,
    clear,
    subtotal,
    itemCount,
  };
}
