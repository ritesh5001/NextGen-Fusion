/**
 * Live-site host → case-study slug, for the delivered wall.
 *
 * Kept separate from static-projects.ts so the wall (a client component) does
 * not ship every case study's full write-up — about 21 KB gzipped — to the
 * browser just to know which cards have a case study. A unit test fails if this
 * drifts from static-projects.
 */
export const caseStudySlugByHost: Record<string, string> = {
  "tatvivahtrends.com": "tatvivahtrends",
  "deetoo.in": "deetoo",
  "maribiz.ai": "maribiz-ai",
  "cleanship.co": "cleanship",
  "thegrafftee.com": "thegrafftee",
  "hcbengineering.in": "hcbengineering",
  "clickngreet.in": "clickngreet",
  "samaraha.com": "samaraha",
  "nextmentor.in": "nextmentor",
  "vashtaraheaven.com": "vashtaraheaven",
  "ladyscootytrainer.com": "ladyscootytrainer",
  "newsaraswatisareecentre.in": "newsaraswatisareecentre",
  "saurally.com": "saurally",
  "sidcobharat.org": "sidcobharat",
  "sitaravastram.com": "sitaravastram",
  "terrestrialyt.com": "terrestrialyt",
  "krushidoctor.com": "krushidoctor",
  "kalamohini.in": "kalamohini",
  "mahhika.com": "mahhika",
}
