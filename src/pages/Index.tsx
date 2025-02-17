
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
      <header className="sticky top-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <h1 className="text-2xl font-bold text-neutral-800">Curated Savings Hub</h1>
          <p className="mt-2 text-neutral-500">Discover amazing products at unbeatable prices</p>

          <nav className="mt-4">
            <ul className="flex space-x-6 overflow-x-auto pb-2 justify-center">
              {categories.map((category) => (
                <li key={category}>
                  <button 
                    className={`whitespace-nowrap transition-colors ${
                      selectedCategory === category 
                        ? "text-black font-semibold" 
                        : "text-neutral-600 hover:text-primary"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
              <li>
                <a href="/blog" className="text-neutral-600 hover:text-primary whitespace-nowrap transition-colors">
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

      <footer className="sticky bottom-0 bg-white border-t border-neutral-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6 text-sm text-neutral-500">
            <a href="/privacy-policy" className="hover:text-neutral-700">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-neutral-700">Terms of Service</a>
            <a href="/affiliate-disclosure" className="hover:text-neutral-700">Affiliate Disclosure</a>
            <a href="/contact" className="hover:text-neutral-700">Contact & Submit</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
