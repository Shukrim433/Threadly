import React, { useEffect, useState } from "react";
import useGetProducts from "../hooks/useGetProducts";
import { assets } from "../assets/assets";
import Title from "../components/Title/Title";
import { Link } from "react-router-dom";
import { useShopContext } from "../context/ShopContext";

const Collection = () => {
  const { search, showSearch } = useShopContext();
  const { loading, products } = useGetProducts();
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  const toggleCategory = (event) => {
    if (category.includes(event.target.value)) {
      // if selected category is already in the category array - remove it
      setCategory((prev) =>
        prev.filter((product) => product !== event.target.value)
      );
    } else {
      // else add it to the category array
      setCategory((prev) => [...prev, event.target.value]);
    }
  };

  const toggleSubCategory = (event) => {
    if (subCategory.includes(event.target.value)) {
      setSubCategory((prev) =>
        prev.filter((product) => product !== event.target.value)
      );
    } else {
      setSubCategory((prev) => [...prev, event.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    /* SEARCH BAR FILTER FUNCTIONALITY */
    if (showSearch && search) {
      productsCopy = productsCopy.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    /* CATEGORY FILTER FUNCTIONALITY */
    if (category.length > 0) {
      // productsCopy = copy of all products: check if any of the categories selected from filter are included in the category of any of the products in the db
      productsCopy = productsCopy.filter((product) =>
        category.includes(product.category)
      );
    }

    /* SUBCATEGORY FILTER FUNCTIONALITY */
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((product) =>
        subCategory.includes(product.subCategory)
      );
    }
    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let filterProductsCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(filterProductsCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(filterProductsCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    // so products will be filtered based on category/subCategory/searchQuery (or all)
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);
  if (loading) return <div className="loading loading-spinner"></div>;
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* FILTER OPTIONS - toggle the visibility of the filters on small screens by clicking arrow icon */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl text-black flex items-center cursor-pointer gap-2"
        >
          FILTERS
          {/* ARROW ICON */}
          <img
            src={assets.dropdown_icon}
            alt="dropdown icon"
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>
        {/* CATEGORIES FILTER */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          }`}
        >
          <p className="mb-3 text-sm text-black font-medium"> CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Men"}
                onChange={toggleCategory}
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Women"}
                onChange={toggleCategory}
              />{" "}
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Kids"}
                onChange={toggleCategory}
              />{" "}
              Kids
            </p>
          </div>
        </div>
        {/* SUBCATEGORIES FILTER */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          }`}
        >
          <p className="mb-3 text-sm text-black font-medium"> TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />{" "}
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />{" "}
              Bottomwear
            </p>
            {/* <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"WinterWear"} /> WinterWear
            </p> */}
          </div>
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* PRODUCT SORTING */}
          <select
            onChange={(event) => setSortType(event.target.value)}
            className="border-2 border-gray-300 bg-white text-black text-sm px-2"
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* MAP PRODUCTS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((product) => (
            <div key={product._id}>
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
    </div>
  );
};

export default Collection;
