/**
 * The services offered on the Australian pages. Labels and URL segments only:
 * the copy for each city × service page lives in that city's file.
 *
 * URL segments use the words Australians search ("google-ads", not "ppc").
 * `serviceSlug` is the matching /services/ page.
 */
export const auServiceSlugs = [
  "website-development",
  "web-design",
  "ecommerce-development",
  "shopify-development",
  "marketplace-development",
  "nextjs-development",
  "android-app-development",
  "seo",
  "google-ads",
  "social-media-marketing",
  "ai-automation",
  "software-development",
  "api-integration",
  "cloud-solutions",
  "website-maintenance",
] as const

export type AuServiceSlug = (typeof auServiceSlugs)[number]

export type AuServiceGroup = "build" | "grow" | "run"

export type AuService = {
  slug: AuServiceSlug
  label: string
  group: AuServiceGroup
  serviceSlug: string
}

export const auServices: AuService[] = [
  { slug: "website-development", label: "Website Development", group: "build", serviceSlug: "website-development-services" },
  { slug: "web-design", label: "Web Design", group: "build", serviceSlug: "web-design-services" },
  { slug: "ecommerce-development", label: "Ecommerce Development", group: "build", serviceSlug: "ecommerce-web-development-services" },
  { slug: "shopify-development", label: "Shopify Development", group: "build", serviceSlug: "shopify-development-services" },
  { slug: "marketplace-development", label: "Marketplace Development", group: "build", serviceSlug: "marketplace-development-services" },
  { slug: "nextjs-development", label: "Next.js Development", group: "build", serviceSlug: "nextjs-development-services" },
  { slug: "android-app-development", label: "Android App Development", group: "build", serviceSlug: "android-app-development-services" },
  { slug: "seo", label: "SEO Services", group: "grow", serviceSlug: "seo-services" },
  { slug: "google-ads", label: "Google Ads Management", group: "grow", serviceSlug: "ppc-services" },
  { slug: "social-media-marketing", label: "Social Media Marketing", group: "grow", serviceSlug: "social-media-marketing-services" },
  { slug: "ai-automation", label: "AI Automation", group: "run", serviceSlug: "ai-automation-development-services" },
  { slug: "software-development", label: "Custom Software Development", group: "run", serviceSlug: "software-development-services" },
  { slug: "api-integration", label: "API Integration", group: "run", serviceSlug: "api-integration-services" },
  { slug: "cloud-solutions", label: "Cloud Solutions", group: "run", serviceSlug: "cloud-solutions" },
  { slug: "website-maintenance", label: "Website Maintenance", group: "run", serviceSlug: "website-maintenance-services" },
]

export const auServiceGroups: { group: AuServiceGroup; label: string }[] = [
  { group: "build", label: "Build what you sell on" },
  { group: "grow", label: "Bring in customers" },
  { group: "run", label: "Run it with less effort" },
]

export function getAuService(slug: string): AuService | undefined {
  return auServices.find((service) => service.slug === slug)
}
