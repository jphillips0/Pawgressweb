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
    ];
  },
};

export default nextConfig;
