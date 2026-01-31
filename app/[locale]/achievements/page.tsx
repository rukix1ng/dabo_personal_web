import { content, type Locale } from "@/lib/i18n";
import { Award } from "lucide-react";
import { MediaImage } from "@/components/media-image";
import { MediaCarousel } from "@/components/media-carousel";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function AchievementsPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam in content ? localeParam : "en";
  const t = content[locale];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
      {/* Media Reports Section */}
      <section className="flex flex-col gap-6">
        {/* Section Title with Primary Color Bar */}
        <div className="flex items-center gap-3">
          <div className="h-6 w-1 bg-primary" />
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            {t.achievements.mediaReports.title}
          </h2>
        </div>

        {/* Media Reports List */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
          {t.achievements.mediaReports.items.map((item: any, index: number) => (
            <article
              key={index}
              className="group flex flex-col gap-0 overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card hover:shadow-xl hover:shadow-primary/5 sm:flex-row"
            >
              {/* Image Container with Overlay */}
              <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-muted sm:w-64 lg:w-72 sm:aspect-square lg:aspect-[4/3]">
                {item.images ? (
                  <MediaCarousel images={item.images} />
                ) : (
                  <MediaImage
                    src={item.image}
                    alt={item.title}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 512px, 600px"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* Content Area */}
              <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    {item.journals?.map((journal: string, idx: number) => (
                      <span key={idx} className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase text-primary">
                        {journal}
                      </span>
                    ))}
                    <span className="text-[10px] font-medium text-muted-foreground/60">
                      {item.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground/90 sm:text-base">
                    {item.content}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-primary transition-transform duration-300 group-hover:translate-x-1">
                    <span>{t.achievements.mediaReports.readMore}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Awards Section */}
      <section className="flex flex-col gap-6">
        {/* Section Title with Primary Color Bar */}
        <div className="flex items-center gap-3">
          <div className="h-6 w-1 bg-primary" />
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            {t.achievements.awards.title}
          </h2>
        </div>

        {/* Awards Timeline */}
        <div className="relative flex flex-col gap-0">
          {t.achievements.awards.items.map((item, index) => (
            <div key={index} className="relative flex gap-6 pb-8 last:pb-0">
              {/* Timeline Line and Dot */}
              <div className="relative flex flex-col items-center">
                <div className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-background">
                  <Award className="h-2.5 w-2.5 text-primary" />
                </div>
                {index < t.achievements.awards.items.length - 1 && (
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
                  </div>
                  <p className="text-sm text-foreground sm:text-base">{item.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
