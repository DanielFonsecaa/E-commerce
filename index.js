import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import user from "./routes/user.js";
import auth from "./routes/auth.js";
import product from "./routes/product.js";
import cart from "./routes/cart.js";
import order from "./routes/order.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/login", user);
app.use("/auth", auth);
app.use("/products", product);
app.use("/cart", cart);
app.use("/orders", order);

const mongooseOptions = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
