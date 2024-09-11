import React, { useEffect, useState } from "react";
import Title from "../components/Title/Title";
import CartTotal from "../components/CartTotal/CartTotal";
import { assets } from "../assets/assets";
import { useShopContext } from "../context/ShopContext";
import useGetProducts from "../hooks/useGetProducts";
import axios from "axios";
import toast from "react-hot-toast";

const PlaceOrder = () => {
  const { authenticatedUser, cartItems, getCartTotal } = useShopContext();
  const { loading, products } = useGetProducts();

  const [formState, setFormState] = useState({
    firstName: "",
    surname: "",
    email: "",
    street: "",
    city: "",
    postCode: "",
    phoneNumber: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // create the orderItems array from cartItems and products
    let orderItems = [];

    // loop through products and check if they're in the cart
    products.forEach((product) => {
      const itemInCart = cartItems[product._id]; // check if the product is in the cart

      if (itemInCart) {
        // if the product is in the cart, iterate over sizes (XS, S, M, L, XL)
        Object.entries(itemInCart).forEach(([size, quantity]) => {
          if (quantity > 0) {
            // create an item with product and quantity info
            orderItems.push({
              _id: product._id,
              images: product.images,
              name: product.name,
              size: size,
              quantity: quantity,
              price: product.price,
            });
          }
        });
      }
    });

    console.log("orderItems", orderItems);

    let orderData = {
      address: formState,
      items: orderItems,
      amount: getCartTotal() + 5,
    };

    let res = await axios.post("/api/order/place", orderData);
    if (res.data.success) {
      const { session_url } = res.data;
      localStorage.removeItem("cart-items"); // clear cart items if stripe checkout = success
      window.location.replace(session_url);
    } else {
      toast.error("error with payment");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <input
              required
              className="border border-gray-300 rounded bg-white py-1.5 px-3.5 w-full"
              type="text"
              placeholder="First Name"
              name="firstName"
              value={formState.firstName}
              onChange={handleChange}
            />
            <input
              required
              className="border border-gray-300 rounded bg-white py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Surname"
              name="surname"
              value={formState.surname}
              onChange={handleChange}
            />
          </div>
          <input
            required
            className="border border-gray-300 rounded bg-white py-1.5 px-3.5 w-full"
            type="email"
            placeholder="Email address"
            name="email"
            value={formState.email}
            onChange={handleChange}
          />
          <input
            required
            className="border border-gray-300 rounded bg-white py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Street"
            name="street"
            value={formState.street}
            onChange={handleChange}
          />
          <div className="flex gap-3">
            <input
              required
              className="border border-gray-300 rounded bg-white py-1.5 px-3.5 w-full"
              type="text"
              placeholder="City"
              name="city"
              value={formState.city}
              onChange={handleChange}
            />
            <input
              required
              className="border border-gray-300 rounded bg-white py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Post Code"
              name="postCode"
              value={formState.postCode}
              onChange={handleChange}
            />
          </div>
          <input
            required
            className="border border-gray-300 rounded bg-white py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Phone"
            name="phoneNumber"
            value={formState.phoneNumber}
            onChange={handleChange}
          />
          <div className="w-full text-end">
            <button
              type="submit"
              className="bg-black  active:bg-pink-600 text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO PAYMENT
            </button>
          </div>
        </form>
      </div>
      {/* RIGHT SIDE */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          {/* PAYMENT METHOD SELECTION */}
          <div className="flex gap-3 flex-col lg:flex-row"></div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
