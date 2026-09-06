import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

// Sole owner of /work metadata. work/page.tsx also exported a `metadata`
// object, and the merge took title/description from the page while keeping the
// layout's Open Graph — so the shared card said "Projects & Case Studies" while
// Google showed "Our Work — Projects Delivered".
export const metadata: Metadata = buildMetadata({
  title: "Our Work — Websites & Online Stores Delivered",
  description:
    "Browse the websites and online stores NextGen Fusion has delivered for clients — e-commerce, B2B marketplaces, HR tech, engineering, and AgriTech.",
  path: "/work",
  ogTitle: "Our Work — Projects Delivered",
  ogDescription:
    "See the digital products, websites, marketplaces, and business platforms built by NextGen Fusion.",
});

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
