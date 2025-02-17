
import { useEffect, useRef, useState } from "react";
import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";

// Mock data with categories
const mockProducts: Product[] = Array.from({ length: 12 }, (_, i) => ({
  id: `${i + 1}`,
  title: `Amazing Product ${i + 1}`,
  description: "This innovative product combines cutting-edge technology with practical everyday use, revolutionizing how you approach daily tasks. Perfect for both home and office environments, it offers exceptional value while solving common problems that you encounter every day. With its sleek design and robust functionality, it's garnered rave reviews from satisfied customers worldwide and continues to exceed expectations. Made from premium materials and crafted with meticulous attention to detail, it's built to last and comes with a comprehensive satisfaction guarantee. The intuitive interface and versatile applications make it an essential addition to any modern lifestyle, while its energy-efficient operation ensures long-term cost savings.",
  price: `$${Math.floor(Math.random() * 900 + 100)}.99`,
  imageUrl: `https://picsum.photos/seed/${i + 1}/400/300`,
  isSponsored: i % 5 === 0,
  category: i % 5 === 0 ? "Tech Gadgets" : 
           i % 4 === 0 ? "Home & Living" :
           i % 3 === 0 ? "Fashion" :
           i % 2 === 0 ? "Unique Finds" : "Most Popular"
}));

interface ProductGridProps {
  selectedCategory?: string;
}

const ProductGrid = ({ selectedCategory }: ProductGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);

  const loadMoreProducts = async () => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const newProducts = mockProducts.filter(product => 
      !selectedCategory || selectedCategory === "Most Popular" || 
      product.category === selectedCategory
    );
    
    setProducts((prev) => {
      if (page === 1) return newProducts;
      return [...prev, ...newProducts];
    });
    setPage((prev) => prev + 1);
    setIsLoading(false);
  };

  useEffect(() => {
    setPage(1);
    setProducts([]);
    loadMoreProducts();
  }, [selectedCategory]);

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
