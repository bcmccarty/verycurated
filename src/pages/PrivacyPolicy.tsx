import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
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
          <h1 className="text-3xl font-bold text-center mb-8">Privacy Policy</h1>
          <div className="prose prose-neutral">
            <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
            <h2 className="text-xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
            <p className="mb-4">We collect information that you voluntarily provide to us when you use our website, including:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Contact information (such as email address)</li>
              <li>Usage data and browsing patterns</li>
              <li>Device and browser information</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use the collected information for various purposes, including:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Providing and maintaining our service</li>
              <li>Improving user experience</li>
              <li>Analyzing usage patterns</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-4">3. Data Security</h2>
            <p className="mb-4">We implement appropriate security measures to protect your personal information.</p>
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

export default PrivacyPolicy;
