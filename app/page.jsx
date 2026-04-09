import App from '../src/App';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nextgenfusion.in';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'NextGen Fusion',
      url: siteUrl,
      logo: `${siteUrl}/vite.svg`,
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

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <App />
    </>
  );
}