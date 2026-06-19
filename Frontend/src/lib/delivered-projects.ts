import rawUrls from "@/data/delivered-urls.json"
import capturedSlugs from "@/data/delivered-captured.json"

export type DeliveredProject = {
  url: string
  host: string // e.g. "thegrafftee.com"
  name: string // display name
  slug: string // file-safe id, used for the screenshot filename
  image: string // /delivered/<slug>.jpg
  hasImage: boolean // true when a screenshot exists on disk
}

const captured = new Set(capturedSlugs as string[])

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
    return {
      url,
      host,
      name: NAME_OVERRIDES[host] ?? fallbackName(host),
      slug,
      image: `/delivered/${slug}.jpg`,
      hasImage: captured.has(slug),
    }
  })
  // Show entries that have a real screenshot first (keeps the homepage teaser strong);
  // entries without a screenshot fall to the end and render a branded name card.
  .sort((a, b) => Number(b.hasImage) - Number(a.hasImage))
