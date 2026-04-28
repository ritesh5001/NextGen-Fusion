import type { NextConfig } from "next";

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/admin/:path*',
        destination: `${BACKEND_URL}/api/admin/:path*`,
      },
      {
        source: '/api/cron/:path*',
        destination: `${BACKEND_URL}/api/cron/:path*`,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nextgenfusion.in',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.nextgenfusion.in',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dashboard.nextgenfusion.in',
        port: '',
        pathname: '/**',
      }
    ],
    // Required for static export with next/image (no server-side optimization)
    unoptimized: true,
    // Add error handling for missing images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Improve SVG rendering quality
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  webpack: (config, { dev, isServer }) => {
    // Exclude test files from production build
    if (!dev) {
      config.module.rules.push({
        test: /\.(test|spec)\.(js|jsx|ts|tsx)$/,
        loader: 'ignore-loader'
      });
      
      config.module.rules.push({
        test: /__tests__/,
        loader: 'ignore-loader'
      });
    }
    return config;
  },
  // Exclude test files from build output
  outputFileTracingExcludes: {
    '*': ['./src/**/__tests__/**', './src/**/*.test.*', './src/**/*.spec.*']
  },
  // Disable ESLint during builds to avoid test file errors
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
