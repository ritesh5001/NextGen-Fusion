import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/lib/seo"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nextgenfusion.in";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse recent NextGen Fusion portfolio projects, website builds, software work, and client case studies.",
  alternates: {
    canonical: `${siteUrl}/portofolio`,
  },
  openGraph: {
    title: "Portfolio | NextGen Fusion",
    description:
      "Browse recent NextGen Fusion portfolio projects, website builds, software work, and client case studies.",
    url: `${siteUrl}/portofolio`,
    siteName: "NextGen Fusion",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | NextGen Fusion",
    description:
      "Browse recent NextGen Fusion portfolio projects, website builds, software work, and client case studies.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
