import { content, type Locale, locales } from "@/lib/i18n";
import { AvatarImage } from "@/components/avatar-image";
import { FormattedText } from "@/components/formatted-text";
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
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      type: "profile",
      locale: locale === "en" ? "en_US" : locale === "zh" ? "zh_CN" : "ja_JP",
      url: `/${locale}`,
    },
    twitter: {
      card: "summary",
      title: t.meta.title,
      description: t.meta.description,
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
      <header className="flex flex-col gap-8">
        {/* Overview Section with Top Border */}
        <section id="overview" className="flex flex-col overflow-hidden rounded-xl bg-card shadow-md">
          {/* Top Primary Color Bar */}
          <div className="h-1.5 bg-primary" />

          {/* Main Content Area */}
          <div className="flex flex-col gap-6 p-8 sm:p-10">
            {/* Project Name */}
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              {t.hero.name}
            </h1>

            {/* Project Description */}
            {t.hero.description && (
              <div className="flex flex-col gap-4">
                <p className="text-base leading-relaxed text-foreground sm:text-lg">
                  {t.hero.description}
                </p>
              </div>
            )}
          </div>
        </section>

      </header>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Unified Project Leader Section */}
      <section id="bio" className="flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex items-center gap-4">
          <div className="h-8 w-1.5 bg-primary rounded-full" />
          <h2 className="text-2xl font-bold text-foreground sm:text-2xl">
            {t.sections.personalIntroTitle}
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-[300px_1fr]">
          {/* Sidebar: Profile and Contact Info */}
          <aside className="flex flex-col gap-10">
            <div className="sticky top-10 flex flex-col gap-10">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col gap-8">
                <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted shadow-xl ring-1 ring-border">
                  <AvatarImage
                    src="/avatar.jpg"
                    alt={locale === "zh" ? "达 博" : locale === "ja" ? "達 博" : "Dr. Da Bo"}
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-foreground">
                    {locale === "zh" ? "达 博" : locale === "ja" ? "達 博" : "Dr. Da Bo"}
                  </h3>
                  <p className="text-base font-semibold text-foreground leading-relaxed">
                    {t.hero.title}
                  </p>
                </div>

                {/* Research Tags - Moved here below title */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    {t.info.fieldsLabel}
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {t.info.fields.map((field) => (
                      <span
                        key={field}
                        className="rounded-lg bg-secondary/60 px-3 py-2 text-sm font-semibold text-secondary-foreground ring-1 ring-border/50 transition-all hover:bg-primary/10 hover:text-primary shadow-sm"
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="flex flex-col gap-5 pt-8 border-t border-border/50">
                <div className="flex items-center gap-4 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                    <Mail className="h-5 w-5" />
                  </div>
                  <a href={`mailto:${t.info.email}`} className="text-base text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline truncate">
                    {t.info.email}
                  </a>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="flex h-10 w-10 shrink-0 mt-0.5 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <p className="flex-1 text-base text-foreground leading-relaxed">
                    {t.info.address}
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Column: Bio, Experience, Honors */}
          <div className="flex flex-col gap-16">
            {/* Biography */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-foreground flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {t.sections.personalProfile.title}
              </h4>
              <FormattedText
                text={t.sections.personalProfile.content}
                className="text-base leading-relaxed text-foreground sm:text-lg border-l-4 border-primary/10 pl-6 py-2"
              />
            </div>

            {/* Experience timeline */}
            <div className="space-y-8 pt-8 border-t border-border/50">
              <h4 className="text-xl font-bold text-foreground flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {t.sections.experience.title}
              </h4>

              <div className="relative flex flex-col gap-2 pt-4">
                {t.sections.experience.items.map((item, index) => (
                  <div key={index} className="relative flex gap-8 pb-10 last:pb-0">
                    <div className="relative flex flex-col items-center">
                      <div className="relative z-10 h-4 w-4 rounded-full border-2 border-primary bg-background shadow-sm" />
                      {index < t.sections.experience.items.length - 1 && (
                        <div className="absolute top-4 left-1/2 h-full w-0.5 -translate-x-1/2 bg-primary/10" />
                      )}
                    </div>

                    <div className="flex-1 pb-2">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-baseline gap-4 flex-wrap">
                          <span className="text-base font-extrabold text-foreground">
                            {item.year}
                          </span>
                          <FormattedText
                            text={item.institution}
                            className="text-base font-semibold text-muted-foreground inline-block"
                          />
                        </div>
                        <p className="text-base font-medium text-foreground/80 leading-relaxed">{item.position}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Honors Section */}
            <div className="space-y-8 pt-8 border-t border-border/50">
              <h4 className="text-xl font-bold text-foreground flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {t.sections.academicPositions.title}
              </h4>

              <div className="grid gap-4 sm:grid-cols-2">
                {t.sections.academicPositions.items.map((item, index) => (
                  <div
                    key={index}
                    className="group rounded-xl border border-border/40 bg-card/20 p-6 transition-all hover:border-primary/40 hover:bg-card/40 hover:shadow-lg"
                  >
                    <div className="flex items-start gap-4">
                      <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary transition-all group-hover:bg-primary group-hover:text-white">
                        {index + 1}
                      </span>
                      <p className="flex-1 text-base leading-relaxed text-foreground">
                        {item}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}


