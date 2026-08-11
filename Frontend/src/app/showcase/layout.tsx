import type { Metadata } from "next"
import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: "Showcase",
  description:
    "A showcase of websites, online stores, and digital products designed and developed by NextGen Fusion for clients across India and worldwide.",
  path: "/showcase",
  ogTitle: "NextGen Fusion Showcase",
  ogDescription:
    "Websites, online stores, and digital products we've designed, built, and shipped.",
})

export default function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  return children
}
