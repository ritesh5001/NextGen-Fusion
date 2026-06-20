// Display catalog for subscription plans. Prices mirror the BACKEND authority in
// Backend/src/routes/payments.ts — the server always recomputes the charge from
// the planId, so this list is for presentation only.

export type SubscriptionPlan = {
  id: string
  name: string
  amount: number // INR rupees
  period: "year" | "month"
  tagline: string
  features: string[]
  highlighted?: boolean
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "website-support",
    name: "Website Support",
    amount: 2000,
    period: "year",
    tagline: "Keep your site healthy.",
    features: [
      "Uptime monitoring",
      "Security & plugin updates",
      "Bug fixes",
      "Email support",
    ],
  },
  {
    id: "support-changes-wp",
    name: "Support + Changes",
    amount: 15000,
    period: "year",
    tagline: "For WordPress & Shopify sites.",
    highlighted: true,
    features: [
      "Everything in Website Support",
      "Content & design change requests",
      "Product / page updates",
      "Priority email support",
    ],
  },
  {
    id: "support-changes-custom",
    name: "Support + Changes (Custom)",
    amount: 5000,
    period: "month",
    tagline: "For custom-coded sites & apps.",
    features: [
      "Dedicated developer support",
      "Ongoing changes & enhancements",
      "Performance & SEO upkeep",
      "Large changes quoted separately",
    ],
  },
  {
    id: "product-catalog",
    name: "Product Catalog Access",
    amount: 500,
    period: "year",
    tagline: "Upload & manage your products.",
    features: [
      "Access the product upload tools in your portal",
      "Add & manage products with variants",
      "Bulk CSV import",
      "WooCommerce / Shopify CSV export",
    ],
  },
]
