import { content, type Locale } from "@/lib/i18n";
import { AvatarImage } from "@/components/avatar-image";
import { FormattedText } from "@/components/formatted-text";
import { Phone, Mail, MapPin } from "lucide-react";

type PageProps = {
  params: Promise<{ locale: string }>;
};


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
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-6">
        {/* Overview Section with Top Border */}
        <section id="overview" className="flex flex-col overflow-hidden rounded-lg bg-card shadow-sm">
          {/* Top Primary Color Bar */}
          <div className="h-1.5 bg-primary" />

          {/* Main Content Area */}
          <div className="flex flex-col gap-6 p-6 sm:flex-row sm:gap-8 sm:p-8">
            {/* Left: Portrait Image */}
            <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-full bg-muted sm:h-56 sm:w-56">
              <AvatarImage
                src="/avatar.jpg"
                alt={`${t.hero.name} avatar`}
                fallbackSrc="/avatar.svg"
                className="object-cover"
                priority
              />
            </div>

            {/* Right: Information */}
            <div className="flex flex-1 flex-col gap-4">
              {/* Name */}
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {t.hero.name}
              </h1>

              {/* Title/Affiliation */}
              <p className="text-sm leading-relaxed text-foreground sm:text-base">
                {t.hero.title}
              </p>

              {/* Research Fields */}
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-foreground">
                  {t.info.fieldsLabel}:
                </span>
                <div className="flex flex-wrap gap-2">
                  {t.info.fields.map((field) => (
                    <span
                      key={field}
                      className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="flex flex-col gap-3">
                {/* Phone */}
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="text-sm text-foreground">
                    <span className="font-medium">{t.info.phoneLabel}: </span>
                    <span>{t.info.phone}</span>
                  </span>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="text-sm text-foreground">
                    <span className="font-medium">{t.info.emailLabel}: </span>
                    <a
                      href={`mailto:${t.info.email}`}
                      className="text-primary hover:underline"
                    >
                      {t.info.email}
                    </a>
                  </span>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-muted-foreground" />
                  <span className="text-sm text-foreground">
                    <span className="font-medium">{t.info.addressLabel}: </span>
                    <span>{t.info.address}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </header>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Personal Introduction Section */}
      <section id="bio" className="flex flex-col gap-6">
        {/* Section Title with Primary Color Bar */}
        <div className="flex items-center gap-3">
          <div className="h-6 w-1 bg-primary" />
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            {t.sections.personalIntroTitle}
          </h2>
        </div>

        {/* Personal Profile */}
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-bold text-foreground sm:text-lg">
            {t.sections.personalProfile.title}:
          </h3>
          <p className="text-sm leading-relaxed text-foreground sm:text-base">
            {t.sections.personalProfile.content}
          </p>
        </div>

        {/* Main Research Areas */}
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-bold text-foreground sm:text-lg">
            {t.sections.mainResearchAreas.title}:
          </h3>
          <FormattedText
            text={t.sections.mainResearchAreas.content}
            className="text-sm leading-relaxed text-foreground sm:text-base"
          />
        </div>

        {/* Research Content */}
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-bold text-foreground sm:text-lg">
            {t.sections.researchContent.title}:
          </h3>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2">
            {t.sections.researchContent.keywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {keyword}
              </span>
            ))}
          </div>

          {/* Description */}
          <FormattedText
            text={t.sections.researchContent.description}
            className="text-sm leading-relaxed text-foreground sm:text-base"
          />

          {/* Detailed Description */}
          <p className="text-sm leading-relaxed text-foreground sm:text-base">
            {t.sections.researchContent.detailedDescription}
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="flex flex-col gap-6">
        {/* Section Title with Primary Color Bar */}
        <div className="flex items-center gap-3">
          <div className="h-6 w-1 bg-primary" />
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            {t.sections.experience.title}
          </h2>
        </div>

        {/* Experience Timeline */}
        <div className="relative flex flex-col gap-0">
          {t.sections.experience.items.map((item, index) => (
            <div key={index} className="relative flex gap-6 pb-8 last:pb-0">
              {/* Timeline Line and Dot */}
              <div className="relative flex flex-col items-center">
                <div className="relative z-10 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                {index < t.sections.experience.items.length - 1 && (
                  <div className="absolute top-4 left-1/2 h-full w-0.5 -translate-x-1/2 bg-primary/20" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-2">
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-base font-bold text-foreground sm:text-lg">
                      {item.year}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground sm:text-base">
                      {item.institution}
                    </span>
                  </div>
                  <p className="text-sm text-foreground sm:text-base">{item.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Academic Positions Section */}
      <section id="academic-positions" className="flex flex-col gap-6">
        {/* Section Title with Primary Color Bar */}
        <div className="flex items-center gap-3">
          <div className="h-6 w-1 bg-primary" />
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            {t.sections.academicPositions.title}
          </h2>
        </div>

        {/* Academic Positions List */}
        <div className="flex flex-col gap-3">
          {t.sections.academicPositions.items.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
              <p className="text-sm leading-relaxed text-foreground sm:text-base">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}


