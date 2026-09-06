import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { JsonLd } from "@/components/json-ld"
import CTABanner from "@/components/cta-banner"
import { absoluteUrl, breadcrumbSchema, buildMetadata, ORGANIZATION_ID, siteUrl } from "@/lib/seo"
import { offices } from "@/data/offices"
import { deliveredProjects } from "@/lib/delivered-projects"
import { staticProjects } from "@/lib/static-projects"

const PATH = "/about"

export const metadata: Metadata = buildMetadata({
  title: "About NextGen Fusion — the team behind the work",
  description:
    "Who we are, how we work, and why we don't disappear after launch. A four-person product team in Lucknow and Mumbai with 74 sites delivered.",
  path: PATH,
})

const team = [
  {
    slug: "ritesh-giri",
    name: "Ritesh Kumar Giri",
    role: "Founder & Full Stack Developer",
    image: "/member/ritesh-giri.png",
    bio: "Owns technical architecture across every project — Next.js and Shopify front ends, Node and Postgres back ends, and the deployment pipelines that keep them up. Writes the estimate you receive and is on the call when it is delivered.",
  },
  {
    slug: "sajal-singh",
    name: "Sajal Singh",
    role: "Co-Founder, Full Stack Developer & Cinematographer",
    image: "/member/sajal-singh.jpeg",
    bio: "Splits time between building product surfaces and shooting the photography and video that fills them. The reason our ecommerce clients get a store and the imagery to merchandise it.",
  },
  {
    slug: "mohammad-iqbal",
    name: "Mohammad Iqbal",
    role: "Full Stack & Android Developer",
    image: "/member/mohammad-iqbal.png",
    bio: "Builds the Android apps and the API layers that connect storefronts to CRMs, payment gateways and internal tooling. Handles most of our integration work.",
  },
  {
    slug: "vivek-gautam",
    name: "Vivek Gautam",
    role: "SEO & Social Media Marketing",
    image: "/member/vivek-gautam.jpeg",
    bio: "Runs technical SEO, keyword strategy and content planning. Joins projects before launch rather than after, so site structure and internal linking are right the first time.",
  },
]

const principles = [
  {
    title: "We stay after launch",
    body: "Most agency relationships end at handover, which is exactly when a site starts needing attention. Every build we ship comes with a defined support arrangement, and the developer who wrote the code is the one who answers when something breaks. Nobody on our client list has been handed a repository and left to it.",
  },
  {
    title: "You get a number before you get a proposal",
    body: "We give a price band and a delivery window in the first written reply, from the brief alone. If the range does not work for you, nobody has spent three meetings finding that out. If it does, the proposal that follows is the same number with the scope attached.",
  },
  {
    title: "We say no to work we would build badly",
    body: "We do not take on native iOS, we do not do brand-only engagements with no build attached, and we turn down ecommerce projects where the catalogue and photography are not ready — because launching those late is worse than starting them late. Referring that work elsewhere costs us less than delivering it poorly.",
  },
  {
    title: "The stack is chosen per project, not per fashion",
    body: "Shopify where merchandising matters more than custom logic. Next.js where performance and control do. WooCommerce where an existing WordPress estate makes a migration more expensive than it is worth. We have shipped all three this year and will tell you which one your project is.",
  },
]

export default function AboutPage() {
  const deliveredCount = deliveredProjects.length
  const caseStudyCount = staticProjects.length

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": `${absoluteUrl(PATH)}#aboutpage`,
      url: absoluteUrl(PATH),
      name: "About NextGen Fusion",
      description:
        "The team, offices, working principles and delivery record behind NextGen Fusion.",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": ORGANIZATION_ID },
      mainEntity: {
        "@id": ORGANIZATION_ID,
        employee: team.map((member) => ({
          "@type": "Person",
          name: member.name,
          jobTitle: member.role,
          url: absoluteUrl(`/team/${member.slug}`),
          image: absoluteUrl(member.image),
          worksFor: { "@id": ORGANIZATION_ID },
        })),
      },
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "About", path: PATH },
    ]),
  ]

  return (
    <>
      <JsonLd data={schema} />
      <main className="min-h-screen bg-white">
        <section className="mx-auto max-w-7xl px-4 pt-28 pb-14 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-wide text-purple-600">About us</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            A small team that finishes what it starts
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-600">
            NextGen Fusion is a four-person web and product team working out of Lucknow and Mumbai.
            We build websites, online stores and the software behind them for D2C brands,
            manufacturers, institutes and B2B companies across India, the UK, Italy and the Gulf.
          </p>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">
            We started it after watching the same thing happen to client after client: a decent site
            gets built, the agency invoices, and then nobody picks up the phone. Traffic drops, the
            payment gateway breaks during a sale, a plugin update takes the catalogue offline — and
            the people who built it are gone. That is the gap the company exists to close.
          </p>

          <dl className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 p-6">
              <dt className="text-sm font-medium text-gray-500">Sites delivered</dt>
              <dd className="mt-2 text-4xl font-bold text-gray-900">{deliveredCount}</dd>
              <p className="mt-2 text-sm text-gray-600">
                Live and in production, across ecommerce, B2B and institutional clients.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6">
              <dt className="text-sm font-medium text-gray-500">Written case studies</dt>
              <dd className="mt-2 text-4xl font-bold text-gray-900">{caseStudyCount}</dd>
              <p className="mt-2 text-sm text-gray-600">
                Full build write-ups with scope, decisions and outcomes — not logo walls.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6">
              <dt className="text-sm font-medium text-gray-500">Clients ghosted after launch</dt>
              <dd className="mt-2 text-4xl font-bold text-gray-900">0</dd>
              <p className="mt-2 text-sm text-gray-600">
                The only metric on this page we would be embarrassed to get wrong.
              </p>
            </div>
          </dl>
        </section>

        <section className="border-y border-gray-100 bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900">How we work</h2>
            <p className="mt-3 max-w-3xl text-gray-600">
              Four commitments that decide what we take on and how we run it. They are the reason
              some projects go elsewhere, which is the point of writing them down.
            </p>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {principles.map((principle) => (
                <div key={principle.title}>
                  <h3 className="text-xl font-bold text-gray-900">{principle.title}</h3>
                  <p className="mt-3 leading-relaxed text-gray-600">{principle.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900">The people</h2>
          <p className="mt-3 max-w-3xl text-gray-600">
            Everyone listed here writes code, copy or strategy on client projects. There is no layer
            between you and them.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {team.map((member) => (
              <div key={member.slug} className="flex gap-5 rounded-2xl border border-gray-200 p-6">
                <Image
                  src={member.image}
                  alt={`${member.name}, ${member.role} at NextGen Fusion`}
                  width={96}
                  height={96}
                  sizes="96px"
                  className="h-20 w-20 shrink-0 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    <Link
                      href={`/team/${member.slug}/`}
                      className="inline-block py-1 hover:underline"
                    >
                      {member.name}
                    </Link>
                  </h3>
                  <p className="text-sm font-medium text-purple-600">{member.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-gray-600">
            Full profiles are on the{" "}
            <Link href="/team/" className="font-medium text-purple-600 hover:underline">
              team page
            </Link>
            , and open roles are listed on{" "}
            <Link href="/careers/" className="font-medium text-purple-600 hover:underline">
              careers
            </Link>
            .
          </p>
        </section>

        <section className="border-t border-gray-100 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900">Where we are</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {offices.map((office) => (
                <div key={office.city} className="rounded-2xl border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900">{office.city}</h3>
                  <address className="mt-2 not-italic text-gray-600">{office.address}</address>
                  <p className="mt-3 text-sm text-gray-600">
                    {office.contact.name} ·{" "}
                    <a
                      href={`tel:${office.contact.phoneE164}`}
                      className="inline-block py-1 underline-offset-4 hover:underline"
                    >
                      {office.contact.phone}
                    </a>
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-gray-600">
              Most work is delivered remotely, but both offices take meetings. If you are in
              Lucknow or Mumbai and would rather talk in person than over a call,{" "}
              <Link href="/contact/" className="font-medium text-purple-600 hover:underline">
                say so when you get in touch
              </Link>
              .
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <CTABanner />
        </div>
      </main>
    </>
  )
}
