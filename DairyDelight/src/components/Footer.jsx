import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-cream-100 dark:bg-gray-900 py-8 border-t border-cream-200 dark:border-gray-800  py-16 px-4">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">DairyDelight</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Premium dairy products delivered fresh to your door.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/products"
                  className="text-gray-600 dark:text-gray-400 hover:text-dairy-600 dark:hover:text-dairy-400"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-600 dark:text-gray-400 hover:text-dairy-600 dark:hover:text-dairy-400"
                >
                  Milk
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-600 dark:text-gray-400 hover:text-dairy-600 dark:hover:text-dairy-400"
                >
                  Cheese
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-600 dark:text-gray-400 hover:text-dairy-600 dark:hover:text-dairy-400"
                >
                  Yogurt
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-dairy-600 dark:hover:text-dairy-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-dairy-600 dark:hover:text-dairy-400"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-dairy-600 dark:hover:text-dairy-400"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-dairy-600 dark:hover:text-dairy-400"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-600 dark:text-gray-400">
                support@dairydelight.com
              </li>
              <li className="text-gray-600 dark:text-gray-400">
                +1 (555) 123-4567
              </li>
              <li className="text-gray-600 dark:text-gray-400">
                123 Milk Way, Dairy Town
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-cream-200 dark:border-gray-800 text-center" style={{"marginTop": "50px", "paddingTop": "50px"}}>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} DairyDelight. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
