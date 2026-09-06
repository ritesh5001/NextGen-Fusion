import type { Metadata } from "next";
import { inter, trap } from "./fonts";
import "./globals.css";
import "../styles/optimized-icons.css";
import ConsoleEasterEgg from "@/components/console-easter-egg";
import ErrorBoundary from "@/components/error-boundary";
import "@/lib/error-handler";
import LenisProvider from "@/components/lenis-provider";
import LayoutChrome from "@/components/layout-chrome";
import { Analytics } from "@/components/analytics";
import { DEFAULT_OG_IMAGE, OG_IMAGES, siteUrl } from "@/lib/seo";
import { CONTACT_EMAIL, offices, PRIMARY_PHONE_E164 } from "@/data/offices";
import { serviceNavItems } from "@/data/services-nav";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "NextGen Fusion",
      url: siteUrl,
      // Google requires a raster logo; the SVG here was silently ignored.
      logo: `${siteUrl}/images/site-logo.png`,
      // sameAs is for profiles that corroborate the entity elsewhere. Listing
      // our own homepage told Google nothing, and pointing it at the www host
      // while `url` used the apex actively muddied canonicalisation.
      sameAs: ["https://www.instagram.com/nextgenfusion.devs/"],
      // One entry per number we publish. The footer listed two phone numbers
      // while schema declared one, and NAP that disagrees with itself across
      // surfaces is the fastest way to lose a local pack.
      contactPoint: offices.map((office) => ({
        "@type": "ContactPoint",
        telephone: office.contact.phoneE164,
        email: CONTACT_EMAIL,
        contactType: office.contact.phoneE164 === PRIMARY_PHONE_E164 ? "sales" : "customer support",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      })),
      // NOTE: aggregateRating deliberately omitted. Google's structured-data
      // policy requires ratings to come from genuine, on-page user reviews;
      // shipping placeholder numbers risks a manual action. Re-add only with
      // verified Google/Clutch review data plus visible reviews on the page.
    },
    // One ProfessionalService per physical office, linked back to the
    // Organization. These carry the local entity signals (address, geo, phone)
    // that the Organization node alone cannot express.
    ...offices.map((office) => {
      const [latitude, longitude] = office.coordinates
        .split(",")
        .map((part) => Number(part.trim()));
      return {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#office-${office.city.toLowerCase()}`,
        name: `NextGen Fusion — ${office.city}`,
        url: siteUrl,
        image: `${siteUrl}/images/site-logo.png`,
        parentOrganization: { "@id": `${siteUrl}/#organization` },
        telephone: office.contact.phoneE164,
        email: CONTACT_EMAIL,
        address: {
          "@type": "PostalAddress",
          ...(office.postal.street ? { streetAddress: office.postal.street } : {}),
          addressLocality: office.postal.locality,
          addressRegion: office.postal.region,
          ...(office.postal.postalCode ? { postalCode: office.postal.postalCode } : {}),
          addressCountry: office.postal.country,
        },
        geo: { "@type": "GeoCoordinates", latitude, longitude },
        areaServed: ["IN", "Worldwide"],
        priceRange: "₹₹",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "10:00",
            closes: "19:00",
          },
        ],
      };
    }),
    // All twelve, read from the same list the nav, footer and sitemap use. Six
    // were missing, so half the service pages had no Service node at all.
    ...serviceNavItems.map((service) => ({
      "@type": "Service",
      "@id": `${siteUrl}/#service-${service.slug}`,
      name: service.label,
      serviceType: service.label,
      url: `${siteUrl}/services/${service.slug}/`,
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: ["IN", "Worldwide"],
    })),
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "NextGen Fusion",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      // Real page URLs only. Three of these pointed at homepage anchors, which
      // named a section rather than a page Google could surface on its own.
      "@type": "SiteNavigationElement",
      name: ["Home", "About", "Services", "Work", "Store", "Blog", "Team", "Careers", "Support", "Contact"],
      url: [
        `${siteUrl}/`,
        `${siteUrl}/about/`,
        `${siteUrl}/services/`,
        `${siteUrl}/work/`,
        `${siteUrl}/store/`,
        `${siteUrl}/blog/`,
        `${siteUrl}/team/`,
        `${siteUrl}/careers/`,
        `${siteUrl}/support/`,
        `${siteUrl}/contact/`,
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NextGen Fusion - Web Development, SEO & Digital Product Agency",
    template: "%s | NextGen Fusion",
  },
  description:
    "NextGen Fusion builds high-performance websites, SEO campaigns, mobile apps, software, and digital products for businesses that need measurable growth.",
  authors: [{ name: "NextGen Fusion" }],
  creator: "NextGen Fusion",
  publisher: "NextGen Fusion",
  category: "technology",
  applicationName: "NextGen Fusion",
  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/favicon/apple-icon.png", sizes: "192x192", type: "image/png" },
      {
        url: "/favicon/apple-icon-57x57.png",
        sizes: "57x57",
        type: "image/png",
      },
      {
        url: "/favicon/apple-icon-60x60.png",
        sizes: "60x60",
        type: "image/png",
      },
      {
        url: "/favicon/apple-icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        url: "/favicon/apple-icon-76x76.png",
        sizes: "76x76",
        type: "image/png",
      },
      {
        url: "/favicon/apple-icon-114x114.png",
        sizes: "114x114",
        type: "image/png",
      },
      {
        url: "/favicon/apple-icon-120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        url: "/favicon/apple-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        url: "/favicon/apple-icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        url: "/favicon/apple-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.ico",
  },

  // Manifest - gunakan manifest.json yang baru
  manifest: "/favicon/manifest.json",

  // Open Graph untuk sharing (card preview)
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "NextGen Fusion",
    title: "NextGen Fusion - Web Development, SEO & Digital Product Agency",
    description:
      "High-performance websites, SEO, mobile apps, software, and digital products built for measurable business growth.",
    images: OG_IMAGES,
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "NextGen Fusion - Web Development, SEO & Digital Product Agency",
    description:
      "High-performance websites, SEO, mobile apps, software, and digital products built for measurable business growth.",
    images: [DEFAULT_OG_IMAGE],
  },

  // Additional meta tags
  other: {
    "theme-color": "#2B35AB",
    "msapplication-TileColor": "#2B35AB",
    "msapplication-TileImage": "/favicon/ms-icon-144x144.png",
    "msapplication-config": "/favicon/browserconfig.xml",
  },

  // Verification tags (add when you have them)
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${trap.variable} ${inter.variable} font-sans`}
    >
      <head>
        {/* Meta tags tambahan untuk compatibility */}
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        <meta name="theme-color" content="#2B35AB" />
        <meta name="msapplication-navbutton-color" content="#2B35AB" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#2B35AB" />

        {/* Favicons, apple-touch icons, tile metas and manifest are declared
            in the `metadata` export above — no hand-written <link> tags needed. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

      </head>
      <body className="min-h-screen bg-white md:pb-0 pb-24">
        <Analytics />
        <ErrorBoundary>
          <LenisProvider>
            <ConsoleEasterEgg />
            <LayoutChrome>{children}</LayoutChrome>
          </LenisProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
