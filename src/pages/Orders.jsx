// src/pages/Orders.jsx
import React from "react";

export default function Orders() {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");

  if (orders.length === 0) return <div className="max-w-7xl mx-auto px-6 py-20 text-center">You have no orders yet.</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">Your Orders</h2>
      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="bg-white p-4 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Order {o.id}</div>
                <div className="text-sm text-gray-500">{new Date(o.date).toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">₹{o.total}</div>
                <div className="text-sm text-gray-400">{o.status}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
