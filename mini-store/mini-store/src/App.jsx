import { useMemo, useState } from "react";

const DATA = [
  { id: 1, title: "Aurora Necklace", price: 1499, img: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=600", cat: "jewellery" },
  { id: 2, title: "Gold Hoop Earrings", price: 899,  img: "https://images.pexels.com/photos/1191532/pexels-photo-1191532.jpeg?auto=compress&cs=tinysrgb&w=600", cat: "jewellery" },
  { id: 3, title: "Denim Jacket",      price: 2999, img: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600", cat: "fashion" },
  { id: 4, title: "Canvas Sneakers",    price: 1799, img: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600", cat: "fashion" },
  { id: 5, title: "Bluetooth Earbuds",  price: 3499, img: "https://images.pexels.com/photos/373945/pexels-photo-373945.jpeg?auto=compress&cs=tinysrgb&w=600", cat: "electronics" },
  { id: 6, title: "Smartwatch Fit",     price: 4999, img: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=600", cat: "electronics" },
];

const rs = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n);

export default function App() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const [cart, setCart] = useState([]);

  const categories = useMemo(() => ["all", ...new Set(DATA.map(p => p.cat))], []);

  const list = useMemo(() => {
    let arr = [...DATA];
    if (cat !== "all") arr = arr.filter(p => p.cat === cat);
    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter(p => p.title.toLowerCase().includes(q));
    }
    return arr;
  }, [query, cat]);

  const add = (p) => setCart(prev => {
    const e = prev.find(i => i.id === p.id);
    return e ? prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i)
             : [...prev, { id: p.id, title: p.title, price: p.price, img: p.img, qty: 1 }];
  });

  const dec = (id) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i));
  const inc = (id) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i));
  const remove = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const clear = () => setCart([]);

  const subtotal = cart.reduce((a, i) => a + i.price * i.qty, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3 justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gray-900 text-white font-bold">MS</span>
            <div className="text-sm">
              <div className="font-semibold">Mini Store</div>
              <div className="text-gray-500">React + Tailwind</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 w-full max-w-md">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full rounded-xl border px-3 py-2"
            />
          </div>

          <div className="text-sm">
            <span className="font-medium">Cart:</span> {cart.reduce((a,i)=>a+i.qty,0)} · <span className="font-semibold">{rs(subtotal)}</span>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-4 py-4 grid gap-3 md:grid-cols-3">
        <select value={cat} onChange={(e)=>setCat(e.target.value)} className="rounded-xl border px-3 py-2">
          {categories.map(c => <option className="capitalize" key={c} value={c}>{c}</option>)}
        </select>
        <div className="md:col-span-2 md:hidden">
          <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search products…" className="w-full rounded-xl border px-3 py-2"/>
        </div>
      </div>

      {/* Product Grid */}
      <main className="max-w-6xl mx-auto px-4 pb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map(p => (
          <div key={p.id} className="rounded-2xl border bg-white overflow-hidden shadow-sm">
            <img src={p.img} alt={p.title} className="h-48 w-full object-cover"/>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold leading-snug">{p.title}</h3>
                <span className="font-bold">{rs(p.price)}</span>
              </div>
              <div className="mt-3">
                <button onClick={()=>add(p)} className="w-full rounded-xl bg-gray-900 text-white px-3 py-2">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Cart */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="rounded-2xl bg-white border p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">No items yet.</p>
          ) : (
            <div className="space-y-3">
              {cart.map(i => (
                <div key={i.id} className="flex items-center gap-3 border rounded-xl p-3">
                  <img src={i.img} alt={i.title} className="size-14 rounded-md object-cover"/>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{i.title}</p>
                    <p className="text-sm text-gray-600">{rs(i.price)}</p>
                    <div className="mt-1 inline-flex items-center gap-2">
                      <button onClick={()=>dec(i.id)} className="rounded-lg border px-2">-</button>
                      <span className="w-6 text-center">{i.qty}</span>
                      <button onClick={()=>inc(i.id)} className="rounded-lg border px-2">+</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{rs(i.qty * i.price)}</div>
                    <button onClick={()=>remove(i.id)} className="text-red-600 text-sm">Remove</button>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between pt-3 border-t">
                <div className="text-gray-600">Subtotal</div>
                <div className="text-lg font-semibold">{rs(subtotal)}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button onClick={clear} className="rounded-xl border px-3 py-2">Clear</button>
                <button className="rounded-xl bg-emerald-600 text-white px-3 py-2">Proceed to Checkout</button>
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="text-center text-sm text-gray-500 py-6">© {new Date().getFullYear()} Mini Store</footer>
    </div>
  );
}
