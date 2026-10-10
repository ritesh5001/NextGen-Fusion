"use client"

import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import IntegratedNavbar from "@/components/integrated-navbar"
import Footer from "@/components/footer"

// Interaction-only widgets: keep them out of the critical bundle and load
// them on the client after the page is interactive.
const BookingModal = dynamic(() => import("@/components/booking-modal"), { ssr: false })
const SalesChatbot = dynamic(() => import("@/components/sales-chatbot"), { ssr: false })
const FloatingWhatsApp = dynamic(() => import("@/components/floating-whatsapp"), { ssr: false })
const CustomCursor = dynamic(() => import("@/components/motion/custom-cursor").then((m) => m.CustomCursor), { ssr: false })
const RouteTransitions = dynamic(() => import("@/components/motion/route-transitions").then((m) => m.RouteTransitions), { ssr: false })

export default function LayoutChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")
  const isPortal = pathname.startsWith("/portal")

  if (isAdmin || isPortal) return <>{children}</>

  return (
    // `public-site` scopes the canvas background to the marketing site; the
    // admin and portal keep their own white shell (see globals.css).
    <div className="public-site relative isolate text-ink">
      {/* The colour field the glass cards sit on (see `.aurora` in globals.css).
          Fixed, so the cards scroll over it. */}
      <div aria-hidden="true" className="aurora pointer-events-none fixed inset-0 -z-10" />
      {/* First page of a visit only; CSS decides, see "Preloader" in
          globals.css. Not rendered at all when JS is off. */}
      <div className="preloader" aria-hidden="true">
        <span className="preloader-label">NextGen Fusion</span>
        <span className="preloader-count" />
      </div>
      <IntegratedNavbar />
      {children}
      <BookingModal />
      <SalesChatbot />
      <FloatingWhatsApp
        phoneNumber="917348228167"
        message="Hi! I came across NextGen Fusion and I'm interested in discussing a project. Could we schedule a quick call?"
      />
      <Footer />
      <CustomCursor />
      <RouteTransitions />
    </div>
  )
}
