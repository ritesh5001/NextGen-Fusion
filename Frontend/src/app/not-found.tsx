import type { Metadata } from "next"
import { NotFoundView } from "@/components/not-found-view"

// Server wrapper so the 404 can carry its own metadata. As a client component
// it inherited the homepage title and a canonical pointing at `/`.
export const metadata: Metadata = {
  title: { absolute: "Page not found | NextGen Fusion" },
  // Overrides the root layout's index/follow, which otherwise sits beside
  // Next's own noindex and contradicts it.
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return <NotFoundView />
}
