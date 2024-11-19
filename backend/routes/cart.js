import express from "express";
import {
  verifyTokenAuthorization,
  verifyTokenAdmin,
  verifyToken,
} from "./verifyToken.js";
import Cart from "../models/Cart.js";

const router = express.Router();

//Create

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Create a shopping cart for the user
 *     description: This will create a shopping cart for the user with all the products he wants to buy
 *     tags:
 *       - Shopping cart
 *     responses:
 *       201:
 *         description: Confirmation message indicating the cart has bem created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message.
 *                   example: cart was successfully created.
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
 *                   example: Error creating cart
 */
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

/**
 * @swagger
 * /cart/{id}:
 *   delete:
 *     summary: Update the shopping cart of the user
 *     description: This will Update the shopping cart of the user.
 *     tags:
 *       - Shopping cart
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the cart to be Updated.
 *         schema:
 *           type: string
 *           example: 66f7db10ad8071b693995b36
 *     responses:
 *       200:
 *         description: Confirmation message indicating the cart has bem Updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message.
 *                   example: cart was successfully Updated.
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
 *                   example: Error updating cart
 */
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
/**
 * @swagger
 * /cart/{id}:
 *   put:
 *     summary: Delete the shopping cart of the user
 *     description: This will Delete the shopping cart of the user.
 *     tags:
 *       - Shopping cart
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the cart to be Deleted.
 *         schema:
 *           type: string
 *           example: 66f7db10ad8071b693995b36
 *     responses:
 *       200:
 *         description: Confirmation message indicating the cart has bem Deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message.
 *                   example: cart was successfully Deleted.
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
 *                   example: Error updating cart
 */

router.delete("/:id", verifyTokenAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting cart" });
  }
});

//Get user cart
/**
 * @swagger
 * /cart/{id}:
 *   get:
 *     summary: Get specified cart if you are the administrator
 *     description: Returns the specific cart if the user is authorized.
 *     tags:
 *       - Shopping cart
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the cart.
 *         schema:
 *           type: string
 *           example: 66f7db10ad8071b693995b36
 *     responses:
 *       200:
 *         description: The specific cart.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the cart.
 *                   example: 66f7db10ad8071b693995b36
 *                 items:
 *                   type: array
 *                   description: List of items in the cart.
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: string
 *                         description: The unique identifier of the product.
 *                         example: 12345abc
 *                       quantity:
 *                         type: integer
 *                         description: The quantity of the product in the cart.
 *                         example: 2
 *                 totalPrice:
 *                   type: number
 *                   format: float
 *                   description: The total price of all items in the cart.
 *                   example: 99.99
 *       401:
 *         description: User is not authenticated (no token provided).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: User not authenticated
 *       403:
 *         description: User is not authorized to access the cart (not an administrator).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Unauthorized access
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
 *                   example: Error fetching the cart
 */

router.get("/:id", verifyTokenAuthorization, async (req, res) => {
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
/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get all carts of the users if you are the administrator
 *     description: This will return all the carts that exist.
 *     tags:
 *       - Shopping cart
 *     responses:
 *       200:
 *         description: A list of carts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *       401:
 *         description: You still dont have a token. Meaning you are not logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: No authenticated
 *       403:
 *         description: Unauthorized to do that. Probably you are not the administrator
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
 *                   example: Error fecthing all the carts
 */
router.get("/", verifyTokenAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
