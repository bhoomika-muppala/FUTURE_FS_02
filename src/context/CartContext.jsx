// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const s = localStorage.getItem("cart");
    return s ? JSON.parse(s) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product, quantity = 1) {
    setCart((prev) => {
      const found = prev.find((it) => it.id === product.id);
      if (found) {
        return prev.map((it) => (it.id === product.id ? { ...it, qty: it.qty + quantity } : it));
      }
      return [{ id: product.id, name: product.name, price: product.price, img: product.img, qty: quantity }, ...prev];
    });
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((it) => it.id !== id));
  }

  function updateQty(id, qty) {
    setCart((prev) => prev.map((it) => (it.id === id ? { ...it, qty } : it)));
  }

  function clearCart() {
    setCart([]);
  }

  const subtotal = cart.reduce((s, it) => s + it.qty * it.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
