import ProductGrid from "@/components/ProductGrid";
import { Link } from "react-router-dom";

const Index = () => {
  const getCurrentDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return today.toLocaleDateString('en-US', options);
  };

  return <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img 
            src="/images/verycurated_logo_gradient.svg" 
            alt="Very Curated Logo" 
            className="w-48 h-24 mx-auto mb-3 object-contain"
          />

          <p className="font-sans text-sm text-zinc-500 mb-4" style={{ letterSpacing: '0.35em' }}>
            {getCurrentDate().toUpperCase()}
          </p>
        </div>
      </header>

      <main className="w-full bg-white">
        <section className="bg-white py-12">
          <ProductGrid selectedCategory="Most Popular" />
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
    </div>;
};
export default Index;
