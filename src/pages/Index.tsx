
import ProductGrid from "@/components/ProductGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white shadow-sm py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-neutral-800">Curated Savings Hub</h1>
          <p className="mt-2 text-neutral-500">Discover amazing products at unbeatable prices</p>
        </div>
      </header>
      <main>
        <ProductGrid />
      </main>
    </div>
  );
};

export default Index;
