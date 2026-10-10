import Link from "next/link"
import { ArrowRight } from "lucide-react"
import CTABanner from "@/components/cta-banner"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbSchema, ORGANIZATION_ID } from "@/lib/seo"
import { cityServiceGroups, cityServices } from "@/data/city-pages/services"
import { cityPath } from "@/data/city-pages/paths"
import type { CityPage, CityRegion } from "@/data/city-pages/types"
import { GrowthProblemFinder } from "./growth-problem-finder"
import { CityFaqs, CityHero, CitySections, faqSchema } from "./parts"

function schema<C extends CityPage>(region: CityRegion<C>) {
  const url = absoluteUrl(region.path)
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: `Website development, SEO and digital marketing in ${region.name}`,
      description: region.hub.metaDescription,
      url,
      provider: { "@id": ORGANIZATION_ID },
      areaServed: { "@type": "Country", name: region.name },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${url}#cities`,
      itemListElement: region.cities.map((city, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: city.name,
        url: absoluteUrl(cityPath(region, city)),
      })),
    },
    faqSchema(url, region.hub.faqs),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: region.name, path: region.path },
    ]),
  ]
}

export function CityHubPage<C extends CityPage>({ region }: { region: CityRegion<C> }) {
  const { hub } = region
  return (
    <>
      <JsonLd data={schema(region)} />
      <main className="min-h-screen">
        <CityHero
          crumbs={[
            { name: "Home", href: "/" },
            { name: region.name, href: `${region.path}/` },
          ]}
          eyebrow={region.name}
          h1={hub.h1}
          intro={hub.intro}
          presence={hub.heroPresence}
          hours={hub.heroHours}
          whatsappMessage={`Hi NextGen Fusion, I run a business in ${region.name} and would like some help growing it.`}
        />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <h2 className="text-2xl font-medium text-ink sm:text-3xl tracking-tight">Find your city</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {region.cities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={cityPath(region, city)}
                    className="group flex h-full flex-col rounded-[28px] border border-ink/10 p-5 transition-colors hover:border-gray-900"
                  >
                    <span className="flex items-center justify-between gap-2 font-semibold text-ink">
                      {city.name}, {city.stateCode}
                      <ArrowRight className="h-4 w-4 shrink-0 text-gray-400 group-hover:text-ink" aria-hidden="true" />
                    </span>
                    <span className="mt-2 text-sm leading-relaxed text-ink-soft">{city.summary}</span>
                    <span className="mt-3 text-xs text-ink-mute">Our hours there: {region.hours(city)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-14">
            <h2 className="text-2xl font-medium text-ink sm:text-3xl tracking-tight">{hub.regionalHeading}</h2>
            <p className="mt-4 leading-relaxed text-ink-soft">{hub.regionalIntro}</p>
            <dl className="mt-5 space-y-3">
              {hub.regionalCentres.map((region) => (
                <div key={region.state} className="sm:flex sm:gap-3">
                  <dt className="font-semibold text-ink sm:w-48 sm:shrink-0">{region.state}</dt>
                  <dd className="text-ink-soft">{region.places.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </div>

          <GrowthProblemFinder
            heading="What's holding your business back?"
            intro={`These are the problems business owners in ${region.name} bring us most often. Pick the closest one to see why it happens and what we would do first.`}
            place={region.name}
            problems={hub.problems.map((problem) => ({
              ...problem,
              link: { href: `/services/${problem.serviceSlug}/`, label: `More about ${problem.serviceLabel}` },
            }))}
          />

          <CitySections sections={hub.sections} />

          <div className="mb-14">
            <h2 className="text-2xl font-medium text-ink sm:text-3xl tracking-tight">{hub.essentialsHeading}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {hub.essentials.map((item) => (
                <div key={item.heading} className="rounded-[28px] border border-ink/10 p-5">
                  <p className="font-semibold text-ink">{item.heading}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-14">
            <h2 className="text-2xl font-medium text-ink sm:text-3xl tracking-tight">What we do</h2>
            {cityServiceGroups.map((group) => (
              <div key={group.group} className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-mute">{group.label}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {cityServices
                    .filter((service) => service.group === group.group)
                    .map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.serviceSlug}/`}
                          className="inline-block rounded-full border border-ink/10 px-4 py-2 text-sm text-ink transition-colors hover:border-gray-900"
                        >
                          {service.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>

          <CityFaqs faqs={hub.faqs} />
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <CTABanner />
        </div>
      </main>
    </>
  )
}
