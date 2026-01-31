import Link from "next/link";
import { Calendar, User, Users, ArrowRight } from "lucide-react";

interface ForumCardProps {
    forum: {
        id: string;
        title: string;
        image: string;
        date: string;
        host: string;
        speaker: string;
        description: string;
    };
    locale: string;
    labels: {
        host: string;
        speaker: string;
        date: string;
        viewDetails: string;
    };
}

export function ForumCard({ forum, locale, labels }: ForumCardProps) {
    return (
        <Link href={`/${locale}/forum/${forum.id}`}>
            <article className="group flex flex-col sm:flex-row gap-0 overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card hover:shadow-xl hover:shadow-primary/5">
                {/* Placeholder Image Container */}
                <div className="relative aspect-video sm:aspect-square w-full sm:w-64 lg:w-80 flex-shrink-0 bg-muted/50 border-r border-border/30">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-muted-foreground/10 flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-muted-foreground/30"
                            >
                                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                <circle cx="9" cy="9" r="2" />
                                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                    <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-xl">
                            {forum.title}
                        </h3>

                        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 flex-shrink-0" />
                                <span>{forum.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4 flex-shrink-0" />
                                <span>
                                    <span className="font-medium">{labels.host}:</span> {forum.host}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 flex-shrink-0" />
                                <span>
                                    <span className="font-medium">{labels.speaker}:</span> {forum.speaker}
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground/90 leading-relaxed line-clamp-3 mt-1">
                            {forum.description}
                        </p>
                    </div>

                    {/* View Details Link */}
                    <div className="mt-4 pt-4 border-t border-border/40">
                        <div className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-transform duration-300 group-hover:translate-x-1">
                            <span>{labels.viewDetails}</span>
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}
