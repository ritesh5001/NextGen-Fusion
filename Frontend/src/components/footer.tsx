"use client";

import { useEffect, useState } from "react";
import { CONTACT_EMAIL, offices, PRIMARY_PHONE_DISPLAY, PRIMARY_PHONE_E164 } from "@/data/offices";
import { serviceNavItems } from "@/data/services-nav";
import { locationPages } from "@/data/locations";

export default function Footer() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  // Trailing slashes are mandatory here. The site enforces them with a 308, so
  // every slash-less footer href cost a redirect on all 82 pages of the site.
  // About and Contact point at real pages now, not homepage fragments.
  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about/" },
    { name: "Services", href: "/services/" },
    { name: "Store", href: "/store/" },
    { name: "Work", href: "/work/" },
    { name: "Blog", href: "/blog/" },
    { name: "Support & Plans", href: "/support/" },
    { name: "Careers", href: "/careers/" },
    { name: "Contact", href: "/contact/" },
  ];

  const socialLinks = [
    {
      name: "@nextgenfusion.devs",
      href: "https://www.instagram.com/nextgenfusion.devs/",
    },
  ];

  const contactLinks = [
    { name: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    { name: "WhatsApp chat", href: "https://wa.me/917348228167" },
    { name: PRIMARY_PHONE_DISPLAY, href: `tel:${PRIMARY_PHONE_E164}` },
  ];

  return (
    <footer
      className="relative text-white bg-cover bg-center bg-no-repeat w-full"
      style={{
        backgroundImage: "url('/images/footerbg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#000000", // Fallback color
      }}
      suppressHydrationWarning
    >
      <div className="pt-8 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
              {/* Left Content */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-4 text-white">
                    Ideas are good.
                    <br />
                    Action is better.
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="text-2xl lg:text-3xl font-medium">
                    <a
                      href="mailto:contact@nextgenfusion.in?subject=Project%20Enquiry%20-%20NextGen%20Fusion&body=Hi%20NextGen%20Fusion%20Team,%0A%0AI%20would%20like%20to%20discuss%20a%20project%20with%20you.%0A%0APlease%20let%20me%20know%20when%20we%20can%20schedule%20a%20call.%0A%0AThank%20you!"
                      className="inline-block break-all py-1 bg-gradient-to-r bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, #F6F7FD 2%, #7D85EC 33%, #C79CFF 66%, #59F3FA 100%)",
                      }}
                    >
                      contact@nextgenfusion.in
                    </a>
                  </div>

                  <p className="text-gray-200 text-sm">
                    Built by the Talented and Creative Crew
                  </p>
                </div>
              </div>

              {/* Middle Column - Offices */}
              <div>
                <h3 className="text-lg font-semibold mb-6 text-white">
                  Our Offices
                </h3>
                <div className="space-y-6">
                  {offices.map((office) => (
                    <div key={office.city} className="border-l-2 border-white/20 pl-4">
                      <p className="text-sm font-semibold text-white mb-1">
                        {office.city}
                      </p>
                      <p className="text-xs text-gray-300 mb-2 leading-relaxed">
                        {office.address}
                      </p>
                      <p className="text-xs text-gray-300 mb-2">
                        <strong>Managed by:</strong> {office.contact.name}
                      </p>
                      <a
                        href={`tel:${office.contact.phoneE164}`}
                        className="inline-block py-1 break-words text-xs text-gray-200 hover:text-white transition-colors duration-200"
                      >
                        {office.contact.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Content - Navigation & Social */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                {/* Navigation */}
                <div>
                  <h3 className="text-lg font-semibold mb-6 text-white">
                    Navigation
                  </h3>
                  <ul className="space-y-4">
                    {navigationLinks.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="inline-block py-1 break-words text-gray-200 hover:text-white transition-colors duration-200"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services — every service page gets a sitewide internal link */}
                <div>
                  <h3 className="text-lg font-semibold mb-6 text-white">
                    Services
                  </h3>
                  <ul className="space-y-4">
                    {serviceNavItems.map((service) => (
                      <li key={service.slug}>
                        <a
                          href={`/services/${service.slug}/`}
                          className="inline-block py-1 break-words text-gray-200 hover:text-white transition-colors duration-200"
                        >
                          {service.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Social & Contact */}
                <div>
                  <h3 className="text-lg font-semibold mb-6 text-white">
                    Social
                  </h3>
                  <ul className="space-y-4">
                    {socialLinks.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="inline-block py-1 break-words text-gray-200 hover:text-white transition-colors duration-200"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>

                  {/* Locations — city pages need the same sitewide internal
                      link the service pages get, or they rank on nothing. */}
                  <h3 className="text-lg font-semibold mb-6 mt-8 text-white">
                    Locations
                  </h3>
                  <ul className="space-y-4">
                    {locationPages.map((location) => (
                      <li key={location.slug}>
                        <a
                          href={`/${location.slug}/`}
                          className="inline-block py-1 break-words text-gray-200 hover:text-white transition-colors duration-200"
                        >
                          {location.serviceLabel} in {location.city}
                        </a>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-lg font-semibold mb-6 mt-8 text-white">
                    Get in touch
                  </h3>
                  <ul className="space-y-4">
                    {contactLinks.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="inline-block break-all py-1 text-gray-200 hover:text-white transition-colors duration-200"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 pt-6">
              <p className="text-gray-200 text-sm text-right">
                © 2026 NextGen Fusion. All rights reserved.
              </p>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-4">
            {/* Ideas Section */}
            <div className="border border-white/20 rounded-lg p-4 sm:p-6 bg-black/20 backdrop-blur-sm">
              <h2 className="text-3xl font-bold leading-tight text-white">
                Ideas are good.
                <br />
                Action is better.
              </h2>
            </div>

            {/* Email Section */}
            <div className="border border-white/20 rounded-lg p-4 sm:p-6 bg-black/20 backdrop-blur-sm">
              <div className="text-xl font-medium">
                <a
                  href="mailto:contact@nextgenfusion.in?subject=Project%20Enquiry%20-%20NextGen%20Fusion&body=Hi%20NextGen%20Fusion%20Team,%0A%0AI%20would%20like%20to%20discuss%20a%20project%20with%20you.%0A%0APlease%20let%20me%20know%20when%20we%20can%20schedule%20a%20call.%0A%0AThank%20you!"
                  className="inline-block break-all py-1 bg-gradient-to-r bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #F6F7FD 2%, #7D85EC 33%, #C79CFF 66%, #59F3FA 100%)",
                  }}
                >
                  contact@nextgenfusion.in
                </a>
              </div>
            </div>

            {/* Offices Section */}
            <div className="border border-white/20 rounded-lg p-4 sm:p-6 bg-black/20 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4 text-white">
                Our Offices
              </h3>
              <div className="space-y-4">
                {offices.map((office) => (
                  <div key={office.city} className="border-l-2 border-white/20 pl-3">
                    <p className="text-sm font-semibold text-white mb-1">
                      {office.city}
                    </p>
                    <p className="text-xs text-gray-300 mb-2 leading-relaxed">
                      {office.address}
                    </p>
                    <p className="text-xs text-gray-300 mb-2">
                      <strong>Managed by:</strong> {office.contact.name}
                    </p>
                    <a
                      href={`tel:${office.contact.phoneE164}`}
                      className="inline-block py-1 break-words text-xs text-gray-200 hover:text-white transition-colors duration-200"
                    >
                      {office.contact.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation & Social Section */}
            <div className="border border-white/20 rounded-lg p-4 sm:p-6 bg-black/20 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-6">
                {/* Navigation */}
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold mb-4 text-white">
                    Navigation
                  </h3>
                  <ul className="space-y-3">
                    {navigationLinks.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="inline-block py-1 break-words text-gray-200 hover:text-white transition-colors duration-200"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>

                {/* Services — every service page gets a sitewide internal link */}
                  <h3 className="text-lg font-semibold mb-4 mt-6 text-white">
                    Services
                  </h3>
                  <ul className="space-y-3">
                    {serviceNavItems.map((service) => (
                      <li key={service.slug}>
                        <a
                          href={`/services/${service.slug}/`}
                          className="inline-block py-1 break-words text-gray-200 hover:text-white transition-colors duration-200"
                        >
                          {service.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Social & Contact */}
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold mb-4 text-white">
                    Social
                  </h3>
                  <ul className="space-y-3">
                    {socialLinks.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="inline-block py-1 break-words text-gray-200 hover:text-white transition-colors duration-200"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>

                  {/* Locations — city pages need the same sitewide internal
                      link the service pages get, or they rank on nothing. */}
                  <h3 className="text-lg font-semibold mb-4 mt-6 text-white">
                    Locations
                  </h3>
                  <ul className="space-y-3">
                    {locationPages.map((location) => (
                      <li key={location.slug}>
                        <a
                          href={`/${location.slug}/`}
                          className="inline-block py-1 break-words text-gray-200 hover:text-white transition-colors duration-200"
                        >
                          {location.serviceLabel} in {location.city}
                        </a>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-lg font-semibold mb-4 mt-6 text-white">
                    Get in touch
                  </h3>
                  <ul className="space-y-3">
                    {contactLinks.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="inline-block break-all py-1 text-gray-200 hover:text-white transition-colors duration-200"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer Text */}
            <div className="text-center space-y-2">
              <p className="text-gray-200 text-sm">
                Built by the Talented and Creative Crew
              </p>
              <p className="text-gray-200 text-sm">
                © 2026 NextGen Fusion. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
