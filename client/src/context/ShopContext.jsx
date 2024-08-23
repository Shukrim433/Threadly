import { createContext } from "react";

// CONTEXT
export const ShopContext = createContext();

// CUSTOM HOOK (that returns the global state values)
export const useShopContext = () => {
  return useContext(ShopContext);
};

// PROVIDER
export const ShopContextProvider = ({children}) => {
    const value = {

    }

    return(
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}
