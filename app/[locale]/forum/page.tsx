import { content, type Locale, locales } from "@/lib/i18n";
import { ForumCard } from "@/components/forum-card";
import type { Metadata } from "next";

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
    title: `${t.forum.title} | ${t.meta.title}`,
    description: `${t.forum.title} - ${t.meta.description}`,
    keywords: [...t.meta.keywords, "forum", "academic forum", "research forum", "NIMS", "LAM"],
    alternates: {
      canonical: `/${locale}/forum`,
      languages: {
        en: "/en/forum",
        zh: "/zh/forum",
        ja: "/ja/forum",
      },
    },
    openGraph: {
      title: `${t.forum.title} | ${t.meta.title}`,
      description: `${t.forum.title} - ${t.meta.description}`,
      type: "website",
      locale: locale === "en" ? "en_US" : locale === "zh" ? "zh_CN" : "ja_JP",
      url: `/${locale}/forum`,
    },
    twitter: {
      card: "summary",
      title: `${t.forum.title} | ${t.meta.title}`,
      description: `${t.forum.title} - ${t.meta.description}`,
    },
  };
}

interface Forum {
  id: string;
  title: string;
  image: string;
  date: string;
  host: string;
  speaker: string;
  description: string;
  bilibiliId: string;
}

// Mock forum data
const mockForums: Forum[] = [
  {
    id: "forum-1",
    title: "Advanced Materials Characterization Techniques in Modern Research",
    image: "/media-report-1.png",
    date: "2024年3月15日 14:00-16:00",
    host: "Dr. Bo Da",
    speaker: "Prof. John Smith, Dr. Alice Wang",
    description: "本次论坛将深入探讨现代材料研究中的先进表征技术，包括电子显微镜、X射线衍射、光谱分析等前沿方法。我们将分享最新的研究成果和技术进展，讨论如何将这些技术应用于纳米材料、半导体器件和量子材料的研究中。",
    bilibiliId: "BV1xx411c7mD",
  },
  {
    id: "forum-2",
    title: "Quantum Materials and Their Applications in Next-Generation Devices",
    image: "/media-report-2a.png",
    date: "2024年2月20日 10:00-12:00",
    host: "Prof. Chen Wei",
    speaker: "Dr. Bo Da, Dr. Sarah Johnson",
    description: "量子材料在下一代电子器件中的应用前景广阔。本次论坛将重点讨论量子材料的基本特性、制备方法以及在量子计算、量子通信和高性能传感器中的应用。专家们将分享他们在这一领域的最新研究成果和未来发展方向。",
    bilibiliId: "BV1yy4y1e7VN",
  },
  {
    id: "forum-3",
    title: "Surface Analysis Methods for Nanomaterial Research",
    image: "/media-report-3.png",
    date: "2024年1月10日 15:00-17:00",
    host: "Dr. Liu Ming",
    speaker: "Dr. Bo Da",
    description: "表面分析技术是纳米材料研究的关键工具。本论坛将介绍各种表面分析方法，包括XPS、AES、SIMS等，以及如何利用这些技术来研究纳米材料的表面结构、化学组成和电子性质。我们还将讨论虚拟基底方法等创新技术在纳米材料表征中的应用。",
    bilibiliId: "BV1xx411c7mD",
  },
  {
    id: "forum-4",
    title: "Semiconductor Device Physics and Manufacturing",
    image: "/media-report-1.png",
    date: "2023年12月5日 13:00-15:00",
    host: "Prof. Wang Lei",
    speaker: "Dr. Michael Brown, Dr. Emily Chen",
    description: "半导体器件是现代电子技术的基础。本次论坛将探讨半导体器件的物理原理、制造工艺和性能优化。专家们将分享在宽禁带半导体、功率器件和光电器件方面的最新研究进展，以及如何应对制造过程中的挑战。",
    bilibiliId: "BV1yy4y1e7VN",
  },
  {
    id: "forum-5",
    title: "Electron Microscopy in Materials Science: From Basics to Advanced Applications",
    image: "/media-report-2b.png",
    date: "2023年11月18日 09:00-11:00",
    host: "Dr. Zhang Hua",
    speaker: "Prof. David Park, Dr. Bo Da",
    description: "电子显微镜技术在材料科学研究中发挥着不可替代的作用。本论坛将从基础知识讲起，介绍扫描电子显微镜（SEM）和透射电子显微镜（TEM）的工作原理，然后深入探讨高分辨率成像、电子能量损失谱（EELS）和能量色散X射线谱（EDX）等高级应用技术。",
    bilibiliId: "BV1xx411c7mD",
  },
  {
    id: "forum-6",
    title: "Nanophotonics and Optical Properties of Low-Dimensional Materials",
    image: "/media-report-2c.png",
    date: "2023年10月22日 14:30-16:30",
    host: "Prof. Li Jian",
    speaker: "Dr. Anna Martinez, Dr. Robert Kim",
    description: "纳米光子学是研究光与纳米结构相互作用的前沿领域。本次论坛将讨论低维材料（如二维材料、量子点、纳米线）的光学性质，以及它们在光电器件、传感器和量子信息技术中的应用。我们将探讨如何利用这些材料的独特光学特性来开发新型光子器件。",
    bilibiliId: "BV1yy4y1e7VN",
  },
];

export default async function ForumPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam in content ? localeParam : "en";
  const t = content[locale];

  // Generate JSON-LD structured data
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t.forum.title,
    description: `${t.forum.title} - ${t.meta.description}`,
    url: `${baseUrl}/${locale}/forum`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: mockForums.length,
      itemListElement: mockForums.map((forum, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Event",
          name: forum.title,
          description: forum.description,
          startDate: forum.date,
          organizer: {
            "@type": "Person",
            name: forum.host,
          },
          performer: forum.speaker.split(", ").map((speaker) => ({
            "@type": "Person",
            name: speaker.trim(),
          })),
          url: `${baseUrl}/${locale}/forum/${forum.id}`,
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
      <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      {/* Header with blue bar */}
      <div className="flex items-center gap-3">
        <div className="w-1 h-6 bg-primary" />
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          {t.forum.title}
        </h1>
      </div>

      {/* Forum Cards List */}
      <div className="flex flex-col gap-6">
        {mockForums.map((forum) => (
          <ForumCard
            key={forum.id}
            forum={forum}
            locale={locale}
            labels={{
              host: t.forum.host,
              speaker: t.forum.speaker,
              date: t.forum.date,
              viewDetails: t.forum.viewDetails,
            }}
          />
        ))}
      </div>
    </main>
    </>
  );
}
