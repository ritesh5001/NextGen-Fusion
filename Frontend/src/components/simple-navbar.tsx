"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, X, Menu, Home, Briefcase, BookOpen, MessageCircle, User, Wrench, Phone, LogIn, UserPlus, Store, Users, type LucideIcon } from "lucide-react"
import { openBookingModal } from "@/lib/booking"
import { Magnetic } from "@/components/motion/magnetic"
import { whatsappHref } from "@/lib/whatsapp"
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon"

type MenuItem = {
  name: string
  href: string
  Icon: LucideIcon
}

// Trailing slashes match the 308 the site enforces, so nav links resolve in one
// hop. About and Contact were homepage fragments — fragments cannot rank, cannot
// be linked to by directories and cannot carry their own schema.
const menuItems: MenuItem[] = [
  { name: "Home", href: "/", Icon: Home },
  { name: "Projects", href: "/work/", Icon: Briefcase },
  { name: "Services", href: "/services/", Icon: Wrench },
  { name: "Store", href: "/store/", Icon: Store },
  { name: "Blogs", href: "/blog/", Icon: BookOpen },
  { name: "About", href: "/about/", Icon: User },
  { name: "Contact", href: "/contact/", Icon: MessageCircle },
  { name: "Careers", href: "/careers/", Icon: Users },
]

export default function SimpleNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  // One hover pill that slides to whichever link is under the pointer.
  const pillRef = useRef<HTMLSpanElement>(null)
  const movePill = (link: HTMLElement) => {
    const pill = pillRef.current
    if (!pill) return
    pill.style.width = `${link.offsetWidth}px`
    pill.style.transform = `translateX(${link.offsetLeft}px)`
    pill.dataset.on = "true"
  }
  const hidePill = () => {
    if (pillRef.current) pillRef.current.dataset.on = "false"
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Hides on the way down and returns on the way up, so it is out of the
    // way while reading and one flick away when wanted. rAF-throttled.
    let lastY = window.scrollY
    let frame = 0
    const update = () => {
      frame = 0
      const y = window.scrollY
      setIsScrolled(y > 50)
      if (Math.abs(y - lastY) > 6) {
        setIsHidden(y > lastY && y > 160)
        lastY = y
      }
    }
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const handleLogoClick = () => {
    if (isHomePage) {
      // If on home page, scroll to top
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else {
      // If on other pages, navigate to home page
      router.push('/')
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const isActive = (href: string) =>
    href === "/" ? isHomePage : pathname.startsWith(href)

  return (
    <header>
      {/* Desktop Navbar. Plain elements with no entrance animation: framer-motion
          here made the navbar the reason the library sat in every page's
          first-load JS. */}
      <div
        className={`hidden xl:flex fixed top-0 left-0 right-0 z-50 justify-center items-center transition-[padding,translate] duration-300 focus-within:translate-y-0 ${isScrolled ? 'py-2' : 'py-4'} ${isHidden ? '-translate-y-[130%]' : ''}`}
      >
        <div className="flex items-center gap-2 relative">
          {/* Navbar Container */}
          <div className="nav-glass flex items-center gap-5 rounded-full py-1.5 pl-5 pr-1.5">
            <Link
              href="/"
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault()
                  handleLogoClick()
                }
              }}
              className="cursor-pointer"
              aria-label="NextGen Fusion — home"
            >
              <Image src="/images/site-logo.png" alt="" width={128} height={72} className="h-8 w-auto" />
            </Link>

            <nav aria-label="Main" className="nav-links relative flex items-center gap-0.5" onPointerLeave={hidePill}>
              <span ref={pillRef} className="nav-pill" aria-hidden="true" />
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={(e) => {
                    if (item.href === "/" && isHomePage) {
                      e.preventDefault()
                      handleLogoClick()
                    }
                  }}
                  onPointerEnter={(e) => movePill(e.currentTarget)}
                  onFocus={(e) => movePill(e.currentTarget)}
                  onBlur={hidePill}
                  className={`relative z-[1] rounded-full px-3.5 py-2 text-sm font-medium text-ink transition-colors ${
                    isActive(item.href) ? "bg-white shadow-sm" : ""
                  }`}
                >
                  <span className="text-roll">
                    <span>{item.name}</span>
                    <span aria-hidden="true">{item.name}</span>
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* User Auth */}
          <div className="nav-glass flex items-center gap-1 rounded-full p-1.5">
            <Link
              href="/portal/login/"
              prefetch={false}
              className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:bg-white/60"
            >
              <LogIn className="w-4 h-4" aria-hidden="true" />
              Login
            </Link>
            <Link
              href="/portal/signup/"
              prefetch={false}
              className="flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#25271f]"
            >
              <UserPlus className="w-4 h-4" aria-hidden="true" />
              Sign Up
            </Link>
          </div>

          {/* CTA Button */}
          <Magnetic>
            <button
              type="button"
              className="btn btn-brand h-[52px] px-6 text-sm"
              onClick={() => openBookingModal({ requestType: 'meeting' })}
            >
              Book a Call
              <span className="btn-dot" aria-hidden="true">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Mobile Bottom Navigation.
          No overflow-x-hidden here: the menu dropdown is an absolutely
          positioned child sitting above this container's own (short) box.
          Setting overflow on only one axis forces the browser to compute the
          other axis as `auto` instead of `visible` (CSS Overflow spec), which
          silently clipped the dropdown out of view. */}
      {/* The pill bar needs ~1,210px for nine links plus the auth buttons; below
          xl it ran off both edges of the screen, so tablets and small laptops
          get the bottom bar instead. */}
      <div className="xl:hidden fixed inset-x-0 bottom-0 z-50 max-w-full">
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="absolute bottom-20 left-4 right-4 menu-pop">
            {/* Near-opaque: the menu sits over page text, which must not show
                through and compete with the links. */}
            <div className="glass-blur max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-[28px] !bg-white/90 p-4">
              <div className="flex justify-between items-center mb-3">
                <p className="pl-2 text-sm font-medium text-ink-mute">Menu</p>
                <button
                  type="button"
                  onClick={toggleMobileMenu}
                  aria-label="Close menu"
                  className="rounded-full bg-canvas p-2 text-ink transition-colors hover:bg-canvas-deep"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
              <nav aria-label="Mobile" className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onClick={(e) => {
                      if (item.href === "/" && isHomePage) {
                        e.preventDefault()
                        handleLogoClick()
                      }
                      setIsMobileMenuOpen(false)
                    }}
                    className={`flex w-full items-center gap-3 rounded-full p-3 text-left transition-colors ${
                      isActive(item.href) ? "bg-brand text-white" : "text-ink hover:bg-canvas"
                    }`}
                  >
                    <item.Icon className="w-5 h-5" aria-hidden="true" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
                <Link
                  href="/portal/login/"
                  prefetch={false}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex w-full items-center gap-3 rounded-full p-3 text-left text-ink transition-colors hover:bg-canvas"
                >
                  <LogIn className="w-5 h-5" aria-hidden="true" />
                  <span className="font-medium">User Login</span>
                </Link>
                <Link
                  href="/portal/signup/"
                  prefetch={false}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex w-full items-center gap-3 rounded-full p-3 text-left text-ink transition-colors hover:bg-canvas"
                >
                  <UserPlus className="w-5 h-5" aria-hidden="true" />
                  <span className="font-medium">User Sign Up</span>
                </Link>
              </nav>
            </div>
          </div>
        )}

        {/* Bottom Navigation Bar */}
        <div className="nav-glass mx-4 mb-2 rounded-full py-2 pl-5 pr-2">
          <div className="flex min-w-0 items-center justify-between gap-2">
            <Link
              href="/"
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault()
                  handleLogoClick()
                }
              }}
              aria-label="NextGen Fusion — home"
              className="min-w-0 shrink py-3"
            >
              <Image src="/images/site-logo.png" alt="" width={96} height={54} className="h-5 w-auto" />
            </Link>

            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className="rounded-full p-2.5 transition-[background-color,transform] hover:bg-white/60 active:scale-95"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-ink" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6 text-ink" aria-hidden="true" />
              )}
            </button>

            <div className="flex items-center gap-2">
              <a
                href={whatsappHref("Hi! I came across NextGen Fusion and I'd like to discuss a project. Could we schedule a quick call?")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with NextGen Fusion on WhatsApp"
                className="rounded-full bg-white/80 p-2.5 text-[#128c4a] transition-transform active:scale-95"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <a
                href="tel:+917348228167"
                aria-label="Call NextGen Fusion on +91 73482 28167"
                className="rounded-full bg-white/80 p-2.5 transition-transform active:scale-95"
              >
                <Phone className="w-5 h-5 text-ink" aria-hidden="true" />
              </a>

              <button
                type="button"
                className="btn btn-brand btn-sm"
                onClick={() => openBookingModal({ requestType: 'meeting' })}
              >
                Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
