import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const productData = await Product.find({}).populate("category");
    if (!productData) {
      return res.status(401).json({ error: "no products found" });
    }
    res.status(200).json(productData);
  } catch (error) {
    console.log("error in getAllProducts controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const productData = await Product.findOne({
      _id: req.params.productId,
    }).populate("category");
    if (!productData) {
      res.status(404).json({ error: "no product with that id found" });
    }

    res.status(200).json(productData);
  } catch (error) {
    console.log("error in getSingleProduct controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
