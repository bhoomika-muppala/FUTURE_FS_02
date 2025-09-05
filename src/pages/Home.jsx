// src/pages/Home.jsx
import React, { useMemo, useState } from "react";
import Hero from "../components/Hero";
import FilterBar from "../components/FilterBar";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductsContext";
import { useLocation } from "react-router-dom";

function Home() {
  const { products } = useProducts();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get("q") || "";

  const [filters, setFilters] = useState({ q: initialQuery, category: "", sort: "" });

  const categories = useMemo(() => Array.from(new Set(products.map((p) => p.category))), [products]);

  const filtered = useMemo(() => {
    let list = products.slice();
    if (filters.q) {
      const q = filters.q.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.category || "").toLowerCase().includes(q)
      );
    }
    if (filters.category) list = list.filter((p) => p.category === filters.category);
    if (filters.sort === "price-asc") list = list.sort((a, b) => a.price - b.price);
    if (filters.sort === "price-desc") list = list.sort((a, b) => b.price - a.price);
    if (filters.sort === "rating-desc") list = list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, filters]);

  return (
    <>
      <Hero />
      <section id="products" className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">Products</h2>
          <div className="text-sm text-gray-500">Showing {filtered.length} results</div>
        </div>

        <FilterBar categories={categories} filters={filters} setFilters={setFilters} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}

// ✅ THIS LINE IS REQUIRED
export default Home;
