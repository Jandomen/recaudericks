import mongoose, { Schema, type InferSchemaType } from "mongoose";
import { PAYMENT_METHODS } from "@/constants/payment-methods";
import { UNITS } from "@/constants/units";

const saleSchema = new Schema(
  {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true, trim: true },
        unit: { type: String, enum: Object.values(UNITS), required: true },
        price: { type: Number, required: true, min: 0 },
        quantity: { type: Number, required: true, min: 1 },
        subtotal: { type: Number, required: true, min: 0 },
      },
    ],
    subtotal: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    total: { type: Number, required: true, min: 0 },
    paymentMethod: {
      type: String,
      enum: Object.values(PAYMENT_METHODS),
      required: true,
    },
    amountReceived: { type: Number, default: 0, min: 0 },
    change: { type: Number, default: 0, min: 0 },
    sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sellerName: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export type SaleDoc = InferSchemaType<typeof saleSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const SaleModel =
  (mongoose.models.Sale as mongoose.Model<SaleDoc>) ??
  mongoose.model<SaleDoc>("Sale", saleSchema);
