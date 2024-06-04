import React from "react";

// Footer component for displaying the website's footer information
const Footer = () => {
  return (
    // Footer container with background color, flex alignment, height, and padding
    <footer className="bg-pink-700 flex items-center h-[40vh] text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            <h2 className="text-2xl font-bold">Myntra</h2>

            <p className="text-sm">© 2024 Your Company. All rights reserved.</p>
          </div>

          {/* Section for keeping in touch information */}
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            <h3 className="text-lg font-bold mb-2">KEEP IN TOUCH</h3>

            <p className="text-sm">
              100% ORIGINAL guarantee for all products at myntra.com
            </p>

            <p className="text-sm">
              Return within 14 days of receiving your order
            </p>
          </div>

          <div className="w-full sm:w-auto">
            {/* Unordered list for navigation links */}
            <ul className="flex flex-wrap space-x-4">
              <li>
                <p className="hover:underline">Contact</p>
              </li>

              <li>
                <p className="hover:underline">Privacy Policy</p>
              </li>

              <li>
                <p className="hover:underline">Terms of Service</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
