import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Component to scroll to the top of the page on route change
const ScrollToTop = () => {
  const { pathname } = useLocation(); // Get the current pathname

  useEffect(() => {
    // Scroll to the top of the page when the pathname changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // No UI, so return null
};

export default ScrollToTop;
