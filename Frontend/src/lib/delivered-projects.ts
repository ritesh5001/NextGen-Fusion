import rawUrls from "@/data/delivered-urls.json"
import capturedSlugs from "@/data/delivered-captured.json"

export type DeliveredCategory = "ecommerce" | "service" | "custom"

export const CATEGORY_LABELS: Record<DeliveredCategory, string> = {
  ecommerce: "E-commerce",
  service: "Service-based",
  custom: "Custom",
}

// Ordered list of ecommerce product subcategories (used for filter chips).
export const ECOMMERCE_SUBCATEGORIES = [
  "Fashion & Clothing",
  "Jewelry",
  "Beauty & Wellness",
  "Food & Beverage",
  "Home & Decor",
  "Gifts",
  "Other",
] as const

export type DeliveredProject = {
  url: string
  host: string // e.g. "thegrafftee.com"
  name: string // display name
  slug: string // file-safe id, used for the screenshot filename
  image: string // /delivered/<slug>.jpg
  hasImage: boolean // true when a screenshot exists on disk
  category: DeliveredCategory
  subcategory?: string // product type, only for ecommerce
}

const captured = new Set(capturedSlugs as string[])

// Categorisation derived from each site's own content (scraped title/description)
// plus the brand/domain. Tuple = [category, ecommerce subcategory?].
// TODO: refine any of these if a site's focus changes.
const CLASSIFY: Record<string, [DeliveredCategory, string?]> = {
  // ── Custom apps / tools ──────────────────────────────────────────────
  "webscraperhub.com": ["custom"],
  "terrestrialyt.com": ["custom"],
  // ── Service-based businesses ─────────────────────────────────────────
  "3am-assignments.com": ["service"],
  "filtxpert.com": ["service"],
  "hcbengineering.in": ["service"],
  "chemnetixventures.com": ["service"],
  "thegrafftee.com": ["service"],
  "aahardecoration.in": ["service"],
  "decisivefitness.in": ["service"],
  "techmarkmedia.in": ["service"],
  "omsaigsk.in": ["service"],
  "punjabichaapcorner.com": ["service"],
  "grshotblasting.com": ["service"],
  "legalmetrology.nagaland.gov.in": ["service"],
  "jnnysartstudio.in": ["service"],
  "namaskarakarnatakadigitalmedia.online": ["service"],
  "tulsiinstitute.in": ["service"],
  "krushidoctor.com": ["service"],
  "24adsmarketing.com": ["service"],
  "atharavelectroplaters.com": ["service"],
  "bholawelding.com": ["service"],
  "chikusmile.com": ["service"],
  // ── E-commerce: Fashion & Clothing ───────────────────────────────────
  "rumaneroyale.com": ["ecommerce", "Fashion & Clothing"],
  "royalvaster.co.uk": ["ecommerce", "Fashion & Clothing"],
  "poshwave.co.in": ["ecommerce", "Fashion & Clothing"],
  "urbenthreads.in": ["ecommerce", "Fashion & Clothing"],
  "samaraha.com": ["ecommerce", "Fashion & Clothing"],
  "anchalweaves.com": ["ecommerce", "Fashion & Clothing"],
  "newsaraswatisareecentre.in": ["ecommerce", "Fashion & Clothing"],
  "themahilaa.com": ["ecommerce", "Fashion & Clothing"],
  "hmsfashionhub.com": ["ecommerce", "Fashion & Clothing"],
  "shyamtextile.online": ["ecommerce", "Fashion & Clothing"],
  "knockorignals.com": ["ecommerce", "Fashion & Clothing"],
  "navratri.onlinelover.in": ["ecommerce", "Fashion & Clothing"],
  "gajlaxmipaithani.com": ["ecommerce", "Fashion & Clothing"],
  "vibestyl.in": ["ecommerce", "Fashion & Clothing"],
  "jayantitextiles.in": ["ecommerce", "Fashion & Clothing"],
  "tatvivahtrends.com": ["ecommerce", "Fashion & Clothing"],
  "tatvivah.in": ["ecommerce", "Fashion & Clothing"],
  "zarqaa.in": ["ecommerce", "Fashion & Clothing"],
  "suratcollection.com": ["ecommerce", "Fashion & Clothing"],
  "stylessages.com": ["ecommerce", "Fashion & Clothing"],
  "sitaravastram.com": ["ecommerce", "Fashion & Clothing"],
  "mahhika.com": ["ecommerce", "Fashion & Clothing"],
  "kalamohini.in": ["ecommerce", "Fashion & Clothing"],
  "vostra.in": ["ecommerce", "Fashion & Clothing"],
  "luntra.co.in": ["ecommerce", "Fashion & Clothing"],
  "unitexfashion.in": ["ecommerce", "Fashion & Clothing"],
  // ── E-commerce: Jewelry ──────────────────────────────────────────────
  "slowy.in": ["ecommerce", "Jewelry"],
  "sweetyonline.com": ["ecommerce", "Jewelry"],
  "lesbijouxdangeli.com": ["ecommerce", "Jewelry"],
  "swarnsutra.com": ["ecommerce", "Jewelry"],
  "glamourjewellery.in": ["ecommerce", "Jewelry"],
  "aarthifashionjewellery.com": ["ecommerce", "Jewelry"],
  "sudheerktonegramgold.com": ["ecommerce", "Jewelry"],
  "vyorajewelhouse.com": ["ecommerce", "Jewelry"],
  // ── E-commerce: Beauty & Wellness ────────────────────────────────────
  "vayue.in": ["ecommerce", "Beauty & Wellness"],
  "nuaura.co": ["ecommerce", "Beauty & Wellness"],
  "aalaenatural.com": ["ecommerce", "Beauty & Wellness"],
  "aquossilver.com": ["ecommerce", "Beauty & Wellness"],
  "fabonaturals.com": ["ecommerce", "Beauty & Wellness"],
  "sweatfreelife.com": ["ecommerce", "Beauty & Wellness"],
  "qathirsnaturals.com": ["ecommerce", "Beauty & Wellness"],
  "keoolix.in": ["ecommerce", "Beauty & Wellness"],
  "soukprofumi.it": ["ecommerce", "Beauty & Wellness"],
  // ── E-commerce: Food & Beverage ──────────────────────────────────────
  "tastyhouse.in": ["ecommerce", "Food & Beverage"],
  "kashmircart.in": ["ecommerce", "Food & Beverage"],
  "pamporekesar.com": ["ecommerce", "Food & Beverage"],
  // ── E-commerce: Home & Decor ─────────────────────────────────────────
  "prccandles.com": ["ecommerce", "Home & Decor"],
  "sncovers.com": ["ecommerce", "Home & Decor"],
  // ── E-commerce: Gifts ────────────────────────────────────────────────
  "newgiftcentre.in": ["ecommerce", "Gifts"],
  "craftihubsartmart.in": ["ecommerce", "Gifts"],
  "shringarika.in": ["ecommerce", "Gifts"],
  "craftedframes.in": ["ecommerce", "Gifts"],
  "clickngreet.in": ["ecommerce", "Gifts"],
  // ── E-commerce: Other ────────────────────────────────────────────────
  "ujjkartglobaltraders.com": ["ecommerce", "Other"],
  "saurally.com": ["ecommerce", "Other"],
  "jovialdots.com": ["ecommerce", "Other"],
  "badmintonsq.com": ["ecommerce", "Other"],
  "shreeganadhish.com": ["ecommerce", "Other"],
  "shudita.com": ["ecommerce", "Other"],
  "shukala.com": ["ecommerce", "Other"],
  "shailudigitalstore.com": ["ecommerce", "Other"],
  "kenstto.com": ["ecommerce", "Other"],
  "khyationlinemart.in": ["ecommerce", "Other"],
  "hmsbrothers.com": ["ecommerce", "Other"],
  "orangelilies.com": ["ecommerce", "Beauty & Wellness"],
}

// Nicer display names for recognisable brands; everything else falls back to the host.
const NAME_OVERRIDES: Record<string, string> = {
  "thegrafftee.com": "The Grafftee",
  "tatvivahtrends.com": "TatVivah Trends",
  "tatvivah.in": "TatVivah",
  "clickngreet.in": "ClickNGreet",
  "krushidoctor.com": "Krushi Doctor",
  "hcbengineering.in": "HCB Engineering",
  "newsaraswatisareecentre.in": "New Saraswati Saree Centre",
  "sitaravastram.com": "Sitara Vastram",
  "kalamohini.in": "Kala Mohini",
  "terrestrialyt.com": "Terrestrial",
  "decisivefitness.in": "Decisive Fitness",
  "glamourjewellery.in": "Glamour Jewellery",
  "aarthifashionjewellery.com": "Aarthi Fashion Jewellery",
  "newgiftcentre.in": "New Gift Centre",
  "punjabichaapcorner.com": "Punjabi Chaap Corner",
  "gajlaxmipaithani.com": "Gajlaxmi Paithani",
  "jayantitextiles.in": "Jayanti Textiles",
  "suratcollection.com": "Surat Collection",
  "tulsiinstitute.in": "Tulsi Institute",
  "24adsmarketing.com": "24 Ads Marketing",
  "techmarkmedia.in": "Techmark Media",
  "webscraperhub.com": "WebScraperHub",
  "filtxpert.com": "FiltXpert",
  "fabonaturals.com": "Fabo Naturals",
  "qathirsnaturals.com": "Qathir's Naturals",
  "pamporekesar.com": "Pampore Kesar",
  "kashmircart.in": "Kashmir Cart",
  "bholawelding.com": "Bhola Welding",
  "grshotblasting.com": "GR Shot Blasting",
  "atharavelectroplaters.com": "Atharav Electroplaters",
  "chemnetixventures.com": "Chemnetix Ventures",
  "soukprofumi.it": "Souk Profumi",
  "orangelilies.com": "Orange Lilies",
  "rumaneroyale.com": "Rumäne Royale",
  "aalaenatural.com": "Aalae Natural",
  "royalvaster.co.uk": "Royal Vastar",
  "sweetyonline.com": "Sweety Bangles & Jewels",
  "vayue.in": "Vayué",
  "poshwave.co.in": "PoshWave",
  "nuaura.co": "Nuáura",
  "keoolix.in": "Keoolix",
}

function hostFromUrl(url: string): string {
  return url
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/.*$/, "")
    .toLowerCase()
}

function fallbackName(host: string): string {
  const core = host.split(".")[0]
  return core.charAt(0).toUpperCase() + core.slice(1)
}

export const deliveredProjects: DeliveredProject[] = (rawUrls as string[])
  .map((url) => {
    const host = hostFromUrl(url)
    const slug = host.replace(/[^a-z0-9]+/g, "-")
    const [category, subcategory] = CLASSIFY[host] ?? (["ecommerce", "Other"] as [DeliveredCategory, string?])
    return {
      url,
      host,
      name: NAME_OVERRIDES[host] ?? fallbackName(host),
      slug,
      image: `/delivered/${slug}.jpg`,
      hasImage: captured.has(slug),
      category,
      subcategory,
    }
  })

  // Only list projects that actually have a screenshot on disk. Sites whose
  // screenshot couldn't be captured are hidden entirely (no fallback name cards).
  // Order follows delivered-urls.json, so the homepage teaser shows the first N there.
  
  .filter((project) => project.hasImage)
