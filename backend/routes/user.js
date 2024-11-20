import express from "express";
import { verifyTokenAuthorization, verifyTokenAdmin } from "./verifyToken.js";
import User from "../models/User.js";
import CryptoJS from "crypto-js";

const router = express.Router();

//Get All Users

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users if you are an administrator
 *     description: This will return all the users who have already been registered on the website.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier for the user.
 *                     example: 66f7db10ad8071b693995b36
 *                   username:
 *                     type: string
 *                     description: The username of the user.
 *                     example: admin
 *                   email:
 *                     type: string
 *                     description: The user's email address.
 *                     example: admin@admin.com
 *                   password:
 *                     type: string
 *                     description: The hashed password of the user.
 *                     example: U2FsdGVkX194rqhcBA0YAU6h1Mepsz96JIPupXi6/Bk=
 *                   isAdmin:
 *                     type: boolean
 *                     description: Indicates if the user has administrative privileges.
 *                     example: true
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the user was created.
 *                     example: 2024-08-28T10:31:44.990Z
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the user was last updated.
 *                     example: 2024-09-28T10:31:44.990Z
 *                   __v:
 *                     type: number
 *                     description: The version key for the document.
 *                     example: 0
 *       401:
 *         description: You do not have a token, meaning you are not logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Not authenticated
 *       403:
 *         description: Unauthorized action. You are likely not an administrator.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Invalid token
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
 *                   example: Error fetching all users
 */

router.get("/", verifyTokenAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fecthing all the users" });
  }
});

//Get user

/**
 *
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get specified user if you are an administrator
 *     description: This will return the specific user if the requester is an administrator.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user.
 *         schema:
 *           type: string
 *           example: 66f7db10ad8071b693995b36
 *     responses:
 *       200:
 *         description: Specific user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier for the user.
 *                   example: 673cd7f2b01ef4a7e13c68be
 *                 username:
 *                   type: string
 *                   description: The username of the user.
 *                   example: daniel
 *                 email:
 *                   type: string
 *                   description: The user's email address.
 *                   example: daniel@daniel.com
 *                 isAdmin:
 *                   type: boolean
 *                   description: Indicates if the user has administrative privileges.
 *                   example: false
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the user was created.
 *                   example: 2024-11-19T18:24:50.498Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the user was last updated.
 *                   example: 2024-11-19T18:25:50.498Z
 *                 __v:
 *                   type: number
 *                   description: The version key for the document.
 *                   example: 0
 *       401:
 *         description: You do not have a token. You are not logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Not authenticated
 *       403:
 *         description: Unauthorized action. You are likely not an administrator.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Invalid token
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
 *                   example: Error fetching the user
 */

router.get("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    res.status(500).json(error);
  }
});
//Update

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     description: Updates the details of a specific user. Requires authentication and authorization.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user to update.
 *         schema:
 *           type: string
 *           example: 673d12ec2e7f2ee767f5e1c4
 *       - in: body
 *         name: user
 *         required: true
 *         description: The updated user data.
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               description: The new username of the user.
 *               example: daniel
 *             email:
 *               type: string
 *               description: The new email of the user.
 *               example: adsadadasd@asds.com
 *             password:
 *               type: string
 *               description: The new hashed password of the user.
 *               example: U2FsdGVkX1+CQRrifj4mzSdaLfUQDgtMVnqfqAQLAVM=
 *     responses:
 *       200:
 *         description: The updated user details.
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
 *                   description: The updated username of the user.
 *                   example: daniel
 *                 email:
 *                   type: string
 *                   description: The updated email of the user.
 *                   example: adsadadasd@asds.com
 *                 password:
 *                   type: string
 *                   description: The updated hashed password of the user.
 *                   example: U2FsdGVkX1+CQRrifj4mzSdaLfUQDgtMVnqfqAQLAVM=
 *                 isAdmin:
 *                   type: boolean
 *                   description: Indicates whether the user has administrative privileges.
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
 *                   example: 2024-11-19T22:39:18.998Z
 *                 __v:
 *                   type: number
 *                   description: The version key for the document.
 *                   example: 0
 *       401:
 *         description: You are not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Not authenticated
 *       403:
 *         description: You do not have permission to perform this action.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Invalid token
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
 *                   example: Error updating the user
 */

router.put("/:id", verifyTokenAuthorization, async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json(updateUser);
  } catch (error) {
    console.error("Update error:", error);
    return res
      .status(500)
      .json({ message: "Server Error: cannot update user" });
  }
});

//Delete

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID if you are the user or an administrator
 *     description: Allows an administrator or the user to delete the user from the system by their unique ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user to be deleted.
 *         schema:
 *           type: string
 *           example: 66f7db10ad8071b693995b36
 *     responses:
 *       200:
 *         description: Confirmation message indicating that the user has been deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message.
 *                   example: User has been successfully deleted.
 *       401:
 *         description: You are not logged in (no token provided).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: No authentication token provided.
 *       403:
 *         description: Unauthorized to perform this action. You are probably not an administrator.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Invalid token.
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
 *                   example: Error deleting the user.
 */

router.delete("/del/:id", verifyTokenAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

export default router;
