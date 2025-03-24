
import { useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import BlogShowcase from "@/components/BlogShowcase";

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NewsletterSignup />
      <header 
        className="w-full bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("/lovable-uploads/f6625c2f-7f5b-4fd3-b75f-32c790e2d702.png")',
          backgroundColor: '#355E3B' // Fallback color
        }}
      >
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
                <button className="text-neutral-200 hover:text-white whitespace-nowrap transition-colors">
                  Blog
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="w-full flex-grow bg-gray-50">
        <BlogShowcase />
        <section className="bg-gray-50 py-12">
          <ProductGrid selectedCategory={selectedCategory} />
        </section>
      </main>

      <footer className="w-full bg-white border-t border-neutral-200 py-3 fixed bottom-0 left-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6 text-sm">
            <a href="/privacy-policy" className="text-neutral-500 hover:text-neutral-800">Privacy Policy</a>
            <a href="/terms-of-service" className="text-neutral-500 hover:text-neutral-800">Terms of Service</a>
            <a href="/affiliate-disclosure" className="text-neutral-500 hover:text-neutral-800">Affiliate Disclosure</a>
            <a href="/contact" className="text-neutral-500 hover:text-neutral-800">Contact & Submit</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
