import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';
  
  // Static pages
  const staticPages = [
    '',
    '/papers',
    '/forum',
    '/achievements',
  ];

  // Forum detail pages
  const forumIds = ['forum-1', 'forum-2', 'forum-3', 'forum-4', 'forum-5', 'forum-6'];
  
  const routes: MetadataRoute.Sitemap = [];

  // Generate routes for each locale
  for (const locale of locales) {
    // Static pages
    for (const page of staticPages) {
      routes.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${page}`])
          ),
        },
      });
    }

    // Forum detail pages
    for (const id of forumIds) {
      routes.push({
        url: `${baseUrl}/${locale}/forum/${id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/forum/${id}`])
          ),
        },
      });
    }
  }

  return routes;
}
