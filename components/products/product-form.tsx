"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UNITS, UNIT_LABELS } from "@/constants/units";
import type { Category, Product, ProductFormState } from "@/types/product";

const selectClasses =
  "h-10 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30";

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Guardando..." : text}
    </Button>
  );
}

export function ProductForm({
  categories,
  product,
  action,
}: {
  categories: Category[];
  product?: Product | null;
  action: (
    state: ProductFormState | undefined,
    formData: FormData
  ) => Promise<ProductFormState>;
}) {
  const [state, formAction] = useActionState<
    ProductFormState | undefined,
    FormData
  >(action, undefined);

  const isEdit = Boolean(product);

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      {state?.message && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
          {state.message}
        </p>
      )}

      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-zinc-700"
        >
          Nombre
        </label>
        <Input
          id="name"
          name="name"
          defaultValue={product?.name}
          placeholder="Ej. Manzana Roja"
          required
        />
        {state?.errors?.name && (
          <p className="mt-1 text-xs text-red-600">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="categoryId"
          className="mb-1 block text-sm font-medium text-zinc-700"
        >
          Categoría
        </label>
        <select
          id="categoryId"
          name="categoryId"
          defaultValue={product?.categoryId}
          required
          className={selectClasses}
        >
          <option value="">Selecciona una categoría...</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        {state?.errors?.categoryId && (
          <p className="mt-1 text-xs text-red-600">
            {state.errors.categoryId[0]}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="price"
            className="mb-1 block text-sm font-medium text-zinc-700"
          >
            Precio (MXN)
          </label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            defaultValue={product ? (product.price / 100).toFixed(2) : ""}
            placeholder="0.00"
            required
          />
          {state?.errors?.price && (
            <p className="mt-1 text-xs text-red-600">{state.errors.price[0]}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="unit"
            className="mb-1 block text-sm font-medium text-zinc-700"
          >
            Unidad de venta
          </label>
          <select
            id="unit"
            name="unit"
            defaultValue={product?.unit ?? UNITS.PZA}
            className={selectClasses}
          >
            {Object.entries(UNITS).map(([key, value]) => (
              <option key={key} value={value}>
                {UNIT_LABELS[value]} ({value})
              </option>
            ))}
          </select>
          {state?.errors?.unit && (
            <p className="mt-1 text-xs text-red-600">{state.errors.unit[0]}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="stock"
            className="mb-1 block text-sm font-medium text-zinc-700"
          >
            Stock actual
          </label>
          <Input
            id="stock"
            name="stock"
            type="number"
            min="0"
            defaultValue={product?.stock ?? 0}
          />
        </div>

        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 text-sm text-zinc-700">
            <input
              type="checkbox"
              name="active"
              defaultChecked={product?.active ?? true}
              className="h-4 w-4 rounded border-zinc-300 accent-green-600"
            />
            Producto activo
          </label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <SubmitButton text={isEdit ? "Guardar cambios" : "Crear producto"} />
        <Button type="button" variant="secondary" onClick={() => history.back()}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
