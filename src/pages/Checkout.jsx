// src/pages/Checkout.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const formatCurrency = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n);

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", pincode: "", payment: "cod" });
  const [loading, setLoading] = useState(false);

  if (!cart || cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <Link to="/" className="mt-4 inline-block bg-purple-600 text-white px-4 py-2 rounded">Shop now</Link>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.address) return alert("Please fill required fields.");
    setLoading(true);

    // Simulate a short delay for processing
    await new Promise((r) => setTimeout(r, 700));

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const id = Date.now().toString();
    const order = {
      id,
      items: cart,
      total: subtotal,
      shipping: { ...form },
      date: new Date().toISOString(),
      status: "Processing",
    };

    localStorage.setItem("orders", JSON.stringify([order, ...orders]));
    clearCart();
    setLoading(false);
    navigate(`/order-success/${id}`);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-2xl font-semibold">Shipping information</h2>

          <div>
            <label className="block text-sm">Full name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm">Email</label>
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm">Address</label>
            <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full border rounded px-3 py-2" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="border rounded px-3 py-2" />
            <input placeholder="Pincode" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} className="border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm mb-2">Payment</label>
            <select value={form.payment} onChange={(e) => setForm({ ...form, payment: e.target.value })} className="border rounded px-3 py-2 w-full">
              <option value="cod">Cash on delivery (simulate)</option>
              <option value="card">Card (simulate)</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Total</div>
              <div className="text-2xl font-bold">{formatCurrency(subtotal)}</div>
            </div>

            <button type="submit" disabled={loading} className="bg-purple-600 text-white px-6 py-3 rounded-lg">
              {loading ? "Processing..." : "Place order"}
            </button>
          </div>
        </form>

        <aside className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="font-semibold mb-3">Order summary</h3>
          <div className="space-y-3">
            {cart.map((it) => (
              <div key={it.id} className="flex items-center gap-3">
                <img src={it.img} alt={it.name} className="w-16 h-16 object-contain rounded" />
                <div className="flex-1">
                  <div className="font-medium">{it.name}</div>
                  <div className="text-sm text-gray-500">{it.qty} × {formatCurrency(it.price)}</div>
                </div>
                <div className="font-medium">{formatCurrency(it.qty * it.price)}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between"><span>Subtotal</span><span className="font-semibold">{formatCurrency(subtotal)}</span></div>
            <div className="mt-4">
              <Link to="/cart" className="w-full block text-center border py-2 rounded mb-3">Edit cart</Link>
              <button onClick={handleSubmit} className="w-full bg-purple-600 text-white py-2 rounded">Place order</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
