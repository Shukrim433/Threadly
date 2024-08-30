import dotenv from "dotenv"; // allows you to use values in env file
dotenv.config({ path: '../.env' }); // bcuz .env file is in the root directory not the server also up here to ensure .env variables are loaded ASAP
import express from "express";
import cookieParser from "cookie-parser"; // allows you to retrieve jwt tokens stored in cookies

import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming request with JSON payloads (from req.body)
app.use(cookieParser()); // to parse the incoming cookies from req.cookies

app.use("/api/auth", authRoutes);

/* app.get("/", (req, res) => {
  // root route http://localhost:5000/
  res.send("hello world");
});
 */

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server running on port ${PORT}`);
});
