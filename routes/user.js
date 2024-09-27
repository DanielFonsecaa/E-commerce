import express from "express";
import { verifyTokerAuthorization } from "./verifyToken.js";
import User from "../models/User.js";
import CryptoJS from "crypto-js"; // Ensure this is imported if you're using CryptoJS

const router = express.Router();

router.put("/:id", verifyTokerAuthorization, async (req, res) => {
  try {
    // Check if password needs to be encrypted
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }

    // Perform the update operation
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    // Return the updated user response
    return res.status(200).json(updateUser);
  } catch (error) {
    console.error("Update error:", error);
    // Return error response
    return res
      .status(500)
      .json({ message: "Server Error: cannot update user" });
  }
});

export default router;
