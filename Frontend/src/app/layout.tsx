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
import { brandProfiles, CONTACT_EMAIL, offices, PRIMARY_PHONE_E164 } from "@/data/offices";
import { personId, team, TEAM_SIZE } from "@/data/team";
import { serviceNavItems } from "@/data/services-nav";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      // Declared once, referenced by @id from Organization and both offices, so
      // the logo is a resolvable ImageObject with dimensions rather than three
      // copies of a bare URL string.
      "@type": "ImageObject",
      "@id": `${siteUrl}/#logo`,
      url: `${siteUrl}/images/site-logo.png`,
      contentUrl: `${siteUrl}/images/site-logo.png`,
      caption: "NextGen Fusion",
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "NextGen Fusion",
      // Several other companies trade as "NextGen Fusion" and the bare token
      // reads as nuclear fusion to a language model. The qualified alternate
      // name gives retrieval something disambiguating to match on.
      alternateName: "NextGen Fusion — Web Development Agency, Lucknow",
      url: siteUrl,
      description:
        "Web development, ecommerce and SEO studio in Lucknow and Mumbai, India. Builds custom websites on Next.js and WordPress, online stores on Shopify and WooCommerce, Android apps and custom software for D2C brands, manufacturers, institutes and B2B companies, with published pricing and post-launch support.",
      // Google requires a raster logo; the SVG here was silently ignored.
      logo: { "@id": `${siteUrl}/#logo` },
      image: { "@id": `${siteUrl}/#logo` },
      email: CONTACT_EMAIL,
      telephone: PRIMARY_PHONE_E164,
      numberOfEmployees: { "@type": "QuantitativeValue", value: TEAM_SIZE },
      // What the studio demonstrably works in. Feeds entity understanding for
      // "who does X in Lucknow" style retrieval.
      knowsAbout: serviceNavItems.map((service) => service.label),
      knowsLanguage: ["en", "hi"],
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Place", name: "Worldwide" },
      ],
      // The registered postal address is the Mumbai office; Lucknow has no
      // street-level address we publish.
      address: (() => {
        const registered = offices.find((office) => office.postal.street) ?? offices[0];
        return {
          "@type": "PostalAddress",
          ...(registered.postal.street ? { streetAddress: registered.postal.street } : {}),
          addressLocality: registered.postal.locality,
          addressRegion: registered.postal.region,
          ...(registered.postal.postalCode ? { postalCode: registered.postal.postalCode } : {}),
          addressCountry: registered.postal.country,
        };
      })(),
      location: offices.map((office) => ({
        "@id": `${siteUrl}/#office-${office.city.toLowerCase()}`,
      })),
      // Bare @id references. The full Person nodes are defined on /about/ and
      // on each /team/<slug>/ profile; repeating them on every page would put
      // four biographies into the markup of every URL on the site.
      founder: team
        .filter((member) => member.isFounder)
        .map((member) => ({ "@id": personId(member.slug, siteUrl) })),
      // sameAs is for profiles that corroborate the entity elsewhere. Listing
      // our own homepage told Google nothing, and pointing it at the www host
      // while `url` used the apex actively muddied canonicalisation.
      sameAs: brandProfiles.map((profile) => profile.href),
      // One entry per number we publish. The footer listed two phone numbers
      // while schema declared one, and NAP that disagrees with itself across
      // surfaces is the fastest way to lose a local pack.
      contactPoint: offices.map((office) => ({
        "@type": "ContactPoint",
        telephone: office.contact.phoneE164,
        email: CONTACT_EMAIL,
        contactType: office.contact.phoneE164 === PRIMARY_PHONE_E164 ? "sales" : "customer support",
        // Matches Organization.areaServed. "IN" alone contradicted the
        // Worldwide claim one node above it — telling Google and every AI
        // system simultaneously that the studio serves the world and can only
        // be contacted from India.
        areaServed: ["IN", "Worldwide"],
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
        // Its own city page, not the homepage. Two LocalBusiness nodes sharing
        // one url is how Google ends up merging two offices into one location.
        url: `${siteUrl}${office.landingPath}`,
        image: { "@id": `${siteUrl}/#logo` },
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
    // Service nodes live on their own service and city pages, not here: twelve
    // of them on every URL (privacy pages included) blurred which page is about
    // which service. SiteNavigationElement was dropped too — Google ignores it.
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "NextGen Fusion",
      description:
        "Websites, online stores, apps and SEO for businesses in India — built in Lucknow and Mumbai.",
      inLanguage: "en-IN",
      publisher: { "@id": `${siteUrl}/#organization` },
      // No potentialAction/SearchAction: there is no on-site search endpoint,
      // and declaring one that 404s is worse than declaring none.
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Website Development Company in Lucknow & India | NextGen Fusion",
    template: "%s | NextGen Fusion",
  },
  description:
    "NextGen Fusion builds high-performance websites, SEO campaigns, mobile apps, software, and digital products for businesses that need measurable growth.",
  authors: [{ name: "NextGen Fusion" }],
  creator: "NextGen Fusion",
  publisher: "NextGen Fusion",
  category: "technology",
  applicationName: "NextGen Fusion",
  // No site-wide canonical. Inherited by every route that did not set its own,
  // it told Google the 404 page was the homepage. Each page sets its own.

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
    title: "Website Development Company in Lucknow & India | NextGen Fusion",
    description:
      "High-performance websites, SEO, mobile apps, software, and digital products built for measurable business growth.",
    images: OG_IMAGES,
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Website Development Company in Lucknow & India | NextGen Fusion",
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

  // Verification tags. Google is already verified via the two HTML files in
  // /public, which is fragile — either file disappearing in a cleanup
  // silently de-verifies the property with no alert. This meta tag is a
  // second, code-reviewed verification path that can't be deleted by
  // accident the way a file in /public can. Get the token from Search
  // Console > Settings > Ownership verification > HTML tag (it will NOT
  // match the filename token) and set it as
  // NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION. Bing Webmaster Tools issues its own
  // token the same way for NEXT_PUBLIC_BING_SITE_VERIFICATION — worth adding
  // since robots.txt already explicitly welcomes Bingbot.
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }
      : {}),
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
