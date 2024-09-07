import React, { useEffect, useState } from "react";
import { useShopContext } from "../../context/ShopContext";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useShopContext();
  const [onCollectionPage, setOnCollectionPage] = useState(false);
  const location = useLocation();

  // useEffect to make sure search bar only shows on collection page
  useEffect(() => {
    if (location.pathname.includes("collection") /* && showSearch === true */) {
      setOnCollectionPage(true);
    } else {
      setOnCollectionPage(false);
    }
  }, [location]);
  return showSearch && onCollectionPage ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
        />
        {/* SEARCH ICON */}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
      {/* CLOSE "X" ICON */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        onClick={() => setShowSearch(false)}
        className="size-6 inline w-6 cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </div>
  ) : null;
};

export default SearchBar;
