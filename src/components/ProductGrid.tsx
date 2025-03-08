import { useEffect, useRef, useState } from "react";
import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import FeaturedCard from "./FeaturedCard";
import LoadingSpinner from "./LoadingSpinner";
import { supabase } from "../lib/supabaseClient";

interface ProductGridProps {
  selectedCategory?: string;
}

const PRODUCTS_PER_PAGE = 24; // Increased for preloading
const TABLE_NAME = 'products';
const VISIBLE_ITEMS_PER_PAGE = 12; // We'll still only show 12 at a time initially

const ProductGrid = ({ selectedCategory }: ProductGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);
  const loaderRef = useRef(null);
  const scrollPosition = useRef(0);

  const preloadImages = (urls: string[]) => {
    const newPreloadedImages: string[] = [];
    
    urls.forEach(url => {
      if (!preloadedImages.includes(url) && url) {
        const img = new Image();
        img.src = url;
        newPreloadedImages.push(url);
      }
    });
    
    if (newPreloadedImages.length > 0) {
      setPreloadedImages(prev => [...prev, ...newPreloadedImages]);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      scrollPosition.current = window.scrollY;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        setError(error.message);
        return;
      }

      if (!data || data.length < PRODUCTS_PER_PAGE) {
        setHasMore(false);
      }

      if (data && data.length > 0) {
        const imageUrls = data.map(product => product.imageUrl);
        preloadImages(imageUrls.slice(0, VISIBLE_ITEMS_PER_PAGE));
        setTimeout(() => preloadImages(imageUrls.slice(VISIBLE_ITEMS_PER_PAGE)), 100);
      }

      setProducts(prevProducts => {
        const newProducts = page === 1 ? data || [] : [...prevProducts, ...(data || [])];
        return newProducts;
      });

      setVisibleProducts(prevVisible => {
        if (page === 1) {
          return data || [];
        } else {
          const allProducts = [...prevVisible, ...(data || [])];
          return allProducts.slice(0, Math.min(allProducts.length, page * VISIBLE_ITEMS_PER_PAGE));
        }
      });

      setPage(prev => prev + 1);
      
      if (hasMore && data && data.length === PRODUCTS_PER_PAGE) {
        const nextQuery = supabase
          .from(TABLE_NAME)
          .select('*')
          .range(page * PRODUCTS_PER_PAGE, (page + 1) * PRODUCTS_PER_PAGE - 1)
          .order('created_at', { ascending: false });
          
        if (selectedCategory && selectedCategory !== "Most Popular") {
          nextQuery.eq('category', selectedCategory);
        }
        
        const { data: nextData } = await nextQuery;
        if (nextData && nextData.length > 0) {
          const nextImageUrls = nextData.map(product => product.imageUrl);
          setTimeout(() => preloadImages(nextImageUrls), 300);
        }
      }
      
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
    setVisibleProducts([]);
    setHasMore(true);
    setError(null);
    setPreloadedImages([]);
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
      { threshold: 0.1, rootMargin: "200px" }
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

  useEffect(() => {
    if (products.length > 0) {
      preloadImages(["https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&q=80"]);
    }
  }, [products]);

  useEffect(() => {
    if (products.length > visibleProducts.length) {
      const minVisible = Math.max(VISIBLE_ITEMS_PER_PAGE, visibleProducts.length);
      
      const visibleCount = Math.min(
        products.length,
        Math.ceil((minVisible + 6) / 6) * 6
      );
      
      setVisibleProducts(products.slice(0, visibleCount));
    }
  }, [products, scrollPosition.current]);

  const renderGridItems = () => {
    const items = [];
    visibleProducts.forEach((product, index) => {
      items.push(
        <div key={product.id} className="w-full max-w-[360px]">
          <ProductCard product={product} />
        </div>
      );

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
        <div className="text-red-500 text-center mb-4">
          {error}
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
