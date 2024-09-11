import express from "express";
import { placeOrder, userOrders, verifyOrder } from "../controllers/order.controllers.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// POST /api/order/place
router.post("/place", protectRoute, placeOrder);

// POST /api/order/verify
router.post("/verify", verifyOrder)

// POST /api/order/userOrders -TO GET ALL OF THE LOGGED IN USERS ORDERS (idky its post)
router.post("/userOrders", protectRoute, userOrders)

export default router;
