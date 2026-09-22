export interface Office {
  city: string
  /** Human-readable address as shown on the page. */
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

export const offices: Office[] = [
  {
    city: "Lucknow",
    address:
      "3rd Floor, Galaxy Apartment, Dayal Residency, Shankar Puri, Kamta, Lucknow, Uttar Pradesh 226028",
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
    address:
      "GNM/95/347, Floor No: Ground, Banwari Compound, Mahim Rly Stn (E), Mahim, Mumbai 400016",
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
 * Add the URL only once the profile is live, and keep the name, address and
 * phone on it identical to `offices` above. Next to add: Google Business
 * Profile, LinkedIn, Clutch, GoodFirms, DesignRush, TechBehemoths, JustDial,
 * IndiaMART, Crunchbase.
 */
export const brandProfiles: { label: string; href: string }[] = [
  { label: "Instagram", href: "https://www.instagram.com/nextgenfusion.devs/" },
]
