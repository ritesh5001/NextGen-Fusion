import Link from "next/link"
import { ArrowRight } from "lucide-react"
import CTABanner from "@/components/cta-banner"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbSchema } from "@/lib/seo"
import { cityServiceGroups, cityServices, getCityService } from "@/data/city-pages/services"
import { cityPath, cityServiceHref, findCity } from "@/data/city-pages/paths"
import type { CityPage, CityRegion } from "@/data/city-pages/types"
import { GrowthProblemFinder } from "./growth-problem-finder"
import { CityFaqs, CityHero, CityLinkList, CitySections, cityAreaServed, faqSchema, officeNodes } from "./parts"

function schemaFor<C extends CityPage>(region: CityRegion<C>, city: C) {
  const url = absoluteUrl(cityPath(region, city))
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: `Website development, SEO and digital marketing in ${city.name}`,
      description: city.page.metaDescription,
      url,
      provider: { "@id": region.providerId(city) },
      areaServed: cityAreaServed(city, region.countryCode, region.localAddress?.(city)),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `Services for ${city.name} businesses`,
        itemListElement: cityServices.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: `${service.label} in ${city.name}`,
            url: absoluteUrl(cityServiceHref(region, city, service.slug)),
          },
        })),
      },
    },
    faqSchema(url, city.page.faqs),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: region.name, path: region.path },
      { name: city.name, path: cityPath(region, city) },
    ]),
    ...officeNodes(region, city),
  ]
}

export function CityPageView<C extends CityPage>({ region, city }: { region: CityRegion<C>; city: C }) {
  const { page } = city
  const nearby = city.nearby.map((slug) => findCity(region, slug)).filter((c) => c !== undefined)

  return (
    <>
      <JsonLd data={schemaFor(region, city)} />
      <main className="min-h-screen">
        <CityHero
          crumbs={[
            { name: "Home", href: "/" },
            { name: region.name, href: `${region.path}/` },
            { name: city.name, href: cityPath(region, city) },
          ]}
          eyebrow={`${city.name}, ${city.state}`}
          h1={page.h1}
          intro={page.intro}
          presence={region.presence(city)}
          hours={region.hours(city)}
          whatsappMessage={`Hi NextGen Fusion, I run a business in ${city.name} and would like some help growing it.`}
        />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <CitySections sections={page.sections} />

          <div className="mb-14">
            <h2 className="text-2xl font-medium text-ink sm:text-3xl tracking-tight">Who we help in {city.name}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {page.industries.map((industry) => (
                <div key={industry.name} className="rounded-[28px] border border-ink/10 p-5">
                  <p className="font-semibold text-ink">{industry.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{industry.need}</p>
                </div>
              ))}
            </div>
          </div>

          <GrowthProblemFinder
            heading={`What's holding your ${city.name} business back?`}
            intro="Pick the one that sounds most like you. You'll see why it usually happens and what we would do about it first, whether or not you hire us."
            place={city.name}
            problems={page.problems.map((problem) => ({
              ...problem,
              link: {
                href: cityServiceHref(region, city, problem.service),
                label: `${getCityService(problem.service)?.label ?? "This service"} in ${city.name}`,
              },
            }))}
          />

          <div className="mb-14">
            <h2 className="text-2xl font-medium text-ink sm:text-3xl tracking-tight">Everything we do for {city.name} businesses</h2>
            {cityServiceGroups.map((group) => (
              <div key={group.group} className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-mute">{group.label}</h3>
                <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                  {cityServices
                    .filter((service) => service.group === group.group)
                    .map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={cityServiceHref(region, city, service.slug)}
                          className="group flex h-full flex-col rounded-[28px] border border-ink/10 p-5 transition-colors hover:border-gray-900"
                        >
                          <span className="flex items-center justify-between gap-2 font-semibold text-ink">
                            {service.label} in {city.name}
                            <ArrowRight className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-ink" aria-hidden="true" />
                          </span>
                          <span className="mt-2 text-sm leading-relaxed text-ink-soft">{city.services[service.slug].card}</span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mb-14">
            <h2 className="text-2xl font-medium text-ink sm:text-3xl tracking-tight">Areas we work with</h2>
            <p className="mt-4 leading-relaxed text-ink-soft">{city.areas.join(" · ")}</p>
          </div>

          <CityFaqs faqs={page.faqs} />

          {nearby.length > 0 && (
            <CityLinkList
              heading="Nearby cities"
              links={[
                ...nearby.map((c) => ({ href: cityPath(region, c), label: c.name })),
                { href: `${region.path}/`, label: `All cities in ${region.name}` },
              ]}
            />
          )}
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <CTABanner />
        </div>
      </main>
    </>
  )
}
