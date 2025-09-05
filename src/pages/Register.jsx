// src/pages/Register.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  function handle(e) {
    e.preventDefault();
    register(form);
    navigate("/");
  }

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <form onSubmit={handle} className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Register</h2>
        <input value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} placeholder="Name" className="w-full border rounded px-3 py-2 mb-3" />
        <input value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} placeholder="Email" className="w-full border rounded px-3 py-2 mb-3" />
        <input type="password" value={form.password} onChange={(e)=>setForm({...form, password:e.target.value})} placeholder="Password" className="w-full border rounded px-3 py-2 mb-3" />
        <button className="bg-purple-600 text-white px-4 py-2 rounded">Create account</button>
      </form>
    </div>
  );
}

