import Link from "next/link"
import { MapPin, Phone } from "lucide-react"
import CTABanner from "@/components/cta-banner"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbSchema, siteUrl } from "@/lib/seo"
import { offices } from "@/data/offices"
import { getLocationPage, type LocationPage } from "@/data/locations"

function schemaFor(page: LocationPage) {
  const office = offices.find((o) => o.city === page.city)
  const url = absoluteUrl(`/${page.slug}`)

  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: `${page.serviceLabel} in ${page.city}`,
      serviceType: page.serviceLabel,
      url,
      // The office node, not the Organization: this page is about work delivered
      // from a specific place, and that node carries the address and geo.
      provider: { "@id": `${siteUrl}/#office-${page.city.toLowerCase()}` },
      areaServed: {
        "@type": "City",
        name: page.city,
        ...(office
          ? {
              address: {
                "@type": "PostalAddress",
                addressLocality: office.postal.locality,
                addressRegion: office.postal.region,
                addressCountry: office.postal.country,
              },
            }
          : {}),
      },
      ...(office
        ? {
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: `${page.serviceLabel} — ${page.city}`,
              itemListElement: page.relatedServices.map((service) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: service.label,
                  url: absoluteUrl(`/services/${service.slug}`),
                },
              })),
            },
          }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: `${page.serviceLabel} in ${page.city}`, path: `/${page.slug}` },
    ]),
  ]
}

export function LocationPageTemplate({ page }: { page: LocationPage }) {
  const office = offices.find((o) => o.city === page.city)

  return (
    <>
      <JsonLd data={schemaFor(page)} />
      <main className="min-h-screen bg-white">
        <section className="mx-auto max-w-4xl px-4 pt-28 pb-12 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-wide text-purple-600">
            {page.city}
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            {page.h1}
          </h1>
          {page.intro.map((paragraph) => (
            <p key={paragraph} className="mt-5 text-lg leading-relaxed text-gray-600">
              {paragraph}
            </p>
          ))}

          {office && (
            <div className="mt-8 flex flex-wrap gap-4 text-sm">
              <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-gray-700">
                <MapPin className="h-4 w-4 text-purple-600" aria-hidden="true" />
                {office.address}
              </span>
              <a
                href={`tel:${office.contact.phoneE164}`}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-gray-700 transition-colors hover:border-gray-900"
              >
                <Phone className="h-4 w-4 text-purple-600" aria-hidden="true" />
                {office.contact.phone}
              </a>
            </div>
          )}
        </section>

        <section className="mx-auto max-w-4xl px-4 pb-4 sm:px-6 lg:px-8">
          {page.sections.map((section) => (
            <div key={section.heading} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-relaxed text-gray-600">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}

          {page.priceBand && (
            <div className="mb-12 rounded-2xl bg-gray-50 p-6">
              <h2 className="text-2xl font-bold text-gray-900">
                What this costs in {page.city}
              </h2>
              <p className="mt-3 text-3xl font-bold text-gray-900">{page.priceBand}</p>
              {page.priceNote && <p className="mt-3 text-gray-600">{page.priceNote}</p>}
            </div>
          )}

          {page.localProof.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Work delivered in and around {page.city}
              </h2>
              <ul className="mt-5 space-y-4">
                {page.localProof.map((item) => (
                  <li key={item.client} className="rounded-xl border border-gray-200 p-5">
                    <p className="font-semibold text-gray-900">{item.client}</p>
                    <p className="mt-1 text-gray-600">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Frequently asked questions
            </h2>
            <dl className="mt-6 divide-y divide-gray-200 border-y border-gray-200">
              {page.faqs.map((faq) => (
                <div key={faq.question} className="py-5">
                  <dt className="font-semibold text-gray-900">{faq.question}</dt>
                  <dd className="mt-2 leading-relaxed text-gray-600">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Related</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {page.relatedServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}/`}
                    className="block rounded-xl border border-gray-200 px-5 py-4 font-medium text-gray-900 transition-colors hover:border-gray-900"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
              {page.relatedLocations.map((slug) => {
                const related = getLocationPage(slug)
                if (!related) return null
                return (
                  <li key={slug}>
                    <Link
                      href={`/${slug}/`}
                      className="block rounded-xl border border-gray-200 px-5 py-4 font-medium text-gray-900 transition-colors hover:border-gray-900"
                    >
                      {related.title}
                    </Link>
                  </li>
                )
              })}
              <li>
                <Link
                  href="/work/"
                  className="block rounded-xl border border-gray-200 px-5 py-4 font-medium text-gray-900 transition-colors hover:border-gray-900"
                >
                  Projects we&apos;ve delivered
                </Link>
              </li>
              <li>
                <Link
                  href="/contact/"
                  className="block rounded-xl border border-gray-200 px-5 py-4 font-medium text-gray-900 transition-colors hover:border-gray-900"
                >
                  Contact the {page.city} office
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <CTABanner />
        </div>
      </main>
    </>
  )
}
