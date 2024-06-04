import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import ShopByCategory from "../components/ShopByCategory";
import { fetchProducts } from "../redux/products/productSlice";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();

  // Fetch products from the API when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products", {
          method: "GET",
        });
        const data = await response.json();
        console.log(data);
        dispatch(fetchProducts(data)); // Dispatch action to store fetched products
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, []); // Empty dependency array ensures this effect runs only once, on mount

  // Render HeroSection and ShopByCategory components
  return (
    <div>
      <HeroSection />
      <ShopByCategory />
    </div>
  );
};

export default HomePage;
