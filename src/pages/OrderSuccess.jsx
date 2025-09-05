// src/pages/OrderSuccess.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";

export default function OrderSuccess() {
  const { id } = useParams();
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  const order = orders.find((o) => o.id === id);

  if (!order) return <div className="max-w-7xl mx-auto px-6 py-20">Order not found.</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-center">
      <h2 className="text-2xl font-semibold mb-4">Thank you — order placed!</h2>
      <p className="mb-4">Order ID: <strong>{order.id}</strong></p>
      <p className="mb-6">Total: ₹{order.total}</p>
      <Link to="/orders" className="bg-purple-600 text-white px-4 py-2 rounded">View orders</Link>
    </div>
  );
}
