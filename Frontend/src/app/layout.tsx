import type { Metadata } from "next";
import { inter, interDisplay, trap } from "./fonts";
import "./globals.css";
import "../styles/optimized-icons.css";
import ConsoleEasterEgg from "@/components/console-easter-egg";
import ErrorBoundary from "@/components/error-boundary";
import "@/lib/error-handler";
import LenisProvider from "@/components/lenis-provider";
import LayoutChrome from "@/components/layout-chrome";
import { DEFAULT_OG_IMAGE, OG_IMAGES, siteUrl } from "@/lib/seo";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "NextGen Fusion",
      url: siteUrl,
      logo: `${siteUrl}/images/livtechlogo.svg`,
      sameAs: [
        "https://www.nextgenfusion.in",
        "https://www.instagram.com/nextgenfusion.devs/",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-7348228167",
          email: "contact@nextgenfusion.in",
          contactType: "sales",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi"],
        },
      ],
      // NOTE: aggregateRating deliberately omitted. Google's structured-data
      // policy requires ratings to come from genuine, on-page user reviews;
      // shipping placeholder numbers risks a manual action. Re-add only with
      // verified Google/Clutch review data plus visible reviews on the page.
    },
    ...[
      "Website Development",
      "E-commerce Web Development",
      "Web Design",
      "SEO Services",
      "AI Automation & Development",
      "Software Development",
    ].map((service) => ({
      "@type": "Service",
      "@id": `${siteUrl}/#service-${service.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      name: service,
      serviceType: service,
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
      "@type": "SiteNavigationElement",
      name: ["Home", "Services", "Blogs", "About", "Contact", "Projects"],
      url: [
        `${siteUrl}/`,
        `${siteUrl}/#services`,
        `${siteUrl}/blog`,
        `${siteUrl}/#about`,
        `${siteUrl}/#contact`,
        `${siteUrl}/work`,
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
  keywords: [
    "web development",
    "web design",
    "digital agency",
    "website creation",
    "NextGen Fusion",
    "custom websites",
    "SEO optimization",
  ],
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
    locale: "en_US",
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
      lang="en"
      className={`${trap.variable} ${inter.variable} ${interDisplay.variable} font-sans`}
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

        {/* Additional SEO meta tags */}
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta httpEquiv="content-language" content="en-us" />

        {/* Favicons, apple-touch icons, tile metas and manifest are declared
            in the `metadata` export above — no hand-written <link> tags needed. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

      </head>
      <body className="min-h-screen bg-white md:pb-0 pb-24">
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
