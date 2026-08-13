"use client";

import { useTransition } from "react";
import { deleteProductAction } from "@/actions/product.actions";

export function DeleteProductButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    if (window.confirm(`¿Eliminar "${name}"?`)) {
      startTransition(() => deleteProductAction(id));
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={pending}
      className="text-sm text-red-600 transition-colors hover:text-red-700 disabled:opacity-50"
    >
      {pending ? "Eliminando..." : "Eliminar"}
    </button>
  );
}
