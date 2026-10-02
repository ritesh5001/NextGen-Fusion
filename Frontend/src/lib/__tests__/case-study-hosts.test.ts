import { caseStudySlugByHost } from "@/data/case-study-hosts"
import { staticProjects } from "@/lib/static-projects"

const host = (url: string) =>
  url.replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/.*$/, "").toLowerCase()

describe("caseStudySlugByHost", () => {
  it("matches every case study in static-projects", () => {
    const expected = Object.fromEntries(
      staticProjects.filter((p) => p.liveUrl).map((p) => [host(p.liveUrl), p.slug]),
    )
    expect(caseStudySlugByHost).toEqual(expected)
  })
})
