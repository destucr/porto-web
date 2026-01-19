# Portfolio Website (Porto-Web)

**Live Site:** [porto-web.destucr.workers.dev](https://porto-web.destucr.workers.dev/)

> A high-performance personal portfolio built with Next.js 15 and deployed on the edge via Cloudflare Pages.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for Cloudflare Pages (OpenNext)
npm run build:cloudflare

# Preview locally using Wrangler
npx wrangler pages dev .open-next/cloudflare
```

## 🏗 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Content:** [Markdoc](https://markdoc.dev/) for technical case studies
- **Styling:** Tailwind CSS 4 + Lucide React
- **Deployment:** [Cloudflare Pages](https://pages.cloudflare.com/) via [OpenNext](https://open-next.js.org/cloudflare)
- **UI Components:** Radix UI Primitives

## 📁 Project Structure

```text
├── app/                # Next.js App Router (Pages & API)
├── components/         # Shadcn/UI & custom components
├── content/            # Project & Blog content (.mdoc)
├── lib/                # Shared utilities & data fetching
├── public/             # Static assets & Interactive Demos (GTFS-CMS)
├── wrangler.jsonc      # Cloudflare configuration
└── open-next.config.ts # OpenNext adapter config
```

## ✨ Features

- 📱 **Interactive Showcase:** Live iframe-based previews of complex systems (e.g., GTFS-CMS).
- ⚡ **Edge Optimized:** Deployed on Cloudflare's global network for sub-100ms latency.
- 🎨 **Dynamic UI:** Smooth transitions with Framer Motion and Radix UI.
- 🎯 **Technical Depth:** Detailed case studies rendered from Markdoc.

## 🛠 Development

### Prerequisites

- Node.js >= 20.x
- Cloudflare Account + Wrangler CLI

### Environment Setup

```bash
# Clone and Install
git clone https://github.com/destucr/porto-web.git
cd porto-web
npm install

# Start Next.js dev server
npm run dev
```
The site will be available at `http://localhost:3000`

---

# About the Developer

## Destu Cikal Ramdani
### iOS Engineer & Full-Stack Developer

> *"Building mobile apps that deliver the message clearly and are built with intentional purpose."*

---

## 🧭 The Pursuit
I am driven by the challenge of moving beyond standard application development into **system-level engineering**. My focus lies in native iOS depth—specifically where hardware meets software. I pursue mastery in:

*   **Audio Systems:** Refining how we perceive sound through `AVFoundation` and `AudioKit`.
*   **On-Device Intelligence:** Implementing privacy-first, high-performance ML models using `CoreML`.
*   **Spatial Context:** Building accurate, real-time tracking solutions with `MapKit` and `Core Location`.

## 🛠 The Philosophy: Clarity and Intent
I believe every line of code should have a clear reason for being there. My background in **Product Management** helps me ensure that technical choices always support the actual message we want to deliver. I focus on:
*   Respecting the user's intelligence and time.
*   Being intentional with every technical choice (Clean Architecture, SwiftData, CI/CD).
*   Drive measurable impact through data-informed prioritization.

## ⚡ The Desire
I desire to build tools that feel "inevitable"—apps that are so refined and technically sound that they become essential to the user's workflow. I am constantly seeking environments where performance is a feature, not an afterthought, and where cross-functional teams collaborate to solve non-trivial problems.

---

### 📬 Connection
*   **Portfolio:** [porto-web.destucr.workers.dev](https://porto-web.destucr.workers.dev/)
*   **LinkedIn:** [linkedin.com/in/destucr](https://linkedin.com/in/destucr)
*   **Email:** destucr@gmail.com

*"Build with intent, or don't build at all."*
