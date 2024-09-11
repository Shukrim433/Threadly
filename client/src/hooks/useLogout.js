import React, { useState } from "react";
import toast from "react-hot-toast";
import { useShopContext } from "../context/ShopContext";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthenticatedUser, setCartItems } = useShopContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      // REMOVE USER OBJ  + CART ITEMS FROM LOCAL STORAGE - on successful logout
      localStorage.removeItem("logged-in-user");
      localStorage.removeItem("cart-items");
      // REMOVE USER OBJ + CART ITEMS FROM CONTEXT - on successful logout
      setAuthenticatedUser(null);
      setCartItems({})

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
