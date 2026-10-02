/**
 * Australian city pages: /australia/, /australia/<city>/ and
 * /australia/<city>/<service>/.
 *
 * Every page's copy is written for that page alone: there is no shared
 * paragraph filled in with a city name. A city file has to supply all fifteen
 * service pages (the Record type enforces it), so adding a city means writing
 * fifteen pages, not copying one.
 *
 * There is no Australian office. Pages say so and the schema marks them as
 * served remotely from the Lucknow office, with no Australian address. Client
 * names are left off at the owner's request; proof is limited to case studies
 * already published on /work/.
 */
import type { AuServiceSlug } from "./services"

export type AuFaq = { question: string; answer: string }

export type AuSection = { heading: string; body: string[] }

export type AuProblem = {
  /** In the customer's words: what they would say is wrong. */
  symptom: string
  cause: string
  /** What we would do first, in order. */
  steps: string[]
}

export type AuIndustry = { name: string; need: string }

export type AuZone = { label: string; offset: number }

export type AuServicePage = {
  metaTitle: string
  metaDescription: string
  h1: string
  /** One line on the city page's list of services. */
  card: string
  intro: string[]
  sections: AuSection[]
  problems: AuProblem[]
  checklist: string[]
  faqs: AuFaq[]
  /** Slugs of published case studies under /work/. */
  caseStudies?: string[]
}

export type AuCity = {
  slug: string
  name: string
  state: string
  stateCode: "NSW" | "VIC" | "QLD" | "WA" | "SA" | "TAS" | "ACT" | "NT"
  /** One line for the Australia hub's city list. */
  summary: string
  /** Time zone as minutes ahead of India; `dst` only where it is observed. */
  zone: { std: AuZone; dst?: AuZone }
  areas: string[]
  nearby: string[]
  page: {
    metaTitle: string
    metaDescription: string
    h1: string
    intro: string[]
    sections: AuSection[]
    industries: AuIndustry[]
    problems: (AuProblem & { service: AuServiceSlug })[]
    faqs: AuFaq[]
  }
  services: Record<AuServiceSlug, AuServicePage>
}
