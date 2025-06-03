
import { useState, useEffect } from 'react';

export const useBitcoinPrice = () => {
  const [price, setPrice] = useState<string>('$105,703.40');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBitcoinPrice = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/USD.json');
      const data = await response.json();
      
      if (data?.bpi?.USD?.rate) {
        // Format the price to match your existing format
        const priceValue = parseFloat(data.bpi.USD.rate.replace(/,/g, ''));
        const formattedPrice = `$${priceValue.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}`;
        setPrice(formattedPrice);
        console.log('Bitcoin price updated:', formattedPrice);
      }
    } catch (err) {
      console.error('Error fetching Bitcoin price:', err);
      setError('Failed to fetch Bitcoin price');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch immediately on mount
    fetchBitcoinPrice();
    
    // Set up interval to fetch every minute (60000ms)
    const interval = setInterval(fetchBitcoinPrice, 60000);
    
    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return { price, isLoading, error };
};
