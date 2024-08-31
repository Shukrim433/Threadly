import express from "express";
import { getAllProducts, getSingleProduct} from "../controllers/product.controllers.js";

const router = express.Router();

// GET /api/products/
router.get("/", getAllProducts);

// GET /api/products/:productId
router.get("/:productId", getSingleProduct);

export default router;