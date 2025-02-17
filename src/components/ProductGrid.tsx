
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
      const { data: specificProduct, error: specificError } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .eq('id', 'abd9ad5c-e5b5-4551-a7be-260c2bb1a5b1');

      console.log('Table name being used:', TABLE_NAME);
      console.log('Specific product query:', { specificProduct, specificError });

      let query = supabase
        .from(TABLE_NAME)
        .select('*')
        .range((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE - 1)
        .order('created_at', { ascending: false });

      if (selectedCategory && selectedCategory !== "Most Popular") {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;

      console.log('Regular query response:', { data, error });

      if (error) {
        console.error('Supabase error:', error);
        setError(error.message);
        return;
      }

      if (data && data.length < PRODUCTS_PER_PAGE) {
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

  const renderGridItems = () => {
    const items = [];
    products.forEach((product, index) => {
      items.push(<ProductCard key={product.id} product={product} />);
      if (index === 0) {
        items.push(
          <FeaturedCard
            key="featured-test"
            title="Home & Living"
            imageUrl="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&q=80"
            href="/category/home-and-living"
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
