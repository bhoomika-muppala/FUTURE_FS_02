// src/components/FilterBar.jsx
import React from "react";

export default function FilterBar({ categories, filters, setFilters }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
      <input
        type="search"
        placeholder="Search..."
        value={filters.q}
        onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
        className="border rounded-lg px-3 py-2 flex-1"
      />

      <select
        value={filters.category}
        onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
        className="border rounded-lg px-3 py-2"
      >
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        value={filters.sort}
        onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value }))}
        className="border rounded-lg px-3 py-2"
      >
        <option value="">Sort</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
        <option value="rating-desc">Rating</option>
      </select>
    </div>
  );
}
