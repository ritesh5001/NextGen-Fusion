import { DESCRIPTION_MAX, fitDescription, fitTitle, TITLE_MAX } from "@/lib/seo"
import { generatedServicePairs, isDestinationPage, isServicePageIndexed } from "@/data/city-pages/paths"
import { isExistingPage } from "@/data/city-pages/types"
import { australia } from "@/data/australia"
import { india } from "@/data/india"

const absolute = (title: ReturnType<typeof fitTitle>) =>
  typeof title === "object" && title && "absolute" in title ? title.absolute : String(title)

describe("fitTitle", () => {
  it("adds the brand when it fits", () => {
    expect(absolute(fitTitle("SEO Services in Pune"))).toBe("SEO Services in Pune | NextGen Fusion")
  })

  it("drops the brand rather than truncate the keyword", () => {
    const title = "Custom Software Development in Sunshine Coast"
    expect(absolute(fitTitle(title))).toBe(title)
  })

  it("cuts a tagline after a dash", () => {
    expect(
      absolute(fitTitle("Website Development on the Gold Coast — Direct Bookings That Save Commission")),
    ).toBe("Website Development on the Gold Coast | NextGen Fusion")
  })

  it("never exceeds the limit", () => {
    const long = "A very long title with no separators that keeps going well past the sixty character limit"
    expect(absolute(fitTitle(long)).length).toBeLessThanOrEqual(TITLE_MAX)
  })
})

describe("fitDescription", () => {
  it("leaves short descriptions alone", () => {
    expect(fitDescription("Short and sweet.")).toBe("Short and sweet.")
  })

  it("keeps whole sentences when they fit", () => {
    const text = `${"First sentence that is reasonably long and descriptive of the page".padEnd(100, " ok")}. Second sentence pushes the total well past the snippet limit for sure.`
    const fitted = fitDescription(text)
    expect(fitted.length).toBeLessThanOrEqual(DESCRIPTION_MAX)
    expect(fitted.endsWith(".")).toBe(true)
  })

  it("falls back to a word boundary", () => {
    const fitted = fitDescription("word ".repeat(80))
    expect(fitted.length).toBeLessThanOrEqual(DESCRIPTION_MAX)
    expect(fitted.endsWith("…")).toBe(true)
  })
})

describe("city × service indexing", () => {
  const regions = [australia, india]

  it("indexes destination pages and keeps thin ones out", () => {
    for (const region of regions) {
      for (const { city, service } of generatedServicePairs(region)) {
        const page = city.services[service]
        if (isExistingPage(page) || region.localOffice?.(city)) continue
        expect(isServicePageIndexed(region, city, service)).toBe(isDestinationPage(page))
      }
    }
  })

  it("indexes every service page in an office city", () => {
    const lucknow = india.cities.find((city) => city.slug === "lucknow")!
    const pairs = generatedServicePairs(india).filter(({ city }) => city === lucknow)
    expect(pairs.length).toBeGreaterThan(0)
    for (const { city, service } of pairs) expect(isServicePageIndexed(india, city, service)).toBe(true)
  })
})
