"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/types/product";

export function usePos(products: Product[]) {
  const cart = useCart();
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("all");

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        categoryId === "all" || product.categoryId === categoryId;
      const matchesTerm =
        !term || product.name.toLowerCase().includes(term);
      return matchesCategory && matchesTerm;
    });
  }, [products, search, categoryId]);

  return {
    cart,
    search,
    setSearch,
    categoryId,
    setCategoryId,
    filteredProducts,
  };
}
