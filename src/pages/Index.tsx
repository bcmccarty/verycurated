
import ProductGrid from "@/components/ProductGrid";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const categories = [
  "Most Popular",
  "Tech Gadgets",
  "Home & Living",
  "Fashion",
  "Unique Finds"
];

const inquiryReasons = [
  "General Inquiry",
  "Product Suggestion",
  "Partnership Opportunity",
  "Report an Issue",
  "Other"
];

const Index = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [inquiryReason, setInquiryReason] = useState("General Inquiry");

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <h1 className="text-2xl font-bold text-neutral-800">Curated Savings Hub</h1>
          <p className="mt-2 text-neutral-500">Discover amazing products at unbeatable prices</p>
          
          {/* Blog Section in Header */}
          <div className="mt-4 flex gap-4 overflow-x-auto pb-4 justify-center">
            {[1, 2, 3].map((i) => (
              <article key={i} className="flex-none w-64 bg-white rounded-lg shadow-md">
                <img
                  src={`https://picsum.photos/seed/blog${i}/400/200`}
                  alt="Blog post"
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <div className="p-3">
                  <h3 className="font-semibold text-sm">Amazing Products You Need to See</h3>
                  <a href="#" className="text-primary text-xs hover:text-primary-dark mt-1 inline-block">Read More →</a>
                </div>
              </article>
            ))}
          </div>

          <nav className="mt-4">
            <ul className="flex space-x-6 overflow-x-auto pb-2 justify-center">
              {categories.map((category) => (
                <li key={category}>
                  <button className="text-neutral-600 hover:text-primary whitespace-nowrap transition-colors">
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-neutral-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProductGrid />
          </div>
        </section>
      </main>

      <footer className="sticky bottom-0 bg-white border-t border-neutral-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4">
              <button 
                onClick={() => setShowContactForm(true)}
                className="text-primary hover:text-primary-dark text-sm font-medium"
              >
                Contact Us
              </button>
              <button 
                className="text-primary hover:text-primary-dark text-sm font-medium"
              >
                Submit a Product
              </button>
            </div>
            <div className="flex justify-center space-x-6 text-sm text-neutral-500">
              <a href="/privacy-policy" className="hover:text-neutral-700">Privacy Policy</a>
              <a href="/terms-of-service" className="hover:text-neutral-700">Terms of Service</a>
              <a href="/affiliate-disclosure" className="hover:text-neutral-700">Affiliate Disclosure</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Contact Us</h2>
              <button 
                onClick={() => setShowContactForm(false)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                ✕
              </button>
            </div>

            {/* About Us Section */}
            <div className="mb-6 p-4 bg-neutral-50 rounded-lg">
              <h3 className="font-semibold mb-2">About Us</h3>
              <p className="text-sm text-neutral-600">
                We're dedicated to bringing you the best curated products at unbeatable prices. 
                Our team carefully selects each item to ensure quality and value for our community.
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Reason for Contact</label>
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full px-3 py-2 text-left border rounded-md">
                    {inquiryReason}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {inquiryReasons.map((reason) => (
                      <DropdownMenuItem 
                        key={reason}
                        onClick={() => setInquiryReason(reason)}
                      >
                        {reason}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input type="email" placeholder="your@email.com" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <Textarea placeholder="Type your message here..." className="min-h-[100px]" />
              </div>

              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
