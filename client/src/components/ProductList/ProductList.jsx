import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useGetProducts from "../../hooks/useGetProducts";
import { useShopContext } from "../../context/ShopContext";
import Title from "../Title/Title";

const ProductList = () => {
  const { loading, products } = useGetProducts();
  const { setSelectedProduct, selectedProduct } = useShopContext();

  if (loading) return <div className="loading loading-spinner"></div>;
  return (
    <div className="my-10">
      {/* TITLE */}
      <div className="text-center py-8 text-3xl">
        <Title text1={"BROWSE"} text2={"LATEST"} />
      </div>
      {/* LIST OF PRODUCTS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => {
              setSelectedProduct(product);
            }}
          >
            <Link
              className="text-gray-700 cursor-pointer"
              to={`/products/${product._id}`}
            >
              <div className="overflow-hidden">
                <img
                  className="hover:scale-110 transition ease-in-out"
                  src={product.images[0]}
                  alt="product photo"
                />
              </div>
              <p className="pt-3 pb-1 text-sm">{product.name}</p>
              <p className="text-sm font-medium">£{product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
