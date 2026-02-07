import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dvcshop.com',
      },
      {
        protocol: 'https',
        hostname: 'laureline-static.sfo3.digitaloceanspaces.com',
      },
      {
        protocol: 'https',
        hostname: 'ghoshak-website-builder.s3.ap-south-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
