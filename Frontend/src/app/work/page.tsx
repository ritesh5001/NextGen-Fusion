import CTABanner from "@/components/cta-banner"
import DeliveredWall from "@/components/delivered-wall"

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
