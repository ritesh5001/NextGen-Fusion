import Link from "next/link"
import { MapPin, MessageCircle, Phone } from "lucide-react"
import CTABanner from "@/components/cta-banner"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbSchema, ORGANIZATION_ID } from "@/lib/seo"
import { officeId, officeSchema } from "@/lib/office-schema"
import { offices } from "@/data/offices"
import { getLocationPage, type LocationPage } from "@/data/locations"
import { whatsappHref } from "@/lib/whatsapp"

/** A page for a city in another country, served from an Indian office. */
function isRemote(page: LocationPage) {
  const office = offices.find((o) => o.city === page.city)
  return Boolean(page.areaCountry && office && page.areaCountry !== office.postal.country)
}

function schemaFor(page: LocationPage) {
  const office = offices.find((o) => o.city === page.city)
  const url = absoluteUrl(`/${page.slug}`)
  const area = page.area ?? page.city
  const remote = isRemote(page)

  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: `${page.serviceLabel} in ${area}`,
      serviceType: page.serviceLabel,
      url,
      // The office node where the page serves the office's own country: that
      // node carries the address and geo. A page for a city abroad is served
      // by the organisation, with no local office claimed.
      provider: { "@id": remote || !office ? ORGANIZATION_ID : officeId(office.city) },
      // A remote page names the place it serves and its country, never an
      // address there: the provider stays the Indian office, which is true.
      areaServed: remote
        ? {
            "@type": page.areaType ?? "City",
            name: area,
            address: { "@type": "PostalAddress", addressCountry: page.areaCountry },
          }
        : page.area
        ? {
            "@type": page.areaType ?? "State",
            name: page.area,
            ...(office ? { address: { "@type": "PostalAddress", addressRegion: office.postal.region, addressCountry: office.postal.country } } : {}),
          }
        : {
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
              name: `${page.serviceLabel} — ${area}`,
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
      { name: `${page.serviceLabel} in ${area}`, path: `/${page.slug}` },
    ]),
    ...(office && !remote ? [officeSchema(office)] : []),
  ]
}

export function LocationPageTemplate({ page }: { page: LocationPage }) {
  const office = offices.find((o) => o.city === page.city)
  const area = page.area ?? page.city
  const remote = isRemote(page)

  return (
    <>
      <JsonLd data={schemaFor(page)} />
      <main className="min-h-screen">
        <section className="mx-auto max-w-4xl px-4 pt-28 pb-12 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-wide text-brand">
            {area}
          </p>
          <h1 className="mt-3 text-4xl font-medium leading-tight text-ink sm:text-5xl tracking-tight">
            {page.h1}
          </h1>
          {page.intro.map((paragraph) => (
            <p key={paragraph} className="mt-5 text-lg leading-relaxed text-ink-soft">
              {paragraph}
            </p>
          ))}

          {office && (
            <div className="mt-8 flex flex-wrap gap-4 text-sm">
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 px-4 py-2 text-ink-soft">
                <MapPin className="h-4 w-4 text-brand" aria-hidden="true" />
                {remote ? `Served remotely from ${office.city}, India` : office.address}
              </span>
              {remote && (
                <a
                  href={whatsappHref(undefined, office.contact.phoneE164)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/10 px-4 py-2 text-ink-soft transition-colors hover:border-gray-900"
                >
                  <MessageCircle className="h-4 w-4 text-brand" aria-hidden="true" />
                  WhatsApp {office.contact.phone}
                </a>
              )}
              <a
                href={`tel:${office.contact.phoneE164}`}
                className="inline-flex items-center gap-2 rounded-full border border-ink/10 px-4 py-2 text-ink-soft transition-colors hover:border-gray-900"
              >
                <Phone className="h-4 w-4 text-brand" aria-hidden="true" />
                {office.contact.phone}
              </a>
            </div>
          )}
        </section>

        <section className="mx-auto max-w-4xl px-4 pb-4 sm:px-6 lg:px-8">
          {page.sections.map((section) => (
            <div key={section.heading} className="mb-12">
              <h2 className="text-2xl font-medium text-ink sm:text-3xl tracking-tight">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-relaxed text-ink-soft">
                  {paragraph}
                </p>
              ))}
              {section.links && section.links.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-3">
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-block rounded-full border border-ink/10 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-gray-900"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {page.caseStudies.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-medium text-ink sm:text-3xl tracking-tight">
                Three builds, and what they took
              </h2>
              <p className="mt-4 leading-relaxed text-ink-soft">
                Full write-ups, not logos. These are chosen for how close they sit to the problems
                {" "}
                {area} businesses bring us — we have not tagged them by the client&apos;s city.
              </p>
              <div className="mt-6 space-y-6">
                {page.caseStudies.map((study) => (
                  <div key={study.slug} className="rounded-[28px] border border-ink/10 p-6">
                    <h3 className="text-lg font-medium text-ink tracking-tight">
                      <Link
                        href={`/work/${study.slug}/`}
                        className="inline-block py-1 hover:underline"
                      >
                        {study.title}
                      </Link>
                    </h3>
                    <p className="mt-2 leading-relaxed text-ink-soft">{study.body}</p>
                    <Link
                      href={`/work/${study.slug}/`}
                      className="mt-3 inline-block py-1 text-sm font-medium text-brand hover:underline"
                    >
                      Read the {study.title} case study
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {page.localProof.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-medium text-ink sm:text-3xl tracking-tight">
                Work delivered in and around {area}
              </h2>
              <ul className="mt-5 space-y-4">
                {page.localProof.map((item) => (
                  <li key={item.client} className="rounded-[20px] border border-ink/10 p-5">
                    <p className="font-semibold text-ink">{item.client}</p>
                    <p className="mt-1 text-ink-soft">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-12">
            <h2 className="text-2xl font-medium text-ink sm:text-3xl tracking-tight">
              Frequently asked questions
            </h2>
            <dl className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
              {page.faqs.map((faq) => (
                <div key={faq.question} className="py-5">
                  <dt className="font-semibold text-ink">{faq.question}</dt>
                  <dd className="mt-2 leading-relaxed text-ink-soft">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-medium text-ink sm:text-3xl tracking-tight">Related</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {page.relatedServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}/`}
                    className="block rounded-full border border-ink/10 px-5 py-4 font-medium text-ink transition-colors hover:border-gray-900"
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
                      className="block rounded-full border border-ink/10 px-5 py-4 font-medium text-ink transition-colors hover:border-gray-900"
                    >
                      {related.title}
                    </Link>
                  </li>
                )
              })}
              {!remote && !page.area && (
                <li>
                  <Link
                    href={`/india/${page.city.toLowerCase()}/`}
                    className="block rounded-full border border-ink/10 px-5 py-4 font-medium text-ink transition-colors hover:border-gray-900"
                  >
                    Every service we offer in {page.city}
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href="/work/"
                  className="block rounded-full border border-ink/10 px-5 py-4 font-medium text-ink transition-colors hover:border-gray-900"
                >
                  Projects we&apos;ve delivered
                </Link>
              </li>
              <li>
                <Link
                  href="/contact/"
                  className="block rounded-full border border-ink/10 px-5 py-4 font-medium text-ink transition-colors hover:border-gray-900"
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
