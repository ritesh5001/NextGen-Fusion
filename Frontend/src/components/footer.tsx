"use client";

import Link from "next/link";
import { CONTACT_EMAIL, OFFICE_HOURS, offices, PRIMARY_PHONE_DISPLAY, PRIMARY_PHONE_E164 } from "@/data/offices";
import { serviceNavItems } from "@/data/services-nav";
import { SITE_TAGLINE } from "@/lib/seo";
import { whatsappHref } from "@/lib/whatsapp";
import { BrandProfileLinks } from "@/components/brand-profile-links";

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
  {
    group: "Thailand",
    links: [
      { label: "Bangkok", href: "/thailand/bangkok/" },
      { label: "Phuket", href: "/thailand/phuket/" },
      { label: "Chiang Mai", href: "/thailand/chiang-mai/" },
      { label: "All Thai cities", href: "/thailand/" },
    ],
  },
];

const resources: FooterLink[] = [
  { label: "Our work", href: "/work/" },
  { label: "International clients", href: "/offshore-web-development-company-india/" },
  { label: "Blog", href: "/blog/" },
  { label: "Free SEO checker", href: "/free-seo-checker/" },
  { label: "WordPress vs Shopify vs custom", href: "/wordpress-vs-shopify-vs-custom-website/" },
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

const WHATSAPP_URL = whatsappHref();

const heading = "text-sm font-medium text-brand-light";
const linkClass = "text-sm text-white/75 transition-colors duration-200 hover:text-white";

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
    <footer className="px-2 pb-2 sm:px-3 sm:pb-3">
      <div className="relative overflow-hidden rounded-[32px] bg-ink text-white sm:rounded-[40px]">
      {/* A CSS glow in the theme colours, where a background image used to be:
          one request fewer on every page. Kept faint so small text stays
          readable over it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_40%_at_100%_0%,rgba(42,75,245,0.4),rgba(42,75,245,0)_70%),radial-gradient(40%_45%_at_0%_100%,rgba(138,92,246,0.3),rgba(138,92,246,0)_70%)]"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-14 pb-6 sm:px-6 lg:px-8 lg:pt-16">
        {/* Brand and links */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" prefetch={false} className="text-3xl font-normal tracking-tight text-white">
              NextGen Fusion
            </Link>
            <p className="mt-4 max-w-sm text-base font-medium leading-snug text-white">{SITE_TAGLINE}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
              A remote team in India working with international clients. We serve businesses in the
              US, Canada, the UK, Europe, the UAE and Australia.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/contact/"
                className="btn btn-brand btn-sm"
              >
                Get a written quote
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm glass-ink text-white hover:bg-white/15"
              >
                WhatsApp us
              </a>
            </div>
            <BrandProfileLinks tone="dark" className="mt-6" />
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-8">
            <LinkColumn id="footer-services" title="Services" links={services} />
            <LinkColumn id="footer-resources" title="Resources" links={resources} />
            <LinkColumn id="footer-company" title="Company" links={company} />
          </nav>
        </div>

        {/* Locations get their own band. Stacked in one column they were 24
            rows tall and set the height of the whole footer; laid out by
            region with the cities wrapping as pills, the same links fit in a
            few lines. */}
        <div className="glass-ink mt-12 rounded-[28px] p-5 sm:p-7">
          <p id="footer-locations" className={heading}>
            Locations
          </p>
          <div
            aria-labelledby="footer-locations"
            className="mt-5 grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-5"
          >
            {locations.map((group) => (
              <div key={group.group} className="min-w-0">
                <p className="text-xs text-white/60">{group.group}</p>
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="inline-flex rounded-full bg-white/[0.07] px-3 py-1.5 text-xs text-white/80 transition-colors duration-200 hover:bg-white/15 hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact and offices: the site's name, address and phone, kept in
            one place and identical to the LocalBusiness schema. */}
        <div className="mt-14 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className={heading}>Contact</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-white/75 transition-colors duration-200 hover:text-white">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a href={`tel:${PRIMARY_PHONE_E164}`} className="text-white/75 transition-colors duration-200 hover:text-white">
                  {PRIMARY_PHONE_DISPLAY}
                </a>
              </li>
              <li className="text-white/60">{OFFICE_HOURS.label}</li>
            </ul>
          </div>

          {offices.map((office) => (
            <div key={office.city}>
              <p className={heading}>
                <a href={office.landingPath} className="transition-colors duration-200 hover:text-white/75">
                  {office.city} office
                </a>
              </p>
              <address className="mt-4 text-sm not-italic leading-relaxed text-white/75">
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
                  className="mt-1 inline-block text-white/75 transition-colors duration-200 hover:text-white"
                >
                  {office.contact.phone}
                </a>
              </address>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 NextGen Fusion. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors duration-200 hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
    </footer>
  );
}
