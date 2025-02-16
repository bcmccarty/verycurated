
const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white py-12">
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
    </div>
  );
};

export default PrivacyPolicy;
