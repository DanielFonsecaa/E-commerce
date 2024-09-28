import express from "express";
import { verifyTokenAdmin } from "./verifyToken.js";
import Product from "../models/Product.js";

const router = express.Router();
//Create

router.post("/", verifyTokenAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json(error);
  }
});

////Update
router.put("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json(updateProduct);
  } catch (error) {
    console.error("Update error:", error);
    return res
      .status(500)
      .json({ message: "Server Error: cannot update Product" });
  }
});

////Delete

router.delete("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

//Get product
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get All Products

router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qBrand = req.query.brand;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createAt: -1 }).limit(1);
    } else if (qBrand) {
      products = await Product.find({ brand: qBrand });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
});

export default router;
