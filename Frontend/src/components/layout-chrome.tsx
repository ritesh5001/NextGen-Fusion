"use client"

import { usePathname } from "next/navigation"
import IntegratedNavbar from "@/components/integrated-navbar"
import FloatingWhatsApp from "@/components/floating-whatsapp"
import Footer from "@/components/footer"

export default function LayoutChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")

  if (isAdmin) return <>{children}</>

  return (
    <>
      <IntegratedNavbar />
      {children}
      <FloatingWhatsApp
        phoneNumber="917348228167"
        message="Hi! I came across NextGen Fusion and I'm interested in discussing a project. Could we schedule a quick call?"
      />
      <Footer />
    </>
  )
}
