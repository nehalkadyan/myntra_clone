// importing components
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsListing from "./pages/ProductsListing";
import SeparateProduct from "./pages/SeparateProduct";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Bag from "./pages/Bag";
import Wishlist from "./pages/Wishlist";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PrivateRoute from "./components/PrivateRoute";
import AuthPrivateRoute from "./components/AuthPrivate";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        {/* routes for navigating */}
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsListing />} />
        <Route path="/product/:id" element={<SeparateProduct />} />
        <Route element={<AuthPrivateRoute />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/bag" element={<Bag />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
