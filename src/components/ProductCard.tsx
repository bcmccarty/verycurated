
import { Product } from "@/lib/types";
import { ExternalLink, Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl animate-fade-in">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {product.isSponsored && (
          <span className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded-full">
            Sponsored
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.title}</h3>
        <p className="text-neutral-500 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">{product.price}</span>
          <div className="flex gap-2">
            <button
              className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
              aria-label="Save to wishlist"
            >
              <Heart className="w-5 h-5" />
            </button>
            {product.affiliateLink && (
              <a
                href={product.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
                aria-label="View product"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
