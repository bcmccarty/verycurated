
import { useEffect, useRef, useState } from "react";
import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import { supabase } from "../lib/supabaseClient";

interface ProductGridProps {
  selectedCategory?: string;
}

const PRODUCTS_PER_PAGE = 12;

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
      console.log('Fetching products:', {
        page,
        category: selectedCategory,
        range: [(page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE - 1]
      });

      let query = supabase
        .from('products')
        .select('*')
        .range((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE - 1)
        .order('created_at', { ascending: false });

      if (selectedCategory && selectedCategory !== "Most Popular") {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Supabase error:', error);
        setError(error.message);
        return;
      }

      if (data.length < PRODUCTS_PER_PAGE) {
        setHasMore(false);
      }

      setProducts((prev) => {
        if (page === 1) return data as Product[];
        return [...prev, ...(data as Product[])];
      });
      setPage((prev) => prev + 1);
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

  return (
    <div className="max-w-7xl mx-auto px-1 sm:px-2 lg:px-3 py-12">
      {error && (
        <div className="text-red-500 text-center mb-4">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
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
