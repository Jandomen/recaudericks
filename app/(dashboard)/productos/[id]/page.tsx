import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { updateProductAction } from "@/actions/product.actions";
import { ProductForm } from "@/components/products/product-form";
import { ROLES } from "@/constants/roles";
import { requireRole } from "@/lib/permissions";
import { getCategories, getProductById } from "@/services/product.service";

export const metadata: Metadata = {
  title: "Editar producto",
};

export default async function EditarProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await requireRole([ROLES.ADMIN]);

  const [product, categories] = await Promise.all([
    getProductById(id),
    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-zinc-900">
          Editar producto
        </h2>
        <p className="text-sm text-zinc-500">{product.name}</p>
      </div>

      <ProductForm
        categories={categories}
        product={product}
        action={updateProductAction.bind(null, id)}
      />
    </div>
  );
}
