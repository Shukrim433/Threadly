import React, { useState } from "react";
import toast from "react-hot-toast";
import { useShopContext } from "../context/ShopContext";

// useSignup is the custom hook, and "loading" + "signup" are the two values it returns

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthenticatedUser } = useShopContext();

  const signup = async ({
    firstName,
    surname,
    username,
    password,
    confirmPassword,
  }) => {
    const success = handleInputErrors({
      firstName,
      surname,
      username,
      password,
      confirmPassword,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          surname,
          username,
          password,
          confirmPassword,
        }),
      });
      const data = await res.json();

      if (data.error) {
        // checks of theres any errors from the server when creating new user w/ these inputs - will be caught in catch{} block if so
        throw new Error(data.error);
      }

      // SAVE CREATED USER OBJECT(data) TO LOCAL STORAGE:
      localStorage.setItem("logged-in-user", JSON.stringify(data));

      // SAVE CREATED USER OBJECT(data) IN CONTEXT:
      setAuthenticatedUser(data);

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // return the loading state (for UI loading spinners etc)
  // & signup function to use in Signup form component to pass user inputs
  return { loading, signup };
};

export default useSignup;

function handleInputErrors({
  firstName,
  surname,
  username,
  password,
  confirmPassword,
}) {
  if (!firstName || !surname || !username || !password || !confirmPassword) {
    toast.error("Please fill in all fields.");
    return false; // so success will = false and handleInputErrors will not continue (return)
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match.");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters.");
    return false;
  }

  return true; // so success will = true and handleInputErrors will continue (return)
}
