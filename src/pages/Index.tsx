
import ProductGrid from "@/components/ProductGrid";

const categories = [
  "Most Popular",
  "Tech Gadgets",
  "Home & Living",
  "Fashion",
  "Unique Finds"
];

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-neutral-800">Curated Savings Hub</h1>
          <p className="mt-2 text-neutral-500">Discover amazing products at unbeatable prices</p>
          <nav className="mt-4">
            <ul className="flex space-x-6 overflow-x-auto pb-2">
              {categories.map((category) => (
                <li key={category}>
                  <button className="text-neutral-600 hover:text-primary whitespace-nowrap transition-colors">
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-neutral-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">Latest Finds</h2>
            <ProductGrid />
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">From Our Blog</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <article key={i} className="rounded-[4px] overflow-hidden shadow-lg">
                  <img
                    src={`https://picsum.photos/seed/blog${i}/400/250`}
                    alt="Blog post"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">Amazing Products You Need to See</h3>
                    <p className="text-neutral-500">Discover our latest curated collection of unique and innovative products...</p>
                    <a href="#" className="text-primary hover:text-primary-dark mt-2 inline-block">Read More →</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="sticky bottom-0 bg-white border-t border-neutral-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6 text-sm text-neutral-500">
            <a href="#" className="hover:text-neutral-700">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-700">Terms of Service</a>
            <a href="#" className="hover:text-neutral-700">Affiliate Disclosure</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
