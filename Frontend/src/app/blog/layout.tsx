import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Practical guides on web development, SEO, e-commerce, and digital product growth from the NextGen Fusion team.",
  path: "/blog",
  ogTitle: "Web Development, SEO & Digital Growth Insights",
  ogDescription:
    "Guides on building websites, ranking them, and turning them into revenue — from the team that ships them.",
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
