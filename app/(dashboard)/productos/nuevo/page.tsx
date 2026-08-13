import type { Metadata } from "next";
import { createProductAction } from "@/actions/product.actions";
import { ProductForm } from "@/components/products/product-form";
import { ROLES } from "@/constants/roles";
import { requireRole } from "@/lib/permissions";
import { getCategories } from "@/services/product.service";

export const metadata: Metadata = {
  title: "Nuevo producto",
};

export default async function NuevoProductoPage() {
  await requireRole([ROLES.ADMIN]);

  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-zinc-900">Nuevo producto</h2>
        <p className="text-sm text-zinc-500">
          Registra un producto nuevo en el catálogo.
        </p>
      </div>

      <ProductForm categories={categories} action={createProductAction} />
    </div>
  );
}
