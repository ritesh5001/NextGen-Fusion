import { Fragment } from "react"

/**
 * Splits a line into words that rise from behind a clip mask (`.mask-words`
 * in globals.css). A server component: the words are in the HTML, the
 * animation is CSS and starts with the first paint, and the text content is
 * unchanged — "a b c" still reads "a b c" to crawlers and screen readers.
 *
 * Not for the LCP element: a masked word paints nothing until it rises.
 */
export function MaskWords({ text, start = 0, wordClassName = "" }: { text: string; start?: number; wordClassName?: string }) {
  const words = text.split(" ")
  return (
    <>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="mw">
            <span className={wordClassName} style={{ "--i": start + index } as React.CSSProperties}>
              {word}
            </span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  )
}
