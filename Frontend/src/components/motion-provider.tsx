"use client"

import { LazyMotion } from "framer-motion"
import type { ReactNode } from "react"

const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default)

/**
 * Components use `m.*` instead of `motion.*`, which ships a ~5 KB shell; the
 * animation features load lazily here. Content renders immediately either way —
 * only the entrance animations wait for the features to arrive.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>
}
