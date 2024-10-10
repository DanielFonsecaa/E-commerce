import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productsId: { type: String },
        title: { type: String },
        img: { type: String },
        brand: { type: String },
        model: { type: String },
        quantity: { type: Number, default: 1 },
        price: { type: Number },
        color: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
