import type { Metadata } from 'next';
import HomePageClient from '../src/HomePageClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nextgenfusion.in';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'NextGen Fusion',
      url: siteUrl,
      logo: `${siteUrl}/og-image.svg`,
      email: 'contact@nextgenfusion.in',
      telephone: '+91 73482 28167',
      sameAs: ['https://www.linkedin.com/company/nextgen-fusion'],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'NextGen Fusion',
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#service`,
      name: 'NextGen Fusion',
      url: siteUrl,
      areaServed: 'Worldwide',
      serviceType: [
        'Website Development',
        'E-commerce Development',
        'Custom Web Applications',
        'AI Solutions',
        'UI/UX Design',
        'SEO Optimization',
      ],
      provider: {
        '@id': `${siteUrl}/#organization`,
      },
    },
  ],
};

export const metadata: Metadata = {
  title: 'Website Development, AI Solutions & Digital Services',
  description:
    'NextGen Fusion builds websites, custom web apps, e-commerce platforms, and AI automations designed for growth.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'NextGen Fusion | Website Development, AI Solutions & Digital Services',
    description:
      'Website development, e-commerce builds, custom web apps, and AI automation services for modern businesses.',
    url: '/',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'NextGen Fusion',
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomePageClient />
    </>
  );
}