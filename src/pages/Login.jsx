// src/pages/Login.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handle(e) {
    e.preventDefault();
    login({ email });
    navigate("/");
  }

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <form onSubmit={handle} className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full border rounded px-3 py-2 mb-3" />
        <button className="bg-purple-600 text-white px-4 py-2 rounded">Login (simulate)</button>
      </form>
    </div>
  );
}
