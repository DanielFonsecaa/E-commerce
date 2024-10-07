import express from "express";
import {
  verifyTokenAuthorization,
  verifyTokenAdmin,
  verifyToken,
} from "./verifyToken.js";
import Order from "../models/Order.js";

const router = express.Router();
//Create

router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json(error);
  }
});

////Update
router.put("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json(updateOrder);
  } catch (error) {
    console.error("Update error:", error);
    return res
      .status(500)
      .json({ message: "Server Error: cannot update Cart" });
  }
});

////Delete

router.delete("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Order" });
  }
});

//Get user orders
router.get("/find/:userid", verifyTokenAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userid });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get All

router.get("/", verifyTokenAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get montly income

router.get("/income", verifyTokenAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(date.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
