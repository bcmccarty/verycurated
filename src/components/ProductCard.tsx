
import { Product } from "@/lib/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({
  product
}: ProductCardProps) => {
  const isMobile = useIsMobile();
  
  // Don't render link wrapper if there's no affiliate link
  const renderImage = () => {
    if (product.affiliateLink) {
      return (
        <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
          <img src={product.imageUrl} alt={product.title} className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105" loading="lazy" />
        </a>
      );
    }
    return (
      <img src={product.imageUrl} alt={product.title} className="object-cover w-full h-full" loading="lazy" />
    );
  };

  return (
    <div className="group relative bg-gray-100 rounded-[4px] overflow-hidden transition-all duration-300 animate-fade-in w-full">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {renderImage()}
        {product.isSponsored && (
          <span className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded-[4px]">
            Sponsored
          </span>
        )}
      </div>
      <div className="p-4 pt-4 pb-8 px-[18px] bg-gray-100 my-0 mx-0 rounded-sm flex flex-col min-h-[250px]">
        <h3 className={`font-semibold text-lg mb-[6px] text-center ${
          isMobile ? 'line-clamp-2' : 'line-clamp-1'
        }`}>{product.title}</h3>
        <div className="text-neutral-600 font-bold text-center mb-[10px]">{product.price}</div>
        <p className="text-neutral-500 text-[13px] line-clamp-4 font-['Arial'] mb-4 flex-1">
          {product.description}
        </p>
        {product.affiliateLink && (
          <div className="flex justify-center mt-auto">
            <a 
              href={product.affiliateLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white rounded-full font-medium text-base hover:bg-gray-800 transition-colors duration-200"
            >
              <span>View Pricing</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
