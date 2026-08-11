import type { Metadata } from "next"
import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: "Our Team",
  description:
    "Meet the NextGen Fusion team — the designers, developers, and marketers who build and ship websites, e-commerce stores, and digital products for businesses across India and worldwide.",
  path: "/team",
  ogTitle: "Meet the NextGen Fusion Team",
  ogDescription:
    "The designers, developers, and marketers behind every website and digital product we ship.",
})

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children
}
