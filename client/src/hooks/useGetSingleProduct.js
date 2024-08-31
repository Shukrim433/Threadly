import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useShopContext } from "../context/ShopContext";
import toast from "react-hot-toast";

const useGetSingleProduct = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const { selectedProduct, setSelectedProduct } = useShopContext();
  const { productId } = useParams();

  useEffect(() => {
    const getSingleProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/products/${selectedProduct?._id || productId}`
        );
        console.log("selectedProduct", selectedProduct);
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setProduct(data);
        setSelectedProduct(data); // Update context with fetched product for when the page refreshes
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    // only call function if selectedConversation + productId are not null
    if (selectedProduct?._id || productId) {
      getSingleProduct();
    }
  }, [selectedProduct, productId]); // idk why these r in the dependecy array? works just fine when its empty

  return { loading, product };
};

export default useGetSingleProduct;

/* 
If selectedProduct from the context is unavailable (like when you refresh the page), it fetches the product data using the ID from the URL.
*/
