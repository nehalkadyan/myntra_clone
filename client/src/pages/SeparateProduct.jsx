import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoBagOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

const SeparateProduct = () => {
  // Get product ID from URL params
  const { id } = useParams();
  // Get products and current user from Redux store
  const { products } = useSelector((state) => state.products);
  const { currentUser } = useSelector((state) => state.user);
  // State variables for managing actions and loading states

  const [actionValidation, setActionValidation] = useState(null);
  console.log(currentUser);

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToBag, setIsAddedToBag] = useState(false);
  const [loadingBag, setLoadingBag] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  // Parse product ID from URL params

  const productId = parseInt(id);
  // Find the product with the matching ID

  const item = products.find((product) => product.id === productId);
  console.log(item);

  // Effect to check if the product is wishlisted or added to bag

  useEffect(() => {
    const fetchWishlist = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(
          collection(db, "users", user.uid, "wishlist"),
          where("productId", "==", item.id)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setIsWishlisted(true);
        }
      }
    };

    const fetchBag = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(
          collection(db, "users", user.uid, "bag"),
          where("productId", "==", item.id)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setIsAddedToBag(true);
        }
      }
    };

    fetchWishlist();
    fetchBag();
  }, [item.id]);

  // Function to handle adding the product to bag

  const handleAddToBag = async () => {
    if (!currentUser) {
      setActionValidation("You must be logged in to perform this action");
      return;
    }
    const user = auth.currentUser;
    console.log("Current user:", user);
    if (user) {
      setLoadingBag(true);
      try {
        // Add the product to bag collection in Firestore

        await addDoc(collection(db, "users", user.uid, "bag"), {
          productId: item.id,
          title: item.title,
          description: item.description,
          price: item.price,
          image: item.image,
          quantity: 1,
          addedAt: new Date(),
        });
        console.log("Item added to bag");
        setIsAddedToBag(true);
      } catch (error) {
        console.error("Error adding item to bag:", error.message);
      } finally {
        setLoadingBag(false);
        setActionValidation(null);
      }
    } else {
      console.log("User is not signed in");
    }
  };
  // Function to handle adding/removing the product to/from wishlist

  const handleAddToWishlist = async () => {
    if (!currentUser) {
      setActionValidation("You must be logged in to perform this action");
      return;
    }
    const user = auth.currentUser;
    console.log("Current user:", user);
    if (user) {
      setLoadingWishlist(true);
      try {
        // Check if the product is wishlisted and add/remove accordingly

        if (isWishlisted) {
          // Get the document ID for the item in the wishlist collection
          const q = query(
            collection(db, "users", user.uid, "wishlist"),
            where("productId", "==", item.id)
          );
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const wishlistDocId = querySnapshot.docs[0].id;
            await deleteDoc(
              doc(db, "users", user.uid, "wishlist", wishlistDocId)
            );
            setIsWishlisted(false);
            console.log("Item removed from wishlist");
          }
        } else {
          await addDoc(collection(db, "users", user.uid, "wishlist"), {
            productId: item.id,
            title: item.title,
            description: item.description,
            price: item.price,
            image: item.image,
            addedAt: new Date(),
          });
          console.log("Item added to wishlist");
          setIsWishlisted(true);
        }
      } catch (error) {
        console.error("Error updating wishlist:", error.message);
      } finally {
        setLoadingWishlist(false);
        setActionValidation(null);
      }
    } else {
      console.log("User is not signed in");
    }
  };

  // Render product details and action buttons

  return (
    <div>
      <div className="flex md:flex-row flex-col min-h-screen justify-around items-center p-2">
        <div className="md:w-1/2 p-4 md:p-0 flex justify-center">
          <img className="w-96" src={item.image} alt={item.title} />
        </div>

        <div className="md:w-1/2 p-4 md:p-0 md:pr-8">
          <h1 className="text-2xl font-bold tracking-wider">{item.title}</h1>
          <p className="text-xl mt-4 text-gray-500">{item.description}</p>
          <p className="mt-4 text-xl font-bold">${item.price}</p>
          <p className="text-green-700 mt-1 font-bold">
            inclusive of all taxes
          </p>

          <div className="flex gap-4 w-full mt-7">
            <button
              onClick={handleAddToBag}
              disabled={isAddedToBag || loadingBag}
              className={`flex w-3/5 justify-center p-3 gap-2 items-center ${
                isAddedToBag
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-pink-600 hover:opacity-90 cursor-pointer"
              }`}
            >
              <IoBagOutline className="text-xl text-white font-bold" />
              <span className="text-white font-bold">
                {loadingBag
                  ? "Loading..."
                  : isAddedToBag
                  ? "Added to Bag"
                  : "Add to Bag"}
              </span>
            </button>
            <button
              onClick={handleAddToWishlist}
              disabled={loadingWishlist}
              className="flex w-2/5 border-2 border-gray-500 hover:border-black hover:opacity-90 cursor-pointer justify-center p-3 gap-2 items-center"
            >
              <IoMdHeartEmpty
                className={`${
                  isWishlisted ? "text-pink-700" : ""
                } text-xl font-bold`}
              />
              <span className="font-bold">
                {loadingWishlist
                  ? "Loading..."
                  : isWishlisted
                  ? "Wishlisted"
                  : "Wishlist"}
              </span>
            </button>
          </div>

          {actionValidation && (
            <p className="text-red-600 p-2 text-sm">
              {actionValidation}
              <Link className="text-blue-600 ml-2 underline" to="/signin">
                Sign in
              </Link>
            </p>
          )}

          <div className="mt-4 text-gray-500">
            <p>100% Original Products</p>
            <p>Pay on delivery might be available</p>
            <p>Easy 14 days returns and exchanges</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeparateProduct;
