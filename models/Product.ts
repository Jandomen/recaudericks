import mongoose, { Schema, type InferSchemaType } from "mongoose";
import { UNITS } from "@/constants/units";

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: { type: Number, required: true, min: 0 },
    unit: {
      type: String,
      enum: Object.values(UNITS),
      default: UNITS.PZA,
    },
    active: { type: Boolean, default: true },
    stock: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

export type ProductDoc = InferSchemaType<typeof productSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const ProductModel =
  (mongoose.models.Product as mongoose.Model<ProductDoc>) ??
  mongoose.model<ProductDoc>("Product", productSchema);
