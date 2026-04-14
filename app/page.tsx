import type { Metadata } from 'next';
import HomePageClient from '../src/HomePageClient';

export const dynamic = 'force-dynamic';

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
        'Custom Web Application Development',
        'E-commerce Development',
        'Landing Page Development',
        'SaaS Platform Development',
        'API Development and Integration',
        'Android App Development',
        'React Native App Development',
        'UI/UX Design',
        'AI Chatbot Development',
        'AI Business Automation',
        'SEO Services',
        'Google Ads Management',
        'Custom Software Development',
        'Payment and Third-party API Integration',
        'Conversion Optimization',
        'Cloud Deployment and DevOps',
      ],
      provider: {
        '@id': `${siteUrl}/#organization`,
      },
    },
  ],
};

export const metadata: Metadata = {
  title: 'SEO-Optimized Development, AI Automation & Growth Services',
  description:
    'NextGen Fusion delivers SEO-optimized development, mobile app engineering, UI/UX design, AI automation, digital marketing, custom software, API integrations, and cloud DevOps services.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'NextGen Fusion | SEO-Optimized Development and AI Growth Services',
    description:
      'Website and app development, AI chatbot and automation solutions, SEO and growth marketing, software integrations, and cloud DevOps for modern businesses.',
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