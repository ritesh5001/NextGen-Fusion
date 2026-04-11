import type { Metadata, Viewport } from 'next';
import '../src/index.css';
import '../src/site.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nextgenfusion.in';
const siteName = 'NextGen Fusion';
const siteTitle = 'NextGen Fusion | Website Development, AI Solutions & Digital Services';
const siteDescription =
  'NextGen Fusion is a leading web development and AI solutions company offering website development, e-commerce solutions, custom web apps, and AI automation services to grow your business.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    'website development company',
    'ecommerce website development',
    'AI development company',
    'chatbot development services',
    'web application development',
    'full stack development services',
    'SEO optimization services',
    'digital solutions company',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'NextGen Fusion - Web Development and AI Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/og-image.svg'],
  },
  icons: {
    icon: '/og-image.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body data-theme="">{children}</body>
    </html>
  );
}