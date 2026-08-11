import type { Metadata } from "next"

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nextgenfusion.in"

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
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      url,
      siteName: SITE_NAME,
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
    image: image ? [image] : [absoluteUrl(DEFAULT_OG_IMAGE)],
    author: { "@type": "Organization", name: authorName, "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    ...(publishedTime ? { datePublished: publishedTime } : {}),
    ...(modifiedTime ? { dateModified: modifiedTime } : {}),
  }
}
