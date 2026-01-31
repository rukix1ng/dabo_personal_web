import { redirect } from "next/navigation";
import { getCurrentAdmin, clearAdminToken } from "@/lib/auth";
import { LogOut, FileText, MessageSquare, LayoutDashboard } from "lucide-react";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const admin = await getCurrentAdmin();

    if (!admin) {
        redirect("/admin/login");
    }

    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border bg-card/30">
                <div className="flex h-full flex-col">
                    {/* Logo */}
                    <div className="border-b border-border px-6 py-5">
                        <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Welcome, {admin.username}
                        </p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 p-4">
                        <a
                            href="/admin"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                        >
                            <LayoutDashboard className="h-5 w-5" />
                            Dashboard
                        </a>
                        <a
                            href="/admin/papers"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                        >
                            <FileText className="h-5 w-5" />
                            Papers
                        </a>
                        <a
                            href="/admin/forum"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary opacity-50 cursor-not-allowed"
                            title="Coming soon"
                        >
                            <MessageSquare className="h-5 w-5" />
                            Forum (Soon)
                        </a>
                    </nav>

                    {/* Logout */}
                    <div className="border-t border-border p-4">
                        <form action={async () => {
                            "use server";
                            await clearAdminToken();
                            redirect("/admin/login");
                        }}>
                            <button
                                type="submit"
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-600"
                            >
                                <LogOut className="h-5 w-5" />
                                Logout
                            </button>
                        </form>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="container mx-auto p-8">{children}</div>
            </main>
        </div>
    );
}
