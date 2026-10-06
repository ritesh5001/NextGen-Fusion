import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { APPLICATIONS_OPEN, jobOpenings } from "@/data/careers"
import { offices } from "@/data/offices"
import { absoluteUrl, breadcrumbSchema, buildMetadata, ORGANIZATION_ID, siteUrl } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: APPLICATIONS_OPEN
    ? "Careers — Open Roles in Lucknow, Mumbai & Remote"
    : "Careers at NextGen Fusion — Lucknow & Mumbai",
  description: APPLICATIONS_OPEN
    ? "We are hiring developers, designers and marketers in Lucknow, Mumbai and remote — engineering, UI/UX, SEO, paid ads and content roles."
    : "What it is like to work at NextGen Fusion, a web and product studio in Lucknow and Mumbai. We are not hiring right now; new roles will be listed here.",
  path: "/careers",
  ogTitle: "Careers at NextGen Fusion",
  ogDescription: APPLICATIONS_OPEN
    ? "Build websites, stores, and digital products that go live for real clients. Open roles across engineering, design, marketing, and content."
    : "Build websites, stores, and digital products that go live for real clients. We are not hiring right now.",
})

const EMPLOYMENT_TYPE: Record<string, string> = {
  "Full-time": "FULL_TIME",
  Internship: "INTERN",
  Contract: "CONTRACTOR",
}

/** Lucknow is the default hiring base; roles naming Mumbai map to that office. */
function placeFor(location: string) {
  const office =
    offices.find((o) => location.toLowerCase().includes(o.city.toLowerCase())) ?? offices[0]
  return {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      ...(office.postal.street ? { streetAddress: office.postal.street } : {}),
      addressLocality: office.postal.locality,
      addressRegion: office.postal.region,
      ...(office.postal.postalCode ? { postalCode: office.postal.postalCode } : {}),
      addressCountry: office.postal.country,
    },
  }
}

// Only roles with real dates emit JobPosting. See the note on JobOpening.
const datedOpenings = APPLICATIONS_OPEN
  ? jobOpenings.filter((job) => job.postedOn && job.validThrough)
  : []

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl("/careers")}#collection`,
    url: absoluteUrl("/careers"),
    name: "Careers at NextGen Fusion",
    description: APPLICATIONS_OPEN
      ? "Open engineering, design, marketing and content roles across the Lucknow and Mumbai offices and remote."
      : "Working at NextGen Fusion. Applications are closed while we are not hiring.",
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": ORGANIZATION_ID },
    ...(APPLICATIONS_OPEN ? {
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: jobOpenings.length,
        itemListElement: jobOpenings.map((job, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: job.title,
          url: `${absoluteUrl("/careers")}#${job.id}`,
        })),
      },
    } : {}),
  },
  ...datedOpenings.map((job) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "@id": `${absoluteUrl("/careers")}#${job.id}`,
    title: job.title,
    description: [
      `<p>${job.summary}</p>`,
      `<p><strong>What you will do</strong></p><ul>${job.responsibilities
        .map((r) => `<li>${r}</li>`)
        .join("")}</ul>`,
      `<p><strong>What we are looking for</strong></p><ul>${job.requirements
        .map((r) => `<li>${r}</li>`)
        .join("")}</ul>`,
    ].join(""),
    identifier: { "@type": "PropertyValue", name: "NextGen Fusion", value: job.id },
    datePosted: job.postedOn,
    validThrough: job.validThrough,
    employmentType: EMPLOYMENT_TYPE[job.type] ?? "OTHER",
    hiringOrganization: { "@id": ORGANIZATION_ID },
    industry: "Web and software development",
    jobLocation: placeFor(job.location),
    ...(job.location.toLowerCase().includes("remote")
      ? {
          jobLocationType: "TELECOMMUTE",
          applicantLocationRequirements: { "@type": "Country", name: "India" },
        }
      : {}),
    directApply: true,
    url: `${absoluteUrl("/careers")}#${job.id}`,
  })),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Careers", path: "/careers" },
  ]),
]

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  )
}
