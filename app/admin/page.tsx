import { query } from "@/lib/db";
import type { Publication } from "@/types/database";
import { FileText, TrendingUp, Calendar } from "lucide-react";

export default async function AdminDashboard() {
    // Get statistics
    const papers = await query<Publication>("SELECT COUNT(*) as count FROM publications");
    const papersCount = papers[0]?.count || 0;

    const recentPapers = await query<Publication>(
        "SELECT * FROM publications ORDER BY year DESC, id DESC LIMIT 5"
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                <p className="mt-2 text-muted-foreground">
                    Overview of your content management system
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Total Papers
                            </p>
                            <p className="mt-2 text-3xl font-bold text-foreground">
                                {papersCount}
                            </p>
                        </div>
                        <div className="rounded-lg bg-primary/10 p-3">
                            <FileText className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6 opacity-50">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Forum Posts
                            </p>
                            <p className="mt-2 text-3xl font-bold text-foreground">
                                Coming Soon
                            </p>
                        </div>
                        <div className="rounded-lg bg-primary/10 p-3">
                            <TrendingUp className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6 opacity-50">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Last Updated
                            </p>
                            <p className="mt-2 text-3xl font-bold text-foreground">
                                Today
                            </p>
                        </div>
                        <div className="rounded-lg bg-primary/10 p-3">
                            <Calendar className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Papers */}
            <div className="rounded-xl border border-border bg-card">
                <div className="border-b border-border px-6 py-4">
                    <h2 className="text-lg font-semibold text-foreground">
                        Recent Papers
                    </h2>
                </div>
                <div className="p-6">
                    {recentPapers.length > 0 ? (
                        <div className="space-y-4">
                            {recentPapers.map((paper) => (
                                <div
                                    key={paper.id}
                                    className="flex items-start justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                                >
                                    <div className="flex-1">
                                        <h3 className="font-medium text-foreground">
                                            {paper.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {paper.journal} • {paper.year}
                                        </p>
                                    </div>
                                    <a
                                        href="/admin/papers"
                                        className="text-sm font-medium text-primary hover:underline"
                                    >
                                        Edit
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-muted-foreground">
                            No papers found
                        </p>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 text-lg font-semibold text-foreground">
                    Quick Actions
                </h2>
                <div className="flex flex-wrap gap-3">
                    <a
                        href="/admin/papers"
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                        Manage Papers
                    </a>
                    <a
                        href="/"
                        target="_blank"
                        className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                        View Site
                    </a>
                </div>
            </div>
        </div>
    );
}
