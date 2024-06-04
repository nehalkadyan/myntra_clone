import React from "react";
import { RxCross1 } from "react-icons/rx";
import { doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { Link } from "react-router-dom";

// Component for displaying an item in the wishlist
const WishlistedItem = ({ item, onRemove }) => {
  console.log(item);

  // Function to handle removal of item from wishlist
  const handleRemove = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const itemRef = doc(db, "users", user.uid, "wishlist", item.id);
        await deleteDoc(itemRef);
        console.log("Item removed from wishlist");
        onRemove(item.id);
      } catch (error) {
        console.error("Error removing item from wishlist:", error.message);
      }
    }
  };

  // Function to limit description length
  const limitDesc = (desc) => {
    const newDesc = desc.split("");

    if (newDesc.length > 24) {
      return newDesc.splice(0, 24).join("") + "...";
    }

    return desc;
  };

  return (
    <div className="relative flex gap-4 p-4 border border-gray-300 rounded-lg shadow-md bg-white">
      {/* Button to remove item from wishlist */}
      <button
        onClick={handleRemove}
        className="absolute top-2 right-2 text-xl text-gray-600 hover:text-red-600"
      >
        <RxCross1 />
      </button>
      {/* Display item image */}
      <div className="flex-shrink-0">
        <img
          className="w-32 h-40 object-cover rounded-lg"
          src={item.image}
          alt={item.title}
        />
      </div>
      {/* Display item details with a link to its product page */}
      <Link
        to={`/product/${item.productId}`}
        className="flex flex-col justify-between"
      >
        <div>
          <h1 className="text-lg font-semibold">{item.title}</h1>
          <p className="text-sm text-gray-500">{limitDesc(item.description)}</p>
        </div>
        <p className="text-lg font-bold text-green-600">$ {item.price}</p>
      </Link>
    </div>
  );
};

export default WishlistedItem;
