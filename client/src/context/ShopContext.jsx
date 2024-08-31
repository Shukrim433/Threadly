import { createContext, useContext, useState } from "react";

// CONTEXT
export const ShopContext = createContext();

// CUSTOM HOOK (that returns the global state values)
export const useShopContext = () => {
  return useContext(ShopContext);
};

// PROVIDER
export const ShopContextProvider = ({ children }) => {
  // state holds the logged in user
  const [authenticatedUser, setAuthenticatedUser] = useState(
    JSON.parse(localStorage.getItem("logged-in-user")) || null
  );

  // state holds selected product
  const [selectedProduct, setSelectedProduct] = useState({});

  const value = {
    authenticatedUser: authenticatedUser,
    setAuthenticatedUser: setAuthenticatedUser,
    selectedProduct: selectedProduct,
    setSelectedProduct: setSelectedProduct,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
