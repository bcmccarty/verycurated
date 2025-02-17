
import { useState } from "react";
import ProductGrid from "@/components/ProductGrid";

const categories = [
  "Most Popular",
  "Tech Gadgets",
  "Home & Living",
  "Fashion",
  "Unique Finds"
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("Most Popular");

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50" style={{ background: 'linear-gradient(180deg, #355E3B 0%, #2f5534 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <h1 className="text-2xl font-bold text-white">Curated Savings Hub</h1>
          <p className="mt-2 text-neutral-200">Discover amazing products at unbeatable prices</p>

          <nav className="mt-4">
            <ul className="flex space-x-6 overflow-x-auto pb-2 justify-center">
              {categories.map((category) => (
                <li key={category}>
                  <button 
                    className={`whitespace-nowrap transition-colors ${
                      selectedCategory === category 
                        ? "text-white font-semibold" 
                        : "text-neutral-200 hover:text-white"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
              <li>
                <a href="/blog" className="text-neutral-200 hover:text-white whitespace-nowrap transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProductGrid selectedCategory={selectedCategory} />
          </div>
        </section>
      </main>

      <footer className="sticky bottom-0 py-3" style={{ background: 'linear-gradient(180deg, #355E3B 0%, #2f5534 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6 text-sm">
            <a href="/privacy-policy" className="text-neutral-200 hover:text-white">Privacy Policy</a>
            <a href="/terms-of-service" className="text-neutral-200 hover:text-white">Terms of Service</a>
            <a href="/affiliate-disclosure" className="text-neutral-200 hover:text-white">Affiliate Disclosure</a>
            <a href="/contact" className="text-neutral-200 hover:text-white">Contact & Submit</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
