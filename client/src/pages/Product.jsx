import { useEffect, useState } from "react";
import useGetSingleProduct from "../hooks/useGetSingleProduct";
import RelatedProducts from "../components/RelatedProducts.jsx/RelatedProducts";
import { useShopContext } from "../context/ShopContext";
import toast from "react-hot-toast";

const Product = () => {
  const { loading, product } = useGetSingleProduct();
  const {authenticatedUser, addToCart} = useShopContext()
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState("");
  const { _id, name, images, description, category, price } = product || {}; // "|| {}" to stop alt attribute from showing before image appears
  const sizes = ["XS", "S", "M", "L", "XL"];

  useEffect(() => {
    Array.isArray(images) && setMainImage(images[0]);
  }, [images]); //**

  if (loading) return <div className="loading loading-spinner"></div>;

  return (
    //**
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* PRODUCT DATA */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* PRODUCT IMAGES */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          {/* SMALL IMAGES ON SIDE */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-hide justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {" "}
            {/* changed from y-scroll to y-hide */}
            {Array.isArray(images) &&
              images[0] &&
              images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  onClick={() => setMainImage(image)}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                  alt="product photo"
                />
              ))}
          </div>
          {/* BIG SELECTED IMAGE */}
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto"
              src={mainImage}
              alt="product image"
            />
          </div>
        </div>
        {/* PRODUCT INFO */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2 text-black">{name}</h1>
          <p className="mt-5 text-3xl font-medium text-black">£{price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p className="text-black">Select Size</p>
            <div className="flex gap-2">
              {sizes.map((size, index) => (
                <button
                  onClick={() => setSelectedSize(size)}
                  key={index}
                  className={`border py-2 px-4 bg-gray-100 text-black ${
                    size === selectedSize ? "border-pink-600" : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          {/* pass loggedinuser's obj, product._id and selectedSize to global state function */}
          <button onClick={()=> addToCart(authenticatedUser, _id, selectedSize)} className="bg-black text-white px-8 py-3 text-sm active:bg-pink-600 mt-5">
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p className="">Made from 100% recycled materials.</p>
            <p className="">Easy return and exchange policy within 14 days.</p>
            <p className="">Next day delivery available in the UK.</p>
          </div>
        </div>
      </div>
      {/* "RELATED" PRODUCTS */}
      {/* <RelatedProducts category={category}/>   */}{" "}
      {/* WILL FIX LATER NOT NEEDED */}
    </div>
  );
};

export default Product;

/* 
1. Array.isArray(images) will return true only if images is actually an array.
If images is something other than an array (like a string, object, or null), it will return false.

2. When you confirm images is an array using Array.isArray(images), you can safely access images[0] knowing that it should return the first element of the array.
If images were a string (or something else), trying to access images[0] would either give unexpected results or throw an error.

3. thus overriding the browser mistakenly interpreting images as a string of URLs separated by commas due to
JSX's automatic string conversion?
*/

/* images is in the dependancy array for use effect, because the images array might not be populated when the useEffect runs 
initially because the data is still being fetched. To fix this, you need to ensure that the useEffect only sets the image state 
once the images array is available.*/
