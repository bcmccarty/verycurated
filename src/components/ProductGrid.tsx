import { useEffect, useRef, useState } from "react";
import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import { useBitcoinPrice } from "../hooks/useBitcoinPrice";

interface ProductGridProps {
  selectedCategory?: string;
}

const PRODUCTS_PER_PAGE = 24;

const ProductGrid = ({ selectedCategory }: ProductGridProps) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);
  const { price: bitcoinPrice } = useBitcoinPrice();

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/data/products.json");
        if (!response.ok) {
          throw new Error(`Failed to load products: ${response.status}`);
        }
        const data: Product[] = await response.json();

        // Sort by created_at descending
        data.sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
          return dateB - dateA;
        });

        // Filter by category if needed
        const filtered =
          selectedCategory && selectedCategory !== "Most Popular"
            ? data.filter((p) => p.category === selectedCategory)
            : data;

        setAllProducts(filtered);

        const initialSlice = filtered.slice(0, PRODUCTS_PER_PAGE * 2);
        setProducts(initialSlice);
        setPage(3);
        setHasMore(initialSlice.length < filtered.length);
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    setPage(1);
    setProducts([]);
    setAllProducts([]);
    setHasMore(true);
    setError(null);
    loadProducts();
  }, [selectedCategory]);

  const loadMoreProducts = () => {
    if (!hasMore || isLoading) return;

    const start = (page - 1) * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    const nextSlice = allProducts.slice(start, end);

    if (nextSlice.length < PRODUCTS_PER_PAGE) {
      setHasMore(false);
    }

    setProducts((prev) => [...prev, ...nextSlice]);
    setPage((prev) => prev + 1);
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
        rootMargin: "800px 0px",
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
  }, [isLoading, hasMore, allProducts, page]);

  const renderGridItems = () => {
    const items = [];
    products.forEach((product) => {
      // Update Bitcoin product price with real-time data
      const updatedProduct =
        product.id === "caa6a7f9-c931-47c7-8953-e47df40ea2b1"
          ? { ...product, price: bitcoinPrice }
          : product;

      items.push(
        <div key={product.id} className="w-full max-w-[360px]">
          <ProductCard product={updatedProduct} />
        </div>
      );
    });
    return items;
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      {error && (
        <div className="text-red-500 text-center mb-4 p-4 bg-red-50 rounded-md border border-red-200">
          <p className="font-medium">Error</p>
          <p>{error}</p>
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
