# Ellojoy Zero Gula - Landing Page

Premium landing page for Ellojoy Zero Gula, optimized for the Malaysian market.

**Live Site:** https://ellojoy-zero-gula-sucralose.pages.dev

## Local Development

**Prerequisites:** Node.js 18+

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:5173 in your browser

## Build & Deploy

### Build Locally
```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Cloudflare Pages Configuration

**Build settings:**
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/`
- **Node version:** 18 or higher

The site automatically deploys to Cloudflare Pages when you push to the `main` branch.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS (CDN)
- Lucide React Icons
- Stripe Integration
