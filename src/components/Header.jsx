// src/components/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleReset() {
    const ok = window.confirm("Reset app data? This clears products, cart and orders and reloads the page.");
    if (!ok) return;
    // Clear only relevant keys so other settings (like dev tokens) are not removed accidentally
    localStorage.removeItem("products");
    localStorage.removeItem("cart");
    localStorage.removeItem("orders");
    window.location.reload();
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold text-xl text-purple-600">Bhoomika Store</Link>
          <nav className="hidden md:flex gap-4 text-gray-600">
            <Link to="/">Home</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/admin">Admin</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="search"
            placeholder="Search products..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/?q=${encodeURIComponent(e.currentTarget.value)}`);
              }
            }}
            className="hidden md:block border rounded-lg px-3 py-1 text-sm"
          />

          <Link to="/cart" className="relative">
            <span className="text-sm">Cart</span>
            <div className="absolute -top-2 -right-3 bg-purple-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {cart.length}
            </div>
          </Link>

          {/* Reset Data button (safe one-click reset) */}
          <button
            onClick={handleReset}
            className="hidden md:inline-block text-sm text-red-500 border px-2 py-1 rounded hover:bg-red-50"
            title="Reset products, cart & orders (dev only)"
          >
            Reset Data
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="text-sm">Hi, {user.name}</div>
              <button onClick={logout} className="text-sm text-red-500">Logout</button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="text-sm">Login</Link>
              <Link to="/register" className="text-sm text-purple-600 font-medium">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
