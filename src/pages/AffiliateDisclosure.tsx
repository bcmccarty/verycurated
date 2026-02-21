import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AffiliateDisclosure = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col pb-20">
      <header className="sticky top-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <Link to="/" className="inline-block">
            <img 
              src="/images/verycurated_logo.svg" 
              alt="Very Curated Logo" 
              className="w-32 h-16 mx-auto object-contain"
            />
          </Link>
        </div>
      </header>

      <main className="flex-grow py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center mb-8">Affiliate Disclosure</h1>
          <div className="prose prose-neutral">
            <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">Disclosure</h2>
            <p className="mb-4">This website contains affiliate links, which means we may earn a commission if you click on one of the product links and make a purchase. This comes at no additional cost to you, but helps support our website and allows us to continue providing quality content.</p>

            <h2 className="text-xl font-semibold mt-6 mb-4">Identification of Affiliate Links</h2>
            <p className="mb-4">We strive to clearly identify affiliate links and sponsored content on our website. Products marked as "Sponsored" indicate that we receive compensation for featuring these items.</p>

            <h2 className="text-xl font-semibold mt-6 mb-4">Our Commitment</h2>
            <p className="mb-4">We only recommend products that we believe will be valuable to our readers. All opinions expressed are our own and are not influenced by affiliate partnerships.</p>
          </div>

          {/* Take Me Back Link - moved to bottom */}
          <div className="mt-8 flex justify-center">
            <Link to="/" className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-800 underline">
              <ArrowLeft size={16} />
              Take me back
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-white/80 backdrop-blur-md border-t border-white/20 py-3 fixed bottom-0 left-0 w-full z-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6 text-sm text-neutral-600">
            <Link to="/" className="hover:text-neutral-800">Home</Link>
            <Link to="/privacy-policy" className="hover:text-neutral-800">Privacy Policy</Link>
            <Link to="/affiliate-disclosure" className="hover:text-neutral-800">Affiliate Disclosure</Link>
            <Link to="/contact" className="hover:text-neutral-800">Contact & Submit</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AffiliateDisclosure;
