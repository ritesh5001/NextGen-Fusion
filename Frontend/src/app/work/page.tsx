import Link from "next/link"
import CTABanner from "@/components/cta-banner"
import DeliveredWall from "@/components/delivered-wall"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbSchema, ORGANIZATION_ID, siteUrl } from "@/lib/seo"
import { deliveredProjects } from "@/lib/delivered-projects"
import { staticProjects } from "@/lib/static-projects"

const PATH = "/work"

export default function WorkPage() {
  const deliveredCount = deliveredProjects.length
  const featured = staticProjects.slice(0, 6)

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${absoluteUrl(PATH)}#collection`,
      url: absoluteUrl(PATH),
      name: "Projects delivered by NextGen Fusion",
      description:
        "Live websites and online stores delivered for clients across India and internationally.",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": ORGANIZATION_ID },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: staticProjects.length,
        itemListElement: staticProjects.map((project, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: absoluteUrl(`/work/${project.slug}`),
          name: project.title,
        })),
      },
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Work", path: PATH },
    ]),
  ]

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={schema} />
      <main className="pt-24">
        <section className="mx-auto max-w-7xl px-6 pb-4">
          <p className="text-sm font-medium uppercase tracking-wide text-purple-600">Our work</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            {deliveredCount} sites delivered, and the stories behind them
          </h1>
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 text-lg leading-relaxed text-gray-600">
              <p>
                Everything below is live and in production. Most of it is ecommerce — ethnic wear,
                jewellery, beauty, food and home brands selling direct — alongside B2B sites for
                manufacturers and engineering firms, and platforms for institutes and marketplaces.
              </p>
              <p>
                Work splits roughly into three kinds. Storefronts on Shopify and WooCommerce, where
                the job is catalogue, checkout and speed on a mid-range phone. Custom builds on
                Next.js, where the model is unusual enough that a platform gets in the way —
                multi-vendor marketplaces, B2B quoting engines, maritime procurement. And
                content-led sites for firms whose customers research before they enquire.
              </p>
            </div>
            <div className="space-y-4 text-lg leading-relaxed text-gray-600">
              <p>
                {staticProjects.length} of these have full case studies: what the client came with,
                what we recommended and why, what got built, and what it changed. They are the most
                useful thing on this site if you are trying to judge whether we would be any good at
                your project — considerably more useful than a logo wall.
              </p>
              <p>
                The rest link straight through to the live site. Click any of them and judge the
                work directly; that is the point of publishing them.
              </p>
              <p className="text-base">
                Looking for a specific capability instead?{" "}
                <Link href="/services/" className="font-medium text-purple-600 hover:underline">
                  Browse services
                </Link>{" "}
                or{" "}
                <Link href="/contact/" className="font-medium text-purple-600 hover:underline">
                  tell us what you need
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900">Case studies</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/work/${project.slug}/`}
                    className="inline-block py-1 text-gray-700 underline-offset-4 hover:text-gray-900 hover:underline"
                  >
                    {project.title}{" "}
                    <span className="text-gray-400">· {project.category}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <DeliveredWall
          showFilters
          heading="Every project we've shipped"
          subheading="Filter by category, or click any card to visit the live site."
        />

        <div className="mx-auto max-w-7xl px-6 pb-16">
          <CTABanner />
        </div>
      </main>
    </div>
  )
}
