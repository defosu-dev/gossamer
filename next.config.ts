import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // ← будь-який домен
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
