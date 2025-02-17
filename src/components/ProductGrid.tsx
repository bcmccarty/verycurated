
import { useEffect, useRef, useState } from "react";
import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import FeaturedCard from "./FeaturedCard";
import LoadingSpinner from "./LoadingSpinner";
import { supabase } from "../lib/supabaseClient";

interface ProductGridProps {
  selectedCategory?: string;
}

const PRODUCTS_PER_PAGE = 12;
const TABLE_NAME = 'products';

// Sample data for demonstration
const sampleProducts: Product[] = Array(30).fill(null).map((_, index) => ({
  id: `sample-${index}`,
  title: `Sample Product ${index + 1}`,
  description: "Experience innovation with this cutting-edge product. Designed for maximum efficiency and comfort, this item combines premium materials with sophisticated engineering. Perfect for both everyday use and special occasions.",
  price: `$${Math.floor(Math.random() * 200 + 29)}.99`,
  imageUrl: `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1488590528505-98d2b5aba04b' : '1649972904349-6e44c42644a7'}?auto=format&fit=crop&w=800&q=80`,
  category: ['Tech Gadgets', 'Home & Living', 'Fashion', 'Unique Finds'][Math.floor(Math.random() * 4)],
  affiliateLink: "#",
  isSponsored: Math.random() > 0.9
}));

const featuredCards = [
  {
    title: "Home & Living",
    imageUrl: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&q=80",
    href: "/category/home-and-living"
  },
  {
    title: "Tech Essentials",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80",
    href: "/category/tech-essentials"
  },
  {
    title: "Fashion Trends",
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80",
    href: "/category/fashion-trends"
  }
];

const ProductGrid = ({ selectedCategory }: ProductGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const loaderRef = useRef(null);

  const loadMoreProducts = async () => {
    if (!hasMore || isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // For demonstration, we'll use the sample data instead of the actual API call
      const filteredProducts = selectedCategory && selectedCategory !== "Most Popular"
        ? sampleProducts.filter(p => p.category === selectedCategory)
        : sampleProducts;

      setProducts(filteredProducts);
      setHasMore(false);
    } catch (error) {
      console.error('Error loading products:', error);
      setError('Failed to load products. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setProducts([]);
    setHasMore(true);
    setError(null);
    loadMoreProducts();
  }, [selectedCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isLoading && hasMore) {
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
  }, [isLoading, hasMore]);

  const renderGridItems = () => {
    const items = [];
    products.forEach((product, index) => {
      items.push(<ProductCard key={product.id} product={product} />);
      
      // Add featured cards at specific intervals
      if (index === 5) {
        items.push(
          <FeaturedCard
            key="featured-home"
            {...featuredCards[0]}
          />
        );
      } else if (index === 14) {
        items.push(
          <FeaturedCard
            key="featured-tech"
            {...featuredCards[1]}
          />
        );
      } else if (index === 23) {
        items.push(
          <FeaturedCard
            key="featured-fashion"
            {...featuredCards[2]}
          />
        );
      }
    });
    return items;
  };

  return (
    <div className="max-w-7xl mx-auto px-0 sm:px-0.5 lg:px-1 py-12">
      {error && (
        <div className="text-red-500 text-center mb-4">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {renderGridItems()}
      </div>
      <div ref={loaderRef} className="py-4 text-center">
        {isLoading && <LoadingSpinner />}
        {!hasMore && products.length > 0 && (
          <p className="text-gray-500">No more products to load</p>
        )}
        {!isLoading && products.length === 0 && !error && (
          <p className="text-gray-500">No products found</p>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
