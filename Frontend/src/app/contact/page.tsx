import type { Metadata } from "next"
import Link from "next/link"
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import ContactSection from "@/components/contact-section"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbSchema, buildMetadata, ORGANIZATION_ID, siteUrl } from "@/lib/seo"
import { CONTACT_EMAIL, offices, PRIMARY_PHONE_DISPLAY, PRIMARY_PHONE_E164 } from "@/data/offices"

const PATH = "/contact"

export const metadata: Metadata = buildMetadata({
  title: "Contact NextGen Fusion — Lucknow & Mumbai Offices",
  description:
    "Talk to NextGen Fusion about a website, online store or SEO project. Offices in Lucknow and Mumbai, replies within one working day.",
  path: PATH,
})

const OPENING_HOURS = [
  { days: "Monday — Saturday", hours: "10:00 – 19:00 IST" },
  { days: "Sunday", hours: "Closed (email and WhatsApp still monitored)" },
]

export default function ContactPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": `${absoluteUrl(PATH)}#contactpage`,
      url: absoluteUrl(PATH),
      name: "Contact NextGen Fusion",
      description:
        "Contact details, office addresses and enquiry form for NextGen Fusion's Lucknow and Mumbai offices.",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": ORGANIZATION_ID },
      mainEntity: { "@id": ORGANIZATION_ID },
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Contact", path: PATH },
    ]),
  ]

  return (
    <>
      <JsonLd data={schema} />
      <main className="min-h-screen bg-white">
        <section className="mx-auto max-w-7xl px-4 pt-28 pb-12 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-wide text-purple-600">Contact</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            Talk to the people who will actually build it
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-600">
            No account managers relaying messages. Every enquiry goes straight to the developers
            and strategists who would run your project, and you get a written reply within one
            working day — including a rough scope and price band, not just a request for a meeting.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href={`tel:${PRIMARY_PHONE_E164}`}
              className="group rounded-2xl border border-gray-200 p-5 transition-colors hover:border-gray-900"
            >
              <Phone className="h-5 w-5 text-purple-600" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-gray-900">Call us</p>
              <p className="mt-1 text-sm text-gray-600">{PRIMARY_PHONE_DISPLAY}</p>
            </a>
            <a
              href={`https://wa.me/${PRIMARY_PHONE_E164.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-gray-200 p-5 transition-colors hover:border-gray-900"
            >
              <MessageCircle className="h-5 w-5 text-purple-600" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-gray-900">WhatsApp</p>
              <p className="mt-1 text-sm text-gray-600">Fastest for quick questions</p>
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group rounded-2xl border border-gray-200 p-5 transition-colors hover:border-gray-900"
            >
              <Mail className="h-5 w-5 text-purple-600" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-gray-900">Email</p>
              <p className="mt-1 break-all text-sm text-gray-600">{CONTACT_EMAIL}</p>
            </a>
            <div className="rounded-2xl border border-gray-200 p-5">
              <MapPin className="h-5 w-5 text-purple-600" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-gray-900">Two offices</p>
              <p className="mt-1 text-sm text-gray-600">Lucknow and Mumbai</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Where to find us</h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {offices.map((office) => (
              <div key={office.city} className="rounded-2xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900">NextGen Fusion — {office.city}</h3>
                <address className="mt-3 not-italic leading-relaxed text-gray-600">
                  {office.address}
                </address>
                <dl className="mt-5 space-y-2 text-sm">
                  <div className="flex gap-2">
                    <dt className="w-24 shrink-0 font-medium text-gray-900">Contact</dt>
                    <dd className="text-gray-600">{office.contact.name}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-24 shrink-0 font-medium text-gray-900">Phone</dt>
                    <dd>
                      <a
                        className="inline-block py-1 text-gray-600 underline-offset-4 hover:text-gray-900 hover:underline"
                        href={`tel:${office.contact.phoneE164}`}
                      >
                        {office.contact.phone}
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-24 shrink-0 font-medium text-gray-900">Hours</dt>
                    <dd className="text-gray-600">Mon–Sat, 10:00–19:00 IST</dd>
                  </div>
                </dl>
                <iframe
                  title={`Map of the NextGen Fusion office in ${office.city}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(office.coordinates)}&z=14&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="mt-6 h-64 w-full rounded-xl border border-gray-100"
                />
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-gray-50 p-6">
            <h2 className="text-lg font-bold text-gray-900">Opening hours</h2>
            <dl className="mt-4 space-y-2 text-sm">
              {OPENING_HOURS.map((row) => (
                <div key={row.days} className="flex flex-wrap gap-2">
                  <dt className="w-48 font-medium text-gray-900">{row.days}</dt>
                  <dd className="text-gray-600">{row.hours}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm text-gray-600">
              Looking for something specific? See{" "}
              <Link href="/services/" className="font-medium text-purple-600 hover:underline">
                what we do
              </Link>
              ,{" "}
              <Link href="/work/" className="font-medium text-purple-600 hover:underline">
                what we have delivered
              </Link>
              , or{" "}
              <Link href="/support/" className="font-medium text-purple-600 hover:underline">
                our support and maintenance plans
              </Link>
              . Existing clients with a live site should use the support channel rather than this
              form so tickets reach the on-call developer.
            </p>
          </div>
        </section>

        <ContactSection />
      </main>
    </>
  )
}
