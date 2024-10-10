import express from "express";
import {
  verifyTokenAuthorization,
  verifyTokenAdmin,
  verifyToken,
} from "./verifyToken.js";
import Cart from "../models/Cart.js";

const router = express.Router();
//Create

router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  console.log(newCart);
  try {
    const savedCart = await newCart.save();
    console.log("saved cart--", savedCart);
    res.status(201).json(savedCart);
  } catch (error) {
    console.error("Create error:", error);
    res.status(400).json(error);
  }
});

////Update
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json(updateCart);
  } catch (error) {
    console.error("Update error:", error);
    return res
      .status(500)
      .json({ message: "Server Error: cannot update Cart" });
  }
});

////Delete

router.delete("/:id", verifyTokenAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting cart" });
  }
});

//Get user cart
router.get("/find/:id", verifyTokenAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id }).populate(
      "products.productsId"
    );
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get All carts

router.get("/", verifyTokenAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
