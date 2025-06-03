import { useEffect, useRef, useState } from "react";
import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import FeaturedCard from "./FeaturedCard";
import LoadingSpinner from "./LoadingSpinner";
import { supabase, isPermissionError } from "../lib/supabaseClient";
import { toast } from "sonner";

interface ProductGridProps {
  selectedCategory?: string;
}

const PRODUCTS_PER_PAGE = 24;
const TABLE_NAME = 'products';

const ProductGrid = ({ selectedCategory }: ProductGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const loaderRef = useRef(null);

  useEffect(() => {
    const initialLoad = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        let query = supabase
          .from(TABLE_NAME)
          .select('*')
          .range(0, PRODUCTS_PER_PAGE * 2 - 1)
          .order('created_at', { ascending: false });

        if (selectedCategory && selectedCategory !== "Most Popular") {
          query = query.eq('category', selectedCategory);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Supabase error:', error);
          
          // Special handling for RLS permission errors
          if (isPermissionError(error)) {
            setError('Access denied. This could be due to Row Level Security (RLS) settings in Supabase. Please check your database permissions.');
            toast.error('Database access error. Please check RLS policies.');
          } else {
            setError(error.message);
          }
          return;
        }

        if (!data || data.length < PRODUCTS_PER_PAGE * 2) {
          setHasMore(false);
        }

        setProducts(data || []);
        setPage(3);
      } catch (error) {
        console.error('Error loading products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    setPage(1);
    setProducts([]);
    setHasMore(true);
    setError(null);
    initialLoad();
  }, [selectedCategory]);

  const loadMoreProducts = async () => {
    if (!hasMore || isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      let query = supabase
        .from(TABLE_NAME)
        .select('*')
        .range((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE - 1)
        .order('created_at', { ascending: false });

      if (selectedCategory && selectedCategory !== "Most Popular") {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Supabase error:', error);
        
        // Special handling for RLS permission errors
        if (isPermissionError(error)) {
          setError('Access denied. This could be due to Row Level Security (RLS) settings in Supabase. Please check your database permissions.');
          toast.error('Database access error. Please check RLS policies.');
        } else {
          setError(error.message);
        }
        return;
      }

      if (!data || data.length < PRODUCTS_PER_PAGE) {
        setHasMore(false);
      }

      setProducts(prevProducts => [...prevProducts, ...(data || [])]);

      setPage(prev => prev + 1);
      
    } catch (error) {
      console.error('Error loading products:', error);
      setError('Failed to load products. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isLoading && hasMore) {
          loadMoreProducts();
        }
      },
      { 
        threshold: 0,
        rootMargin: "800px 0px"
      }
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
      items.push(
        <div key={product.id} className="w-full max-w-[360px]">
          <ProductCard product={product} />
        </div>
      );

      // Only show the featured card if we're not already in the Home category
      if (index === 0 && selectedCategory !== "Home") {
        items.push(
          <FeaturedCard
            key="featured-test"
            title="Home & Living"
            imageUrl="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&q=80"
            href="/category/home-and-living"
          />
        );
      }
      
      if (index === 7) {
        items.push(
          <div key="ad-space" className="w-full max-w-[360px] aspect-square">
            <div className="w-full h-full bg-neutral-100 rounded-[4px] flex items-center justify-center border border-neutral-200">
              <div className="text-neutral-400 text-sm">Advertisement</div>
            </div>
          </div>
        );
      }
    });
    return items;
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      {error && (
        <div className="text-red-500 text-center mb-4 p-4 bg-red-50 rounded-md border border-red-200">
          <p className="font-medium">Error</p>
          <p>{error}</p>
          {error.includes('Row Level Security') && (
            <div className="mt-2 text-sm">
              <p>To fix this issue in Supabase:</p>
              <ol className="list-decimal list-inside mt-1 space-y-1">
                <li>Go to your Supabase dashboard</li>
                <li>Navigate to Authentication → Policies</li>
                <li>Find your 'products' table</li>
                <li>Add a policy for anonymous users to SELECT data</li>
              </ol>
            </div>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 justify-items-center">
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
