import type { Metadata } from "next"
import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: "Careers — Open Roles in Lucknow, Mumbai & Remote",
  description:
    "We are hiring developers, designers and marketers in Lucknow, Mumbai and remote — engineering, UI/UX, SEO, paid ads and content roles.",
  path: "/careers",
  ogTitle: "Careers at NextGen Fusion",
  ogDescription:
    "Build websites, stores, and digital products that go live for real clients. Open roles across engineering, design, marketing, and content.",
})

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children
}
