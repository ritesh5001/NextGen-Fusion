import CTABanner from "@/components/cta-banner"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbSchema, siteUrl } from "@/lib/seo"
import {
  AUSTRALIA_PATH,
  auCities,
  auCityPath,
  auServicePath,
  auServices,
  auWorkingHours,
  type AuCity,
  type AuService,
} from "@/data/australia"
import { GrowthProblemFinder } from "./growth-problem-finder"
import { SelfCheck } from "./self-check"
import { AuCaseStudies, AuFaqs, AuHero, AuLinkList, AuSections, faqSchema } from "./parts"

function schemaFor(city: AuCity, service: AuService) {
  const path = auServicePath(city, service.slug)
  const url = absoluteUrl(path)
  const page = city.services[service.slug]
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: `${service.label} in ${city.name}`,
      serviceType: service.label,
      description: page.metaDescription,
      url,
      provider: { "@id": `${siteUrl}/#office-lucknow` },
      areaServed: {
        "@type": "City",
        name: city.name,
        address: { "@type": "PostalAddress", addressRegion: city.stateCode, addressCountry: "AU" },
      },
    },
    faqSchema(url, page.faqs),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Australia", path: AUSTRALIA_PATH },
      { name: city.name, path: auCityPath(city) },
      { name: service.label, path },
    ]),
  ]
}

export function AuServicePageView({ city, service }: { city: AuCity; service: AuService }) {
  const page = city.services[service.slug]
  const topic = `${service.label} in ${city.name}`

  return (
    <>
      <JsonLd data={schemaFor(city, service)} />
      <main className="min-h-screen bg-white">
        <AuHero
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Australia", href: `${AUSTRALIA_PATH}/` },
            { name: city.name, href: auCityPath(city) },
            { name: service.label, href: auServicePath(city, service.slug) },
          ]}
          eyebrow={topic}
          h1={page.h1}
          intro={page.intro}
          hours={auWorkingHours(city)}
          whatsappMessage={`Hi NextGen Fusion, I'm interested in ${service.label} for my business in ${city.name}.`}
        />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AuSections sections={page.sections} />

          <GrowthProblemFinder
            heading="Sound familiar?"
            intro="The problems we hear most often about this, why they happen and what we would do first."
            place={city.name}
            problems={page.problems}
          />

          <SelfCheck heading="A one-minute self-check" items={page.checklist} topic={topic} />

          {page.caseStudies && (
            <AuCaseStudies slugs={page.caseStudies} heading="Work we've published that's closest to this" />
          )}

          <AuFaqs faqs={page.faqs} />

          <AuLinkList
            heading={`More for ${city.name} businesses`}
            links={[
              ...auServices
                .filter((s) => s.slug !== service.slug)
                .map((s) => ({ href: auServicePath(city, s.slug), label: s.label })),
              { href: auCityPath(city), label: `All services in ${city.name}` },
            ]}
          />

          <AuLinkList
            heading={`${service.label} in other cities`}
            links={[
              ...auCities
                .filter((c) => c.slug !== city.slug)
                .map((c) => ({ href: auServicePath(c, service.slug), label: c.name })),
              { href: `/services/${service.serviceSlug}/`, label: `More about ${service.label}` },
            ]}
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <CTABanner />
        </div>
      </main>
    </>
  )
}
