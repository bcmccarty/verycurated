# VeryCurated

A static product curation site built with React, Vite, TypeScript, and Tailwind CSS. No database, no backend.

## Stack

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + shadcn/ui (Radix primitives)
- **Hosting:** Netlify (auto-deploys from GitHub `main` branch)
- **Forms:** Netlify Forms (contact page)

## Project Structure

- `public/data/products.json` — All product data (title, description, price, imageUrl, affiliateLink, category, etc.)
- `public/images/products/` — Local product images (referenced by `imageUrl` in products.json; some products use external CDN URLs instead)
- `public/images/` — Site assets (logos, favicon, OG image)
- `src/components/ProductGrid.tsx` — Fetches and renders products from the static JSON with infinite scroll pagination and category filtering
- `src/components/ProductCard.tsx` — Individual product card with affiliate link
- `src/pages/` — Route pages: Index, HomeCategory, Contact, PrivacyPolicy, AffiliateDisclosure, NotFound
- `src/hooks/useBitcoinPrice.ts` — Live Bitcoin price from CoinGecko API (updates one specific product card)
- `netlify.toml` — Build config and SPA catch-all redirect

## Key Commands

- `npm run dev` — Start dev server on port 8080
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview production build locally

## Adding/Editing Products

Edit `public/data/products.json`. Each product has this shape:

```json
{
  "id": "uuid",
  "title": "Product Name",
  "description": "Product description",
  "price": "$99.00",
  "imageUrl": "/images/products/filename.jpg",
  "affiliateLink": "https://...",
  "isSponsored": false,
  "category": "Most Popular",
  "created_at": "2025-06-01T00:00:00Z"
}
```

Images can be a local path (`/images/products/...`) or an external URL. Products are sorted by `created_at` descending.

## Deployment

Pushes to `main` trigger automatic Netlify builds. The build command and publish directory are configured in `netlify.toml`.
