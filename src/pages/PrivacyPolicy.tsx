
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col pb-16">
      <header className="sticky top-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-2xl font-bold text-neutral-800">Curated Savings Hub</h1>
            <p className="mt-2 text-neutral-500">Discover amazing products at unbeatable prices</p>
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

export default PrivacyPolicy;
