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
    // 31 days. These are static project screenshots and team photos that never
    // change; a 60s TTL made the optimizer re-encode multi-MB PNGs constantly.
    minimumCacheTTL: 2678400,
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
  async redirects() {
    return [
      // Canonical host. Both hostnames answered 200 with no redirect between
      // them, splitting link equity and letting Google override our canonical
      // (it had indexed www). We follow Google's choice to keep the existing
      // index rather than force a migration.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'nextgenfusion.in' }],
        destination: 'https://www.nextgenfusion.in/:path*',
        permanent: true,
      },
      // /portofolio/ was a misspelled, client-rendered duplicate of /work/.
      // Retired rather than repaired.
      // Item slugs never matched between the two sections (/portofolio/maribiz
      // vs /work/maribiz-ai), so per-slug mapping would manufacture 404s. The
      // listing is the honest equivalent.
      { source: '/portofolio', destination: '/work', permanent: true },
      { source: '/portofolio/:slug*', destination: '/work', permanent: true },
      // Legacy WordPress permalinks from the previous site. These 404'd, so any
      // authority they held was being discarded. Pointed at the section that
      // replaced them, not the homepage (Google reads that as a soft 404).
      { source: '/portfolio-item/:slug*', destination: '/work', permanent: true },
    ]
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
      { source: '/api/store/:path*', destination: `${BACKEND_URL}/api/store/:path*` },
      { source: '/api/blog-posts', destination: `${BACKEND_URL}/api/blog-posts` },
      { source: '/api/blog-posts/:path*', destination: `${BACKEND_URL}/api/blog-posts/:path*` },
    ]
  },
  // Keep test files out of the production output trace.
  outputFileTracingExcludes: {
    '*': ['./src/**/__tests__/**', './src/**/*.test.*', './src/**/*.spec.*'],
  },
}

module.exports = nextConfig
