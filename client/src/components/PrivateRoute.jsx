import React from "react";
import { useSelector } from "react-redux"; // Importing useSelector hook from react-redux to access the Redux store
import { Outlet, Navigate } from "react-router-dom"; // Importing Outlet and Navigate components from react-router-dom

const PrivateRoute = () => {
  // Accessing the current user from the Redux store
  const { currentUser } = useSelector((state) => state.user);

  // If the user is logged in, render the child components, otherwise redirect to the signin page
  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
