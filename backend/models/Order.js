import mongoose from "mongoose";

const oderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productsId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", oderSchema);
