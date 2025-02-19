import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
const articles = [{
  title: "Top Tech Gadgets for 2025",
  imageUrl: "https://images.unsplash.com/photo-1526570207772-784d36084510?auto=format&fit=crop&q=80&w=600"
}, {
  title: "Home Living Essentials Guide",
  imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=600"
}, {
  title: "Fashion Trends This Season",
  imageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=600"
}, {
  title: "Smart Shopping Guide",
  imageUrl: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&q=80&w=600"
}];
const BlogShowcase = () => {
  return <div className="w-full bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          
          
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, index) => <div key={index} className="group relative bg-white rounded-lg overflow-hidden h-64 shadow-sm hover:shadow-md transition-shadow duration-200 animate-fade-in">
              <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-semibold text-xl text-white">
                  {article.title}
                </h3>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};
export default BlogShowcase;