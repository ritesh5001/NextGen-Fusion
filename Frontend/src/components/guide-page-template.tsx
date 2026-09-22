import Link from "next/link"
import CTABanner from "@/components/cta-banner"
import { cn } from "@/lib/utils"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbSchema, ORGANIZATION_ID, serviceSchema, type Crumb } from "@/lib/seo"
import type { GuideLink, GuidePage } from "@/data/guides"

function crumbsFor(page: GuidePage): Crumb[] {
  return page.kind === "service"
    ? [
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: page.label, path: page.path },
      ]
    : [
        { name: "Home", path: "/" },
        { name: page.label, path: page.path },
      ]
}

function schemaFor(page: GuidePage) {
  const url = absoluteUrl(page.path)
  const main =
    page.kind === "service"
      ? serviceSchema({ name: page.label, description: page.metaDescription, path: page.path })
      : {
          "@context": "https://schema.org",
          "@type": "Article",
          "@id": `${url}#article`,
          headline: page.h1,
          description: page.metaDescription,
          url,
          mainEntityOfPage: url,
          author: { "@id": ORGANIZATION_ID },
          publisher: { "@id": ORGANIZATION_ID },
          dateModified: page.updated,
          inLanguage: "en-IN",
        }

  return [
    main,
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
    breadcrumbSchema(crumbsFor(page)),
  ]
}

const isExternal = (href: string) => href.startsWith("http")

function PillLink({ link }: { link: GuideLink }) {
  const className =
    "inline-block rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:border-gray-900"
  return isExternal(link.href) ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
      {link.label} ↗
    </a>
  ) : (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  )
}

export function GuidePageTemplate({ page }: { page: GuidePage }) {
  const updated = new Date(page.updated).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <>
      <JsonLd data={schemaFor(page)} />
      <main className="min-h-screen bg-white">
        <section className="mx-auto max-w-4xl px-4 pt-28 pb-12 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-wide text-purple-600">{page.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">{page.h1}</h1>
          {page.intro.map((paragraph) => (
            <p key={paragraph} className="mt-5 text-lg leading-relaxed text-gray-600">
              {paragraph}
            </p>
          ))}
          <p className="mt-6 text-sm text-gray-500">
            Updated <time dateTime={page.updated}>{updated}</time> · Figures from our{" "}
            <Link href="/pricing/" className="font-medium text-purple-600 hover:underline">
              published rate card
            </Link>
          </p>
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
              {section.table && (
                <figure className="mt-6">
                  {/* Real <table> markup: it is what AI Overviews and answer
                      engines extract for cost and comparison queries. */}
                  <div className="overflow-x-auto rounded-2xl border border-gray-200">
                    <table
                      className={cn(
                        "w-full text-left text-sm",
                        // Three columns wrap to fit a phone; wider tables scroll
                        // inside their box rather than crush every cell.
                        section.table.columns.length > 3 && "min-w-[32rem]",
                      )}
                    >
                      <caption className="sr-only">{section.table.caption}</caption>
                      <thead className="bg-gray-50">
                        <tr>
                          {section.table.columns.map((column, i) => (
                            <th key={`${column}-${i}`} scope="col" className="px-3 py-3 break-words sm:px-4 font-semibold text-gray-900">
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {section.table.rows.map((row) => (
                          <tr key={row.join("|")}>
                            {row.map((cell, i) =>
                              i === 0 ? (
                                <th key={i} scope="row" className="px-3 py-3 break-words sm:px-4 font-medium text-gray-900">
                                  {cell}
                                </th>
                              ) : (
                                <td key={i} className="px-3 py-3 break-words sm:px-4 text-gray-600">
                                  {cell}
                                </td>
                              ),
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <figcaption className="mt-2 text-sm text-gray-500">
                    {section.table.caption}
                    {section.table.note ? `. ${section.table.note}` : ""}
                  </figcaption>
                </figure>
              )}
              {section.links && section.links.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-3">
                  {section.links.map((link) => (
                    <PillLink key={link.href} link={link} />
                  ))}
                </div>
              )}
            </div>
          ))}

          {page.caseStudies.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {page.caseStudiesHeading ?? "Case studies"}
              </h2>
              <div className="mt-6 space-y-6">
                {page.caseStudies.map((study) => (
                  <div key={study.slug} className="rounded-2xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900">
                      <Link href={`/work/${study.slug}/`} className="inline-block py-1 hover:underline">
                        {study.title}
                      </Link>
                    </h3>
                    <p className="mt-2 leading-relaxed text-gray-600">{study.body}</p>
                    <Link
                      href={`/work/${study.slug}/`}
                      className="mt-3 inline-block py-1 text-sm font-medium text-purple-600 hover:underline"
                    >
                      Read the {study.title} case study
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Frequently asked questions</h2>
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
              {page.related.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-xl border border-gray-200 px-5 py-4 font-medium text-gray-900 transition-colors hover:border-gray-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
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
