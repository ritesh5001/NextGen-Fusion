import type { Metadata } from "next"
import SubscribePlans from "@/components/subscribe-plans"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nextgenfusion.in"

export const metadata: Metadata = {
  title: "Support & Subscription Plans",
  description:
    "Ongoing website support, changes, and product-catalog access plans from NextGen Fusion. Subscribe securely with Razorpay.",
  alternates: {
    canonical: `${siteUrl}/support`,
  },
}

export default function SupportPage() {
  return (
    <section className="bg-white px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
            Support & subscriptions
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Plans that keep your site{" "}
            <span className="bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent">
              growing
            </span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
            We don&apos;t ghost you after launch. Pick a plan and pay securely online — support,
            ongoing changes, or access to product-upload tools for your store.
          </p>
        </div>

        <SubscribePlans />
      </div>
    </section>
  )
}
