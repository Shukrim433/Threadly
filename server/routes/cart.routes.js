import express from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cart.controllers.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// POST /api/cart/add
router.post("/add", protectRoute, addToCart);

// POST /api/cart/remove
router.post("/remove", protectRoute, removeFromCart);

// GET /api/cart/
router.get("/", protectRoute, getCart);

export default router;
