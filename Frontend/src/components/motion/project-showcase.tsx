"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { loadGsap } from "@/lib/gsap"
import { cn } from "@/lib/utils"
import { useNearViewport } from "@/hooks/use-near-viewport"

export type ShowcaseItem = {
  key: string
  title: string
  category: string
  image: string
  host: string
  description?: string
  result?: { metric: string; label: string }
  tags: string[]
  caseStudyHref?: string
  /** Omitted when the site is offline, so the page never links to a dead site. */
  liveUrl?: string
}

const PINNED_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)"
const pad = (n: number) => String(n).padStart(2, "0")

/**
 * Desktop: the section pins and each project wipes up into one large screen
 * while an index on the left tracks progress. Phones and reduced motion get a
 * swipeable row of cards. The layout switch lives in CSS (`.showcase` in
 * globals.css) under the same media query as the GSAP setup, so the server
 * render already matches and nothing jumps on hydration.
 */
export function ProjectShowcase({
  items,
  heading,
  footer,
}: {
  items: ShowcaseItem[]
  heading: React.ReactNode
  footer: React.ReactNode
}) {
  const root = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [cuts, setCuts] = useState(0)
  // Every screen is fetched once the section is ~1.5 screens away, so each wipe
  // reveals an image that is already there, not a blank panel that fills in later.
  const [stageRef, near] = useNearViewport<HTMLDivElement>("1500px")
  const lastActive = useRef(0)
  const jump = useRef<(index: number) => void>(() => {})

  useEffect(() => {
    const rootEl = root.current
    if (!rootEl || items.length < 2) return
    let revert = () => {}
    let cancelled = false

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return
      const mm = gsap.matchMedia()
      mm.add(PINNED_QUERY, () => {
        const screens = gsap.utils.toArray<HTMLElement>("[data-screen]", rootEl)
        const last = screens.length - 1
        const tl = gsap.timeline({ defaults: { ease: "none" } })
        screens.forEach((screen, i) => {
          if (i === 0) return
          const img = screen.querySelector("img")
          const prevImg = screens[i - 1].querySelector("img")
          tl.fromTo(screen, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, i - 1)
          if (img) tl.fromTo(img, { scale: 1.12 }, { scale: 1, duration: 1 }, i - 1)
          if (prevImg) tl.to(prevImg, { scale: 0.92, yPercent: -4, duration: 1 }, i - 1)
        })

        const pin = ScrollTrigger.create({
          trigger: rootEl,
          start: "top top",
          end: () => `+=${window.innerHeight * 0.75 * last}`,
          pin: true,
          scrub: 0.6,
          animation: tl,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const next = Math.round(self.progress * last)
            if (next !== lastActive.current) {
              lastActive.current = next
              setCuts((n) => n + 1)
            }
            setActive(next)
          },
        })

        jump.current = (index: number) => {
          const y = pin.start + ((pin.end - pin.start) * index) / last
          window.scrollTo({ top: y, behavior: "smooth" })
        }

        return () => {
          jump.current = () => {}
          setActive(0)
        }
      })
      revert = () => mm.revert()
    })

    return () => {
      cancelled = true
      revert()
    }
  }, [items.length])

  return (
    <div ref={root} className="showcase">
      <div className="showcase-pin">
        <div className="showcase-side">
          <p className="showcase-count font-mono text-xs uppercase tracking-[0.1em] text-brand-light">
            Selected work{" "}
            <span className="text-white">
              {pad(active + 1)} / {pad(items.length)}
            </span>
          </p>
          {heading}
          <ol className="showcase-index" aria-label="Projects in this section">
            {items.map((item, i) => (
              <li key={item.key}>
                <button
                  type="button"
                  onClick={() => jump.current(i)}
                  aria-current={i === active ? "true" : undefined}
                  className={cn("showcase-index-row", i === active && "is-active")}
                >
                  <span className="font-mono text-xs">{pad(i + 1)}</span>
                  <span className="showcase-index-title">{item.title}</span>
                  <span className="font-mono text-xs uppercase tracking-wider">{item.category}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="showcase-progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${(active + 1) / items.length})` }} />
          </div>
          <div className="showcase-footer">{footer}</div>
        </div>

        <div ref={stageRef} className="showcase-stage">
          <div className="showcase-screens" data-cursor="View">
            {cuts > 0 && <span key={cuts} className="showcase-flash" aria-hidden="true" />}
            {items.map((item, i) => (
              <Link
                key={item.key}
                href={item.caseStudyHref ?? item.liveUrl ?? "/work/"}
                prefetch={false}
                data-screen
                tabIndex={-1}
                aria-hidden="true"
                className="showcase-screen"
                style={{ zIndex: i + 1 }}
                {...(!item.caseStudyHref && item.liveUrl ? { target: "_blank", rel: "noopener" } : {})}
              >
                <span className="showcase-bar">
                  <i />
                  <i />
                  <i />
                  <span>{item.host}</span>
                </span>
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 60vw, 1px"
                  className="object-cover object-top"
                  priority={false}
                  loading={near || i < 2 ? "eager" : "lazy"}
                />
              </Link>
            ))}
          </div>

          <div className="showcase-cards">
            {items.map((item, i) => (
              <article key={item.key} className={cn("showcase-card", i === active && "is-active")}>
                <div className="showcase-thumb">
                  <Image
                    src={item.image}
                    alt={`${item.title} homepage, built by NextGen Fusion`}
                    fill
                    sizes="(min-width: 1024px) 1px, 85vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="min-w-0">
                  <p className="mb-2 font-mono text-xs uppercase tracking-wider text-brand-light lg:hidden">
                    {item.category}
                  </p>
                  <h3 className="text-2xl font-medium tracking-tight text-white lg:text-[clamp(26px,2.6vw,40px)] lg:leading-none">
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-white/60">{item.description}</p>
                  ) : (
                    <p className="mt-2 font-mono text-xs text-white/50">{item.host}</p>
                  )}
                  {item.tags.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <li key={tag} className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-xs text-white/80">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="showcase-result">
                  {item.result && (
                    <p>
                      <span className="showcase-metric">{item.result.metric}</span>
                      <span className="block font-mono text-xs uppercase tracking-wider text-white/55">
                        {item.result.label}
                      </span>
                    </p>
                  )}
                  <div className="showcase-links">
                    {item.caseStudyHref && (
                      <Link href={item.caseStudyHref} prefetch={false}>
                        Case study
                      </Link>
                    )}
                    {item.liveUrl ? (
                      <a href={item.liveUrl} target="_blank" rel="noopener">
                        Live site <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
