"use client";

import { Input } from "@/components/ui/input";
import type { Category } from "@/types/product";

export function ProductSearch({
  search,
  onSearchChange,
  categoryId,
  onCategoryChange,
  categories,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  categoryId: string;
  onCategoryChange: (value: string) => void;
  categories: Category[];
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Buscar producto..."
        className="sm:flex-1"
      />
      <select
        value={categoryId}
        onChange={(event) => onCategoryChange(event.target.value)}
        className="h-10 rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-700 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30"
      >
        <option value="all">Todas las categorías</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
