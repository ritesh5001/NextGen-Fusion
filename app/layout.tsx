import type { Metadata, Viewport } from 'next';
import '../src/index.css';
import '../src/site.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nextgenfusion.in';
const siteName = 'NextGen Fusion';
const siteTitle = 'NextGen Fusion | SEO-Optimized Development, AI Automation & Growth Services';
const siteDescription =
  'NextGen Fusion is a digital services company offering website development, mobile apps, UI/UX design, AI automation, SEO and marketing, custom software, API integrations, and cloud DevOps solutions.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    'website development company',
    'web development services',
    'custom web development',
    'ecommerce website development',
    'landing page development',
    'saas platform development',
    'api integration services',
    'mobile app development company',
    'android app development',
    'react native app development',
    'ui ux design services',
    'website design company',
    'app design services',
    'AI development company',
    'ai chatbot development',
    'business automation services',
    'digital marketing agency',
    'seo services',
    'google ads agency',
    'website maintenance services',
    'custom software development',
    'crm development company',
    'erp solutions',
    'payment gateway integration',
    'whatsapp api integration',
    'conversion rate optimization',
    'sales funnel development',
    'ai saas product development',
    'cloud deployment services',
    'devops services',
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
        alt: 'NextGen Fusion - SEO-Optimized Development and AI Growth Services',
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