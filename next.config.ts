import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return ["/.well-known/apple-app-site-association", "/.well-known/assetlinks.json"].map(
      (source) => ({ source, headers: [{ key: "Content-Type", value: "application/json" }] })
    );
  },
  async redirects() {
    return [
      // Bare domain -> www, except /.well-known/*: Apple and Android refuse
      // to verify app links (AASA / assetlinks.json) through a redirect.
      {
        source: "/:path((?!\\.well-known/).*)",
        has: [{ type: "host", value: "pawgressapp.com" }],
        destination: "https://www.pawgressapp.com/:path",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/invite/:token", destination: "/invite.html" },
      { source: "/kennel/:id", destination: "/kennel.html" },
      { source: "/pet/:id", destination: "/pet.html" },
    ];
  },
};

export default nextConfig;
