// src/context/ProductsContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import initialProducts from "../data";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem("products");
    return stored ? JSON.parse(stored) : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  function addProduct(product) {
    const newProduct = { ...product, id: Date.now().toString() };
    setProducts((p) => [newProduct, ...p]);
  }

  function editProduct(id, updates) {
    setProducts((p) => p.map((it) => (it.id === id ? { ...it, ...updates } : it)));
  }

  function deleteProduct(id) {
    setProducts((p) => p.filter((it) => it.id !== id));
  }

  return (
    <ProductsContext.Provider value={{ products, addProduct, editProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
