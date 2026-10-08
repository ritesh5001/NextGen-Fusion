import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 56,
  title: "Next.js SEO checklist: metadata, sitemaps, schema and rendering mistakes that hurt rankings",
  slug: "nextjs-seo-checklist",
  excerpt: "A Next.js SEO checklist: metadata, canonical URLs, sitemaps, robots, structured data and the rendering mistakes that quietly stop pages ranking.",
  category: "SEO",
  primaryKeyword: "next.js seo checklist",
  cover_image: "/projects/nextmentor/screenshot-1.png",
  introduction: `<p>Next.js is very good for SEO when its features are used properly: pages rendered on the server or at build time, unique metadata on every page, correct canonical URLs, a generated sitemap and robots file, structured data, and proper status codes. Most Next.js sites that rank poorly have a handful of avoidable problems, such as important content that only appears after client-side JavaScript runs, duplicate titles from a shared layout, or missing canonicals on dynamic routes.</p>
<p>This checklist is for the App Router. Work through it on any Next.js site before launch, and again after major changes.</p>`,
  content: `<h2>1. Render content on the server</h2>
<p>Pages built with Server Components, static generation or server-side rendering send complete HTML to crawlers. Pages that fetch their main content in the browser (inside <code>useEffect</code>, for example) send an empty shell first. Google can render JavaScript, but later and less reliably, and many AI crawlers don't render it at all.</p>
<ul>
<li>Fetch page content on the server for anything that should rank.</li>
<li>Add <code>"use client"</code> only to the interactive parts, not whole pages.</li>
<li>Check with View Source: the main text should be in the HTML.</li>
</ul>
<h2>2. Unique metadata on every page</h2>
<p>Use the <a href="https://nextjs.org/docs/app/api-reference/functions/generate-metadata" rel="noopener">Metadata API</a>: export <code>metadata</code> for static pages or <code>generateMetadata</code> for dynamic routes. Every indexable page needs its own title and description.</p>
<ul>
<li>Use a title template in the root layout (for example "%s | Brand") so pages only supply their own part.</li>
<li>Don't let a layout's title apply to every child page by accident.</li>
<li>Keep titles around 60 characters and descriptions around 150–160.</li>
</ul>
<h2>3. Canonical URLs</h2>
<p>Set <code>alternates.canonical</code> on every page, especially dynamic routes. Make the canonical absolute (set <code>metadataBase</code> in the root layout) and consistent with your trailing-slash setting. Pages reachable through several URLs, such as with tracking parameters, need the canonical to point at one.</p>
<h2>4. Trailing slashes and redirects</h2>
<p>Pick one style, with or without a trailing slash, set <code>trailingSlash</code> to match, and make sure internal links, canonicals and the sitemap all use it. Mismatches create redirect chains and duplicate signals. Use permanent redirects in <code>next.config</code> for moved pages.</p>
<h2>5. A generated sitemap</h2>
<p>Create <code>app/sitemap.ts</code> and generate entries from your real data, so new products, posts and pages appear automatically. Include only indexable, canonical URLs, with honest last-modified dates. Large sites can split sitemaps with <code>generateSitemaps</code>.</p>
<h2>6. robots.txt</h2>
<p>Create <code>app/robots.ts</code>, allow the pages you want crawled, block only what you mean to, and reference the sitemap. Make sure staging environments are blocked and production isn't.</p>
<h2>7. Proper status codes</h2>
<ul>
<li>Call <code>notFound()</code> for missing items so the page returns a real 404, not a 200 with "not found" text (a soft 404).</li>
<li>Use <code>redirect()</code> or <code>permanentRedirect()</code> for moved content.</li>
<li>With <code>generateStaticParams</code>, decide whether unknown parameters should 404 (<code>dynamicParams = false</code>) or render on demand.</li>
</ul>
<h2>8. Structured data</h2>
<p>Add JSON-LD in a <code>script</code> tag rendered by a Server Component: Organization on the homepage, Article on posts, Product on product pages, BreadcrumbList on deeper pages, and FAQPage where there's a visible FAQ. Validate with Google's Rich Results Test.</p>
<h2>9. Open Graph and share images</h2>
<p>Set Open Graph and Twitter metadata per page. Next.js can generate share images per page with <code>opengraph-image</code> files or the image response API, which saves designing one for every page. See the <a href="https://nextjs.org/docs/app/getting-started/metadata-and-og-images" rel="noopener">metadata and OG images guide</a>.</p>
<h2>10. Images and performance</h2>
<ul>
<li>Use <code>next/image</code> with correct <code>sizes</code>, so phones get small images.</li>
<li>Mark the hero image as a priority so it isn't lazy-loaded.</li>
<li>Use <code>next/font</code> to avoid layout shift and extra font requests.</li>
<li>Watch client-side JavaScript size; large client bundles hurt interaction speed.</li>
</ul>
<h2>11. Internal links</h2>
<p>Use <code>next/link</code> for internal links, with descriptive anchor text. Links rendered only after user interaction, or built with click handlers instead of real anchors, aren't followed by crawlers.</p>
<h2>12. International sites</h2>
<p>For several languages or regions, set <code>alternates.languages</code> so each page lists its hreflang alternates, and make each language version a real, separate URL.</p>
<h2>13. After launch</h2>
<ul>
<li>Verify the site in Google Search Console and submit the sitemap.</li>
<li>Inspect a few key URLs to confirm Google sees the rendered content and canonical you expect.</li>
<li>Watch the Page indexing report for soft 404s, duplicates and "crawled – not indexed" pages.</li>
</ul>
<p>For the general indexing checks that apply to any site, see <a href="/blog/website-not-showing-on-google/">why your website isn't showing on Google</a>, and for deciding whether Next.js is right in the first place, <a href="/blog/nextjs-vs-wordpress-business-website/">Next.js vs WordPress</a>.</p>
<h2>Next.js SEO questions</h2>
<h3>Is Next.js better for SEO than WordPress?</h3>
<p>It can produce faster pages and gives developers full control, but a well-configured WordPress site ranks just as well. Content and links matter more than the framework.</p>
<h3>Do client components hurt SEO?</h3>
<p>Not when they're rendered on the server first, which Next.js does by default. The problem is content fetched only in the browser.</p>
<h3>Does Next.js handle sitemaps automatically?</h3>
<p>No. It gives you the file conventions; you generate the entries from your data.</p>`,
  conclution: `<p>The most common Next.js SEO mistake is content that only appears after JavaScript runs in the browser. Fix that first; everything else on this list is easier.</p>
<p>Our <a href="/services/nextjs-development-services/">Next.js team</a> builds and audits sites against this checklist.</p>`,
}
