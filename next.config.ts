import type { NextConfig } from 'next';

import { env } from '@/lib/env';

const storageUrl = new URL(env.NEXT_PUBLIC_STORAGE_URL);

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
    dangerouslyAllowLocalIP: env.NODE_ENV !== 'production',
    remotePatterns: [
      {
        protocol: storageUrl.protocol.replace(':', '') as 'http' | 'https',
        hostname: storageUrl.hostname,
        port: storageUrl.port,
        pathname: `${storageUrl.pathname.replace(/\/$/, '')}/**`,
      },
    ],
  },
};

export default nextConfig;
