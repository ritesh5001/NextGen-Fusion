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
  // Next serves everything under /public with `max-age=0, must-revalidate`, so
  // every logo, background and OG image was revalidated on every page view — and
  // /_next/image inherits the upstream header, which made the optimiser's cache
  // useless too. These are static assets; give them a real TTL.
  async headers() {
    return [
      {
        // Baseline security headers on every document. Only HSTS was present,
        // and audit tooling plus AI-visibility scoring both read these as
        // trust signals.
        //
        // Deliberately NOT set here:
        //  - Content-Security-Policy. This site runs GTM, Razorpay checkout,
        //    Google Maps iframes and framer-motion's inline styles; a policy
        //    written without testing each of those breaks checkout silently.
        //    Ship it separately, Report-Only first, with a report endpoint.
        //  - HSTS `preload`. Submitting to the preload list is effectively
        //    irreversible and locks every future subdomain to HTTPS. Add it
        //    deliberately, not as a side effect of a headers pass.
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            // includeSubDomains is safe today: no subdomain of
            // nextgenfusion.in currently resolves. Re-check before adding one
            // that cannot serve HTTPS.
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains',
          },
        ],
      },
      {
        // Fonts are content-stable forever. Renaming is how you bust them.
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        // 30 days rather than a year: these are replaced in place occasionally
        // (logo, team photos), and stale-while-revalidate keeps the swap cheap.
        // Note: /_next/image sets its own Cache-Control and ignores rules
        // declared here — `images.minimumCacheTTL` above governs that cache,
        // and on Vercel the CDN TTL follows it.
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }],
      },
      {
        source: '/og/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }],
      },
      {
        source: '/favicon/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }],
      },
    ]
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
      // Our own nav says "Blogs" and "Projects" while the routes are /blog and
      // /work, so those are the paths people type and directories link to. Both
      // hard-404'd.
      { source: '/blogs', destination: '/blog/', permanent: true },
      { source: '/blogs/:slug*', destination: '/blog/:slug*/', permanent: true },
      { source: '/projects', destination: '/work/', permanent: true },
      // The pattern must not match /public/projects/<slug>/screenshot-N.png —
      // those are the case-study images, and a bare `:slug*` swallowed them,
      // 404ing every screenshot on /work/. Only match paths with no file
      // extension.
      { source: '/projects/:slug((?!.*\\.).*)', destination: '/work/:slug/', permanent: true },
      // /portofolio/ was a misspelled, client-rendered duplicate of /work/.
      // Retired rather than repaired.
      // Item slugs never matched between the two sections (/portofolio/maribiz
      // vs /work/maribiz-ai), so per-slug mapping would manufacture 404s. The
      // listing is the honest equivalent.
      { source: '/portofolio', destination: '/work/', permanent: true },
      { source: '/portofolio/:slug*', destination: '/work/', permanent: true },
      // Legacy WordPress permalinks from the previous site. These 404'd, so any
      // authority they held was being discarded. Pointed at the section that
      // replaced them, not the homepage (Google reads that as a soft 404).
      { source: '/portfolio-item/:slug*', destination: '/work/', permanent: true },
      // Demo content from the old "agency9" WordPress theme. Portfolio-shaped
      // slugs, so /work is the honest destination for anything that links here.
      { source: '/agency9-:slug*', destination: '/work/', permanent: true },
      // More of the same WordPress theme, reported as 404 in Search Console
      // (Sep 2026). Taxonomy archives and demo pages, mapped to the section that
      // replaced each rather than rebuilt: the originals were theme filler with
      // no content worth recreating, and pages built only to catch old URLs
      // would be thin doorways.
      { source: '/portfolio-types/:slug*', destination: '/work/', permanent: true },
      { source: '/portfolio-category/:slug*', destination: '/work/', permanent: true },
      { source: '/case-study', destination: '/work/', permanent: true },
      { source: '/case-studies', destination: '/work/', permanent: true },
      { source: '/offer', destination: '/pricing/', permanent: true },
      { source: '/offers', destination: '/pricing/', permanent: true },
      { source: '/category/:slug*', destination: '/blog/', permanent: true },
      { source: '/tag/:slug*', destination: '/blog/', permanent: true },
      { source: '/author/:slug*', destination: '/about/', permanent: true },
      // Retired team profiles. These pages existed and were reachable, so a
      // hard 404 would discard any inbound link and read as a soft 404 to
      // Google. The team index is the honest replacement.
      { source: '/team/mohammad-iqbal', destination: '/team/', permanent: true },
      { source: '/team/vivek-gautam', destination: '/team/', permanent: true },
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
