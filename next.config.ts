import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // devIndicators: false,
  images: {
    domains: ["cdn.builder.io"], // Allow images from Builder.io CDN
  },
};

export default nextConfig;
