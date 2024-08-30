import React, { useState } from "react";
import toast from "react-hot-toast";
import { useShopContext } from "../context/ShopContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthenticatedUser} = useShopContext()

  const login = async ({ username, password }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // SAVE LOGGED IN USER OBJECT(data) TO LOCAL STORAGE:
      localStorage.setItem("logged-in-user", JSON.stringify(data));

      // SAVE LOGGED IN USER OBJECT(data) IN CONTEXT:
      setAuthenticatedUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;
