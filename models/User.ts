import mongoose, { Schema, type InferSchemaType } from "mongoose";
import { ROLES } from "@/constants/roles";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.CAJERO,
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export type UserDoc = InferSchemaType<typeof userSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const UserModel =
  (mongoose.models.User as mongoose.Model<UserDoc>) ??
  mongoose.model<UserDoc>("User", userSchema);
