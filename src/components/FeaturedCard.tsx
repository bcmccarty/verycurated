
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
        </div>
        <p className="text-neutral-100 text-[13px] text-center mx-auto max-w-[280px] font-['Arial']">
          Discover our curated collection of premium items at unbeatable prices
        </p>
      </div>
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <button className="relative inline-flex items-center justify-center w-[160px] h-[41px] text-[#111111] rounded-[4px] font-['Heiti_SC'] text-sm font-bold tracking-[1px] border-2 border-transparent hover:border-white hover:text-white before:absolute before:inset-0 before:bg-white hover:before:opacity-0 before:transition-opacity before:rounded-[4px]">
          <span className="relative z-10 whitespace-nowrap">EXPLORE ALL</span>
        </button>
      </div>
    </a>
  );
};

export default FeaturedCard;
