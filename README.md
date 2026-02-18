# Porto-Web: Engineering Portfolio

**Live Site:** [porto-web.destucr.workers.dev](https://porto-web.destucr.workers.dev/)

A high-performance personal portfolio built with `Next.js 15` (`App Router`) and deployed on the edge via `Cloudflare Pages`. This codebase serves as a technical showcase, emphasizing high-density data management and interactive geospatial components.

## Developer Perspective

As an `iOS Engineer`, I’ve built this portfolio to mirror the performance and precision of native development. The architecture is designed to handle complex technical case studies (`iOS`, `Audio Engineering`, `GIS`) using a structured content-as-code approach.

### Key Architectural Patterns
- **Content-as-Code:** Uses `Markdoc` to render deeply nested technical documentation. Case studies are stored in `/content` and parsed with custom validation logic in `lib/content.ts`.
- **Bifurcated Data Layer:** Project metadata is managed via `lib/data.ts` (for the high-level grid), while deep-dive technical details are fetched from localized `.mdoc` files.
- **Geospatial Integration:** Includes pre-compiled interactive demos (`GTFS-CMS`) hosted within `/public`, integrated via non-blocking iframes to showcase `GIS Route Engines`.
- **Edge-First Deployment:** Optimized for `Cloudflare`'s global network using `OpenNext`, ensuring sub-100ms latency for a native-feel web experience.

## Tech Stack

- **Framework:** `Next.js 15` (`React 19`, `TypeScript`)
- **Content:** `Markdoc` (`.mdoc`) for extensible technical writing
- **Styling:** `Tailwind CSS 4` and `Framer Motion` for micro-interactions
- **Deployment:** `Cloudflare Pages` + `OpenNext`
- **Type Safety:** Strict `TypeScript` configuration mirroring `Swift`'s type-safe philosophy

## Project Structure

```text
├── app/                # Next.js App Router (Entry points & SEO)
├── components/         # Atomic UI & specialized visualization components
├── content/            # Source for Case Studies & Technical Highlights
│   ├── posts/          # Engineering blog content
│   └── projects/       # Detailed project deep-dives (.mdoc)
├── lib/                # Core logic: Content parsers, metadata, and GIS utilities
├── public/             # Static assets & bundled interactive demos
└── open-next.config.ts # OpenNext adapter configuration for Cloudflare
```

## Development

### Prerequisites
- `Node.js` >= 20.x
- `Cloudflare Wrangler CLI` (for edge preview)

### Local Setup
```bash
# Install dependencies
npm install

# Run standard dev server
npm run dev

# Build and preview on local edge environment
npm run build:cloudflare
npx wrangler pages dev .open-next/cloudflare
```

## CI/CD
The project uses `GitHub Actions` for automated deployment. Every push to `main` triggers:
1. Linting and Type-checking
2. `OpenNext` build process
3. Deployment to `Cloudflare Pages` edge network

---
*Built with intent by [Destu Cikal](https://linkedin.com/in/destucikal).*
