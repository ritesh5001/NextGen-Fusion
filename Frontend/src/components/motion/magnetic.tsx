"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { m, useMotionValue, useReducedMotion, useSpring } from "framer-motion"

/**
 * Pulls its child a few pixels toward the pointer while hovered, then springs
 * back. Desktop with a fine pointer only; a plain inline wrapper elsewhere.
 * The child keeps its own element, link and styles.
 */
export function Magnetic({ children, strength = 0.28, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 })

  useEffect(() => {
    setEnabled(!reduced && window.matchMedia("(pointer: fine)").matches)
  }, [reduced])

  const onMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    const box = ref.current?.getBoundingClientRect()
    if (!box) return
    // Capped so a large button never travels more than ~12px.
    x.set(Math.max(-12, Math.min(12, (event.clientX - (box.left + box.width / 2)) * strength)))
    y.set(Math.max(-12, Math.min(12, (event.clientY - (box.top + box.height / 2)) * strength)))
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <m.span
      ref={ref}
      className={`inline-flex ${className}`}
      style={enabled ? { x, y } : undefined}
      onPointerMove={enabled ? onMove : undefined}
      onPointerLeave={enabled ? onLeave : undefined}
    >
      {children}
    </m.span>
  )
}
