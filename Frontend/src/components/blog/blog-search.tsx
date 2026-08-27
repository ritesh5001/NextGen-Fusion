"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

/**
 * Search over a server-rendered post list.
 *
 * Filtering hides existing DOM nodes rather than re-rendering the list in
 * React, so every post stays in the server HTML for crawlers no matter what
 * the visitor types. The list is not this component's to own.
 */
export function BlogSearch({ total }: { total: number }) {
  const [term, setTerm] = useState("")
  const [visible, setVisible] = useState(total)

  useEffect(() => {
    const needle = term.trim().toLowerCase()
    const cards = document.querySelectorAll<HTMLElement>("[data-blog-card]")
    let shown = 0

    cards.forEach((card) => {
      const haystack = (card.dataset.searchText || "").toLowerCase()
      const match = !needle || haystack.includes(needle)
      card.hidden = !match
      if (match) shown += 1
    })

    setVisible(shown)
  }, [term, total])

  return (
    <>
      <div className="max-w-md mx-auto">
        <label htmlFor="blog-search" className="sr-only">
          Search blog posts
        </label>
        <input
          id="blog-search"
          type="search"
          placeholder="Search blog posts..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      <p className="mt-8 text-gray-600" aria-live="polite">
        {term.trim() ? (
          <>
            Showing {visible} result{visible !== 1 ? "s" : ""} for &quot;{term}&quot;
          </>
        ) : (
          <>
            Showing {total} blog post{total !== 1 ? "s" : ""}
          </>
        )}
      </p>

      {visible === 0 && term.trim() && (
        <div className="text-center py-16">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No blog posts found</h2>
          <p className="text-gray-600 mb-6">Try adjusting your search terms or browse all posts.</p>
          <Button onClick={() => setTerm("")} variant="outline">
            Clear Search
          </Button>
        </div>
      )}
    </>
  )
}
