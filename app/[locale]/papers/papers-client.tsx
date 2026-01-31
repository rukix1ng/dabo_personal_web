"use client";

import { Pagination } from "@/components/pagination";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

interface Paper {
    id: string;
    title: string;
    authors: string[];
    journal: string;
    date: string;
    url: string;
}

interface PapersPageClientProps {
    locale: string;
    papers: {
        title: string;
        description: string;
        previous: string;
        next: string;
        pageInfo: string;
        noResults: string;
        showing: string;
        to: string;
        of: string;
        items: string;
    };
    mockPapers: Paper[];
}

export function PapersPageClient({ locale, papers, mockPapers }: PapersPageClientProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    // Calculate pagination
    const totalPages = Math.ceil(mockPapers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPapers = mockPapers.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top of page
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-6 bg-primary"></div>
                <h1 className="text-xl font-bold text-foreground sm:text-2xl">
                    {papers.title}
                </h1>
            </div>

            {currentPapers.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                    <p className="text-muted-foreground">{papers.noResults}</p>
                </div>
            ) : (
                <>
                    <div className="flex flex-col gap-6">
                        {currentPapers.map((paper, index) => (
                            <article
                                key={paper.id}
                                className="flex flex-col gap-2 pb-6 border-b border-border last:border-b-0 hover:bg-accent/50 -mx-4 px-4 py-4 rounded-lg transition-colors"
                            >
                                <div className="flex items-start gap-2">
                                    <span className="text-sm font-medium text-muted-foreground mt-1 min-w-[2rem]">
                                        {startIndex + index + 1}.
                                    </span>
                                    <div className="flex-1 flex flex-col gap-2">
                                        <a
                                            href={paper.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-lg font-semibold text-foreground hover:text-primary transition-colors inline-flex items-start gap-2 group"
                                        >
                                            <span className="flex-1">{paper.title}</span>
                                            <ExternalLink className="w-4 h-4 mt-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                        </a>
                                        <div className="flex flex-col gap-1 text-sm">
                                            <p className="text-muted-foreground">
                                                {paper.authors.join(", ")}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground">
                                                <span className="font-medium">{paper.journal}</span>
                                                <span className="text-xs">•</span>
                                                <span>{paper.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={mockPapers.length}
                        itemsPerPage={itemsPerPage}
                        labels={{
                            showing: papers.showing,
                            to: papers.to,
                            of: papers.of,
                            items: papers.items,
                        }}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </main>
    );
}
