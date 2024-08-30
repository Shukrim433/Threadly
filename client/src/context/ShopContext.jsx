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

  // object holds all the values you want available globally to all components
  const value = {
    authenticatedUser: authenticatedUser,
    setAuthenticatedUser: setAuthenticatedUser,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
