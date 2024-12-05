import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    brand: { type: String },
    model: { type: String },
    color: { type: Array },
    material: { type: String, required: true },
    features: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
