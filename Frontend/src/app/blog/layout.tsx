import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/lib/seo"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nextgenfusion.in";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Read NextGen Fusion blogs on web development, SEO, design, software, automation, marketing, and digital product growth.",
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    title: "Blogs | NextGen Fusion",
    description:
      "Insights on web development, SEO, design, software, automation, marketing, and digital product growth.",
    url: `${siteUrl}/blog`,
    siteName: "NextGen Fusion",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs | NextGen Fusion",
    description:
      "Insights on web development, SEO, design, software, automation, marketing, and digital product growth.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
