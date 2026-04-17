import '@/lib/env';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Standalone output for Docker deployment
  output: 'standalone',

  // Prisma client must run as a native Node module, not be bundled
  serverExternalPackages: ['@prisma/client'],

  // TypeScript strict mode — never ignore build errors
  typescript: {
    ignoreBuildErrors: false,
  },

  // Security: remove X-Powered-By header
  poweredByHeader: false,

  // Allow next/image to load images from MinIO
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/product-images/**',
      },
    ],
  },
};

export default nextConfig;
