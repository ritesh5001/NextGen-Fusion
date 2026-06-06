// The canonical, reusable per-client brand profile. It is a superset of the WP
// Plugin Generator's input shape plus product image URLs for the Banner
// Generator, so a single saved profile can prefill both tools.

export type BrandProfile = {
  businessName: string
  cssPrefix: string
  pluginSlug: string
  websiteUrl: string
  logoUrl: string
  tagline: string
  description: string
  contactEmail: string
  whatsapp: string
  country: string
  targetAudience: string
  social: { instagram: string; linkedin: string; twitter: string; youtube: string; facebook: string }
  pageContent: { home: string; about: string; services: string; contact: string }
  policy: {
    refundDays: string
    physicalProducts: boolean
    paymentGateways: string
    recurringBilling: boolean
    specialLegal: string
  }
  extraPages: string
  productImageUrls: string[]
}

export const EMPTY_BRAND: BrandProfile = {
  businessName: '',
  cssPrefix: '',
  pluginSlug: '',
  websiteUrl: '',
  logoUrl: '',
  tagline: '',
  description: '',
  contactEmail: '',
  whatsapp: '',
  country: '',
  targetAudience: '',
  social: { instagram: '', linkedin: '', twitter: '', youtube: '', facebook: '' },
  pageContent: { home: '', about: '', services: '', contact: '' },
  policy: { refundDays: '', physicalProducts: false, paymentGateways: '', recurringBilling: false, specialLegal: '' },
  extraPages: '',
  productImageUrls: [],
}

// Fill a profile from a stored (possibly partial) object without dropping the
// typed defaults, so older/partial rows still load cleanly.
export function hydrateBrand(stored: unknown): BrandProfile {
  const p = (stored && typeof stored === 'object' ? stored : {}) as Partial<BrandProfile>
  return {
    ...EMPTY_BRAND,
    ...p,
    social: { ...EMPTY_BRAND.social, ...(p.social ?? {}) },
    pageContent: { ...EMPTY_BRAND.pageContent, ...(p.pageContent ?? {}) },
    policy: { ...EMPTY_BRAND.policy, ...(p.policy ?? {}) },
    productImageUrls: Array.isArray(p.productImageUrls) ? p.productImageUrls : [],
  }
}

// Overlay AI-parsed values onto the current profile without wiping fields the
// user already filled: a parsed value only wins when it is non-empty.
export function mergeParsed(current: BrandProfile, parsed: Partial<BrandProfile>): BrandProfile {
  const pick = (next: unknown, prev: string) =>
    typeof next === 'string' && next.trim() ? next : prev
  const p = parsed
  return {
    ...current,
    businessName: pick(p.businessName, current.businessName),
    cssPrefix: pick(p.cssPrefix, current.cssPrefix),
    pluginSlug: pick(p.pluginSlug, current.pluginSlug),
    websiteUrl: pick(p.websiteUrl, current.websiteUrl),
    logoUrl: pick(p.logoUrl, current.logoUrl),
    tagline: pick(p.tagline, current.tagline),
    description: pick(p.description, current.description),
    contactEmail: pick(p.contactEmail, current.contactEmail),
    whatsapp: pick(p.whatsapp, current.whatsapp),
    country: pick(p.country, current.country),
    targetAudience: pick(p.targetAudience, current.targetAudience),
    social: {
      instagram: pick(p.social?.instagram, current.social.instagram),
      linkedin: pick(p.social?.linkedin, current.social.linkedin),
      twitter: pick(p.social?.twitter, current.social.twitter),
      youtube: pick(p.social?.youtube, current.social.youtube),
      facebook: pick(p.social?.facebook, current.social.facebook),
    },
    pageContent: {
      home: pick(p.pageContent?.home, current.pageContent.home),
      about: pick(p.pageContent?.about, current.pageContent.about),
      services: pick(p.pageContent?.services, current.pageContent.services),
      contact: pick(p.pageContent?.contact, current.pageContent.contact),
    },
    policy: {
      refundDays: pick(p.policy?.refundDays, current.policy.refundDays),
      physicalProducts: p.policy?.physicalProducts ?? current.policy.physicalProducts,
      paymentGateways: pick(p.policy?.paymentGateways, current.policy.paymentGateways),
      recurringBilling: p.policy?.recurringBilling ?? current.policy.recurringBilling,
      specialLegal: pick(p.policy?.specialLegal, current.policy.specialLegal),
    },
    extraPages: pick(p.extraPages, current.extraPages),
  }
}
