import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/user.js";
import auth from "./routes/auth.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/login", router);
app.use("/auth", auth);

const mongooseOptions = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
