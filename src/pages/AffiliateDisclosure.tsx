
const AffiliateDisclosure = () => {
  return (
    <div className="min-h-screen bg-white py-12">
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
      </div>
    </div>
  );
};

export default AffiliateDisclosure;
