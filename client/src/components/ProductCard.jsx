import React, { useState } from "react";
import { Link } from "react-router-dom";

// ProductCard component definition
const ProductCard = ({ id, title, price, image, category, rating }) => {
  // State to manage the shadow effect on hover
  const [shadowActive, setShadowActive] = useState(false);

  // Function to truncate the product title if it is too long
  const truncateTitle = (title) => {
    const words = title.split("");
    if (words.length > 30) {
      return words.slice(0, 30).join("") + "...";
    }
    return title;
  };

  return (
    // Link to the product details page
    <Link to={`/product/${id}`}>
      <div className="w-48">
        <div
          onMouseEnter={() => setShadowActive(true)} // Activate shadow on mouse enter
          onMouseLeave={() => setShadowActive(false)} // Deactivate shadow on mouse leave
          className="relative"
        >
          {/* Product image */}
          <img
            className="w-full max-h-60 min-h-60 object-contain hover:opacity-90 hover:scale-95  transition-all duration-300"
            src={image}
            alt={title}
          />
          {/* Rating display */}
          <div className="absolute rounded-md opacity-85 bottom-6 left-6 bg-white p-1">
            <p className="text-sm tracking-wider font-semibold">
              {rating.rate}⭐ | {rating.count}
            </p>
          </div>
        </div>

        {/* Product details */}
        <div
          className={`${
            shadowActive
              ? "py-2 px-4 rounded-md shadow-md"
              : "py-2 px-4 rounded-md hover:shadow-md"
          }`}
        >
          {/* Truncated product title */}
          <h4 className="font-bold">{truncateTitle(title)}</h4>
          <p className="text-sm text-gray-500">{category}</p>
          <p className="text-sm font-semibold mt-1">${price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
