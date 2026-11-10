import mongoose, { Schema, InferSchemaType } from "mongoose";

export const STATUSES = ["Pending", "In-Transit", "Delivered"] as const;

const orderSchema = new Schema(
  {
    customer: { type: String, required: true, trim: true },
    packageSize: { type: String, required: true, trim: true },
    status: { type: String, enum: STATUSES, default: "Pending" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export type OrderType = InferSchemaType<typeof orderSchema>;
export default mongoose.model("Order", orderSchema);