import { content, type Locale, locales } from "@/lib/i18n";
import { PapersPageClient } from "./papers-client";
import { query } from "@/lib/db";
import type { Publication } from "@/types/database";
import type { Metadata } from "next";

// Force dynamic rendering - don't try to build this page statically
// This prevents database connections during build time
export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam in content ? localeParam : "en";
  const t = content[locale];

  return {
    title: `${t.papers.title} | ${t.meta.title}`,
    description: t.papers.description,
    keywords: [...t.meta.keywords, "research papers", "publications", "academic publications"],
    alternates: {
      canonical: `/${locale}/papers`,
      languages: {
        en: "/en/papers",
        zh: "/zh/papers",
        ja: "/ja/papers",
      },
    },
    openGraph: {
      title: `${t.papers.title} | ${t.meta.title}`,
      description: t.papers.description,
      type: "website",
      locale: locale === "en" ? "en_US" : locale === "zh" ? "zh_CN" : "ja_JP",
      url: `/${locale}/papers`,
    },
    twitter: {
      card: "summary",
      title: `${t.papers.title} | ${t.meta.title}`,
      description: t.papers.description,
    },
  };
}

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

  // Generate JSON-LD structured data
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t.papers.title,
    description: t.papers.description,
    url: `${baseUrl}/${locale}/papers`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: papers.length,
      itemListElement: papers.slice(0, 10).map((paper, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "ScholarlyArticle",
          headline: paper.title,
          author: paper.authors.map((author) => ({
            "@type": "Person",
            name: author,
          })),
          publisher: {
            "@type": "Organization",
            name: paper.journal,
          },
          datePublished: paper.date,
          url: paper.url,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PapersPageClient locale={locale} papers={t.papers} mockPapers={papers} />
    </>
  );
}
