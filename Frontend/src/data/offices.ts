export interface Office {
  city: string
  /**
   * Human-readable address as shown on the page. Built from `postal` so the
   * page, the footer and the schema can never disagree; keep `postal` word for
   * word identical to the office's Google Business Profile.
   */
  address: string
  /** Structured form, for PostalAddress schema. `street` is omitted where we
   *  genuinely do not have a street-level address to publish. */
  postal: {
    street?: string
    locality: string
    region: string
    postalCode?: string
    country: string
  }
  coordinates: string
  /** The office's Google Business Profile / Maps share link, once known. */
  mapUrl?: string
  /** City landing page for this office. Each ProfessionalService node needs its
   *  own `url`: both pointing at the homepage let Google collapse two locations
   *  into one entity, which is the opposite of why we publish two. */
  landingPath: string
  contact: {
    name: string
    /** Display form, with spaces. */
    phone: string
    /** E.164, no spaces — `tel:` hrefs and schema must use this. A tel: URI
     *  containing literal spaces is invalid and fails to dial on some clients. */
    phoneE164: string
  }
}

function formatAddress(postal: Office["postal"]): string {
  return [postal.street, postal.locality, `${postal.region}${postal.postalCode ? ` ${postal.postalCode}` : ""}`]
    .filter(Boolean)
    .join(", ")
}

const officeData: Omit<Office, "address">[] = [
  {
    city: "Lucknow",
    postal: {
      street: "3rd Floor, Galaxy Apartment, Dayal Residency, Shankar Puri, Kamta",
      locality: "Lucknow",
      region: "Uttar Pradesh",
      postalCode: "226028",
      country: "IN",
    },
    coordinates: "26.8467, 80.9462",
    landingPath: "/website-development-company-in-lucknow/",
    contact: {
      name: "Team Lucknow",
      phone: "+91 73482 28167",
      phoneE164: "+917348228167",
    },
  },
  {
    city: "Mumbai",
    postal: {
      street: "GNM/95/347, Ground Floor, Banwari Compound, Mahim Rly Stn (E), Mahim",
      locality: "Mumbai",
      region: "Maharashtra",
      postalCode: "400016",
      country: "IN",
    },
    coordinates: "19.0408, 72.8260",
    landingPath: "/website-development-company-in-mumbai/",
    contact: {
      name: "Mohd Mustejab Ansari",
      phone: "+91 77158 21892",
      phoneE164: "+917715821892",
    },
  },
]

export const offices: Office[] = officeData.map((office) => ({ ...office, address: formatAddress(office.postal) }))

/**
 * The one statement of when we are available. Schema, the contact page, the
 * homepage FAQ and the comparison table all read it, because they used to
 * disagree ("24/7 support" next to Mon–Sat hours).
 */
export const OFFICE_HOURS = {
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  opens: "10:00",
  closes: "19:00",
  label: "Mon–Sat, 10:00–19:00 IST",
  replyWithin: "one working day",
} as const

/**
 * Our office hours in another time zone, e.g. `officeHoursAt(-90)` for the UAE
 * (1h30 behind India) or `officeHoursAt(150)` for Singapore (2h30 ahead).
 * India has no daylight saving, so the offset is fixed per zone; for places
 * that do observe it (south-eastern Australia), call it once per offset.
 * Wraps past midnight: Sydney in summer closes at 00:30, not 24:30.
 */
export function officeHoursAt(minutesFromIndia: number): string {
  const shift = (time: string) => {
    const [h, m] = time.split(":").map(Number)
    const total = (((h * 60 + m + minutesFromIndia) % 1440) + 1440) % 1440
    return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`
  }
  return `${shift(OFFICE_HOURS.opens)}–${shift(OFFICE_HOURS.closes)}`
}

/** The number used in schema, the primary CTA and every directory listing. */
export const PRIMARY_PHONE_E164 = "+917348228167"
export const PRIMARY_PHONE_DISPLAY = "+91 73482 28167"
export const CONTACT_EMAIL = "contact@nextgenfusion.in"

/**
 * Official brand profiles. One list feeds Organization.sameAs and the footer,
 * so a new listing is added once and shows up in both.
 *
 * Other companies trade as "NextGen Fusion" (a US Inc, a Colorado Facebook page),
 * so each verified profile here is how Google ties the name to this agency.
 * Paste each URL once the profile is live; entries left empty are skipped, so
 * nothing half-finished reaches the footer or the schema. Google Business
 * Profile matters most: it corroborates the Lucknow address, and its name,
 * address and phone must match `offices` above word for word. After these:
 * DesignRush, TechBehemoths, JustDial, IndiaMART, Crunchbase.
 */
const brandProfileLinks: { label: string; href: string }[] = [
  { label: "Google Business Profile", href: "" },
  { label: "LinkedIn", href: "" },
  { label: "Facebook", href: "" },
  { label: "Instagram", href: "https://www.instagram.com/nextgenfusion.devs/" },
  { label: "Clutch", href: "" },
  { label: "GoodFirms", href: "" },
]

export const brandProfiles = brandProfileLinks.filter((profile) => profile.href)
