import Link from "next/link"
import { staticProjects } from "@/lib/static-projects"

// TODO: Replace placeholder name chips with real client logos.
const clients = staticProjects.slice(0, 6).map((p) => ({ name: p.title, href: `/work/${p.slug}/` }))

// 3,226+ is one client's number (MariBiz.ai), not a total across clients, so it
// is labelled and linked as such.
const stats: { metric: string; label: string; href?: string }[] = [
  { metric: "3,226+", label: "Vendors on MariBiz.ai, a marketplace we built", href: "/work/maribiz-ai/" },
  { metric: "0", label: "Clients ghosted" },
  { metric: "100%", label: "Mobile-optimized builds" },
]

// A server component with no entrance animation. It sits directly under the
// hero, so framer-motion's whileInView kept it invisible (and out of reach of
// assistive tech and audits) until hydration — and pulled framer into the
// first-load bundle for a fade nobody needed.
export default function SocialProofSection() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-y border-gray-100">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-sm font-medium uppercase tracking-wider text-gray-600 mb-8">
          Trusted by growing brands and businesses
        </p>

        {/* Client logo bar (placeholder name chips until real logos are supplied) */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-14">
          {clients.map((client) => (
            <Link
              key={client.href}
              href={client.href}
              prefetch={false}
              className="inline-block py-1 text-lg sm:text-xl font-semibold text-gray-500 transition-colors hover:text-gray-900"
            >
              {client.name}
            </Link>
          ))}
        </div>

        {/* Hard numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent">
                {stat.metric}
              </div>
              <div className="mt-2 text-sm text-gray-600">
                {stat.href ? (
                  <Link href={stat.href} prefetch={false} className="inline-block py-1 underline-offset-4 hover:text-gray-900 hover:underline">
                    {stat.label}
                  </Link>
                ) : (
                  stat.label
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
