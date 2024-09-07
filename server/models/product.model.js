import mongoose from "mongoose";
import Category from "./category.model.js"; // imported Category model in here bcuz the .populate in my resolvers wasnt working when testing in postam, i think that fixed it?

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    images: {
      type: [String], // Array of image URLs
      default: [],
    },
    price: {
      type: Number,
      required: true,
      min: 0.99,
    },
    quantity: {
      type: Number,
      min: 0,
      default: 0,
    },
    category: {
      type: String,
    },
    subCategory: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
