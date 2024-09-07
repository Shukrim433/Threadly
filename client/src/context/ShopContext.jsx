import { createContext, useContext, useEffect, useState } from "react";

import toast from "react-hot-toast";
import useGetProducts from "../hooks/useGetProducts";

// CONTEXT
export const ShopContext = createContext();

// CUSTOM HOOK (that returns the global state values)
export const useShopContext = () => {
  return useContext(ShopContext);
};

// PROVIDER
export const ShopContextProvider = ({ children }) => {
  const { loading, products } = useGetProducts();
  // state holds the logged in user
  const [authenticatedUser, setAuthenticatedUser] = useState(
    JSON.parse(localStorage.getItem("logged-in-user")) || null
  );
  const [selectedProduct, setSelectedProduct] = useState({});
  const [cartItems, setCartItems] = useState({});

  const addToCart = async (authenticatedUser, itemId, size) => {
    if (!authenticatedUser) {
      toast.error("Login to add items to cart!");
      return; // return to stop the function from continuing if not logged in
    }
    if (!size) {
      toast.error("Select product size!");
      return; // return to stop the function from continuing if no size is selected/passed in
    }
    let cartData = structuredClone(cartItems); // creates a copy of the cartItems obj

    if (cartData[itemId]) {
      // if an item is in the cart
      if (cartData[itemId][size]) {
        // and this size of that item is in the cart
        cartData[itemId][size] += 1; // then add one to that item + size
      } else {
        // but if that size of that item is not in the cart
        cartData[itemId][size] = 1; // then that item + size will = a quantity of 1 in the cart
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    toast.success("Added to cart!");
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      // for each item in the cart (item = the id of the item not the obj)
      for (const size in cartItems[item]) {
        // for each size in each item in the cart
        try {
          if (cartItems[item][size] > 0) {
            // if the size count of each item in the cart is > 0, add the count to the cart
            totalCount += cartItems[item][size];
          }
        } catch (error) {
          console.log("error in getCartCount function", error.message);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData); // Updates the state with the new cart data (so icon will show correct number)
  };

  const getCartTotal = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      let itemInfo = products.find((product) => product._id === itemId);
      for (const size in cartItems[itemId]) {
        try {
          if (cartItems[itemId][size] > 0) {
            totalAmount += itemInfo.price * cartItems[itemId][size];
            /* cartItems[itemId][size] = the quantity of the each item in the cart (for in loop)*/
            /* itemInfo.price is the price of the same product retrieved from the db */
          }
        } catch (error) {
          console.log("error in getCartTotal function", error.message);
        }
      }
    }
    return totalAmount;
  };

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // run this console.log whenever theres any change to the cart
  useEffect(() => {
    console.log("cartItems", cartItems);
  }, ["cartItems", cartItems]);

  const value = {
    authenticatedUser: authenticatedUser,
    setAuthenticatedUser: setAuthenticatedUser,
    selectedProduct: selectedProduct,
    setSelectedProduct: setSelectedProduct,
    cartItems: cartItems,
    addToCart: addToCart,
    getCartCount: getCartCount,
    updateQuantity: updateQuantity,
    getCartTotal: getCartTotal,
    search: search,
    setSearch: setSearch,
    showSearch: showSearch,
    setShowSearch: setShowSearch,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
