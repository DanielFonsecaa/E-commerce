import express from "express";
import User from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const router = express.Router();

//Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    console.error("Error registering user", error);
    res.status(500).json({ message: "Server Error" });
  }
});

//login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).json("Wrong credentials");
    }

    const hashPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    );
    const orignalPassword = hashPassword.toString(CryptoJS.enc.Utf8);
    if (orignalPassword !== req.body.password) {
      return res.status(401).json("Wrong credentials");
    }

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_TOKEN,
      { expiresIn: "1d" }
    );
    const { password, ...rest } = user._doc;

    res.status(200).json({ ...rest, token });
  } catch (error) {
    console.error("Error logging in user", error);
    res.status(500).json("Server Error");
  }
});

export default router;
