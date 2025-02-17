
export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  affiliateLink?: string;
  sponsorId?: string;
  isSponsored?: boolean;
  category: string;
}
