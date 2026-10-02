import Link from "next/link"
import { ChevronRight, Clock, MapPin, MessageCircle } from "lucide-react"
import { PRIMARY_PHONE_DISPLAY, PRIMARY_PHONE_E164 } from "@/data/offices"
import type { CityFaq, CityPage, CityRegion, CitySection } from "@/data/city-pages/types"
import { officeSchema } from "@/lib/office-schema"
import { getProjectBySlug } from "@/lib/static-projects"

export type Crumb = { name: string; href: string }

export function CityBreadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500">
        {crumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center gap-1">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
            {index === crumbs.length - 1 ? (
              <span aria-current="page" className="text-gray-700">
                {crumb.name}
              </span>
            ) : (
              <Link href={crumb.href} className="hover:text-gray-900 hover:underline">
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function CityHero({
  crumbs,
  eyebrow,
  h1,
  intro,
  presence,
  hours,
  whatsappMessage,
}: {
  crumbs: Crumb[]
  eyebrow: string
  h1: string
  intro: string[]
  presence: string
  hours: string
  whatsappMessage: string
}) {
  return (
    <section className="mx-auto max-w-4xl px-4 pt-28 pb-12 sm:px-6 lg:px-8">
      <CityBreadcrumbs crumbs={crumbs} />
      <p className="mt-8 text-sm font-medium uppercase tracking-wide text-purple-600">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">{h1}</h1>
      {intro.map((paragraph) => (
        <p key={paragraph} className="mt-5 text-lg leading-relaxed text-gray-600">
          {paragraph}
        </p>
      ))}

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={`https://wa.me/${PRIMARY_PHONE_E164.replace("+", "")}?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp {PRIMARY_PHONE_DISPLAY}
        </a>
        <Link
          href="/contact/"
          className="inline-flex items-center rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 transition-colors hover:border-gray-900"
        >
          Get a written plan and quote
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
        <span className="inline-flex items-center gap-2">
          <MapPin className="h-4 w-4 text-purple-600" aria-hidden="true" />
          {presence}
        </span>
        <span className="inline-flex items-center gap-2">
          <Clock className="h-4 w-4 text-purple-600" aria-hidden="true" />
          Our hours: {hours}
        </span>
      </div>
    </section>
  )
}

export function CitySections({ sections }: { sections: CitySection[] }) {
  return (
    <>
      {sections.map((section) => (
        <div key={section.heading} className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{section.heading}</h2>
          {section.body.map((paragraph) => (
            <p key={paragraph} className="mt-4 leading-relaxed text-gray-600">
              {paragraph}
            </p>
          ))}
          {section.links && section.links.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-3">
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-block rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:border-gray-900"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  )
}

export function CityCaseStudies({ slugs, heading }: { slugs: string[]; heading: string }) {
  const projects = slugs.map((slug) => getProjectBySlug(slug)).filter((p) => p !== undefined)
  if (projects.length === 0) return null
  return (
    <div className="mb-14">
      <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{heading}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}/`}
            className="block rounded-2xl border border-gray-200 p-6 transition-colors hover:border-gray-900"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-purple-600">{project.category}</p>
            <p className="mt-2 text-lg font-bold text-gray-900">{project.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{project.shortDescription}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function CityFaqs({ faqs }: { faqs: CityFaq[] }) {
  return (
    <div className="mb-14">
      <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Frequently asked questions</h2>
      <dl className="mt-6 divide-y divide-gray-200 border-y border-gray-200">
        {faqs.map((faq) => (
          <div key={faq.question} className="py-5">
            <dt className="font-semibold text-gray-900">{faq.question}</dt>
            <dd className="mt-2 leading-relaxed text-gray-600">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function CityLinkList({ heading, links }: { heading: string; links: { href: string; label: string }[] }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-gray-900">{heading}</h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-block rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-800 transition-colors hover:border-gray-900"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function faqSchema(url: string, faqs: CityFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  }
}

/** The City node used as areaServed, with a street-level locality only where we have an office. */
export function cityAreaServed(
  city: { name: string; stateCode: string },
  countryCode: string,
  local?: { locality: string; region: string; postalCode?: string },
) {
  return {
    "@type": "City",
    name: city.name,
    address: local
      ? {
          "@type": "PostalAddress",
          addressLocality: local.locality,
          addressRegion: local.region,
          ...(local.postalCode ? { postalCode: local.postalCode } : {}),
          addressCountry: countryCode,
        }
      : { "@type": "PostalAddress", addressRegion: city.stateCode, addressCountry: countryCode },
  }
}

/** The office's ProfessionalService node, on the pages of a city where we have one. */
export function officeNodes<C extends CityPage>(region: CityRegion<C>, city: C) {
  const office = region.localOffice?.(city)
  return office ? [officeSchema(office)] : []
}
