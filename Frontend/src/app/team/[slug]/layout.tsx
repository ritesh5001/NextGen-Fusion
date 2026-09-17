import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { JsonLd } from "@/components/json-ld"
import { getTeamMember, personId, team } from "@/data/team"
import { offices } from "@/data/offices"
import {
  absoluteUrl,
  assetUrl,
  breadcrumbSchema,
  buildMetadata,
  ORGANIZATION_ID,
  siteUrl,
} from "@/lib/seo"

/**
 * This layout exists because the profile pages had none. Without their own
 * metadata they inherited /team/layout.tsx, so all four declared
 * `canonical: /team/` — telling Google every profile was a duplicate of the
 * index and should be dropped. They also carried no Person markup at all,
 * which made four named people with public bios invisible as entities.
 */

export function generateStaticParams() {
  return team.map((member) => ({ slug: member.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const member = getTeamMember(slug)
  if (!member) return {}

  return buildMetadata({
    title: `${member.name} — ${member.role}`,
    description: member.bio,
    path: `/team/${member.slug}`,
    image: assetUrl(member.image),
  })
}

export default async function TeamMemberLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const member = getTeamMember(slug)
  if (!member) notFound()

  const office = offices.find((o) => o.city === member.officeCity)
  const path = `/team/${member.slug}`

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": `${absoluteUrl(path)}#profilepage`,
      url: absoluteUrl(path),
      name: `${member.name} — ${member.role}`,
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntity: { "@id": personId(member.slug, siteUrl) },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": personId(member.slug, siteUrl),
      name: member.name,
      givenName: member.givenName,
      familyName: member.familyName,
      jobTitle: member.role,
      description: member.bio,
      url: absoluteUrl(path),
      image: assetUrl(member.image),
      email: member.email,
      worksFor: { "@id": ORGANIZATION_ID },
      ...(member.isFounder ? { founderOf: { "@id": ORGANIZATION_ID } } : {}),
      ...(office
        ? { workLocation: { "@id": `${siteUrl}/#office-${office.city.toLowerCase()}` } }
        : {}),
      knowsAbout: member.knowsAbout,
      knowsLanguage: ["en", "hi"],
      // Only human-verified profile URLs. See the note on TeamMember.linkedinUrl.
      ...(member.verifiedProfiles.length ? { sameAs: member.verifiedProfiles } : {}),
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Team", path: "/team" },
      { name: member.name, path },
    ]),
  ]

  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  )
}
