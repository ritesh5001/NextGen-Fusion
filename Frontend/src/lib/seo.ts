import type { Metadata } from "next"

// www is the canonical host: Google had already indexed it, so we follow that
// choice rather than forcing a migration. The apex 301s here (see
// next.config.js redirects). This one value feeds every canonical, OG url,
// sitemap entry and schema @id on the site.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nextgenfusion.in"

export const SITE_NAME = "NextGen Fusion"

// 1200x630 PNG. Social platforms (Facebook, LinkedIn, WhatsApp, X) do not render
// SVG previews, so the shared OG asset must stay a raster image.
export const DEFAULT_OG_IMAGE = "/og/og-default.png"

export const OG_IMAGES = [
  {
    url: DEFAULT_OG_IMAGE,
    width: 1200,
    height: 630,
    alt: "NextGen Fusion — websites, SEO and digital products that drive growth",
  },
]

/** Absolute URL for a site-relative path, honouring the `trailingSlash: true` config. */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path
  const clean = `/${path.replace(/^\/+/, "")}`
  const withSlash = clean === "/" || clean.endsWith("/") ? clean : `${clean}/`
  return `${siteUrl}${withSlash}`
}

/**
 * Absolute URL for a static asset. Unlike `absoluteUrl()` this must NOT append a
 * trailing slash — `/og/x.png/` is a 404, and schema image URLs have to resolve.
 */
export function assetUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path
  return `${siteUrl}/${path.replace(/^\/+/, "")}`
}

type BuildMetadataInput = {
  title: string
  description: string
  path: string
  /** Social-preview overrides; falls back to `title` / `description`. */
  ogTitle?: string
  ogDescription?: string
  twitterTitle?: string
  twitterDescription?: string
  image?: string
  type?: "website" | "article"
  noIndex?: boolean
  publishedTime?: string
  modifiedTime?: string
}

/**
 * Single source of truth for page metadata. Always emits a canonical URL plus
 * Open Graph and Twitter cards with a real image, so no route can silently ship
 * without a share preview.
 */
export function buildMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  twitterTitle,
  twitterDescription,
  image,
  type = "website",
  noIndex = false,
  publishedTime,
  modifiedTime,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path)
  const images = image
    ? [{ url: image, width: 1200, height: 630, alt: ogTitle ?? title }]
    : OG_IMAGES

  return {
    title,
    description,
    alternates: { canonical: url },
    // index:false keeps the page out of the SERP; follow:true still lets the
    // links on it pass equity. Store product pages link into /store/ and the
    // service pages, and nofollow was throwing that away for no benefit.
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type,
      images,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: twitterTitle ?? ogTitle ?? title,
      description: twitterDescription ?? ogDescription ?? description,
      images: images.map((i) => i.url),
    },
  }
}

// ── Structured data builders ─────────────────────────────────────────────────

export const ORGANIZATION_ID = `${siteUrl}/#organization`

export type Crumb = { name: string; path: string }

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  }
}

export function serviceSchema({
  name,
  description,
  path,
}: {
  name: string
  description: string
  path: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    url: absoluteUrl(path),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: ["IN", "Worldwide"],
  }
}

export function articleSchema({
  title,
  description,
  path,
  image,
  publishedTime,
  modifiedTime,
  authorName = SITE_NAME,
}: {
  title: string
  description: string
  path: string
  image?: string
  publishedTime?: string
  modifiedTime?: string
  authorName?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    image: [assetUrl(image ?? DEFAULT_OG_IMAGE)],
    // A named human is a Person. Typing them as Organization and reusing the
    // company's @id told Google the byline and the publisher were one entity.
    author:
      authorName === SITE_NAME
        ? { "@id": ORGANIZATION_ID }
        : { "@type": "Person", name: authorName },
    publisher: { "@id": ORGANIZATION_ID },
    ...(publishedTime ? { datePublished: publishedTime } : {}),
    ...(modifiedTime ? { dateModified: modifiedTime } : {}),
  }
}
