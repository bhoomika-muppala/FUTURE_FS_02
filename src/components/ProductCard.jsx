// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const formatCurrency = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n);

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 flex flex-col">
      {/* Product Image */}
      <div className="h-56 rounded-lg bg-gray-50 overflow-hidden flex items-center justify-center group">
        <img
          src={product.img}
          alt={product.name}
          className="object-contain h-full transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 mt-4">
        <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div className="font-semibold text-purple-700">{formatCurrency(product.price)}</div>
        <div className="text-xs text-yellow-500">⭐ {product.rating}</div>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => addToCart(product, 1)}
          className="flex-1 bg-purple-600 text-white py-2 rounded-lg text-sm hover:bg-purple-700 transition"
        >
          Add to cart
        </button>
        <Link
          to={`/product/${product.id}`}
          className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100 transition"
        >
          View
        </Link>
      </div>
    </article>
  );
}
