"use client";

import { brandProfiles, CONTACT_EMAIL, offices, PRIMARY_PHONE_DISPLAY, PRIMARY_PHONE_E164 } from "@/data/offices";
import { serviceNavItems } from "@/data/services-nav";
import { locationPages } from "@/data/locations";

export default function Footer() {
  // Trailing slashes are mandatory here. The site enforces them with a 308, so
  // every slash-less footer href cost a redirect on all 82 pages of the site.
  // About and Contact point at real pages now, not homepage fragments.
  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "Pricing", href: "/pricing/" },
    { name: "Services", href: "/services/" },
    { name: "About", href: "/about/" },
    { name: "Store", href: "/store/" },
    { name: "Work", href: "/work/" },
    { name: "Blog", href: "/blog/" },
    { name: "Support & Plans", href: "/support/" },
    { name: "Careers", href: "/careers/" },
    { name: "Contact", href: "/contact/" },
  ];

  const socialLinks = brandProfiles.map((profile) => ({ name: profile.label, href: profile.href }));

  const contactLinks = [
    { name: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    { name: "WhatsApp chat", href: "https://wa.me/917348228167" },
    { name: PRIMARY_PHONE_DISPLAY, href: `tel:${PRIMARY_PHONE_E164}` },
  ];

  const card =
    "rounded-lg border border-white/20 bg-black/20 p-4 backdrop-blur-sm sm:p-6 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none";
  const label = "mb-4 text-lg font-semibold text-white lg:mb-6";
  const list = "space-y-3 lg:space-y-4";
  const link = "inline-block py-1 break-words text-gray-200 hover:text-white transition-colors duration-200";

  // One responsive tree. There used to be a desktop copy and a mobile copy
  // toggled with CSS, so every page shipped the footer text and headings twice.
  // Labels are <p>, not headings: footer chrome is not page content.
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
          {/* 3+2+7: the right block nests its own 3-column grid (Navigation,
              Services, Social/Locations), so it needs roughly double the
              track width of Ideas/Offices or those three columns cram into
              a third of the row and every multi-word link wraps three deep. */}
          <div className="grid gap-4 lg:grid-cols-12 lg:gap-8">
            <div className="space-y-4 lg:col-span-3 lg:space-y-8">
              <div className={card}>
                <p className="text-3xl font-bold leading-tight text-white lg:mb-4 lg:text-5xl">
                  Ideas are good.
                  <br />
                  Action is better.
                </p>
              </div>

              <div className={card}>
                <div className="text-xl font-medium lg:text-3xl">
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
                <a
                  href="/pricing/"
                  className="mt-3 inline-block py-1 text-sm font-medium text-gray-200 underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white transition-colors duration-200 lg:text-base"
                >
                  See our published rate card →
                </a>
              </div>
            </div>

            <div className={`${card} lg:col-span-2`}>
              <p className={label}>Our Offices</p>
              <div className="space-y-4 lg:space-y-6">
                {offices.map((office) => (
                  <div key={office.city} className="border-l-2 border-white/20 pl-3 lg:pl-4">
                    <a
                      href={office.landingPath}
                      className="inline-block mb-1 text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white transition-colors duration-200"
                    >
                      {office.city} office
                    </a>
                    <address className="text-xs text-gray-300 mb-2 leading-relaxed not-italic">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`NextGen Fusion, ${office.address}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors duration-200"
                      >
                        {office.address}
                      </a>
                    </address>
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

            <div className={`${card} grid grid-cols-2 gap-6 lg:col-span-7 lg:grid-cols-3 lg:gap-12`}>
              <div className="min-w-0">
                <p className={label}>Navigation</p>
                <ul className={list}>
                  {navigationLinks.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className={link}>
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services — every service page gets a sitewide internal link */}
              <div className="min-w-0">
                <p className={label}>Services</p>
                <ul className={list}>
                  {serviceNavItems.map((service) => (
                    <li key={service.slug}>
                      <a href={`/services/${service.slug}/`} className={link}>
                        {service.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="min-w-0">
                <p className={label}>Social</p>
                <ul className={list}>
                  {socialLinks.map((item) => (
                    <li key={item.href}>
                      <a href={item.href} className={link} target="_blank" rel="noopener noreferrer">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Locations — city pages need the same sitewide internal
                    link the service pages get, or they rank on nothing. */}
                <p className={`${label} mt-6 lg:mt-8`}>Locations</p>
                <ul className={list}>
                  {locationPages.map((location) => (
                    <li key={location.slug}>
                      <a href={`/${location.slug}/`} className={link}>
                        {location.title}
                      </a>
                    </li>
                  ))}
                </ul>

                <p className={`${label} mt-6 lg:mt-8`}>Get in touch</p>
                <ul className={list}>
                  {contactLinks.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="inline-block break-all py-1 text-gray-200 hover:text-white transition-colors duration-200"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center lg:mt-8 lg:pt-6 lg:text-right">
            <p className="text-gray-200 text-sm">
              © 2026 NextGen Fusion. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
