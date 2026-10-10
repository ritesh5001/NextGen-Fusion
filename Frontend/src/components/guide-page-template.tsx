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
    "inline-block rounded-full border border-ink/10 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-gray-900"
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
      <main className="min-h-screen">
        <section className="mx-auto max-w-4xl px-4 pt-28 pb-12 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-wide text-brand">{page.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-medium leading-tight text-ink sm:text-5xl tracking-tight">{page.h1}</h1>
          {page.intro.map((paragraph) => (
            <p key={paragraph} className="mt-5 text-lg leading-relaxed text-ink-soft">
              {paragraph}
            </p>
          ))}
          <p className="mt-6 text-sm text-ink-mute">
            Updated <time dateTime={page.updated}>{updated}</time> ·{" "}
            <Link href="/contact/" className="font-medium text-brand hover:underline">
              Get a written quote
            </Link>
          </p>
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
              {section.table && (
                <figure className="mt-6">
                  {/* Real <table> markup: it is what AI Overviews and answer
                      engines extract for cost and comparison queries. */}
                  <div className="overflow-x-auto rounded-[28px] border border-ink/10">
                    <table
                      className={cn(
                        "w-full text-left text-sm",
                        // Three columns wrap to fit a phone; wider tables scroll
                        // inside their box rather than crush every cell.
                        section.table.columns.length > 3 && "min-w-[32rem]",
                      )}
                    >
                      <caption className="sr-only">{section.table.caption}</caption>
                      <thead className="bg-white/50">
                        <tr>
                          {section.table.columns.map((column, i) => (
                            <th key={`${column}-${i}`} scope="col" className="px-3 py-3 break-words sm:px-4 font-semibold text-ink">
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ink/10">
                        {section.table.rows.map((row) => (
                          <tr key={row.join("|")}>
                            {row.map((cell, i) =>
                              i === 0 ? (
                                <th key={i} scope="row" className="px-3 py-3 break-words sm:px-4 font-medium text-ink">
                                  {cell}
                                </th>
                              ) : (
                                <td key={i} className="px-3 py-3 break-words sm:px-4 text-ink-soft">
                                  {cell}
                                </td>
                              ),
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <figcaption className="mt-2 text-sm text-ink-mute">
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
              <h2 className="text-2xl font-medium text-ink sm:text-3xl tracking-tight">
                {page.caseStudiesHeading ?? "Case studies"}
              </h2>
              <div className="mt-6 space-y-6">
                {page.caseStudies.map((study) => (
                  <div key={study.slug} className="rounded-[28px] border border-ink/10 p-6">
                    <h3 className="text-lg font-medium text-ink tracking-tight">
                      <Link href={`/work/${study.slug}/`} className="inline-block py-1 hover:underline">
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

          <div className="mb-12">
            <h2 className="text-2xl font-medium text-ink sm:text-3xl tracking-tight">Frequently asked questions</h2>
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
              {page.related.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-full border border-ink/10 px-5 py-4 font-medium text-ink transition-colors hover:border-gray-900"
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
