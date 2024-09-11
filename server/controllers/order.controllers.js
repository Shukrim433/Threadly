import dotenv from "dotenv";
dotenv.config();
import Order from "../models/order.model.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order from client
export const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:3000";
  try {
    const orderData = new Order({
      userId: req.user._id,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await orderData.save();
    // CLEAR CART AFTER CREATING THIS ORDER OBJ - WE WILL DO IT IN THE FRONT END IN A FINALLY{} - await User.findByIdAndUpdate(req.body.userId, {cartData:{}})

    const line_items = req.body.items.map((item) => {
      return {
        price_data: {
          currency: "gbp",
          product_data: {
            name: `${item.name} - Size: ${item.size}`, // Include product name and size
          },
          unit_amount: item.price * 100, // Ensure the price is an integer in pence
        },
        quantity: item.quantity,
      };
    });

    line_items.push({
      price_data: {
        currency: "gbp",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 500,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Define payment method
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${orderData._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${orderData._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log("error in placeOrder controller", error.message);
    res.json({ success: false, message: "internal server error" });
  }
};

export const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await Order.findByIdAndUpdate(orderId, { payment: true });
      res.json({
        success: true,
        message: "verifyOrder controller = successful",
      });
    } else {
      // if stripe payment is not successful, delete the Order object created (see line 21)
      await Order.findByIdAndDelete(orderId);
      res.json({
        success: false,
        message: "verifyOrder controller = unsuccessful",
      });
    }
  } catch (error) {
    console.log("error in verifyOrder controller", error.message);
    res.json({ success: false, message: "internal server error" });
  }
};

export const userOrders = async (req, res) => {
  try {
    const orderData = await Order.find({ userId: req.user._id });
    res.json({ success: true, orderData: orderData });
  } catch (error) {
    console.log("error in userOrders controller", error.message);
    res.json({ success: false, message: "internal server error" });
  }
};
