import { content, type Locale } from "@/lib/i18n";
import { PapersPageClient } from "./papers-client";
import { query } from "@/lib/db";
import type { Publication } from "@/types/database";

// Force dynamic rendering - don't try to build this page statically
// This prevents database connections during build time
export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

interface Paper {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  date: string;
  url: string;
}

async function getPapers(): Promise<Paper[]> {
  try {
    const publications = await query<Publication>(
      'SELECT * FROM publications ORDER BY year DESC, id DESC'
    );

    // Transform database records to Paper format
    return publications.map((pub) => ({
      id: pub.id.toString(),
      title: pub.title,
      // Parse authors - assuming it's stored as comma-separated or JSON
      authors: typeof pub.authors === 'string'
        ? pub.authors.includes('[')
          ? JSON.parse(pub.authors)
          : pub.authors.split(',').map(a => a.trim())
        : [pub.authors],
      journal: pub.journal || 'Unknown Journal',
      date: pub.year ? pub.year.toString() : 'N/A',
      url: pub.link || '#', // Use link from database, fallback to # if not available
    }));
  } catch (error) {
    console.error('Error fetching papers from database:', error);
    // Return empty array if database fails
    return [];
  }
}

export default async function PapersPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam in content ? localeParam : "en";
  const t = content[locale];

  // Fetch papers from database
  const papers = await getPapers();

  return (
    <PapersPageClient locale={locale} papers={t.papers} mockPapers={papers} />
  );
}
