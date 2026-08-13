import mongoose, { Schema, type InferSchemaType } from "mongoose";

export const MOVEMENT_TYPES = {
  SALE: "venta",
  PURCHASE: "compra",
  ADJUSTMENT: "ajuste",
  LOSS: "merma",
} as const;

export type MovementType =
  (typeof MOVEMENT_TYPES)[keyof typeof MOVEMENT_TYPES];

const inventoryMovementSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true },
    type: {
      type: String,
      enum: Object.values(MOVEMENT_TYPES),
      default: MOVEMENT_TYPES.SALE,
    },
    referenceId: { type: Schema.Types.ObjectId },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

export type InventoryMovementDoc = InferSchemaType<
  typeof inventoryMovementSchema
> & { _id: mongoose.Types.ObjectId };

export const InventoryMovementModel =
  (mongoose.models.InventoryMovement as mongoose.Model<InventoryMovementDoc>) ??
  mongoose.model<InventoryMovementDoc>(
    "InventoryMovement",
    inventoryMovementSchema
  );
