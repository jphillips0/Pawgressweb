import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      { source: "/invite/:token", destination: "/invite.html" },
      { source: "/kennel/:id", destination: "/kennel.html" },
      { source: "/pet/:id", destination: "/pet.html" },
      { source: "/litter/:id", destination: "/litter.html" },
    ];
  },
};

export default nextConfig;
