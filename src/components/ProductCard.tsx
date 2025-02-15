
import { Product } from "@/lib/types";
import { ExternalLink } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group relative bg-neutral-100 rounded-[4px] overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl animate-fade-in">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {product.isSponsored && (
          <span className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded-[4px]">
            Sponsored
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-4 text-center line-clamp-1">{product.title}</h3>
        <p className="text-neutral-500 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-center">
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-[4px] hover:bg-primary-dark transition-colors"
          >
            CHECK IT OUT <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
