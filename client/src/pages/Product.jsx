import React, { useEffect } from "react";
import useGetSingleProduct from "../hooks/useGetSingleProduct";
import { useShopContext } from "../context/ShopContext";

const Product = () => {
  const { loading, product } = useGetSingleProduct();
  return (
    <div>
      <p>{product.name}</p>
      <img src={product.image} alt="product photo" />
    </div>
  );
};

export default Product;
