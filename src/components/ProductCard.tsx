
import { Product } from "@/lib/types";
interface ProductCardProps {
  product: Product;
}
const ProductCard = ({
  product
}: ProductCardProps) => {
  return <div className="group relative bg-neutral-100 rounded-[4px] overflow-hidden transition-all duration-300 animate-fade-in w-full">
      <div className="relative aspect-square overflow-hidden">
        <img src={product.imageUrl} alt={product.title} className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105" loading="lazy" />
        {product.isSponsored && <span className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded-[4px]">
            Sponsored
          </span>}
      </div>
      <div className="p-4 pt-4 pb-8 px-[18px] bg-gray-100 my-0 mx-0 rounded-sm relative h-[240px]">
        <h3 className="font-semibold text-lg mb-2 text-center line-clamp-1">{product.title}</h3>
        <div className="text-neutral-600 font-bold text-center mb-3">{product.price}</div>
        <p className="text-neutral-500 text-sm mb-10 line-clamp-4 font-['Arial']">
          {product.description}
        </p>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 bg-[#111111] text-white rounded-[4px] hover:bg-[#222222] transition-colors font-['Heiti_SC'] text-sm font-bold py-[10px] tracking-[1px] mt-[5px]">
            CHECK IT OUT
          </a>
        </div>
      </div>
    </div>;
};
export default ProductCard;
