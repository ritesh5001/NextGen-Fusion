import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/lib/seo"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nextgenfusion.in";

export const metadata: Metadata = {
  title: "Projects & Case Studies",
  description:
    "Explore NextGen Fusion projects and case studies across e-commerce, B2B marketplaces, HR tech, engineering, AgriTech, and custom web development.",
  alternates: {
    canonical: `${siteUrl}/work`,
  },
  openGraph: {
    title: "Projects & Case Studies | NextGen Fusion",
    description:
      "See digital products, websites, marketplaces, and business platforms built by NextGen Fusion.",
    url: `${siteUrl}/work`,
    siteName: "NextGen Fusion",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects & Case Studies | NextGen Fusion",
    description:
      "See digital products, websites, marketplaces, and business platforms built by NextGen Fusion.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
