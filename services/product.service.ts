import "server-only";

import type { Types } from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { CategoryModel } from "@/models/Category";
import { ProductModel } from "@/models/Product";
import type { Category, Product } from "@/types/product";
import type { Unit } from "@/constants/units";

export interface ProductInput {
  name: string;
  categoryId: string;
  price: number;
  unit: Unit;
  active: boolean;
  stock: number;
}

type PopulatedProduct = {
  _id: Types.ObjectId;
  name: string;
  categoryId: { _id: Types.ObjectId; name: string } | Types.ObjectId;
  price: number;
  unit: string;
  active: boolean;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
};

function mapProduct(doc: PopulatedProduct): Product {
  const category = doc.categoryId as { _id: Types.ObjectId; name: string };
  return {
    _id: doc._id.toString(),
    name: doc.name,
    categoryId: (category._id ?? doc.categoryId).toString(),
    categoryName: category.name,
    price: doc.price,
    unit: doc.unit as Unit,
    active: doc.active,
    stock: doc.stock,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function getCategories(): Promise<Category[]> {
  await connectToDatabase();

  const docs = await CategoryModel.find().sort({ name: 1 }).lean();

  return docs.map((doc) => ({
    _id: doc._id.toString(),
    name: doc.name,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }));
}

export async function getProducts(options: {
  search?: string;
  categoryId?: string;
  includeInactive?: boolean;
} = {}): Promise<Product[]> {
  await connectToDatabase();

  const filter: Record<string, unknown> = {};

  if (!options.includeInactive) {
    filter.active = true;
  }
  if (options.categoryId) {
    filter.categoryId = options.categoryId;
  }

  const query = ProductModel.find(filter)
    .populate<{ categoryId: { _id: Types.ObjectId; name: string } }>(
      "categoryId",
      "name"
    )
    .sort({ name: 1 })
    .lean();

  if (options.search) {
    query.or([{ name: { $regex: escapeRegex(options.search), $options: "i" } }]);
  }

  const docs = await query.exec();

  return docs.map((doc) => mapProduct(doc as unknown as PopulatedProduct));
}

export async function getProductById(id: string): Promise<Product | null> {
  await connectToDatabase();

  const doc = await ProductModel.findById(id)
    .populate<{ categoryId: { _id: Types.ObjectId; name: string } }>(
      "categoryId",
      "name"
    )
    .lean();

  if (!doc) return null;

  return mapProduct(doc as unknown as PopulatedProduct);
}

export async function createProduct(input: ProductInput): Promise<Product> {
  await connectToDatabase();

  const doc = await ProductModel.create(input);

  return mapProduct(
    doc.toObject() as unknown as PopulatedProduct
  );
}

export async function updateProduct(
  id: string,
  input: ProductInput
): Promise<Product | null> {
  await connectToDatabase();

  const doc = await ProductModel.findByIdAndUpdate(id, input, { new: true })
    .populate<{ categoryId: { _id: Types.ObjectId; name: string } }>(
      "categoryId",
      "name"
    )
    .lean();

  if (!doc) return null;

  return mapProduct(doc as unknown as PopulatedProduct);
}

export async function deactivateProduct(id: string): Promise<void> {
  await connectToDatabase();

  await ProductModel.findByIdAndUpdate(id, { active: false });
}
