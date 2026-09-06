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
    address: "Lucknow, Uttar Pradesh",
    postal: {
      locality: "Lucknow",
      region: "Uttar Pradesh",
      country: "IN",
    },
    coordinates: "26.8467, 80.9462",
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
    contact: {
      name: "Mohd Mustejab Ansari",
      phone: "+91 77158 21892",
      phoneE164: "+917715821892",
    },
  },
]

/** The number used in schema, the primary CTA and every directory listing. */
export const PRIMARY_PHONE_E164 = "+917348228167"
export const PRIMARY_PHONE_DISPLAY = "+91 73482 28167"
export const CONTACT_EMAIL = "contact@nextgenfusion.in"
