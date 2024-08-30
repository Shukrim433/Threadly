import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
