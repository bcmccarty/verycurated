import ProductGrid from "@/components/ProductGrid";

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
      <header className="w-full bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-32 h-16 bg-gray-200 rounded-lg mx-auto flex items-center justify-center mb-16">
            <span className="text-gray-500 text-sm">Logo</span>
          </div>

          <p className="font-sans text-sm text-zinc-500 mb-4" style={{ letterSpacing: '0.35em' }}>
            {getCurrentDate().toUpperCase()}
          </p>

          <p className="italic mb-4 text-xl text-zinc-600" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            <span className="font-bold">"How long are you going to wait before you demand the best for yourself?"</span> <span className="font-normal">– Epictetus</span>
          </p>

          <p className="font-sans text-sm text-zinc-500 mb-4" style={{ letterSpacing: '0.35em' }}>
            QUOTE OF THE DAY
          </p>
        </div>
      </header>

      <main className="w-full bg-white">
        <section className="bg-white py-12">
          <ProductGrid selectedCategory="Most Popular" />
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
    </div>;
};
export default Index;
