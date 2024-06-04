import React, { useState } from "react";
import logo from "../assets/myntra_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi2";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoBagOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "../redux/products/productSlice";
import { logoutSuccessful } from "../redux/user/userSlice";

const Navbar = () => {
  // State to manage the open/close status of the menu and profile bar
  const [isOpen, setIsOpen] = useState(false);
  const [profileBarOpen, setProfileBarOpen] = useState(false);

  // Get current user and total quantity from Redux store
  const { currentUser } = useSelector((state) => state.user);
  const { totalQuantity } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Navigate to the products page with the selected category
  const navigateToProducts = (category) => {
    dispatch(selectCategory(category));
    navigate("/products");
  };

  // Handle user logout
  const handleLogout = () => {
    dispatch(logoutSuccessful());
  };

  return (
    <nav>
      <div className="hidden sm:flex items-center justify-around shadow-md">
        <Link to="/">
          <img className="h-16 w-16" src={logo} alt="logo" />
        </Link>
        <ul className="flex items-center lg:gap-12 gap-8 text-sm font-bold tracking-wide">
          <Link
            onClick={() => navigateToProducts("men's clothing")}
            to="/products"
          >
            <li className="hover:text-gray-600">MEN</li>
          </Link>
          <Link
            onClick={() => navigateToProducts("women's clothing")}
            to="/products"
          >
            <li className="hover:text-gray-600">WOMEN</li>
          </Link>
          <Link
            onClick={() => navigateToProducts("electronics")}
            to="/products"
          >
            <li className="hover:text-gray-600">HOME & LIVING</li>
          </Link>
          <Link onClick={() => navigateToProducts("jewelery")} to="/products">
            <li className="hover:text-gray-600">BEAUTY</li>
          </Link>
        </ul>

        <ul className="flex gap-8 text-sm">
          <li
            onMouseEnter={() => setProfileBarOpen(true)}
            onMouseLeave={() => setProfileBarOpen(false)}
            className="relative transition-all duration-500"
          >
            <div className="flex flex-col items-center">
              <HiOutlineUser className="text-lg" />
              <h3 className="font-semibold">Profile</h3>
              {profileBarOpen && (
                <div className="absolute transition-all duration-500 shadow-md top-10 z-10 w-72 bg-white p-3">
                  <div className="border-b pb-4">
                    {currentUser ? (
                      <>
                        <h3 className="font-semibold">Hello Myntra User</h3>
                        <p className="text-sm mt-1">{currentUser.email}</p>
                        <button
                          onClick={handleLogout}
                          className="p-1 font-semibold"
                        >
                          Log out
                        </button>
                      </>
                    ) : (
                      <>
                        <h3 className="font-semibold">Welcome</h3>
                        <p className="text-sm mt-1 mb-4">
                          To access account and manage orders
                        </p>
                        <Link
                          to="/signin"
                          className="border hover:border-pink-700 p-2 w-2/3 text-center cursor-pointer text-pink-700 font-semibold"
                        >
                          LOGIN / SIGNUP
                        </Link>
                      </>
                    )}
                  </div>

                  <Link
                    to="/bag"
                    className="hover:font-bold mt-2 cursor-pointer text-sm text-gray-700"
                  >
                    Cart
                  </Link>

                  <div>
                    <Link
                      to="/wishlist"
                      className="hover:font-bold mt-1 cursor-pointer text-sm text-gray-700"
                    >
                      Wishlist
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </li>
          <Link to="/wishlist">
            <li className="flex flex-col items-center">
              <IoIosHeartEmpty className="text-lg" />
              <h3 className="font-semibold">Wishlist</h3>
            </li>
          </Link>
          <div className="relative px-2">
            {totalQuantity > 0 && (
              <p className="text-xs bottom-8 px-1 bg-pink-700 text-white rounded-full absolute right-0 z-10">
                {totalQuantity}
              </p>
            )}
            <Link className="relative" to="/bag">
              <li className="flex flex-col items-center">
                <IoBagOutline className="text-lg" />
                <h3 className="font-semibold">Bag</h3>
              </li>
            </Link>
          </div>
        </ul>
      </div>

      <div className="sm:hidden">
        <div className="flex items-center justify-between py-1 px-6">
          <Link to="/">
            <img className="h-16 w-16" src={logo} alt="logo" />
          </Link>

          <ul className="flex gap-8 text-sm justify-center">
            <li
              onMouseEnter={() => setProfileBarOpen(true)}
              onMouseLeave={() => setProfileBarOpen(false)}
              className="relative transition-all duration-500"
            >
              <div className="flex flex-col items-center">
                <HiOutlineUser className="text-lg" />
                <h3 className="font-semibold">Profile</h3>
                {profileBarOpen && (
                  <div className="absolute transition-all duration-500 shadow-md top-10 z-10 w-72 bg-white p-3">
                    <div className="border-b pb-4">
                      {currentUser ? (
                        <>
                          <h3 className="font-semibold">Hello Myntra User</h3>
                          <p className="text-sm mt-1">{currentUser.email}</p>
                          <button
                            onClick={handleLogout}
                            className="p-1 font-semibold"
                          >
                            Log out
                          </button>
                        </>
                      ) : (
                        <>
                          <h3 className="font-semibold">Welcome</h3>
                          <p className="text-sm mt-1 mb-4">
                            To access account and manage orders
                          </p>
                          <Link
                            to="/signin"
                            className="border hover:border-pink-700 p-2 w-2/3 text-center cursor-pointer text-pink-700 font-semibold"
                          >
                            LOGIN / SIGNUP
                          </Link>
                        </>
                      )}
                    </div>

                    <Link
                      to="/bag"
                      className="hover:font-bold mt-2 cursor-pointer text-sm text-gray-700"
                    >
                      Cart
                    </Link>

                    <div>
                      <Link
                        to="/wishlist"
                        className="hover:font-bold mt-1 cursor-pointer text-sm text-gray-700"
                      >
                        Wishlist
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </li>
            <Link to="/wishlist">
              <li className="flex flex-col items-center">
                <IoIosHeartEmpty className="text-lg" />
                <h3 className="font-semibold">Wishlist</h3>
              </li>
            </Link>
            <div className="relative px-2">
              {totalQuantity > 0 && (
                <p className="text-xs bottom-8 px-1 bg-pink-700 text-white rounded-full absolute right-0 z-10">
                  {totalQuantity}
                </p>
              )}
              <Link className="relative" to="/bag">
                <li className="flex flex-col items-center">
                  <IoBagOutline className="text-lg" />
                  <h3 className="font-semibold">Bag</h3>
                </li>
              </Link>
            </div>
          </ul>

          <div
            onClick={toggleMenu}
            className="text-3xl transition-all duration-300"
          >
            {isOpen ? <IoMdClose /> : <RxHamburgerMenu />}
          </div>
        </div>

        <div
          className={`md:hidden ${
            isOpen ? "block" : "hidden"
          } text-center transition-all duration-300`}
        >
          <div className="shadow-b py-6 shadow-sm bg-pink-50 flex flex-col justify-center gap-4 text-sm font-bold text-black tracking-wide">
            <Link
              onClick={() => {
                navigateToProducts("men's clothing");
                toggleMenu();
              }}
              to="/products"
            >
              MEN
            </Link>
            <Link
              onClick={() => {
                navigateToProducts("women's clothing");
                toggleMenu();
              }}
              to="/products"
            >
              WOMEN
            </Link>
            <Link
              onClick={() => {
                navigateToProducts("electronics");
                toggleMenu();
              }}
              to="/products"
            >
              HOME & LIVING
            </Link>
            <Link
              onClick={() => {
                navigateToProducts("jewelery");
                toggleMenu();
              }}
              to="/products"
            >
              BEAUTY
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
