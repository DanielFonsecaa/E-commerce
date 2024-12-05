import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import user from "./routes/user.js";
import auth from "./routes/auth.js";
import product from "./routes/product.js";
import cart from "./routes/cart.js";
import order from "./routes/order.js";
import cors from "cors";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce by Daniel",
      version: "1.0.0",
      description: "API for an e-commerce platform",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

dotenv.config();
const app = express();
const port = process.env.PORT_NUMBER || 3000;
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/", product);
app.use("/users", user);
app.use("/auth", auth);
app.use("/products", product);
app.use("/cart", cart);
app.use("/orders", order);

const mongooseOptions = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
