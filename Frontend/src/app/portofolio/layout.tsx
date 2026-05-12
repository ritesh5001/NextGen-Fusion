import type { Metadata } from "next";

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
    images: ["/metaicon.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | NextGen Fusion",
    description:
      "Browse recent NextGen Fusion portfolio projects, website builds, software work, and client case studies.",
    images: ["/metaicon.svg"],
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
