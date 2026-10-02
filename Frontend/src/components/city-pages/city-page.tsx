import Link from "next/link"
import { ArrowRight } from "lucide-react"
import CTABanner from "@/components/cta-banner"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbSchema, siteUrl } from "@/lib/seo"
import {
  AUSTRALIA_PATH,
  auCityPath,
  auServiceGroups,
  auServicePath,
  auServices,
  auWorkingHours,
  getAuCity,
  getAuService,
  type AuCity,
} from "@/data/australia"
import { GrowthProblemFinder } from "./growth-problem-finder"
import { AuFaqs, AuHero, AuLinkList, AuSections, faqSchema } from "./parts"

function schemaFor(city: AuCity) {
  const url = absoluteUrl(auCityPath(city))
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: `Website development, SEO and digital marketing in ${city.name}`,
      description: city.page.metaDescription,
      url,
      provider: { "@id": `${siteUrl}/#office-lucknow` },
      // Served remotely: name the city and its country, never an address there.
      areaServed: {
        "@type": "City",
        name: city.name,
        address: { "@type": "PostalAddress", addressRegion: city.stateCode, addressCountry: "AU" },
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `Services for ${city.name} businesses`,
        itemListElement: auServices.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: `${service.label} in ${city.name}`,
            url: absoluteUrl(auServicePath(city, service.slug)),
          },
        })),
      },
    },
    faqSchema(url, city.page.faqs),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Australia", path: AUSTRALIA_PATH },
      { name: city.name, path: auCityPath(city) },
    ]),
  ]
}

export function AuCityPage({ city }: { city: AuCity }) {
  const { page } = city
  const nearby = city.nearby.map(getAuCity).filter((c) => c !== undefined)

  return (
    <>
      <JsonLd data={schemaFor(city)} />
      <main className="min-h-screen bg-white">
        <AuHero
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Australia", href: `${AUSTRALIA_PATH}/` },
            { name: city.name, href: auCityPath(city) },
          ]}
          eyebrow={`${city.name}, ${city.state}`}
          h1={page.h1}
          intro={page.intro}
          hours={auWorkingHours(city)}
          whatsappMessage={`Hi NextGen Fusion, I run a business in ${city.name} and would like some help growing it.`}
        />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AuSections sections={page.sections} />

          <div className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Who we help in {city.name}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {page.industries.map((industry) => (
                <div key={industry.name} className="rounded-2xl border border-gray-200 p-5">
                  <p className="font-semibold text-gray-900">{industry.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{industry.need}</p>
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
                href: auServicePath(city, problem.service),
                label: `${getAuService(problem.service)?.label ?? "This service"} in ${city.name}`,
              },
            }))}
          />

          <div className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Everything we do for {city.name} businesses</h2>
            {auServiceGroups.map((group) => (
              <div key={group.group} className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">{group.label}</h3>
                <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                  {auServices
                    .filter((service) => service.group === group.group)
                    .map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={auServicePath(city, service.slug)}
                          className="group flex h-full flex-col rounded-2xl border border-gray-200 p-5 transition-colors hover:border-gray-900"
                        >
                          <span className="flex items-center justify-between gap-2 font-semibold text-gray-900">
                            {service.label} in {city.name}
                            <ArrowRight className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-gray-900" aria-hidden="true" />
                          </span>
                          <span className="mt-2 text-sm leading-relaxed text-gray-600">{city.services[service.slug].card}</span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Areas we work with</h2>
            <p className="mt-4 leading-relaxed text-gray-600">{city.areas.join(" · ")}</p>
          </div>

          <AuFaqs faqs={page.faqs} />

          {nearby.length > 0 && (
            <AuLinkList
              heading="Nearby cities"
              links={[
                ...nearby.map((c) => ({ href: auCityPath(c), label: c.name })),
                { href: `${AUSTRALIA_PATH}/`, label: "All Australian cities" },
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
