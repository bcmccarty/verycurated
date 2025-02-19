
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, MouseEvent } from "react";
import { useToast } from "@/hooks/use-toast";

const articles = [
  {
    title: "Top Tech Gadgets for 2025",
    imageUrl: "https://images.unsplash.com/photo-1526570207772-784d36084510?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Home Living Essentials Guide",
    imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Fashion Trends This Season",
    imageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Smart Shopping Guide",
    imageUrl: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Ultimate Gift Guide",
    imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Sustainable Living Tips",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Budget Travel Guide",
    imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Smart Home Essentials",
    imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Wellness & Self-Care",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600"
  }
];

const BlogShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showTooltip, setShowTooltip] = useState(true);
  const { toast } = useToast();

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    if (containerRef.current) {
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    if (containerRef.current) {
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 400; // Scroll by roughly 2 cards
      const newScrollLeft = direction === 'left' 
        ? containerRef.current.scrollLeft - scrollAmount
        : containerRef.current.scrollLeft + scrollAmount;
      
      containerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Show tooltip on first hover
  const handleFirstHover = () => {
    if (showTooltip) {
      toast({
        title: "Gallery Navigation",
        description: "Drag to scroll through articles or use the arrow buttons",
        duration: 3000,
      });
      setShowTooltip(false);
    }
  };

  return (
    <div className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative group">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-neutral-600" />
          </button>

          <div 
            ref={containerRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleFirstHover}
            style={{ 
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
          >
            {articles.map((article, index) => (
              <div 
                key={index}
                className="flex-none w-[200px] h-[200px] relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 animate-fade-in snap-start"
              >
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-200"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-semibold text-lg text-white">
                    {article.title}
                  </h3>
                </div>
              </div>
            ))}
            
            {/* Read More Square */}
            <a 
              href="/blog"
              className="flex-none w-[200px] h-[200px] bg-neutral-900 rounded-lg flex flex-col items-center justify-center gap-4 hover:bg-neutral-800 transition-colors duration-200 snap-start group"
            >
              <ArrowRight className="w-8 h-8 text-white group-hover:translate-x-2 transition-transform" />
              <span className="text-xl font-semibold text-white">View All Articles</span>
            </a>
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-neutral-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogShowcase;
