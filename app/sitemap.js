const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nextgenfusion.in';

export default function sitemap() {
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}