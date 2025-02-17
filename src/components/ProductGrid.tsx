
import { useEffect, useRef, useState } from "react";
import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";

// Mock data - replace with actual API call later
const mockProducts: Product[] = Array.from({ length: 12 }, (_, i) => ({
  id: `${i + 1}`,
  title: `Amazing Product ${i + 1}`,
  description: "This is a fantastic product that you absolutely need in your life. It's innovative, useful, and surprisingly affordable!",
  price: `$${Math.floor(Math.random() * 900 + 100)}.99`,
  imageUrl: `https://picsum.photos/seed/${i + 1}/400/300`,
  isSponsored: i % 5 === 0,
}));

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);

  const loadMoreProducts = async () => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setProducts((prev) => [...prev, ...mockProducts]);
    setPage((prev) => prev + 1);
    setIsLoading(false);
  };

  useEffect(() => {
    loadMoreProducts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isLoading) {
          loadMoreProducts();
        }
      },
      { threshold: 1.0 }
    );

    const currentLoader = loaderRef.current;

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [isLoading]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={`${product.id}-${Math.random()}`} product={product} />
        ))}
      </div>
      <div ref={loaderRef}>{isLoading && <LoadingSpinner />}</div>
    </div>
  );
};

export default ProductGrid;
