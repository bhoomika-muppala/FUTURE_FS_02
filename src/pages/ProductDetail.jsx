// src/pages/ProductDetail.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";

const formatCurrency = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n);

export default function ProductDetail() {
  const { id } = useParams();
  const { products } = useProducts();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  if (!product) return <div className="max-w-7xl mx-auto px-6 py-20">Product not found.</div>;

  function handleAdd() {
    addToCart(product, Number(qty));
    navigate("/cart");
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <img src={product.img} alt={product.name} className="w-full object-contain h-96" />
        </div>

        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.category} • {product.rating} ★</p>
          <div className="mt-4 text-2xl font-bold">{formatCurrency(product.price)}</div>
          <p className="mt-4 text-gray-700">{product.description}</p>

          <div className="mt-6 flex items-center gap-3">
            <input type="number" min="1" value={qty} onChange={(e)=>setQty(e.target.value)} className="w-20 border rounded px-2 py-1"/>
            <button onClick={handleAdd} className="bg-purple-600 text-white px-4 py-2 rounded">Add to cart</button>
            <button onClick={()=>navigate("/checkout")} className="px-4 py-2 border rounded">Buy now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
