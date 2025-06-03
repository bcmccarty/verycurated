import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col pb-20">
      <header className="sticky top-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <Link to="/" className="inline-block">
            <img 
              src="https://gzganvncavbtsjpecpjy.supabase.co/storage/v1/object/sign/product%20photos/verycurated_logo.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83OWY3YWI5ZS0xZDJmLTQ4ZTktOTlkNS1mMWViMGI1ZTAyOWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9kdWN0IHBob3Rvcy92ZXJ5Y3VyYXRlZF9sb2dvLnN2ZyIsImlhdCI6MTc0ODk3MzU1OCwiZXhwIjo0OTAyNTczNTU4fQ.U5gzWT7_SIQ_PnTZI3gheMUl7x4jufM9LMxEi1MSsXM" 
              alt="Very Curated Logo" 
              className="w-32 h-16 mx-auto object-contain"
            />
          </Link>
        </div>
      </header>

      <main className="flex-grow py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center mb-8">Terms of Service</h1>
          <div className="prose prose-neutral">
            <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>

            <h2 className="text-xl font-semibold mt-6 mb-4">2. Use License</h2>
            <p className="mb-4">Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only.</p>

            <h2 className="text-xl font-semibold mt-6 mb-4">3. Disclaimer</h2>
            <p className="mb-4">The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
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

      <footer className="bg-white border-t border-neutral-200 py-3 fixed bottom-0 left-0 w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6 text-sm text-neutral-500">
            <Link to="/" className="hover:text-neutral-700">Home</Link>
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

export default TermsOfService;
