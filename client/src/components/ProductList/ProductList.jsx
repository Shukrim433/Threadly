import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useGetProducts from "../../hooks/useGetProducts";
import { useShopContext } from "../../context/ShopContext";

const ProductList = () => {
  const { loading, products } = useGetProducts();
  const { setSelectedProduct } = useShopContext();
  return (
    <div>
      {products.map((product) => (
        <div
          key={product._id}
          onClick={() => {
            setSelectedProduct(product);
          }}
        >
          <Link to={`/products/${product._id}`}>
            <p>{product.name}</p>
            <img src={product.image} alt="product photo" />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
