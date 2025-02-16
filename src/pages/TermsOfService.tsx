
const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white py-12">
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
      </div>
    </div>
  );
};

export default TermsOfService;
