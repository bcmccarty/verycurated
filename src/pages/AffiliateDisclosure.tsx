
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AffiliateDisclosure = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col pb-16">
      <header className="sticky top-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <Link to="/" className="inline-block">
            <div className="w-32 h-16 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
              <span className="text-gray-500 text-sm">Logo</span>
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-grow py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Take Me Back Button */}
          <div className="mb-8 flex justify-center">
            <Link to="/" className="relative inline-flex items-center justify-center w-[200px] h-[50px] text-white rounded-[4px] font-['Heiti_SC'] text-sm font-bold tracking-[1px] border-2 border-transparent hover:border-[#355E3B] hover:text-[#355E3B] before:absolute before:inset-0 before:bg-gradient-to-b before:from-[#355E3B] before:to-[#2f5534] hover:before:opacity-0 before:transition-opacity before:rounded-[4px]">
              <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                <ArrowLeft size={16} />
                TAKE ME BACK
              </span>
            </Link>
          </div>

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
        </div>
      </main>

      <footer className="bg-white border-t border-neutral-200 py-3 fixed bottom-0 left-0 w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6 text-sm text-neutral-500">
            <Link to="/privacy-policy" className="hover:text-neutral-700">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-neutral-700">Terms of Service</Link>
            <Link to="/affiliate-disclosure" className="hover:text-neutral-700">Affiliate Disclosure</Link>
            <Link to="/contact" className="hover:text-neutral-700">Contact & Submit</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AffiliateDisclosure;
