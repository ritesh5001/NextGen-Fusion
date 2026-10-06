"use client";

import { brandProfiles, CONTACT_EMAIL, OFFICE_HOURS, offices, PRIMARY_PHONE_DISPLAY, PRIMARY_PHONE_E164 } from "@/data/offices";
import { serviceNavItems } from "@/data/services-nav";

type FooterLink = { label: string; href: string };

// Trailing slashes are mandatory: the site enforces them with a 308, so a
// slash-less footer href costs a redirect on every page.

// The footer carries one link per section a visitor would look for, not every
// URL on the site. The full service list lives on /services/, and each city
// hub links its own service pages, so no page depends on the footer for an
// internal link.
const FEATURED_SERVICES = [
  "website-development-services",
  "ecommerce-web-development-services",
  "shopify-development-services",
  "nextjs-development-services",
  "marketplace-development-services",
  "web-design-services",
  "seo-services",
  "android-app-development-services",
];

const services: FooterLink[] = [
  ...FEATURED_SERVICES.map((slug) => {
    const item = serviceNavItems.find((service) => service.slug === slug);
    return { label: item?.label ?? slug, href: `/services/${slug}/` };
  }),
  { label: "All services", href: "/services/" },
];

const locations: { group: string; links: FooterLink[] }[] = [
  {
    group: "India",
    links: [
      { label: "Lucknow", href: "/website-development-company-in-lucknow/" },
      { label: "Mumbai", href: "/website-development-company-in-mumbai/" },
      { label: "Uttar Pradesh", href: "/website-development-company-in-uttar-pradesh/" },
      { label: "Delhi", href: "/india/delhi/" },
      { label: "Bengaluru", href: "/india/bengaluru/" },
      { label: "All Indian cities", href: "/india/" },
    ],
  },
  {
    group: "International",
    links: [
      { label: "UAE", href: "/website-development-company-in-uae/" },
      { label: "Dubai", href: "/website-development-company-in-dubai/" },
      { label: "Abu Dhabi", href: "/website-development-company-in-abu-dhabi/" },
      { label: "Sharjah", href: "/website-development-company-in-sharjah/" },
      { label: "Singapore", href: "/website-development-company-in-singapore/" },
    ],
  },
  {
    group: "Australia",
    links: [
      { label: "Sydney", href: "/australia/sydney/" },
      { label: "Melbourne", href: "/australia/melbourne/" },
      { label: "Brisbane", href: "/australia/brisbane/" },
      { label: "Perth", href: "/australia/perth/" },
      { label: "All Australian cities", href: "/australia/" },
    ],
  },
  {
    group: "Oman",
    links: [
      { label: "Muscat", href: "/oman/muscat/" },
      { label: "Salalah", href: "/oman/salalah/" },
      { label: "Sohar", href: "/oman/sohar/" },
      { label: "All Omani cities", href: "/oman/" },
    ],
  },
];

const resources: FooterLink[] = [
  { label: "Our work", href: "/work/" },
  { label: "Blog", href: "/blog/" },
  { label: "Website cost in India", href: "/website-development-cost-in-india/" },
  { label: "Website cost in the UAE", href: "/website-development-cost-in-dubai/" },
  { label: "Website cost in Singapore", href: "/website-development-cost-in-singapore/" },
  { label: "Store vs marketplace", href: "/ecommerce-store-vs-marketplace/" },
];

const company: FooterLink[] = [
  { label: "About", href: "/about/" },
  { label: "Team", href: "/team/" },
  { label: "Careers", href: "/careers/" },
  { label: "Store", href: "/store/" },
  { label: "Support & plans", href: "/support/" },
  { label: "Contact", href: "/contact/" },
];

const legal: FooterLink[] = [
  { label: "Licence terms", href: "/store/license/" },
  { label: "Refund policy", href: "/store/refunds/" },
];

const WHATSAPP_URL = `https://wa.me/${PRIMARY_PHONE_E164.replace("+", "")}`;

const heading = "text-xs font-semibold uppercase tracking-[0.14em] text-white";
const linkClass = "text-sm text-gray-300 transition-colors duration-200 hover:text-white";

function LinkColumn({ id, title, links }: { id: string; title: string; links: FooterLink[] }) {
  return (
    <div className="min-w-0">
      <p id={id} className={heading}>
        {title}
      </p>
      <ul aria-labelledby={id} className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className={linkClass}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      className="relative w-full bg-black bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/images/footerbg.webp')" }}
      suppressHydrationWarning
    >
      {/* Darkens the background image evenly, so small text stays readable
          where the image turns bright. */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-14 pb-6 sm:px-6 lg:px-8 lg:pt-16">
        {/* Brand and links */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <a href="/" className="text-2xl font-bold tracking-tight text-white">
              NextGen Fusion
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-300">
              Web development, ecommerce and SEO studio in Lucknow and Mumbai, building websites, online
              stores and platforms for businesses in India, the UAE, Singapore and Australia.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/contact/"
                className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors duration-200 hover:bg-gray-200"
              >
                Get a written quote
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-white"
              >
                WhatsApp us
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8">
            <LinkColumn id="footer-services" title="Services" links={services} />

            <div className="min-w-0">
              <p id="footer-locations" className={heading}>
                Locations
              </p>
              <div aria-labelledby="footer-locations" className="mt-4 space-y-5">
                {locations.map((group) => (
                  <div key={group.group}>
                    <p className="text-xs text-gray-400">{group.group}</p>
                    <ul className="mt-2 space-y-2.5">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <a href={link.href} className={linkClass}>
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <LinkColumn id="footer-resources" title="Resources" links={resources} />
            <LinkColumn id="footer-company" title="Company" links={company} />
          </nav>
        </div>

        {/* Contact and offices: the site's name, address and phone, kept in
            one place and identical to the LocalBusiness schema. */}
        <div className="mt-14 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className={heading}>Contact</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-gray-300 transition-colors duration-200 hover:text-white">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a href={`tel:${PRIMARY_PHONE_E164}`} className="text-gray-300 transition-colors duration-200 hover:text-white">
                  {PRIMARY_PHONE_DISPLAY}
                </a>
              </li>
              <li className="text-gray-400">{OFFICE_HOURS.label}</li>
            </ul>
          </div>

          {offices.map((office) => (
            <div key={office.city}>
              <p className={heading}>
                <a href={office.landingPath} className="transition-colors duration-200 hover:text-gray-300">
                  {office.city} office
                </a>
              </p>
              <address className="mt-4 text-sm not-italic leading-relaxed text-gray-300">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`NextGen Fusion, ${office.address}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-white"
                >
                  {office.address}
                </a>
                <br />
                <a
                  href={`tel:${office.contact.phoneE164}`}
                  className="mt-1 inline-block text-gray-300 transition-colors duration-200 hover:text-white"
                >
                  {office.contact.phone}
                </a>
              </address>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 NextGen Fusion. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors duration-200 hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
            {brandProfiles.map((profile) => (
              <li key={profile.href}>
                <a
                  href={profile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-white"
                >
                  {profile.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
