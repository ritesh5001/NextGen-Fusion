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

export default function LayoutChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")
  const isPortal = pathname.startsWith("/portal")

  if (isAdmin || isPortal) return <>{children}</>

  return (
    <>
      <IntegratedNavbar />
      {children}
      <BookingModal />
      <SalesChatbot />
      <FloatingWhatsApp
        phoneNumber="917348228167"
        message="Hi! I came across NextGen Fusion and I'm interested in discussing a project. Could we schedule a quick call?"
      />
      <Footer />
    </>
  )
}
