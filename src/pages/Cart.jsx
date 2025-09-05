// src/pages/Cart.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const formatCurrency = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n);

export default function Cart() {
  const { cart, updateQty, removeFromCart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (!cart || cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <p className="text-gray-500 mt-2">Add items to your cart to see them here.</p>
        <Link to="/" className="mt-6 inline-block bg-purple-600 text-white px-4 py-2 rounded">Shop now</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Cart items</h2>
          <div className="space-y-4">
            {cart.map((it) => (
              <div key={it.id} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm">
                <img src={it.img} alt={it.name} className="w-28 h-28 object-contain rounded-lg bg-gray-50 p-2" />
                <div className="flex-1">
                  <div className="font-medium">{it.name}</div>
                  <div className="text-sm text-gray-500">{it.category}</div>
                  <div className="mt-2 text-purple-700 font-semibold">{formatCurrency(it.price)}</div>
                  <div className="mt-3 flex items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      value={it.qty}
                      onChange={(e) => updateQty(it.id, Math.max(1, Number(e.target.value) || 1))}
                      className="w-20 border rounded px-2 py-1"
                    />
                    <button onClick={() => removeFromCart(it.id)} className="text-sm text-red-500">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="font-semibold text-lg">Order summary</div>
          <div className="mt-3 flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-semibold">{formatCurrency(subtotal)}</span>
          </div>

          <div className="mt-6 space-y-2">
            <button onClick={() => navigate("/checkout")} className="w-full bg-purple-600 text-white py-3 rounded-lg">Proceed to Checkout</button>
            <button onClick={() => { clearCart(); }} className="w-full border py-3 rounded-lg text-sm text-red-500">Clear cart</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
