
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    title: "Top Tech Gadgets for 2025",
    excerpt: "Discover the most innovative tech gadgets that are shaping the future.",
    imageUrl: "https://images.unsplash.com/photo-1526570207772-784d36084510?auto=format&fit=crop&q=80&w=600",
    category: "Tech"
  },
  {
    title: "Home Living Essentials Guide",
    excerpt: "Transform your living space with these must-have items.",
    imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=600",
    category: "Home"
  },
  {
    title: "Fashion Trends This Season",
    excerpt: "Stay ahead of the curve with these trending styles.",
    imageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=600",
    category: "Fashion"
  },
  {
    title: "Smart Shopping Guide",
    excerpt: "Learn how to find the best deals and make informed purchases.",
    imageUrl: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&q=80&w=600",
    category: "Shopping"
  }
];

const BlogShowcase = () => {
  return (
    <div className="w-full bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-neutral-800">Latest Articles</h2>
          <Button
            variant="ghost"
            className="text-neutral-600 hover:text-neutral-900"
            onClick={() => window.location.href = '/blog'}
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, index) => (
            <div 
              key={index}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 animate-fade-in"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-white/90 rounded-full text-xs font-medium text-neutral-700">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-neutral-800 mb-2 group-hover:text-primary-dark transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-neutral-600 line-clamp-2">
                  {article.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogShowcase;
