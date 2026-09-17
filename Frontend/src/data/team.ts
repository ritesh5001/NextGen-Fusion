/**
 * Canonical team identity. Single source of truth for name, role, photo and
 * office across /about/, /team/, /team/<slug>/, blog bylines and every Person
 * node in structured data.
 *
 * This file exists because those surfaces each carried their own copy and had
 * drifted: the founder was "Founder & Full Stack Developer" on /about/, plain
 * "Full Stack Developer" on /team/<slug>/, and "Content Writer" on his own blog
 * byline. Three job titles for one named person is an entity-resolution failure
 * — AI systems cannot decide which claim about the author to trust, so they
 * hedge or drop the attribution. Change a role here and it changes everywhere.
 */

export interface TeamMember {
  slug: string
  name: string
  givenName: string
  familyName: string
  /** Canonical job title. The only place this is defined. */
  role: string
  image: string
  email: string
  /** City of the office this person works from — keys into `offices`. */
  officeCity: "Lucknow" | "Mumbai"
  isFounder: boolean
  /** Short form, used on cards and /about/. */
  bio: string
  /** Topics this person demonstrably works in; feeds Person.knowsAbout. */
  knowsAbout: string[]
  /**
   * Personal profile URLs.
   *
   * NOT emitted into Person.sameAs. These slugs were guessed rather than
   * verified, and LinkedIn blocks automated checks (HTTP 999), so we cannot
   * confirm from here that they resolve to these people. A sameAs pointing at
   * a stranger's profile is worse for entity resolution than no sameAs at all.
   * Confirm each URL, then move it into `verifiedProfiles` below.
   */
  linkedinUrl?: string
  /**
   * Confirmed-live profile URLs, safe to publish in Person.sameAs.
   * Add only URLs that have been opened and checked by a human.
   */
  verifiedProfiles: string[]
}

export const team: TeamMember[] = [
  {
    slug: "ritesh-giri",
    name: "Ritesh Kumar Giri",
    givenName: "Ritesh",
    familyName: "Giri",
    role: "Founder & Full Stack Developer",
    image: "/member/ritesh-giri.png",
    email: "ritesh@nextgenfusion.in",
    officeCity: "Lucknow",
    isFounder: true,
    bio: "Owns technical architecture across every project — Next.js and Shopify front ends, Node and Postgres back ends, and the deployment pipelines that keep them up. Writes the estimate you receive and is on the call when it is delivered.",
    knowsAbout: [
      "Full stack web development",
      "Next.js and React",
      "WooCommerce and WordPress development",
      "Ecommerce architecture",
      "API integration",
      "Technical SEO",
    ],
    linkedinUrl: "https://linkedin.com/in/ritesh-giri",
    verifiedProfiles: [],
  },
  {
    slug: "sajal-singh",
    name: "Sajal Singh",
    givenName: "Sajal",
    familyName: "Singh",
    role: "Co-Founder, Full Stack Developer & Cinematographer",
    image: "/member/sajal-singh.jpeg",
    email: "sajal@nextgenfusion.in",
    officeCity: "Lucknow",
    isFounder: true,
    bio: "Splits time between building product surfaces and shooting the photography and video that fills them. The reason our ecommerce clients get a store and the imagery to merchandise it.",
    knowsAbout: [
      "Full stack web development",
      "Cinematography",
      "Product photography",
      "Video production",
      "UI implementation",
    ],
    linkedinUrl: "https://linkedin.com/in/sajal-singh",
    verifiedProfiles: [],
  },
  {
    slug: "mohammad-iqbal",
    name: "Mohammad Iqbal",
    givenName: "Mohammad",
    familyName: "Iqbal",
    role: "Full Stack & Android Developer",
    image: "/member/mohammad-iqbal.png",
    email: "iqbal@nextgenfusion.in",
    officeCity: "Lucknow",
    isFounder: false,
    bio: "Builds the Android apps and the API layers that connect storefronts to CRMs, payment gateways and internal tooling. Handles most of our integration work.",
    knowsAbout: [
      "Android app development",
      "React Native",
      "API integration",
      "Backend architecture",
      "Full stack web development",
    ],
    linkedinUrl: "https://linkedin.com/in/mohammad-iqbal",
    verifiedProfiles: [],
  },
  {
    slug: "vivek-gautam",
    name: "Vivek Gautam",
    givenName: "Vivek",
    familyName: "Gautam",
    role: "SEO & Social Media Marketing",
    image: "/member/vivek-gautam.jpeg",
    email: "vivek@nextgenfusion.in",
    officeCity: "Lucknow",
    isFounder: false,
    bio: "Runs technical SEO, keyword strategy and content planning. Joins projects before launch rather than after, so site structure and internal linking are right the first time.",
    knowsAbout: [
      "Technical SEO",
      "Local search optimization",
      "Keyword strategy",
      "Content planning",
      "Social media marketing",
    ],
    linkedinUrl: "https://linkedin.com/in/vivek-gautam",
    verifiedProfiles: [],
  },
]

export const TEAM_SIZE = team.length

export function getTeamMember(slug: string): TeamMember | undefined {
  return team.find((member) => member.slug === slug)
}

/** Stable @id for a person, so every byline and employee entry resolves to one node. */
export function personId(slug: string, siteUrl: string): string {
  return `${siteUrl}/team/${slug}/#person`
}

/**
 * Resolve a byline string to a team member. Blog posts store the author as a
 * plain name, and the byline used to render a hard-coded "Content Writer"
 * regardless of who wrote the piece — directly contradicting the same person's
 * title on /about/ and undercutting the authority of the writing.
 */
export function getTeamMemberByName(name?: string | null): TeamMember | undefined {
  if (!name) return undefined
  const normalized = name.trim().toLowerCase()
  return team.find((member) => member.name.toLowerCase() === normalized)
}
