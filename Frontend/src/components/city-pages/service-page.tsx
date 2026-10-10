import CTABanner from "@/components/cta-banner"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbSchema } from "@/lib/seo"
import { cityServices, type CityService } from "@/data/city-pages/services"
import { cityPath, cityServiceHref, cityServicePath, isServicePageIndexed } from "@/data/city-pages/paths"
import { isExistingPage } from "@/data/city-pages/types"
import type { CityPage, CityRegion, CityServicePage } from "@/data/city-pages/types"
import { GrowthProblemFinder } from "./growth-problem-finder"
import { SelfCheck } from "./self-check"
import { CityCaseStudies, CityFaqs, CityHero, CityLinkList, CitySections, cityAreaServed, faqSchema, officeNodes } from "./parts"

type Props<C extends CityPage> = { region: CityRegion<C>; city: C; service: CityService; page: CityServicePage }

function schemaFor<C extends CityPage>({ region, city, service, page }: Props<C>) {
  const path = cityServicePath(region, city, service.slug)
  const url = absoluteUrl(path)
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: `${service.label} in ${city.name}`,
      serviceType: service.label,
      description: page.metaDescription,
      url,
      provider: { "@id": region.providerId(city) },
      areaServed: cityAreaServed(city, region.countryCode, region.localAddress?.(city)),
    },
    faqSchema(url, page.faqs),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: region.name, path: region.path },
      { name: city.name, path: cityPath(region, city) },
      { name: service.label, path },
    ]),
    ...officeNodes(region, city),
  ]
}

// Linking every service to every city is the footprint of a doorway network,
// so siblings are limited to the same group and to cities whose page for this
// service is indexed.
const OTHER_CITIES_MAX = 5

export function CityServicePageView<C extends CityPage>(props: Props<C>) {
  const { region, city, service, page } = props
  const topic = `${service.label} in ${city.name}`
  const relatedServices = cityServices.filter((s) => s.group === service.group && s.slug !== service.slug)
  const otherCities = region.cities
    .filter((c) => c.slug !== city.slug)
    .filter((c) => isExistingPage(c.services[service.slug]) || isServicePageIndexed(region, c, service.slug))
    .slice(0, OTHER_CITIES_MAX)

  return (
    <>
      <JsonLd data={schemaFor(props)} />
      <main className="min-h-screen">
        <CityHero
          crumbs={[
            { name: "Home", href: "/" },
            { name: region.name, href: `${region.path}/` },
            { name: city.name, href: cityPath(region, city) },
            { name: service.label, href: cityServicePath(region, city, service.slug) },
          ]}
          eyebrow={topic}
          h1={page.h1}
          intro={page.intro}
          presence={region.presence(city)}
          hours={region.hours(city)}
          whatsappMessage={`Hi NextGen Fusion, I'm interested in ${service.label} for my business in ${city.name}.`}
        />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <CitySections sections={page.sections} />

          <GrowthProblemFinder
            heading="Sound familiar?"
            intro="The problems we hear most often about this, why they happen and what we would do first."
            place={city.name}
            problems={page.problems}
          />

          <SelfCheck heading="A one-minute self-check" items={page.checklist} topic={topic} />

          {page.caseStudies && (
            <CityCaseStudies slugs={page.caseStudies} heading="Work we've published that's closest to this" />
          )}

          <CityFaqs faqs={page.faqs} />

          <CityLinkList
            heading={`More for ${city.name} businesses`}
            links={[
              ...relatedServices.map((s) => ({ href: cityServiceHref(region, city, s.slug), label: s.label })),
              { href: cityPath(region, city), label: `All services in ${city.name}` },
            ]}
          />

          <CityLinkList
            heading={otherCities.length > 0 ? `${service.label} in other cities` : `More about ${service.label}`}
            links={[
              ...otherCities.map((c) => ({ href: cityServiceHref(region, c, service.slug), label: c.name })),
              { href: `/services/${service.serviceSlug}/`, label: `More about ${service.label}` },
              { href: `${region.path}/`, label: `All cities in ${region.name}` },
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
