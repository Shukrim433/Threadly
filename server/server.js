import dotenv from "dotenv"; // allows you to use values in env file
dotenv.config(); // put up here so it loads .env variables ASAP.
import express from "express";
import cookieParser from "cookie-parser"; // allows you to retrieve jwt tokens stored in cookies

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming request with JSON payloads (from req.body)
app.use(cookieParser()); // to parse the incoming cookies from req.cookies

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

/* app.get("/", (req, res) => {
  // root route http://localhost:5000/
  res.send("hello world");
});
 */

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server running on port ${PORT}`);
});
