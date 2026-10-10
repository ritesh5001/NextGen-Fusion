import Link from "next/link"
import CTABanner from "@/components/cta-banner"
import DeliveredWall from "@/components/delivered-wall"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbSchema, ORGANIZATION_ID, siteUrl } from "@/lib/seo"
import { staticProjects } from "@/lib/static-projects"

const PATH = "/work"

export default function WorkPage() {
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
    <div className="min-h-screen">
      <JsonLd data={schema} />
      <main className="pt-24">
        <section className="mx-auto max-w-7xl px-6 pb-4">
          <p className="text-sm font-medium uppercase tracking-wide text-brand">Our work</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-medium leading-tight text-ink sm:text-5xl tracking-tight">
            Sites we&apos;ve delivered, and the stories behind them
          </h1>
        </section>

        <DeliveredWall
          showFilters
          heading="Every project we've shipped"
          subheading="Cards marked Case study open the full write-up; every other card opens the live site."
        />

        <div className="mx-auto max-w-7xl px-6 pb-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 text-lg leading-relaxed text-ink-soft">
              <p>
                Everything above is live and in production. Most of it is ecommerce — ethnic wear,
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
            <div className="space-y-4 text-lg leading-relaxed text-ink-soft">
              <p>
                Cards marked <strong className="font-semibold text-ink">Case study</strong> have a
                full write-up: what the client came with, what we recommended and why, what got built,
                and what it changed. Cards marked <strong className="font-semibold text-ink">Live
                site</strong> link straight to the store or site; open any of them and judge the work
                directly.
              </p>
              <p className="text-base">
                Looking for a specific capability instead?{" "}
                <Link href="/services/" className="font-medium text-brand hover:underline">
                  Browse services
                </Link>{" "}
                or{" "}
                <Link href="/contact/" className="font-medium text-brand hover:underline">
                  tell us what you need
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-[28px] border border-ink/10 p-6">
            <h2 className="text-lg font-medium text-ink tracking-tight">Case studies</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/work/${project.slug}/`}
                    className="inline-block py-1 text-ink-soft underline-offset-4 hover:text-ink hover:underline"
                  >
                    {project.title}{" "}
                    <span className="text-ink-soft">· {project.category}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <CTABanner className="mt-8" />
        </div>
      </main>
    </div>
  )
}
