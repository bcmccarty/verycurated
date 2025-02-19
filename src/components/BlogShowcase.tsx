
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
  return (
    <div className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide touch-pan-x" 
             style={{ 
               WebkitOverflowScrolling: 'touch',
               scrollbarWidth: 'none',
               msOverflowStyle: 'none',
               cursor: 'grab'
             }}>
          {articles.map((article, index) => (
            <div 
              key={index}
              className="flex-none w-[200px] h-[200px] relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 animate-fade-in snap-start cursor-pointer"
            >
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-200"
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
      </div>
    </div>
  );
};

export default BlogShowcase;
