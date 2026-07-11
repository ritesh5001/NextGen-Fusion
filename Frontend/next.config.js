/** @type {import('next').NextConfig} */
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000'

const nextConfig = {
  // SSR mode (menghapus output: 'export')
  trailingSlash: true,
  eslint: {
    // Ignore ESLint errors during builds (useful when tests/dev files have strict rules)
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Tree-shake heavy client libs so only used code lands in the bundle.
    // (lucide-react is auto-optimized by Next 15; listed for clarity.)
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  images: {
    // Image optimization ON for SSR.
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dashboard.nextgenfusion.in',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'nextgenfusion.in',
        pathname: '/storage/**',
      },
    ],
  },
  // Same-origin /api proxy to the Backend. Filesystem route handlers under
  // src/app/api/* (admin, bookings, chatbot) take precedence over these; the
  // rewrites cover the endpoints that have no route handler (contact-forms,
  // project-estimator, cron).
  async rewrites() {
    return [
      { source: '/api/admin/:path*', destination: `${BACKEND_URL}/api/admin/:path*` },
      { source: '/api/contact-forms', destination: `${BACKEND_URL}/api/contact-forms` },
      { source: '/api/project-estimator', destination: `${BACKEND_URL}/api/project-estimator` },
      { source: '/api/chatbot/:path*', destination: `${BACKEND_URL}/api/chatbot/:path*` },
      { source: '/api/bookings/:path*', destination: `${BACKEND_URL}/api/bookings/:path*` },
      { source: '/api/cron/:path*', destination: `${BACKEND_URL}/api/cron/:path*` },
    ]
  },
  // Keep test files out of the production output trace.
  outputFileTracingExcludes: {
    '*': ['./src/**/__tests__/**', './src/**/*.test.*', './src/**/*.spec.*'],
  },
}

module.exports = nextConfig
