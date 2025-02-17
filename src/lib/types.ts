
export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  affiliateLink?: string;
  isSponsored?: boolean;
  category: string;
  created_at?: string;
}
