import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Filters from "../components/Filters";
import Products from "../components/Products";

const ProductsListing = () => {
  // Get products and selected category from Redux store
  const { products, categorySelected } = useSelector((state) => state.products);

  // State to hold filtered products based on selected category
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Log filtered products for debugging
  console.log("filtered products", filteredProducts);

  // Effect to filter products based on selected category
  useEffect(() => {
    // Filter products based on selected category
    const filteredItems = products.filter(
      (product, idx) => product.category === categorySelected
    );

    // Log filtered items for debugging
    console.log("items", filteredItems);

    // Set filtered products in state
    setFilteredProducts(filteredItems);
  }, [categorySelected]); // Re-run effect when selected category changes

  // Render Filters and Products components
  return (
    <section className="min-h-screen">
      <div className="flex">
        <div className="w-1/3 md:w-1/5">
          <Filters /> {/* Render Filters component */}
        </div>
        <div className="w-2/3 md:w-4/5">
          <Products /> {/* Render Products component */}
        </div>
      </div>
    </section>
  );
};

export default ProductsListing;
