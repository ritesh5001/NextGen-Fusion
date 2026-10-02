/**
 * The services offered on every city page (Australia, India). Labels and URL
 * segments only: the copy for each city × service page lives in that city's file.
 *
 * URL segments use the words people search ("google-ads", not "ppc").
 * `serviceSlug` is the matching /services/ page.
 */
export const cityServiceSlugs = [
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

export type CityServiceSlug = (typeof cityServiceSlugs)[number]

export type CityServiceGroup = "build" | "grow" | "run"

export type CityService = {
  slug: CityServiceSlug
  label: string
  group: CityServiceGroup
  serviceSlug: string
}

export const cityServices: CityService[] = [
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

export const cityServiceGroups: { group: CityServiceGroup; label: string }[] = [
  { group: "build", label: "Build what you sell on" },
  { group: "grow", label: "Bring in customers" },
  { group: "run", label: "Run it with less effort" },
]

export function getCityService(slug: string): CityService | undefined {
  return cityServices.find((service) => service.slug === slug)
}
