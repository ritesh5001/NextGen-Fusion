"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X, Menu, Home, Briefcase, BookOpen, MessageCircle, User, Wrench, Phone, LogIn, UserPlus, Store, Users, type LucideIcon } from "lucide-react"
import { openBookingModal } from "@/lib/booking"

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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

  return (
    <header>
      {/* Desktop Navbar. Plain elements with no entrance animation: framer-motion
          here made the navbar the reason the library sat in every page's
          first-load JS. */}
      <div
        className={`hidden xl:flex fixed top-0 left-0 right-0 z-50 justify-center items-center transition-[padding] ${isScrolled ? 'py-2' : 'py-4'}`}
      >
        <div className="flex items-center gap-4 relative">
          {/* Navbar Container */}
          <div
            className="flex items-center gap-6 px-6 py-3 rounded-full lg:gap-8 lg:px-8"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(128, 128, 128, 0.2)",
            }}
          >
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

            <nav aria-label="Main" className="flex items-center gap-4 lg:gap-6">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href === "/" && isHomePage) {
                      e.preventDefault()
                      handleLogoClick()
                    }
                  }}
                  className="text-black font-medium hover:text-gray-600 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* User Auth */}
          <div
            className="flex items-center gap-1.5 rounded-full p-1"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(128, 128, 128, 0.2)",
            }}
          >
            <Link
              href="/portal/login/"
              prefetch={false}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-black font-semibold text-xs sm:text-sm hover:bg-white/50 transition-colors"
            >
              <LogIn className="w-4 h-4" aria-hidden="true" />
              Login
            </Link>
            <Link
              href="/portal/signup/"
              prefetch={false}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white font-semibold text-xs sm:text-sm hover:bg-slate-800 transition-colors"
            >
              <UserPlus className="w-4 h-4" aria-hidden="true" />
              Sign Up
            </Link>
          </div>

          {/* CTA Button */}
          <div
            className="px-4 py-2 rounded-full"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              border: "1px solid rgba(128, 128, 128, 0.3)",
            }}
          >
            <Button
              className="bg-transparent text-white hover:bg-gray-800 transition-all duration-300 font-semibold text-xs sm:text-sm"
              onClick={() => openBookingModal({ requestType: 'meeting' })}
            >
              Book a Call
            </Button>
          </div>
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
            <div
              className="max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-2xl shadow-2xl border p-4"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.92)",
                backdropFilter: "blur(25px)",
                WebkitBackdropFilter: "blur(25px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
              }}
            >
              <div className="flex justify-between items-center mb-4">
                <p className="font-semibold text-gray-800">Menu</p>
                <button
                  type="button"
                  onClick={toggleMobileMenu}
                  aria-label="Close menu"
                  className="p-2 text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
              <nav aria-label="Mobile" className="space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      if (item.href === "/" && isHomePage) {
                        e.preventDefault()
                        handleLogoClick()
                      }
                      setIsMobileMenuOpen(false)
                    }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors w-full text-left text-gray-800"
                  >
                    <item.Icon className="w-5 h-5" aria-hidden="true" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
                <Link
                  href="/portal/login/"
                  prefetch={false}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors w-full text-left text-gray-800"
                >
                  <LogIn className="w-5 h-5" aria-hidden="true" />
                  <span className="font-medium">User Login</span>
                </Link>
                <Link
                  href="/portal/signup/"
                  prefetch={false}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors w-full text-left text-gray-800"
                >
                  <UserPlus className="w-5 h-5" aria-hidden="true" />
                  <span className="font-medium">User Sign Up</span>
                </Link>
              </nav>
            </div>
          </div>
        )}

        {/* Bottom Navigation Bar */}
        <div
          className="px-4 py-3 mx-4 mb-2 rounded-full"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
          }}
        >
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
              className="min-w-0 shrink py-1"
            >
              <Image src="/images/site-logo.png" alt="" width={96} height={54} className="h-5 w-auto" />
            </Link>

            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className="p-2 rounded-full hover:bg-white/20 transition-[background-color,transform] active:scale-95"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-black" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6 text-black" aria-hidden="true" />
              )}
            </button>

            <div className="flex items-center gap-2">
              <a
                href="tel:+917348228167"
                aria-label="Call NextGen Fusion on +91 73482 28167"
                className="p-2 rounded-full transition-transform active:scale-95"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                }}
              >
                <Phone className="w-5 h-5 text-green-700" aria-hidden="true" />
              </a>

              <Button
                className="bg-black text-white hover:bg-gray-800 transition-all duration-300 font-semibold text-xs px-3 py-2 rounded-full"
                onClick={() => openBookingModal({ requestType: 'meeting' })}
              >
                Book
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
