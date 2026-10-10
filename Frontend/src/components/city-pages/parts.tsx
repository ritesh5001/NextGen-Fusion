import Link from "next/link"
import { ChevronRight, Clock, MapPin, MessageCircle } from "lucide-react"
import { PRIMARY_PHONE_DISPLAY } from "@/data/offices"
import type { CityFaq, CityPage, CityRegion, CitySection } from "@/data/city-pages/types"
import { officeSchema } from "@/lib/office-schema"
import { getProjectBySlug } from "@/lib/static-projects"
import { whatsappHref } from "@/lib/whatsapp"

export type Crumb = { name: string; href: string }

export function CityBreadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-mute">
        {crumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center gap-1">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
            {index === crumbs.length - 1 ? (
              <span aria-current="page" className="text-ink-soft">
                {crumb.name}
              </span>
            ) : (
              <Link href={crumb.href} className="hover:text-ink hover:underline">
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
      <p className="mt-8 text-sm font-medium uppercase tracking-wide text-brand">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-medium leading-tight text-ink sm:text-5xl tracking-tight">{h1}</h1>
      {intro.map((paragraph) => (
        <p key={paragraph} className="mt-5 text-lg leading-relaxed text-ink-soft">
          {paragraph}
        </p>
      ))}

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={whatsappHref(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp {PRIMARY_PHONE_DISPLAY}
        </a>
        <Link
          href="/contact/"
          className="inline-flex items-center rounded-full border border-ink/10 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-gray-900"
        >
          Get a written plan and quote
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
        <span className="inline-flex items-center gap-2">
          <MapPin className="h-4 w-4 text-brand" aria-hidden="true" />
          {presence}
        </span>
        <span className="inline-flex items-center gap-2">
          <Clock className="h-4 w-4 text-brand" aria-hidden="true" />
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
    </>
  )
}

export function CityCaseStudies({ slugs, heading }: { slugs: string[]; heading: string }) {
  const projects = slugs.map((slug) => getProjectBySlug(slug)).filter((p) => p !== undefined)
  if (projects.length === 0) return null
  return (
    <div className="mb-14">
      <h2 className="text-2xl font-medium text-ink sm:text-3xl tracking-tight">{heading}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}/`}
            className="block rounded-[28px] border border-ink/10 p-6 transition-colors hover:border-gray-900"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-brand">{project.category}</p>
            <p className="mt-2 text-lg font-bold text-ink">{project.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{project.shortDescription}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function CityFaqs({ faqs }: { faqs: CityFaq[] }) {
  return (
    <div className="mb-14">
      <h2 className="text-2xl font-medium text-ink sm:text-3xl tracking-tight">Frequently asked questions</h2>
      <dl className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
        {faqs.map((faq) => (
          <div key={faq.question} className="py-5">
            <dt className="font-semibold text-ink">{faq.question}</dt>
            <dd className="mt-2 leading-relaxed text-ink-soft">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function CityLinkList({ heading, links }: { heading: string; links: { href: string; label: string }[] }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-medium text-ink tracking-tight">{heading}</h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-block rounded-full border border-ink/10 px-4 py-2 text-sm text-ink transition-colors hover:border-gray-900"
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
