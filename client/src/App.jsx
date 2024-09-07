import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useShopContext } from "./context/ShopContext";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Collection from "./pages/Collection";
import SearchBar from "./components/SearchBar/SearchBar";

const App = () => {
  const { authenticatedUser } = useShopContext();
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar />
      <SearchBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={authenticatedUser ? <Navigate to="/"/> : <Login />} />
        <Route path="/signup" element={authenticatedUser ? <Navigate to="/"/> : <Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collection" element={<Collection/>} />
        <Route path="/products/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Toaster />
      <Footer />
    </div>
  );
};

export default App;
