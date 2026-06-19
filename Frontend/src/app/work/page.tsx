import type { Metadata } from "next"
import CTABanner from "@/components/cta-banner"
import DeliveredWall from "@/components/delivered-wall"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nextgenfusion.in"

export const metadata: Metadata = {
  title: "Our Work — Projects Delivered",
  description:
    "Browse the websites and online stores NextGen Fusion has delivered for clients — filter by e-commerce, service, and custom projects.",
  alternates: {
    canonical: `${siteUrl}/work`,
  },
}

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-24">
        <DeliveredWall
          showFilters
          asPageHeading
          heading="Projects we've delivered"
          subheading="Live websites and online stores delivered for clients across India and beyond. Filter by category, or click any to visit."
        />

        <div className="max-w-7xl mx-auto px-6 pb-16">
          <CTABanner />
        </div>
      </main>
    </div>
  )
}
