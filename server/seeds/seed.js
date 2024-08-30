import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: '../.env' }); // bcuz .env file is in the root directory not the server also up here to ensure .env variables are loaded ASAP
import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import connectToMongoDB from "../db/connectToMongoDB.js";


const categories = [
  { name: "Electronics" },
  { name: "Clothing" },
  { name: "Books" },
];

const products = [
  {
    name: "camera",
    description: "Latest model with high-end specs",
    image: "/images/camera.jpg",
    price: 699.99,
    quantity: 50,
    categoryName: "Electronics",
  },
  {
    name: "soap",
    description: "100% cotton, comfortable fit",
    image: "/images/soap.jpg",
    price: 19.99,
    quantity: 100,
    categoryName: "Clothing",
  },
  {
    name: "tablet",
    description: "Best-selling mystery novel",
    image: "/images/tablet.jpg",
    price: 12.99,
    quantity: 75,
    categoryName: "Books",
  },
];

const seedDatabase = async () => {
  try {
    // connect to MongoDB
    await connectToMongoDB();

    // clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});

    // insert categories
    const createdCategories = await Category.insertMany(categories);

    // map category names to their IDs
    const categoryMap = createdCategories.reduce((map, category) => {
      map[category.name] = category._id;
      return map;
    }, {});

    // replace category names with category IDs in products
    const productsWithCategoryIds = products.map((product) => ({
      ...product,
      category: categoryMap[product.categoryName],
    }));

    // insert products
    await Product.insertMany(productsWithCategoryIds);

    console.log("Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();