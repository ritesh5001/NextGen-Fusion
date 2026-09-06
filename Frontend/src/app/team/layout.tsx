import type { Metadata } from "next"
import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: "Our Team — Developers, Designers & Marketers",
  description:
    "Meet the developers, designers and marketers who build and ship every NextGen Fusion website, store and digital product.",
  path: "/team",
  ogTitle: "Meet the NextGen Fusion Team",
  ogDescription:
    "The designers, developers, and marketers behind every website and digital product we ship.",
})

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children
}
