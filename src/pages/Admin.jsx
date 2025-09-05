// src/pages/Admin.jsx
import React, { useState } from "react";
import { useProducts } from "../context/ProductsContext";

export default function Admin() {
  const { products, addProduct, deleteProduct } = useProducts();
  const [form, setForm] = useState({ name: "", price: "", img: "", category: "", rating: 4.0, description: "" });

  function handleAdd(e) {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price) || 0 };
    addProduct(payload);
    setForm({ name: "", price: "", img: "", category: "", rating: 4.0, description: "" });
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-4">Admin Panel</h2>
      <form onSubmit={handleAdd} className="bg-white p-4 rounded-2xl shadow-sm mb-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        <input placeholder="Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="border rounded px-3 py-2" />
        <input placeholder="Price (number)" value={form.price} onChange={(e)=>setForm({...form,price:e.target.value})} className="border rounded px-3 py-2" />
        <input placeholder="Image URL (or /src/assets/...) " value={form.img} onChange={(e)=>setForm({...form,img:e.target.value})} className="border rounded px-3 py-2" />
        <input placeholder="Category" value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} className="border rounded px-3 py-2" />
        <input placeholder="Rating" value={form.rating} onChange={(e)=>setForm({...form,rating:Number(e.target.value)})} className="border rounded px-3 py-2" />
        <input placeholder="Short description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} className="border rounded px-3 py-2 md:col-span-2" />
        <button className="col-span-2 bg-purple-600 text-white px-4 py-2 rounded">Add product</button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p)=>(
          <div key={p.id} className="bg-white p-4 rounded-2xl shadow-sm">
            <div className="flex items-center gap-4">
              <img src={p.img} alt={p.name} className="w-20 h-20 object-contain" />
              <div className="flex-1">
                <div className="font-medium">{p.name}</div>
                <div className="text-sm text-gray-500">₹{p.price}</div>
              </div>
              <div>
                <button onClick={()=>deleteProduct(p.id)} className="text-red-500">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
