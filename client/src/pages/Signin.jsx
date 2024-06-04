import React, { useState } from "react";
import poster from "../assets/login_photo.jpg";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { signInSuccessfull } from "../redux/user/userSlice";

const Signin = () => {
  // State variables for form data, loading state, and signup error
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState(null);

  // Redux dispatch and navigation hook
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle form data change
  const handleFormDataChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Function to handle email/password sign in
  const handleEmailPasswordSignIn = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSignupError(null);
    try {
      // Sign in with email/password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      console.log("Email/password signin successful:", user);
      // Dispatch signin success action
      dispatch(
        signInSuccessfull({ name: user.displayName, email: user.email })
      );
      setLoading(false);
      navigate("/");
    } catch (error) {
      setSignupError("Wrong credentials, Try again");
      setLoading(false);
      console.error("Error signing in with email/password:", error.message);
    }
  };

  // Function to handle Google sign in
  const handleGoogleSignin = async () => {
    try {
      // Sign in with Google
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google signin successful:", user);
      // Dispatch signin success action
      dispatch(
        signInSuccessfull({
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        })
      );
      navigate("/");
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  // Render signin form
  return (
    <div className="m-auto">
      <div className="flex flex-col items-center">
        <img
          className="sm:w-2/4 w-full h-52 object-cover lg:w-1/4 mx-auto"
          src={poster}
          alt="poster"
        />
        <div className="lg:w-1/4 sm:w-2/4 p-3 flex flex-col items-center">
          <h1 className="text-xl font-bold my-6">Sign in</h1>
          <form className="flex flex-col gap-6">
            {/* Input fields for email and password */}
            <input
              type="email"
              placeholder="enter email"
              name="email"
              className="border-2 rounded p-2 text-lg outline-none text-gray-700"
              onChange={handleFormDataChange}
            />
            <input
              type="password"
              placeholder="enter password"
              name="password"
              className="border-2 rounded p-2 text-lg outline-none text-gray-700"
              onChange={handleFormDataChange}
            />

            {/* Terms of use */}
            <p className="text-sm text-gray-500">
              By continuing, I agree to the{" "}
              <span className="text-pink-600 font-bold">Terms of Use</span> &{" "}
              <span className="text-pink-600 font-bold">Privacy Policy</span>
            </p>

            {/* Sign in button */}
            <button
              className="p-3 font-bold bg-pink-600 text-white"
              onClick={handleEmailPasswordSignIn}
            >
              {loading ? "Loading..." : "Continue"}
            </button>

            {/* Google sign in button */}
            <div
              className="flex cursor-pointer items-center justify-center gap-2"
              onClick={handleGoogleSignin}
            >
              <p className="font-semibold">Sign in with </p>
              <FaGoogle className="text-red-700" />
            </div>

            {/* Display signup error */}
            {signupError && (
              <p className=" p-2 text-sm text-red-600">{signupError}</p>
            )}

            {/* Link to signup page */}
            <p className="text-sm text-gray-500">
              Not a member yet ?{" "}
              <Link
                to="/signup"
                className="text-pink-600 font-semibold cursor-pointer"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
