import { CONTACT_EMAIL, OFFICE_HOURS, offices, type Office } from "@/data/offices"
import { ORGANIZATION_ID, siteUrl } from "@/lib/seo"

export function officeId(city: string): string {
  return `${siteUrl}/#office-${city.toLowerCase()}`
}

/**
 * The ProfessionalService node for one physical office: the local entity
 * signals (address, geo, phone, hours) the Organization node cannot express.
 *
 * Rendered only on the homepage, the contact page and that office's own city
 * pages. It used to sit in the root layout, so both offices were declared on
 * all 581 URLs, privacy pages and Australian city pages included, which blurs
 * which page is the local landing page for which office.
 */
export function officeSchema(office: Office) {
  const [latitude, longitude] = office.coordinates.split(",").map((part) => Number(part.trim()))
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": officeId(office.city),
    name: `NextGen Fusion — ${office.city}`,
    // Its own city page, not the homepage. Two LocalBusiness nodes sharing one
    // url is how Google ends up merging two offices into one location.
    url: `${siteUrl}${office.landingPath}`,
    image: { "@id": `${siteUrl}/#logo` },
    parentOrganization: { "@id": ORGANIZATION_ID },
    telephone: office.contact.phoneE164,
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      ...(office.postal.street ? { streetAddress: office.postal.street } : {}),
      addressLocality: office.postal.locality,
      addressRegion: office.postal.region,
      ...(office.postal.postalCode ? { postalCode: office.postal.postalCode } : {}),
      addressCountry: office.postal.country,
    },
    geo: { "@type": "GeoCoordinates", latitude, longitude },
    ...(office.mapUrl ? { hasMap: office.mapUrl } : {}),
    areaServed: ["IN", "AE", "SG", "AU", "Worldwide"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...OFFICE_HOURS.days],
        opens: OFFICE_HOURS.opens,
        closes: OFFICE_HOURS.closes,
      },
    ],
  }
}

/** Office nodes for the given cities (all offices when omitted). */
export function officeSchemas(cities?: string[]) {
  return offices.filter((office) => !cities || cities.includes(office.city)).map(officeSchema)
}
