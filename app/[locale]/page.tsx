import { content, type Locale, locales } from "@/lib/i18n";
import { AvatarImage } from "@/components/avatar-image";
import { FormattedText } from "@/components/formatted-text";
import { ProjectNews } from "@/components/project-news";
import { Phone, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = (localeParam in content ? localeParam : "en") as Locale;
  const t = content[locale];

  return {
    title: t.meta.title,
    description: t.meta.description,
    keywords: [...t.meta.keywords],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        zh: "/zh",
        ja: "/ja",
      },
    },
  };
}


export default async function LocaleHome({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = (localeParam in content ? localeParam : "en") as Locale;
  const t = content[locale];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: t.hero.name,
    jobTitle: t.hero.title,
    email: `mailto:${t.info.email}`,
    telephone: t.info.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: t.info.address,
    },
    knowsAbout: t.info.fields,
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-12 px-4 py-12 sm:px-6 lg:px-8">
      {/* Semiconductor Industry Introduction Section */}
      <section id="industry-intro" className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <div className="h-8 w-1.5 bg-primary rounded-full" />
          <h2 className="text-2xl font-bold text-foreground sm:text-2xl">
            {t.sections.industryIntro.title}
          </h2>
        </div>
        <div className="text-base leading-relaxed text-foreground sm:text-lg">
          <FormattedText text={t.sections.industryIntro.content} />
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Project News Section */}
      <section id="project-news" className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <div className="h-8 w-1.5 bg-primary rounded-full" />
          <h2 className="text-2xl font-bold text-foreground sm:text-2xl">
            {t.sections.projectNews.title}
          </h2>
        </div>
        <ProjectNews featured={t.sections.projectNews.featured} list={t.sections.projectNews.list} />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}


