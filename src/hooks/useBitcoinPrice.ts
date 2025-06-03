import { useState, useEffect } from 'react';

export const useBitcoinPrice = () => {
  const [price, setPrice] = useState<string>('$105,703.40');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBitcoinPrice = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Fetching Bitcoin price...');
      
      // Using CoinGecko API which supports CORS
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Bitcoin API response:', data);
      
      if (data?.bitcoin?.usd) {
        const priceValue = data.bitcoin.usd;
        const formattedPrice = `$${priceValue.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}`;
        setPrice(formattedPrice);
        console.log('Bitcoin price updated successfully:', formattedPrice);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching Bitcoin price:', err);
      setError('Failed to fetch Bitcoin price');
      // Keep the existing price on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('Setting up Bitcoin price fetcher...');
    
    // Fetch immediately on mount
    fetchBitcoinPrice();
    
    // Set up interval to fetch every minute (60000ms)
    const interval = setInterval(() => {
      console.log('Interval triggered - fetching Bitcoin price...');
      fetchBitcoinPrice();
    }, 60000);
    
    // Cleanup interval on unmount
    return () => {
      console.log('Cleaning up Bitcoin price interval');
      clearInterval(interval);
    };
  }, []);

  return { price, isLoading, error };
};
