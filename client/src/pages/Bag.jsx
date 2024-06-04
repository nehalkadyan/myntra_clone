import React, { useState, useEffect } from "react";
import ItemBag from "../components/ItemBag";
import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { setTotalQuantity } from "../redux/products/productSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Bag = () => {
  // State variables for bag items and loading status
  const [bagItems, setBagItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  // Function to fetch bag items from Firestore
  const fetchBagItems = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const querySnapshot = await getDocs(
          collection(db, "users", user.uid, "bag")
        );
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBagItems(items);

        // Calculate total quantity of items in the bag
        const totalQuantity = items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        dispatch(setTotalQuantity(totalQuantity));
      } catch (error) {
        console.error("Error fetching bag items:", error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch bag items when component mounts
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchBagItems();
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Function to handle quantity change of an item in the bag
  const handleQuantityChange = (id, newQuantity) => {
    setBagItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    const updatedItems = bagItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    const totalQuantity = updatedItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    dispatch(setTotalQuantity(totalQuantity));
  };

  // Function to handle removal of an item from the bag
  const handleRemove = (id) => {
    const updatedItems = bagItems.filter((item) => item.id !== id);
    setBagItems(updatedItems);
    const totalQuantity = updatedItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    dispatch(setTotalQuantity(totalQuantity));
  };

  // Calculate total MRP, discount, and total amount
  const totalMRP = bagItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discount = totalMRP * 0.05;
  const totalAmount = totalMRP - discount + 4;

  // Loading state
  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="flex md:flex-row flex-col items-start md:w-[80%] p-6 mx-auto">
        <div className="text-center md:w-3/5 md:border-r-2 pr-2">
          {/* Display bag items or a message if bag is empty */}
          {bagItems.length === 0 ? (
            <p className="p-4 md:p-0 text-center text-gray-500">
              No items in the bag
            </p>
          ) : (
            bagItems.map((item) => (
              <ItemBag
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
              />
            ))
          )}
        </div>
        <div
          className={`${
            !bagItems.length > 0 ? "p-2 md:w-2/5" : "p-8 md:w-2/5"
          }`}
        >
          {bagItems.length > 0 && (
            <>
              {/* Display price details */}
              <p className="font-semibold mb-3">
                PRICE DETAILS <span>({bagItems.length} Items)</span>
              </p>
              <div className="flex tracking-wide text-sm text-gray-700 items-center justify-between">
                <p>Total MRP</p>
                <p>${totalMRP.toFixed(2)}</p>
              </div>

              <div className="flex my-2 tracking-wide text-sm text-gray-700 items-center justify-between">
                <p>Discount on MRP</p>
                <p>${discount.toFixed(2)}</p>
              </div>

              <div className="flex border-b pb-3 tracking-wide text-sm text-gray-700 items-center justify-between">
                <p>Shipping Fee</p>
                <p>$4.00</p>
              </div>

              <div className="pt-3 mb-5 flex tracking-wide font-bold text-gray-700 items-center justify-between">
                <p>Total Amount</p>
                <p>${totalAmount.toFixed(2)}</p>
              </div>
            </>
          )}
          {/* Continue shopping button */}
          <Link
            to="/products"
            className="text-center bg-pink-700 rounded-sm p-3 text-white font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Bag;
