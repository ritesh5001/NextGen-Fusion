import type { Metadata } from "next"
import { buildMetadata } from "@/lib/seo"

/**
 * This route had no metadata of its own, so it inherited the root layout and
 * shipped as `index, follow` with the homepage's title and no canonical —
 * while robots.txt simultaneously disallowed crawling it. That is the one
 * combination that actively fails: Google cannot read a noindex on a page it
 * is not allowed to fetch, so the URL stays eligible for indexing with no
 * title of its own. /admin/ and /portal/ already handled this correctly.
 *
 * The fix is noindex here plus removing the Disallow from robots.txt, so the
 * directive is actually readable. The page renders only an email form —
 * nothing customer-specific is exposed by allowing it to be fetched.
 */
export const metadata: Metadata = buildMetadata({
  title: "Retrieve your purchases",
  description:
    "Enter the email address you bought with and we will resend your NextGen Fusion download links.",
  path: "/store/purchases",
  noIndex: true,
})

export default function StorePurchasesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
