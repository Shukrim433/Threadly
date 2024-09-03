import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" }); // bcuz .env file is in the root directory not the server also up here to ensure .env variables are loaded ASAP
import Category from "../models/category.model.js";
import Product from "../models/product.model.js";
import connectToMongoDB from "../db/connectToMongoDB.js";

const categories = [
  { name: "Women" },
  { name: "Men" },
  { name: "Kids" },
];

const products = [
  {
    name: "Women Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 100,
    images: ["/images/p_img1.png"],
    quantity: 50,
    category: "Women",
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 200,
    images: [
      "/images/p_img2_1.png",
      "/images/p_img2_2.png",
      "/images/p_img2_3.png",
      "/images/p_img2_4.png",
    ],
    quantity: 100,
    category: "Men",
  },
  {
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 220,
    images: ["/images/p_img3.png"],
    quantity: 75,
    category: "Kids",
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 110,
    images: ["/images/p_img4.png"],
    quantity: 75,
    category: "Men",
  },
  {
    name: "Women Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 130,
    images: ["/images/p_img5.png"],
    quantity: 75,
    category: "Women",
  }
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
