import express from "express";
import User from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const router = express.Router();

//Register
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register the user
 *     description: Register a new user to be able to log in.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: daniel
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *                 example: adsadadasd@asds.com
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: 1111
 *     responses:
 *       200:
 *         description: Successful registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: The username of the user.
 *                   example: daniel
 *                 email:
 *                   type: string
 *                   description: The email address of the user.
 *                   example: adsadadasd@asds.com
 *                 password:
 *                   type: string
 *                   description: The hashed password of the user.
 *                   example: U2FsdGVkX194rqhcBA0YAU6h1Mepsz96JIPupXi6/Bk=
 *                 isAdmin:
 *                   type: boolean
 *                   description: Indicates if the user has administrative privileges.
 *                   example: false
 *                 _id:
 *                   type: string
 *                   description: The unique identifier for the user.
 *                   example: 673d12ec2e7f2ee767f5e1c4
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the user was created.
 *                   example: 2024-11-19T22:36:28.996Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the user was last updated.
 *                   example: 2024-11-19T22:36:28.996Z
 *                 __v:
 *                   type: number
 *                   description: The version key for the document.
 *                   example: 0
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Error registering user
 */

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
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in the user
 *     description: Logs the user in and returns a token if the credentials are correct.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *                 example: adsadadasd@asds.com
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: 1111
 *     responses:
 *       200:
 *         description: Successful login, returns a user object with a token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier for the user.
 *                   example: 673d12ec2e7f2ee767f5e1c4
 *                 username:
 *                   type: string
 *                   description: The username of the user.
 *                   example: daniel
 *                 email:
 *                   type: string
 *                   description: The email address of the user.
 *                   example: adsadadasd@asds.com
 *                 isAdmin:
 *                   type: boolean
 *                   description: Indicates if the user has administrative privileges.
 *                   example: false
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the user was created.
 *                   example: 2024-11-19T22:36:28.996Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the user was last updated.
 *                   example: 2024-11-19T22:36:28.996Z
 *                 __v:
 *                   type: number
 *                   description: The version key for the document.
 *                   example: 0
 *                 token:
 *                   type: string
 *                   description: A token containing the user's information and permissions.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2QxMmVjMmU3ZjJlZTc2N2Y1ZTFjNCIsImlzQWRtaW4iOmZhbHNlLCJuYW1lIjoiZGFuaWVsIiwiZW1haWwiOiJkYW5pZWxAZGFuaWVsLmNvbSIsInBhc3N3b3JkIjoiVTJGc2RHVmtYMThIckFaYmNwNjU2VWlvdm9jdUMwN0FUTUhDbEtTNXZnWT0iLCJpYXQiOjE3MzIwNTU5MzIsImV4cCI6MTczMjE0MjMzMn0.oeoyI4MGIamsiBR_OlHt0vrZ79LmMtFsb_oMhDMnAzI
 *       401:
 *         description: Unauthorized - incorrect credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Incorrect credentials
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Error logging in
 */

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

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
        name: user.username,
        email: user.email,
        password: user.password,
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
