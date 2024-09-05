import React, { useEffect, useState } from "react";
import { useShopContext } from "../context/ShopContext";
import useGetProducts from "../hooks/useGetProducts";
import Title from "../components/Title/Title";
import CartTotal from "../components/CartTotal/CartTotal";

const Cart = () => {
  const { loading, products } = useGetProducts();
  const { cartItems, updateQuantity } = useShopContext();
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const product in cartItems) {
      for (const size in cartItems[product]) {
        if (cartItems[product][size] > 0) {
          // so product(items) = each product (id string) in the cart, size(item) = each size (number) of each product in the cart
          tempData.push({
            _id: product,
            size: size,
            quantity: cartItems[product][size],
          });
        }
      }
    }
    console.log("tempData", tempData);
    setCartData(tempData);
  }, [products, cartItems]); //*

  if (loading) return <div className="loading loading-spinner"></div>;
  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div className="">
        {/* for each cartItem, find its corresponding product in the db and return that single item in the productData array - so the array will hold one product at a time*/}
        {cartData.map((item, index) => {
          const productData = products.find((product) => {
            return product._id === item._id; //**
          });
          /* console.log("cartData", cartData);
          console.log("products", products);
          console.log("productData", productData); */

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData.images[0]}
                  alt="product image"
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>
                </div>
                <div className="flex items-center gap-5 mt-2">
                  <p>£{productData.price}</p>
                  <p className="px-2 sm:px-3 sm:py-1 border bg-slate-100">
                    {item.size}
                  </p>
                </div>
              </div>
              <input
                className="border mb-10 bg-slate-100 border-black max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                onChange={(
                  event //*
                ) =>
                  event.target.value === "" || event.target.value === "0"
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(event.target.value)
                      )
                }
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              {/* DELETE ICON */}
              <div
                onClick={() => updateQuantity(item._id, item.size, 0)}
                /***/ className="cursor-pointer mb-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button className="bg-black  active:bg-pink-600 text-white text-sm my-8 px-8 py-3">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

/* the dependency array for useEffect:
- cartData, so it runs whenever the cartItems change
- products, so it only runs once the products are fetched from the db (not before)
*/

/* 
arrow function with no bracket gives you an implicit return:
i tried the .find() method on the products aray with an attow function with brackets {} and no explicit "return" 
so i was getting the error "productData is undefined"
*/

/* 
How does the delete icon work:
- when the updateQuantity function is called with three arguments - item id, size and quantity.
- and since the quantity of the product in the specified size has been set to 0, the useEffect in the Cart component
will not include this item in the tempData array when it's rebuilding the cartData array using .find().
*/

/* 
How does the onChange() on the input field work:
- first it chacks if the value in the imput field is "" or "0" aka falsy
- if yes, then dont do anything in response to any change event on the input field
- if not falsy, then call the updateQuantity() function with 3 arguments - item id, size and quantity
- we use the Number() method to convert the value of the input field (a string) into a number before passing it to the function
*/
