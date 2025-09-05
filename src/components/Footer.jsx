// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="text-lg font-semibold text-gray-800">Bhoomika Store</div>
          <div className="text-sm text-gray-500 mt-2">Quality jewellery, fashion & electronics — delivered fast.</div>
        </div>

        <div className="flex gap-10">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Company</h4>
            <ul className="text-sm text-gray-500 space-y-1">
              <li><Link to="/about" className="hover:underline">About</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
              <li><Link to="/policies" className="hover:underline">Policies</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Help</h4>
            <ul className="text-sm text-gray-500 space-y-1">
              <li><Link to="/orders" className="hover:underline">Orders</Link></li>
              <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border-t py-4">
        <div className="max-w-7xl mx-auto px-6 text-sm text-gray-500 flex justify-between">
          <div>© {year} Bhoomika Store. All rights reserved.</div>
          <div>Made with ❤️</div>
        </div>
      </div>
    </footer>
  );
}
