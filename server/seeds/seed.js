import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" }); // bcuz .env file is in the root directory not the server also up here to ensure .env variables are loaded ASAP
import Category from "../models/category.model.js";
import Product from "../models/product.model.js";
import connectToMongoDB from "../db/connectToMongoDB.js";

/* const categories = [
  { name: "Women" },
  { name: "Men" },
  { name: "Kids" },
];
 */
const products = [
  {
    name: "Women Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 100,
    images: ["/images/p_img1.png"],
    quantity: 50,
    category: "Women",
    subCategory: "Topwear",
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
    subCategory: "Topwear",
  },
  {
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 220,
    images: ["/images/p_img3.png"],
    quantity: 75,
    category: "Kids",
    subCategory: "Topwear",
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 110,
    images: ["/images/p_img4.png"],
    quantity: 75,
    category: "Men",
    subCategory: "Topwear",
  },
  {
    name: "Women Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 130,
    images: ["/images/p_img5.png"],
    quantity: 75,
    category: "Women",
    subCategory: "Topwear",
  },
  {
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 140,
    images: ["/images/p_img6.png"],
    quantity: 75,
    category: "Kids",
    subCategory: "Topwear",
  },
  {
    name: "Men Tapered Fit Flat-Front Trousers",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 190,
    images: ["/images/p_img7.png"],
    quantity: 75,
    category: "Men",
    subCategory: "Bottomwear",
},
{
  name: "Men Round Neck Pure Cotton T-shirt",
  description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
  price: 140,
  images: ["/images/p_img8.png"],
  quantity: 75,
  category: "Men",
  subCategory: "Topwear",
},
{
  name: "Girls Round Neck Cotton Top",
  description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
  price: 100,
  images: ["/images/p_img9.png"],
  quantity: 75,
  category: "Kids",
  subCategory: "Topwear",
},
{
  name: "Men Tapered Fit Flat-Front Trousers",
  description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
  price: 110,
  images: ["/images/p_img10.png"],
  quantity: 75,
  category: "Men",
  subCategory: "Bottomwear",
},
{
  name: "Men Round Neck Pure Cotton T-shirt",
  description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
  price: 120,
  images: ["/images/p_img11.png"],
  quantity: 75,
  category: "Men",
  subCategory: "Topwear",
},
{
  name: "Men Round Neck Pure Cotton T-shirt",
  description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
  price: 150,
  images: ["/images/p_img12.png"],
  quantity: 75,
  category: "Men",
  subCategory: "Topwear",
},
{
  name: "Women Round Neck Cotton Top",
  description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
  price: 130,
  images: ["/images/p_img13.png"],
  quantity: 75,
  category: "Women",
  subCategory: "Topwear",
},
{
  name: "Boy Round Neck Pure Cotton T-shirt",
  description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
  price: 160,
  images: ["/images/p_img14.png"],
  quantity: 75,
  category: "Kids",
  subCategory: "Topwear",
},
];

const seedDatabase = async () => {
  try {
    // connect to MongoDB
    await connectToMongoDB();

    // clear existing data
    /* await Category.deleteMany({}); */
    await Product.deleteMany({});

    // insert categories
    /* const createdCategories = await Category.insertMany(categories); */

    // map category names to their IDs
    /*   const categoryMap = createdCategories.reduce((map, category) => {
      map[category.name] = category._id;
      return map;
    }, {});
 */
    // replace category names with category IDs in products
    /*     const productsWithCategoryIds = products.map((product) => ({
      ...product,
      category: categoryMap[product.category],
    })); */

    // insert products
    await Product.insertMany(products);

    console.log("Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
