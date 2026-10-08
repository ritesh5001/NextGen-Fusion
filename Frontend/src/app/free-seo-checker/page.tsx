import type { Metadata } from "next"
import Link from "next/link"
import CTABanner from "@/components/cta-banner"
import { JsonLd } from "@/components/json-ld"
import { SeoChecker } from "@/components/tools/seo-checker"
import { absoluteUrl, breadcrumbSchema, buildMetadata, ORGANIZATION_ID } from "@/lib/seo"

const PATH = "/free-seo-checker"
const UPDATED = "2026-10-08"

export const metadata: Metadata = buildMetadata({
  title: "Free SEO Checker: Test Any Website in 20 Seconds",
  description:
    "Test any web page free: title, description, headings, indexing, schema, mobile setup, HTTPS, robots.txt and sitemap, with a plain-English fix for each problem.",
  path: PATH,
  ogEyebrow: "Free tool",
})

/** Kept in step with Backend/src/lib/seo-audit.ts, which runs these checks. */
const CHECKS: { name: string; why: string }[] = [
  { name: "Allowed in Google", why: "A single noindex tag, a robots.txt rule or an error page keeps a page out of Google entirely. It is the first thing to rule out." },
  { name: "Page title", why: "The blue link in search results. Around 50–60 characters, with what you offer and where first, is what gets the click." },
  { name: "Meta description", why: "The two lines under the link. Without one, Google picks a snippet for you, often a menu or cookie notice." },
  { name: "Main heading (H1)", why: "One clear H1 tells search engines and AI assistants what the page is about." },
  { name: "Canonical URL", why: "Stops copies of the same page (www or not, with tracking codes) from competing with each other." },
  { name: "Amount of text", why: "Pages that say little rarely rank. We count the text in the HTML the server sends, which is what crawlers and AI tools read first." },
  { name: "Image alt text", why: "Lets Google Images and screen readers understand your photos." },
  { name: "Structured data", why: "Schema markup tells Google and AI assistants who you are, what you sell and where, and makes rich results possible." },
  { name: "HTTPS, redirects and server speed", why: "Browsers warn visitors away from insecure sites; every redirect and a slow server add delay before anything shows." },
  { name: "Mobile setup and language", why: "Google ranks the mobile version of your site. Without a viewport tag, phones get a shrunken desktop page." },
  { name: "robots.txt and sitemap", why: "Tell search engines what they may crawl and list every page you want found." },
  { name: "Link previews and site icon", why: "Decide how your link looks when shared on WhatsApp, LinkedIn or Facebook, and in Google's mobile results." },
]

const FAQS = [
  {
    question: "Is the SEO checker really free?",
    answer: "Yes. There is no sign-up and no email required. Run as many checks as you need; we only limit very rapid repeat checks from one connection.",
  },
  {
    question: "Does it check my whole website?",
    answer: "It checks the page you enter, plus the site's robots.txt and sitemap. Check your homepage first, then your most important service or product pages one by one.",
  },
  {
    question: "Why does my score differ from other SEO tools?",
    answer: "Every tool weighs things differently. Ours puts most weight on what stops a page appearing in Google at all — indexing, title, description, heading, mobile setup and server speed — and less on minor details.",
  },
  {
    question: "Do you store the websites I check?",
    answer: "No. The page is read once to build your report and the result is not saved.",
  },
  {
    question: "Will a score of 100 get me to the top of Google?",
    answer: "No tool can promise that. A clean score means nothing on the page is holding you back. Ranking also depends on how useful your content is and how many trusted websites link to you.",
  },
  {
    question: "Can you fix the problems for me?",
    answer: "Yes. Send us your report on WhatsApp and we will tell you which fixes matter most, free. If you want us to do the work, you get a fixed written quote first.",
  },
]

const url = absoluteUrl(PATH)

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${url}#app`,
    name: "Free SEO Checker",
    url,
    description: "Checks any web page for the on-page and technical problems that stop it ranking, with a plain-English fix for each.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@id": ORGANIZATION_ID },
    dateModified: UPDATED,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  },
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Free SEO checker", path: PATH },
  ]),
]

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <main className="min-h-screen bg-white">
        <section className="mx-auto max-w-4xl px-4 pt-28 pb-12 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-wide text-purple-600">Free tool</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            Free SEO checker: find what&apos;s stopping your website from ranking
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-gray-600">
            Enter any web page. In about 20 seconds you get a score and a list of what is wrong, each with a plain-English
            fix you or your developer can act on. It reads the page the way Google&apos;s crawler does: the HTML your
            server sends, your robots.txt and your sitemap.
          </p>
          <div className="mt-8">
            <SeoChecker />
          </div>
        </section>

        <section id="what-we-check" className="mx-auto max-w-4xl scroll-mt-28 px-4 pb-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">What the checker looks at, and why it matters</h2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">The checks the free SEO checker runs</caption>
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="w-1/3 px-3 py-3 font-semibold text-gray-900 sm:px-4">Check</th>
                  <th scope="col" className="px-3 py-3 font-semibold text-gray-900 sm:px-4">Why it matters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {CHECKS.map((check) => (
                  <tr key={check.name}>
                    <th scope="row" className="px-3 py-3 align-top font-medium break-words text-gray-900 sm:px-4">{check.name}</th>
                    <td className="px-3 py-3 leading-relaxed text-gray-600 sm:px-4">{check.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 pb-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">What to fix first</h2>
          <p className="mt-4 leading-relaxed text-gray-600">
            Start with anything marked <span className="font-medium text-red-600">Fix</span> under Search basics: a page
            that is blocked from Google, or has no title or description, cannot compete however good the rest is. Then
            work through the technical items, which usually take a developer an hour or two. Content fixes — more text,
            better headings, descriptions for images — are where rankings are won over the following months.
          </p>
          <p className="mt-4 leading-relaxed text-gray-600">
            This checker covers what is on the page. Two things it cannot see decide the rest: how fast the page feels in
            a real browser (test that on Google&apos;s PageSpeed Insights) and how many trusted websites link to yours.
            If you would like a person to look at all three, our{" "}
            <Link href="/services/seo-services/" className="font-medium text-purple-600 hover:underline">
              SEO team
            </Link>{" "}
            will review your site and tell you what to do first, free.
          </p>
        </section>

        <section className="mx-auto max-w-4xl px-4 pb-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Questions</h2>
          <div className="mt-6 divide-y divide-gray-200 rounded-2xl border border-gray-200">
            {FAQS.map((faq) => (
              <details key={faq.question} className="group p-5">
                <summary className="cursor-pointer list-none font-medium text-gray-900 marker:hidden">
                  {faq.question}
                </summary>
                <p className="mt-3 leading-relaxed text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <CTABanner />
        </div>
      </main>
    </>
  )
}
