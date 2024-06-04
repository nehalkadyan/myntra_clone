import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

const ItemBag = ({ item, onQuantityChange, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity); // State to track item quantity
  const [message, setMessage] = useState(null); // State to display messages

  const handleQuantityChange = async (operator) => {
    let newQuantity = quantity;

    // Increase or decrease quantity based on operator
    if (operator === "+" && quantity < 11) {
      newQuantity = quantity + 1;
    } else if (operator === "-" && quantity > 1) {
      newQuantity = quantity - 1;
      if (message) {
        setMessage(null);
      }
    } else if (quantity >= 11) {
      setMessage("No more items available");
    }

    // Update quantity in Firestore if it has changed
    if (newQuantity !== quantity) {
      setQuantity(newQuantity);
      const user = auth.currentUser;
      if (user) {
        try {
          const itemRef = doc(db, "users", user.uid, "bag", item.id);
          await updateDoc(itemRef, { quantity: newQuantity });
          console.log("Item quantity updated");
          onQuantityChange(item.id, newQuantity);
        } catch (error) {
          console.error("Error updating item quantity:", error.message);
        }
      }
    }
  };

  const handleRemove = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const itemRef = doc(db, "users", user.uid, "bag", item.id);
        await deleteDoc(itemRef);
        console.log("Item removed from bag");
        onRemove(item.id);
      } catch (error) {
        console.error("Error removing item from bag:", error.message);
      }
    }
  };

  // Function to limit the length of the description
  const limitDesc = (desc) => {
    const newDesc = desc.split("");

    if (newDesc.length > 24) {
      return newDesc.splice(0, 24).join("") + "...";
    }

    return desc;
  };

  return (
    <div className="flex flex-col md:flex-row relative gap-4 p-3 border-2">
      {/* Remove item button */}
      <div
        onClick={handleRemove}
        className="absolute top-4 right-4 text-xl cursor-pointer"
      >
        <RxCross1 />
      </div>
      <div className="flex-shrink-0">
        <img className="w-24 md:w-32" src={item.image} alt={item.title} />
      </div>
      <div className="flex flex-col gap-2 items-start p-2 w-full">
        <h1 className="font-semibold text-lg">{item.title}</h1>
        <p className="text-sm text-gray-500">{limitDesc(item.description)}</p>
        <div className="flex items-center gap-3">
          <p className="text-sm font-semibold">Quantity</p>
          <p
            className="cursor-pointer font-semibold text-2xl md:text-4xl"
            onClick={() => handleQuantityChange("-")}
          >
            -
          </p>
          <p className="text-lg">{quantity}</p>
          <p
            className="cursor-pointer font-semibold text-2xl md:text-4xl"
            onClick={() => handleQuantityChange("+")}
          >
            +
          </p>
        </div>
        {message && <p className="text-red-600 text-sm">{message}</p>}

        <p className="font-semibold text-lg">$ {item.price}</p>
      </div>
    </div>
  );
};

export default ItemBag;
