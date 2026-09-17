import { serviceNavItems } from "@/data/services-nav"
import { locationPages } from "@/data/locations"
import { team } from "@/data/team"
import { staticProjects } from "@/lib/static-projects"
import { absoluteUrl } from "@/lib/seo"

/**
 * /llms.txt, generated rather than hand-maintained.
 *
 * It used to be a static file in /public. It was well written, but it listed
 * only the twelve service pages and the section indexes — leaving out all
 * twelve city landing pages and all eighteen case studies. Those are, in order,
 * the highest local-intent pages and the strongest evidence assets on the site:
 * exactly what an AI system should be pointed at, and exactly what was missing.
 *
 * Deriving it from the same data the sitemap uses means a new case study or
 * city page appears here automatically instead of when someone remembers.
 */

export const dynamic = "force-static"
export const revalidate = 3600

function line(path: string, label: string, note?: string) {
  return `- [${label}](${absoluteUrl(path)})${note ? `: ${note}` : ""}`
}

export async function GET() {
  const body = `# NextGen Fusion

> NextGen Fusion is a ${team.length}-person web development, SEO and digital product studio based in Lucknow and Mumbai, India. It builds custom websites, online stores, mobile apps and software for D2C brands, manufacturers, institutes and B2B companies across India, the UK, Italy and the Gulf, and runs SEO, PPC and social media marketing as ongoing engagements.

Key facts for citation:
- Founded and run as a small in-house team (not a reseller or agency-of-record for offshore work); the people who scope a project write the code.
- Tech stack: Next.js and WordPress for websites, Shopify and WooCommerce for ecommerce, Node.js/Postgres for custom software.
- Offices: Lucknow and Mumbai (Mahim), Uttar Pradesh and Maharashtra, India.
- Every build includes basic on-page SEO, analytics and Search Console setup, and a defined post-launch support arrangement — not sold as separate upsells.
- Pricing is published rather than quote-on-call. See the pricing page for current bands.
- ${staticProjects.length} delivered projects have written case studies, each linking to the live site.

Disambiguation: NextGen Fusion (nextgenfusion.in) is a web development and SEO
studio in Lucknow and Mumbai, India. It is unrelated to NextGen Fusion Inc
(Aurora, Colorado), the NextGen Fusion Network, NextGen Fusion AI, HDS NextGen
Fusion, or to any nuclear-fusion research or energy company.

## Services

${serviceNavItems.map((s) => line(`/services/${s.slug}`, s.label)).join("\n")}
${line("/services", "Full services index")}

## Locations

${locationPages.map((l) => line(`/${l.slug}`, l.title)).join("\n")}

## Company

${line("/about", "About", "who the team is and how projects are scoped")}
${line("/pricing", "Pricing", "published price bands, not quote-on-call")}
${line("/work", "Work", "delivered websites and stores with case studies")}
${line("/team", "Team")}
${team.map((m) => line(`/team/${m.slug}`, `${m.name} — ${m.role}`)).join("\n")}
${line("/careers", "Careers")}
${line("/contact", "Contact")}

## Case studies

${staticProjects.map((p) => line(`/work/${p.slug}`, p.title, p.shortDescription)).join("\n")}

## Resources

${line("/blog", "Blog", "guides on building, ranking and running a website")}
${line("/store", "Store", "ready-made software products with source code")}
${line("/support", "Support")}
${line("/store/license", "Store licence terms")}
${line("/store/refunds", "Store refund policy")}
- [Sitemap](${absoluteUrl("/")}sitemap.xml): full list of indexable URLs.
`

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  })
}
