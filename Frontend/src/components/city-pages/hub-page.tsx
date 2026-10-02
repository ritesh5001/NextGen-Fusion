import Link from "next/link"
import { ArrowRight } from "lucide-react"
import CTABanner from "@/components/cta-banner"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbSchema, siteUrl } from "@/lib/seo"
import { AUSTRALIA_PATH, auCities, auCityPath, auRegionalCentres, auServiceGroups, auServices, auWorkingHours } from "@/data/australia"
import { auHub } from "@/data/australia/hub"
import { GrowthProblemFinder } from "./growth-problem-finder"
import { AuFaqs, AuHero, AuSections, faqSchema } from "./parts"

function schema() {
  const url = absoluteUrl(AUSTRALIA_PATH)
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: "Website development, SEO and digital marketing in Australia",
      description: auHub.metaDescription,
      url,
      provider: { "@id": `${siteUrl}/#office-lucknow` },
      areaServed: { "@type": "Country", name: "Australia" },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${url}#cities`,
      itemListElement: auCities.map((city, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: city.name,
        url: absoluteUrl(auCityPath(city)),
      })),
    },
    faqSchema(url, auHub.faqs),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Australia", path: AUSTRALIA_PATH },
    ]),
  ]
}

export function AuHubPage() {
  return (
    <>
      <JsonLd data={schema()} />
      <main className="min-h-screen bg-white">
        <AuHero
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Australia", href: `${AUSTRALIA_PATH}/` },
          ]}
          eyebrow="Australia"
          h1={auHub.h1}
          intro={auHub.intro}
          hours="Australian afternoons and evenings, Monday to Saturday"
          whatsappMessage="Hi NextGen Fusion, I run a business in Australia and would like some help growing it."
        />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Find your city</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {auCities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={auCityPath(city)}
                    className="group flex h-full flex-col rounded-2xl border border-gray-200 p-5 transition-colors hover:border-gray-900"
                  >
                    <span className="flex items-center justify-between gap-2 font-semibold text-gray-900">
                      {city.name}, {city.stateCode}
                      <ArrowRight className="h-4 w-4 shrink-0 text-gray-400 group-hover:text-gray-900" aria-hidden="true" />
                    </span>
                    <span className="mt-2 text-sm leading-relaxed text-gray-600">{city.summary}</span>
                    <span className="mt-3 text-xs text-gray-500">Our hours there: {auWorkingHours(city)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Regional Australia</h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              Regional businesses often have the most to gain online, because a well-built site and Google Business
              Profile can make them the obvious choice in their town. We work with businesses in these centres and
              anywhere else in Australia:
            </p>
            <dl className="mt-5 space-y-3">
              {auRegionalCentres.map((region) => (
                <div key={region.state} className="sm:flex sm:gap-3">
                  <dt className="font-semibold text-gray-900 sm:w-48 sm:shrink-0">{region.state}</dt>
                  <dd className="text-gray-600">{region.places.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </div>

          <GrowthProblemFinder
            heading="What's holding your business back?"
            intro="These are the problems Australian business owners bring us most often. Pick the closest one to see why it happens and what we would do first."
            place="Australia"
            problems={auHub.problems.map((problem) => ({
              ...problem,
              link: { href: `/services/${problem.serviceSlug}/`, label: `More about ${problem.serviceLabel}` },
            }))}
          />

          <AuSections sections={auHub.sections} />

          <div className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">What an Australian website has to get right</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {auHub.essentials.map((item) => (
                <div key={item.heading} className="rounded-2xl border border-gray-200 p-5">
                  <p className="font-semibold text-gray-900">{item.heading}</p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">What we do</h2>
            {auServiceGroups.map((group) => (
              <div key={group.group} className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">{group.label}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {auServices
                    .filter((service) => service.group === group.group)
                    .map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.serviceSlug}/`}
                          className="inline-block rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-800 transition-colors hover:border-gray-900"
                        >
                          {service.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>

          <AuFaqs faqs={auHub.faqs} />
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <CTABanner />
        </div>
      </main>
    </>
  )
}
