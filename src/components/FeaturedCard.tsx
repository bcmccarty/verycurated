
interface FeaturedCardProps {
  title: string;
  imageUrl: string;
  href: string;
}

const FeaturedCard = ({ title, imageUrl, href }: FeaturedCardProps) => {
  return (
    <a href={href} className="group relative bg-neutral-100 rounded-[4px] overflow-hidden transition-all duration-300 animate-fade-in w-full h-full">
      <div className="absolute inset-0">
        <img 
          src={imageUrl} 
          alt={title} 
          className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105" 
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
      <div className="absolute bottom-24 left-4 right-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h3 className="text-xl font-semibold text-white text-center">{title}</h3>
          <span className="text-white">→</span>
        </div>
        <p className="text-neutral-100 text-[13px] text-center mx-auto max-w-[280px] font-['Arial']">
          Discover our curated collection of premium items at unbeatable prices
        </p>
      </div>
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <button className="inline-flex items-center gap-2 px-6 bg-white text-[#111111] rounded-[4px] hover:bg-neutral-100 transition-colors font-['Heiti_SC'] text-sm font-bold py-[10px] tracking-[1px]">
          EXPLORE ALL
        </button>
      </div>
    </a>
  );
};

export default FeaturedCard;
