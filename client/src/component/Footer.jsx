import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-50 mt-20 px-6 md:px-16 lg:px-24 xl:px-32">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-14 border-b border-gray-200">
        {/* Logo */}
        <div>
          <img src={assets.logo} alt="CarRental Logo" className="w-40" />

          <p className="mt-5 text-gray-500 leading-7 text-sm">
            Discover premium cars at affordable prices. Whether you're planning
            a business trip, family vacation, or weekend getaway, we've got the
            perfect ride for every journey.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            {/* Twitter */}
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.167 2.5a9.1 9.1 0 0 1-2.617 1.275 3.733 3.733 0 0 0-6.55 2.5v.833a8.88 8.88 0 0 1-7.5-3.775s-3.333 7.5 4.167 10.833a9.7 9.7 0 0 1-5.834 1.667C8.333 20 17.5 15.833 17.5 6.25q0-.35-.067-.692A6.43 6.43 0 0 0 19.167 2.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 15.833c-4.167 1.25-4.167-2.084-5.833-2.5m11.666 5v-3.225a2.8 2.8 0 0 0-.783-2.175c2.616-.292 5.366-1.283 5.366-5.833a4.53 4.53 0 0 0-1.25-3.125 4.22 4.22 0 0 0-.075-3.142s-.983-.292-3.258 1.233a11.15 11.15 0 0 0-5.833 0C5.225.541 4.242.833 4.242.833a4.22 4.22 0 0 0-.075 3.142 4.53 4.53 0 0 0-1.25 3.15c0 4.516 2.75 5.508 5.366 5.833a2.8 2.8 0 0 0-.783 2.15v3.225"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.333 6.667a5 5 0 0 1 5 5V17.5H15v-5.833a1.667 1.667 0 0 0-3.334 0V17.5H8.333v-5.833a5 5 0 0 1 5-5M5 7.5H1.667v10H5zM3.333 5a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h2 className="text-lg font-semibold mb-5 text-gray-900">
            Company
          </h2>

          <ul className="space-y-3 text-gray-500">
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Our Cars
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Careers
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h2 className="text-lg font-semibold mb-5 text-gray-900">
            Resources
          </h2>

          <ul className="space-y-3 text-gray-500">
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Contact Support
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-lg font-semibold mb-5 text-gray-900">
            Newsletter
          </h2>

          <p className="text-gray-500 text-sm leading-6 mb-5">
            Subscribe to receive exclusive offers, travel tips, and the latest
            updates directly in your inbox.
          </p>

          
         
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center py-6 text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-gray-700">CarRental</span>. All
          Rights Reserved.
        </p>

        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-primary transition-colors">
            Privacy Policy
          </a>

          <a href="#" className="hover:text-primary transition-colors">
            Terms & Conditions
          </a>

          <a href="#" className="hover:text-primary transition-colors">
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;