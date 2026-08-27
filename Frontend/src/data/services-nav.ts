/**
 * The twelve service pages, in one place.
 *
 * These carry ~2,200 words each and are the pages we actually want to rank,
 * but they had no sitewide internal links — six of them were reachable only
 * through the /services hub. Internal links are how you signal which pages
 * matter, so the footer, navigation and sitemap all read from this list.
 */
export type ServiceNavItem = {
  slug: string
  label: string
}

export const serviceNavItems: ServiceNavItem[] = [
  { slug: "website-development-services", label: "Website Development" },
  { slug: "ecommerce-web-development-services", label: "E-commerce Development" },
  { slug: "web-design-services", label: "Web Design" },
  { slug: "android-app-development-services", label: "Android App Development" },
  { slug: "seo-services", label: "SEO Services" },
  { slug: "ppc-services", label: "PPC & Google Ads" },
  { slug: "social-media-marketing-services", label: "Social Media Marketing" },
  { slug: "ai-automation-development-services", label: "AI Automation" },
  { slug: "software-development-services", label: "Software Development" },
  { slug: "api-integration-services", label: "API Integration" },
  { slug: "cloud-solutions", label: "Cloud Solutions" },
  { slug: "website-maintenance-services", label: "Website Maintenance" },
]

export const serviceSlugs = serviceNavItems.map((item) => item.slug)
