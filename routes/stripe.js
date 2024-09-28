import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(process.env.SRIPE_KEY);
router.post("/payment", async (req, res) => {
  try {
    const stripeRes = await stripe.charges.create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    });
    res.status(200).json(stripeRes);
  } catch (stripeErr) {
    res.status(500).json(stripeErr);
  }
});
export default router;
