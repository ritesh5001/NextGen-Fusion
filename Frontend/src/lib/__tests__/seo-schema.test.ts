import { absoluteUrl, articleSchema, assetUrl, siteUrl } from "@/lib/seo"
import { getTeamMember, getTeamMemberByName, personId, team } from "@/data/team"

/**
 * Guards the two defects that actually shipped to production:
 *
 *  1. Asset URLs built with absoluteUrl() gained a trailing slash, so every
 *     structured-data image 308-redirected and validators treated them as
 *     unfetchable.
 *  2. The same person carried three different job titles across /about/,
 *     /team/<slug>/ and their blog byline, which is an entity-resolution
 *     failure no amount of markup compensates for.
 */

describe("assetUrl vs absoluteUrl", () => {
  it("never appends a trailing slash to an asset path", () => {
    expect(assetUrl("/member/ritesh-giri.png")).toBe(
      `${siteUrl}/member/ritesh-giri.png`,
    )
    expect(assetUrl("projects/deetoo/screenshot-1.png")).toBe(
      `${siteUrl}/projects/deetoo/screenshot-1.png`,
    )
  })

  it("passes through URLs that are already absolute", () => {
    const external = "https://cdn.example.com/a.png"
    expect(assetUrl(external)).toBe(external)
  })

  it("still appends a trailing slash for page paths", () => {
    expect(absoluteUrl("/about")).toBe(`${siteUrl}/about/`)
  })

  it("produces image URLs that do not end in a slash", () => {
    // A file path ending in "/" is a different resource and 308-redirects.
    for (const member of team) {
      expect(assetUrl(member.image).endsWith("/")).toBe(false)
    }
  })
})

describe("team identity is single-sourced", () => {
  it("gives every member exactly one canonical role", () => {
    const roles = new Map<string, string>()
    for (const member of team) {
      expect(roles.has(member.name)).toBe(false)
      roles.set(member.name, member.role)
      expect(member.role.trim().length).toBeGreaterThan(0)
    }
  })

  it("resolves a byline string back to the same member", () => {
    for (const member of team) {
      expect(getTeamMemberByName(member.name)?.slug).toBe(member.slug)
      expect(getTeamMemberByName(member.name.toUpperCase())?.slug).toBe(member.slug)
    }
    expect(getTeamMemberByName("Nobody At All")).toBeUndefined()
    expect(getTeamMemberByName(undefined)).toBeUndefined()
  })

  it("builds a stable Person @id per member", () => {
    for (const member of team) {
      expect(personId(member.slug, siteUrl)).toBe(
        `${siteUrl}/team/${member.slug}/#person`,
      )
      expect(getTeamMember(member.slug)).toBe(member)
    }
  })

  it("publishes only human-verified profile URLs in sameAs", () => {
    // linkedinUrl is a guessed slug and must never leak into sameAs; a sameAs
    // pointing at a stranger is worse for entity resolution than none.
    for (const member of team) {
      for (const url of member.verifiedProfiles) {
        expect(url).toMatch(/^https:\/\//)
      }
      expect(member.verifiedProfiles).not.toContain(member.linkedinUrl)
    }
  })
})

describe("articleSchema author linking", () => {
  const base = {
    title: "A post",
    description: "About something",
    path: "/blog/a-post",
  }

  it("references the canonical Person @id when the byline is a team member", () => {
    const schema = articleSchema({ ...base, authorName: "Ritesh Kumar Giri", authorSlug: "ritesh-giri" })
    expect(schema.author).toEqual({ "@id": `${siteUrl}/team/ritesh-giri/#person` })
  })

  it("falls back to a bare Person for an unknown byline", () => {
    const schema = articleSchema({ ...base, authorName: "Guest Writer" })
    expect(schema.author).toEqual({ "@type": "Person", name: "Guest Writer" })
  })

  it("attributes unbylined posts to the organisation", () => {
    const schema = articleSchema(base)
    expect(schema.author).toEqual({ "@id": `${siteUrl}/#organization` })
  })
})
