import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import TeamClient from "./team-client"
import { team } from "@/data/team"
import { absoluteUrl, breadcrumbSchema, buildMetadata, ORGANIZATION_ID, siteUrl } from "@/lib/seo"

/**
 * Server shell around the animated client UI, following the same split as the
 * homepage. The index's CollectionPage and BreadcrumbList used to live in
 * team/layout.tsx, which meant every /team/<slug>/ profile inherited them —
 * shipping a second, conflicting BreadcrumbList and a CollectionPage describing
 * the wrong page. Page-specific schema belongs on the page, not the layout.
 */

export const metadata: Metadata = buildMetadata({
  title: "Our Team — Developers, Designers & Marketers",
  description:
    "Meet the developers, designers and marketers who build and ship every NextGen Fusion website, store and digital product.",
  path: "/team",
  ogTitle: "Meet the NextGen Fusion Team",
  ogDescription:
    "The designers, developers, and marketers behind every website and digital product we ship.",
})

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl("/team")}#collection`,
    url: absoluteUrl("/team"),
    name: "The NextGen Fusion team",
    description:
      "The people who design, build and maintain every NextGen Fusion project, across the Lucknow and Mumbai offices.",
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": ORGANIZATION_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: team.length,
      itemListElement: team.map((member, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(`/team/${member.slug}`),
        name: member.name,
      })),
    },
  },
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Team", path: "/team" },
  ]),
]

export default function TeamPage() {
  return (
    <>
      <JsonLd data={schema} />
      <TeamClient />
    </>
  )
}
