import express from "express";
import { getAllProducts} from "../controllers/product.controllers.js";

const router = express.Router();

// GET /api/products/
router.get("/", getAllProducts);

export default router;