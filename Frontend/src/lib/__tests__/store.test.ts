import { isStoreProductIndexable, type StoreProduct } from "@/lib/store"

const product = (overrides: Partial<StoreProduct> = {}): StoreProduct => ({
  id: "1",
  slug: "crm-software-pro",
  title: "CRM Software Pro",
  summary: "A CRM",
  description: null,
  category: "Software",
  price_inr: 4999,
  price_usd: null,
  cover_image: null,
  gallery: [],
  features: [],
  tech_stack: [],
  demo_url: null,
  version: null,
  is_featured: false,
  display_order: 0,
  created_at: "2026-01-01",
  ...overrides,
})

const ready = {
  cover_image: "/store/crm.png",
  description: "x".repeat(600),
  features: ["Leads", "Deals", "Reports"],
}

describe("isStoreProductIndexable", () => {
  it("keeps a product with a real image, description and feature list", () => {
    expect(isStoreProductIndexable(product(ready))).toBe(true)
  })

  it("excludes the thin template page — no image, no description, no features", () => {
    expect(isStoreProductIndexable(product())).toBe(false)
  })

  it.each([
    ["no cover image", { ...ready, cover_image: null }],
    ["description one character short", { ...ready, description: "x".repeat(599) }],
    ["only two features", { ...ready, features: ["Leads", "Deals"] }],
  ])("excludes a product with %s", (_label, overrides) => {
    expect(isStoreProductIndexable(product(overrides))).toBe(false)
  })

  it("does not count whitespace padding as description length", () => {
    expect(isStoreProductIndexable(product({ ...ready, description: `  ${" ".repeat(2000)}short  ` }))).toBe(false)
  })
})
