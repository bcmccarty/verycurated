import { useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import { Link } from "react-router-dom";

const HomeCategory = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img 
            src="https://gzganvncavbtsjpecpjy.supabase.co/storage/v1/object/sign/product%20photos/verycurated_logo.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83OWY3YWI5ZS0xZDJmLTQ4ZTktOTlkNS1mMWViMGI1ZTAyOWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9kdWN0IHBob3Rvcy92ZXJ5Y3VyYXRlZF9sb2dvLnN2ZyIsImlhdCI6MTc0ODk3MzU1OCwiZXhwIjo0OTAyNTczNTU4fQ.U5gzWT7_SIQ_PnTZI3gheMUl7x4jufM9LMxEi1MSsXM" 
            alt="Very Curated Logo" 
            className="w-32 h-16 mx-auto mb-6 object-contain"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Home & Living</h1>
          <p className="text-gray-600">Discover our curated collection of home essentials</p>
        </div>
      </header>

      <main className="w-full flex-grow bg-white">
        <section className="bg-white py-12">
          <ProductGrid selectedCategory="Home" />
        </section>
      </main>

      <footer className="w-full bg-white/80 backdrop-blur-md border-t border-white/20 py-3 fixed bottom-0 left-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6 text-sm">
            <Link to="/" className="text-neutral-600 hover:text-neutral-800">Home</Link>
            <Link to="/privacy-policy" className="text-neutral-600 hover:text-neutral-800">Privacy Policy</Link>
            <Link to="/affiliate-disclosure" className="text-neutral-600 hover:text-neutral-800">Affiliate Disclosure</Link>
            <Link to="/contact" className="text-neutral-600 hover:text-neutral-800">Contact & Submit</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeCategory;
