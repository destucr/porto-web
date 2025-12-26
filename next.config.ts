import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Fixes the Cross-origin warning for local development
  experimental: {
    allowedDevOrigins: ["http://localhost:3000", "http://127.0.0.1:3000"]
  }
};

export default nextConfig;