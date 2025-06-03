
import ProductGrid from "@/components/ProductGrid";
const Index = () => {
  return <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-32 h-16 bg-gray-200 rounded-lg mx-auto flex items-center justify-center mb-6">
            <span className="text-gray-500 text-sm">Logo</span>
          </div>

          <p className="italic font-serif mb-8 text-xl text-zinc-600">
            <span className="font-bold">"How long are you going to wait before you demand the best for yourself?"</span> <span className="font-normal">– Epictetus</span>
          </p>
        </div>
      </header>

      <main className="w-full flex-grow bg-white">
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
