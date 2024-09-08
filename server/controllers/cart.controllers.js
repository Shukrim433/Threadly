import User from "../models/user.model.js";

// addToCart
export const addToCart = async (req, res) => {
  try {
    let userData = await User.findById(req.user._id); // req.user._id = id of authenricatedUser from middleware
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await User.findByIdAndUpdate(req.user._id, {
      cartData,
    });
    res.status(200).json({ message: "added to cart successfully" });
  } catch (error) {
    console.log("error in addToCart controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

// removeFromCart
export const removeFromCart = async (req, res) => {
  try {
    let userData = await User.findById(req.user._id);
    let cartData = await userData.cartData;

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await User.findByIdAndUpdate(req.user._id, {
      cartData,
    });
    res.status(200).json({ message: "removed from cart successfully" });
  } catch (error) {
    console.log("error in removeFromCart controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

// getCart
export const getCart = async (req, res) => {
  try {
    let userData = await User.findById(req.user._id);
    let cartData = await userData.cartData;
    res.status(200).json(cartData);
  } catch (error) {
    console.log("error in getCart controlller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
