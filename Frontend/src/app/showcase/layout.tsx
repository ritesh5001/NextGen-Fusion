import type { Metadata } from "next"
import { buildMetadata } from "@/lib/seo"

/**
 * noIndex until this page has content and a path in.
 *
 * /showcase renders entirely on the client against an API that currently returns
 * nothing, so the HTML Google receives is a spinner: five words, no H1. It is
 * also linked from nowhere in the site's navigation. Removed from sitemap.xml
 * for the same reason — drop `noIndex` and restore the sitemap entry once it
 * renders real items server-side.
 */
export const metadata: Metadata = buildMetadata({
  title: "Showcase",
  description:
    "A showcase of websites, online stores, and digital products designed and developed by NextGen Fusion for clients across India and worldwide.",
  path: "/showcase",
  ogTitle: "NextGen Fusion Showcase",
  ogDescription:
    "Websites, online stores, and digital products we've designed, built, and shipped.",
  noIndex: true,
})

export default function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  return children
}
