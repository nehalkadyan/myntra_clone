import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Importing actions from productSlice for managing product-related state
import {
  selectCategory,
  selectSortBy,
  selectClearAll,
  setSearchTerm,
} from "../redux/products/productSlice";

// Filters component responsible for rendering filter options and handling filter logic
const Filters = () => {
  // Extracting the currently selected category from the Redux store
  const { categorySelected } = useSelector((state) => state.products);

  // Initializing dispatch to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // Local state for managing the selected category
  const [selectedCategory, setSelectedCategory] = useState(categorySelected);

  // useEffect hook to update local state whenever the selected category in the Redux store changes
  useEffect(() => {
    setSelectedCategory(categorySelected);
  }, [categorySelected]);

  // Array of available categories for filtering products
  const categories = [
    "men's clothing",
    "women's clothing",
    "electronics",
    "jewelery",
  ];

  // Function to handle category change
  const handleCategoryChange = (category) => {
    // Updating local state with the selected category
    setSelectedCategory(category);
    // Dispatching actions to update the Redux store
    dispatch(selectSortBy("Recommended")); // Reset sort by to "Recommended"
    dispatch(selectCategory(category)); // Set the selected category
  };

  // Function to handle clearing all filters
  const handleClearAll = () => {
    // Dispatching actions to clear all filters and reset state in the Redux store
    dispatch(selectClearAll()); // Clear all selected filters
    dispatch(setSearchTerm("")); // Clear search term
    dispatch(selectSortBy("Recommended")); // Reset sort by to "Recommended"
  };

  return (
    <div className="p-2">
      {/* Header section with "FILTERS" title and "CLEAR ALL" button */}
      <div className="flex py-4 mb-2 flex-col lg:flex-row items-center justify-between">
        <h2 className="font-bold tracking-wide text-lg">FILTERS</h2>
        <h5
          onClick={handleClearAll}
          className="cursor-pointer text-red-600 font-semibold tracking-wide text-sm"
        >
          CLEAR ALL
        </h5>
      </div>

      {/* Category filter options */}
      <div className="flex justify-center">
        <div className="flex flex-col gap-2 border-2 p-2 rounded-lg shadow-sm sm:p-4">
          {/* Mapping through categories to render each category option */}
          {categories.map((category, index) => (
            <div key={index} className="flex gap-3">
              <input
                type="radio"
                id={category}
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => handleCategoryChange(category)}
              />
              <label
                htmlFor={category}
                className="font-semibold text-sm sm:text-md"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
