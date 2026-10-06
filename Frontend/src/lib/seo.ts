import type { Metadata } from "next"

// www is the canonical host: Google had already indexed it, so we follow that
// choice rather than forcing a migration. The apex 301s here (see
// next.config.js redirects). This one value feeds every canonical, OG url,
// sitemap entry and schema @id on the site.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nextgenfusion.in"

export const SITE_NAME = "NextGen Fusion"
/** The brand line, used wherever the site describes itself in one sentence. */
export const SITE_TAGLINE = "Web Development, AI & Digital Solutions for Growing Businesses"

/**
 * Where we take on work. The team works remotely from Lucknow and Mumbai,
 * India; there is no office in any of the other markets, and pages say so.
 * Every schema that declares areaServed reads this one list, so the markets
 * never disagree between the Organization, its offices and the services.
 */
export const SERVICE_AREAS: { code: string; name: string }[] = [
  { code: "IN", name: "India" },
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "AU", name: "Australia" },
  { code: "OM", name: "Oman" },
  { code: "SG", name: "Singapore" },
]

/** Plain-text form for contactPoint and Service areaServed. */
export const SERVICE_AREA_CODES = [...SERVICE_AREAS.map((area) => area.code), "Europe", "Worldwide"]

/** Structured form for the Organization node. */
export const SERVICE_AREA_NODES = [
  ...SERVICE_AREAS.map((area) => ({ "@type": "Country", name: area.name })),
  { "@type": "Place", name: "Europe" },
  { "@type": "Place", name: "Worldwide" },
]

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

const BRAND_SUFFIX = ` | ${SITE_NAME}`
/** Google truncates titles at roughly 600px, which is about 60 characters. */
export const TITLE_MAX = 60
/** Snippets are cut at roughly 920px on desktop, about 155–160 characters. */
export const DESCRIPTION_MAX = 160

/**
 * A title that fits the SERP: " | NextGen Fusion" is appended only when it
 * still fits in 60 characters (the keyword is worth more than the name), and
 * when the title alone is too long a trailing tagline after " — ", " – ",
 * " | ", ": " or " - " is cut. Always absolute, so a section layout that sets
 * its own plain title can't cancel the brand suffix. Pages should still be
 * written short; this only stops a long one from shipping truncated.
 */
export function fitTitle(title: string): Metadata["title"] {
  const core = title.endsWith(BRAND_SUFFIX) ? title.slice(0, -BRAND_SUFFIX.length) : title
  let short = core
  for (const separator of [" — ", " – ", " | ", ": ", " - "]) {
    if (short.length <= TITLE_MAX) break
    const at = short.indexOf(separator)
    if (at > 15) short = short.slice(0, at)
  }
  if (short.length + BRAND_SUFFIX.length <= TITLE_MAX) return { absolute: `${short}${BRAND_SUFFIX}` }
  return { absolute: short.length <= TITLE_MAX ? short : clampText(short, TITLE_MAX) }
}

function clampText(text: string, max: number): string {
  const cut = text.slice(0, max - 1)
  const space = cut.lastIndexOf(" ")
  return `${(space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[\s,;:—–-]+$/, "")}…`
}

/**
 * A meta description that fits the snippet: whole sentences where they fit,
 * otherwise cut at a word boundary. Long descriptions were being truncated by
 * Google mid-sentence, usually just before the call to action.
 */
export function fitDescription(description: string): string {
  const text = description.replace(/\s+/g, " ").trim()
  if (text.length <= DESCRIPTION_MAX) return text
  const sentences = text.match(/[^.!?]+[.!?]+(?=\s|$)/g) ?? []
  let fitted = ""
  for (const sentence of sentences) {
    const next = `${fitted}${sentence}`.trim()
    if (next.length > DESCRIPTION_MAX) break
    fitted = `${next} `
  }
  fitted = fitted.trim()
  return fitted.length >= 90 ? fitted : clampText(text, DESCRIPTION_MAX)
}

/**
 * A generated 1200×630 share image for one page (see app/api/og). 554 pages
 * shared the same og-default.png, so every link posted to WhatsApp, LinkedIn or
 * X looked identical whatever it pointed to.
 */
export function ogImageUrl(title: string, eyebrow?: string): string {
  const params = new URLSearchParams({ title })
  if (eyebrow) params.set("eyebrow", eyebrow)
  return `/api/og/?${params.toString()}`
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
  /** Small label above the title on the generated share image, e.g. a city. */
  ogEyebrow?: string
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
  ogEyebrow,
  type = "website",
  noIndex = false,
  publishedTime,
  modifiedTime,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path)
  const shareTitle = ogTitle ?? title
  const images = image
    ? [{ url: image, alt: shareTitle }]
    : [{ url: ogImageUrl(shareTitle, ogEyebrow), width: 1200, height: 630, alt: shareTitle }]
  const metaDescription = fitDescription(description)

  return {
    title: fitTitle(title),
    description: metaDescription,
    alternates: { canonical: url },
    // index:false keeps the page out of the SERP; follow:true still lets the
    // links on it pass equity. Store product pages link into /store/ and the
    // service pages, and nofollow was throwing that away for no benefit.
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: ogTitle ?? title,
      description: ogDescription ?? metaDescription,
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
      description: twitterDescription ?? ogDescription ?? metaDescription,
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
    areaServed: SERVICE_AREA_CODES,
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
  authorSlug,
}: {
  title: string
  description: string
  path: string
  image?: string
  publishedTime?: string
  modifiedTime?: string
  authorName?: string
  /** Team slug, when the byline resolves to a real person on /team/. */
  authorSlug?: string
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
    // When the byline matches a team member, reference their canonical Person
    // @id instead of minting a fresh name-only node on every post — that is
    // what connects a byline to a job title, an employer and a profile page.
    author:
      authorName === SITE_NAME
        ? { "@id": ORGANIZATION_ID }
        : authorSlug
          ? { "@id": `${siteUrl}/team/${authorSlug}/#person` }
          : { "@type": "Person", name: authorName },
    publisher: { "@id": ORGANIZATION_ID },
    ...(publishedTime ? { datePublished: publishedTime } : {}),
    ...(modifiedTime ? { dateModified: modifiedTime } : {}),
  }
}
