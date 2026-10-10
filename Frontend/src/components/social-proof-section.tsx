import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpRight,
  FileText,
  Gauge,
  Globe2,
  LifeBuoy,
  MonitorSmartphone,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sprout,
  Ship,
  Store,
  type LucideIcon,
} from "lucide-react"
import { deliveredProjects } from "@/lib/delivered-projects"
import { staticProjects } from "@/lib/static-projects"
import { PROJECTS_DELIVERED } from "@/lib/seo"

/**
 * Client logos, taken from each client's own website (or, where the site
 * renders its logo as text, cropped from our homepage screenshot of it) and
 * stored in /public/images/clients. Each links to that client's case study.
 * Sites currently offline (TatVivah Trends, SIDCO) are left out until they
 * are back, so the strip only shows brands a visitor can check.
 */
const clientLogos: { slug: string; width: number; height: number }[] = [
  { slug: "maribiz-ai", width: 335, height: 96 },
  { slug: "cleanship", width: 370, height: 96 },
  { slug: "krushidoctor", width: 122, height: 96 },
  { slug: "nextmentor", width: 405, height: 96 },
  { slug: "saurally", width: 413, height: 96 },
  { slug: "ladyscootytrainer", width: 96, height: 96 },
  { slug: "hcbengineering", width: 194, height: 38 },
  { slug: "deetoo", width: 143, height: 96 },
  { slug: "clickngreet", width: 154, height: 50 },
  { slug: "mahhika", width: 134, height: 96 },
  { slug: "vashtaraheaven", width: 98, height: 96 },
  { slug: "thegrafftee", width: 106, height: 23 },
  { slug: "kalamohini", width: 96, height: 96 },
  { slug: "samaraha", width: 103, height: 96 },
  { slug: "sitaravastram", width: 97, height: 96 },
  { slug: "newsaraswatisareecentre", width: 120, height: 96 },
  { slug: "terrestrialyt", width: 145, height: 42 },
]

const titleBySlug = new Map(staticProjects.map((project) => [project.slug, project.title]))
const logos = clientLogos.filter((logo) => titleBySlug.has(logo.slug))

// The delivered total is the company-wide figure (PROJECTS_DELIVERED); the
// rest are counted from the site's own data at build time.
const onlineStores = deliveredProjects.filter((project) => project.category === "ecommerce").length
const caseStudies = staticProjects.length

type Stat = { Icon: LucideIcon; value: string; label: string; detail: string }

const stats: Stat[] = [
  { Icon: MonitorSmartphone, value: PROJECTS_DELIVERED, label: "Projects delivered", detail: "Websites, online stores and web apps" },
  { Icon: ShoppingBag, value: `${onlineStores}`, label: "Online stores built", detail: "Shopify, WooCommerce and custom" },
  { Icon: FileText, value: `${caseStudies}`, label: "Detailed case studies", detail: "Each links to the live site" },
  // India, the UAE (Cleanship), the UK and Italy: client domains on /work/.
  { Icon: Globe2, value: "4", label: "Countries", detail: "India, the UAE, the UK and Italy" },
]

type Result = { Icon: LucideIcon; value: string; label: string; href: string }

// Figures from the clients' published case studies.
const results: Result[] = [
  { Icon: Store, value: "3,226+", label: "vendors on MariBiz.ai, the maritime marketplace we built", href: "/work/maribiz-ai/" },
  { Icon: Sprout, value: "1.2 lakh+", label: "farmers served by Krushi Doctor, on the store we built", href: "/work/krushidoctor/" },
  { Icon: Ship, value: "310", label: "service and port pages we built for Cleanship", href: "/work/cleanship/" },
]

const standards: { Icon: LucideIcon; text: string }[] = [
  { Icon: ShieldCheck, text: "You own the domain, code and every account" },
  { Icon: Gauge, text: "Mobile-first, fast-loading builds" },
  { Icon: Search, text: "SEO, analytics and Search Console set up on launch" },
  { Icon: LifeBuoy, text: "Support after launch: 0 clients ghosted" },
]

function LogoTile({ slug, width, height, duplicate }: { slug: string; width: number; height: number; duplicate: boolean }) {
  const title = titleBySlug.get(slug) ?? slug
  return (
    <li className={`shrink-0 pr-3 sm:pr-4${duplicate ? " logo-marquee-dup" : ""}`} aria-hidden={duplicate || undefined}>
      {/* Solid white, not glass: most client logos are exported on a white
          background, which would show as a box on a translucent tile. */}
      <Link
        href={`/work/${slug}/`}
        prefetch={false}
        tabIndex={duplicate ? -1 : undefined}
        aria-label={duplicate ? undefined : `${title} case study`}
        className="flex h-20 w-40 items-center justify-center rounded-[24px] bg-white px-4 shadow-[0_18px_36px_-28px_rgba(15,16,13,0.4)] transition hover:-translate-y-0.5 sm:h-24 sm:w-48"
      >
        <Image
          src={`/images/clients/${slug}.webp`}
          alt={duplicate ? "" : title}
          width={width}
          height={height}
          sizes="160px"
          loading="lazy"
          // Square and round marks need more height than wide wordmarks to
          // read at the same visual weight.
          className={`h-auto w-auto max-w-full object-contain ${
            width / height < 1.6 ? "max-h-14 sm:max-h-16" : "max-h-10 sm:max-h-12"
          }`}
        />
      </Link>
    </li>
  )
}

// A server component: the marquee is CSS only (`.logo-marquee` in
// globals.css), so this section adds no JavaScript to the homepage.
export default function SocialProofSection() {
  return (
    <section aria-labelledby="social-proof-heading" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Trusted by growing brands</p>
          <h2 id="social-proof-heading" className="display mt-5 text-3xl sm:text-4xl lg:text-5xl">
            Websites and stores businesses run on every day
          </h2>
          <p className="mt-4 text-base text-ink-soft sm:text-lg">
            From D2C fashion labels to B2B marketplaces, in India, the UAE, the UK and Italy.
          </p>
        </div>
      </div>

      <div className="logo-marquee-viewport relative mt-10 overflow-hidden py-4 sm:mt-12">
        <ul className="logo-marquee">
          {logos.map((logo) => (
            <LogoTile key={logo.slug} {...logo} duplicate={false} />
          ))}
          {logos.map((logo) => (
            <LogoTile key={`${logo.slug}-dup`} {...logo} duplicate />
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-4 sm:mt-14 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map(({ Icon, value, label, detail }) => (
            <li key={label} className="glass rounded-[28px] p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <p className="display text-5xl sm:text-6xl">{value}</p>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime text-ink sm:h-11 sm:w-11">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-6 text-sm font-medium text-ink sm:text-base">{label}</p>
              <p className="mt-1 text-xs text-ink-mute sm:text-sm">{detail}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 sm:mt-14">
          <h3 className="text-center text-sm font-medium text-ink-mute">
            What clients run on what we built
          </h3>
          <ul className="mt-5 grid gap-3 sm:gap-4 md:grid-cols-3">
            {results.map(({ Icon, value, label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  prefetch={false}
                  className="glass group flex h-full items-start gap-4 rounded-[28px] p-5 transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-lime">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="display block text-3xl">{value}</span>
                    <span className="mt-1.5 block text-sm leading-6 text-ink-soft">{label}</span>
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-canvas text-ink transition group-hover:bg-lime">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 rounded-[28px] bg-ink px-6 py-6 text-white sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {standards.map(({ Icon, text }) => (
            <li key={text} className="flex items-center gap-3 text-sm">
              <Icon className="h-5 w-5 shrink-0 text-lime" aria-hidden="true" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
