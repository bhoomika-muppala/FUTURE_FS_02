// src/components/Hero.jsx
export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-purple-700 to-purple-500 text-white rounded-b-3xl shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold">
            Welcome to <span className="text-yellow-300">Bhoomika Store</span>
          </h1>
          <p className="mt-4 text-purple-100 max-w-xl text-lg">
            Discover jewellery, fashion, and electronics handpicked for you. Shop with confidence and enjoy fast delivery.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="#products"
              className="bg-white text-purple-600 px-5 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Shop Now
            </a>
            <button className="border border-white/30 text-white px-5 py-3 rounded-lg font-medium hover:bg-white/10">
              Explore
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/3">
          <div className="bg-white/10 rounded-2xl p-6 flex items-center justify-center h-56">
            <div className="text-center">
              <div className="h-32 w-32 rounded-full bg-white/20 mx-auto mb-3 flex items-center justify-center text-5xl">
                💎
              </div>
              <div className="text-sm uppercase tracking-widest text-purple-200">
                Featured Collection
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
