import { content, type Locale, locales } from "@/lib/i18n";
import { BilibiliPlayer } from "@/components/bilibili-player";
import { Calendar, User, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type PageProps = {
    params: Promise<{ locale: Locale; id: string }>;
};

export async function generateStaticParams() {
    const forumIds = ["forum-1", "forum-2", "forum-3", "forum-4", "forum-5", "forum-6"];
    const params: Array<{ locale: Locale; id: string }> = [];
    
    for (const locale of locales) {
        for (const id of forumIds) {
            params.push({ locale, id });
        }
    }
    
    return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale: localeParam, id } = await params;
    const locale = localeParam in content ? localeParam : "en";
    const t = content[locale];

    // Find the forum by ID
    const forum = mockForums.find((f) => f.id === id);

    if (!forum) {
        return {
            title: `${t.forum.title} | ${t.meta.title}`,
        };
    }

    return {
        title: `${forum.title} | ${t.forum.title} | ${t.meta.title}`,
        description: forum.description,
        keywords: [...t.meta.keywords, "forum", "academic forum", "research forum", forum.title],
        alternates: {
            canonical: `/${locale}/forum/${id}`,
            languages: {
                en: `/en/forum/${id}`,
                zh: `/zh/forum/${id}`,
                ja: `/ja/forum/${id}`,
            },
        },
        openGraph: {
            title: `${forum.title} | ${t.forum.title}`,
            description: forum.description,
            type: "video.other",
            locale: locale === "en" ? "en_US" : locale === "zh" ? "zh_CN" : "ja_JP",
            url: `/${locale}/forum/${id}`,
        },
        twitter: {
            card: "summary_large_image",
            title: `${forum.title} | ${t.forum.title}`,
            description: forum.description,
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

// Mock forum data (same as in list page)
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

export default async function ForumDetailPage({ params }: PageProps) {
    const { locale: localeParam, id } = await params;
    const locale = localeParam in content ? localeParam : "en";
    const t = content[locale];

    // Find the forum by ID
    const forum = mockForums.find((f) => f.id === id);

    // If forum not found, show 404
    if (!forum) {
        notFound();
    }

    // Generate JSON-LD structured data
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';
    const jsonLd = {
        "@context": "https://schema.org",
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
        video: {
            "@type": "VideoObject",
            name: forum.title,
            description: forum.description,
            thumbnailUrl: `${baseUrl}${forum.image}`,
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
            {/* Back to list link */}
            <Link
                href={`/${locale}/forum`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
            >
                <ArrowLeft className="w-4 h-4" />
                {t.forum.backToList}
            </Link>

            {/* Forum Title */}
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                    {forum.title}
                </h1>

                {/* Forum Meta Information */}
                <div className="flex flex-col gap-2 text-sm text-muted-foreground border-l-2 border-primary pl-4">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span>
                            <span className="font-medium">{t.forum.date}:</span> {forum.date}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4 flex-shrink-0" />
                        <span>
                            <span className="font-medium">{t.forum.host}:</span> {forum.host}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 flex-shrink-0" />
                        <span>
                            <span className="font-medium">{t.forum.speaker}:</span> {forum.speaker}
                        </span>
                    </div>
                </div>
            </div>

            {/* Bilibili Video Player */}
            <div className="w-full">
                <BilibiliPlayer bvid={forum.bilibiliId} title={forum.title} />
            </div>

            {/* Forum Introduction */}
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold text-foreground">
                    {t.forum.introduction}
                </h2>
                <div className="prose prose-sm sm:prose-base max-w-none text-muted-foreground leading-relaxed">
                    <p>{forum.description}</p>
                </div>
            </div>
        </main>
        </>
    );
}
