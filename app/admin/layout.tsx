import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { FileText, MessageSquare, Home } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const headersList = await headers();
    const pathname = headersList.get("x-pathname") || "";

    // Check if it's the login page
    const isLoginPage = pathname.includes('/login');

    // Don't render admin layout for login page
    if (isLoginPage) {
        return <>{children}</>;
    }

    // Check authentication for non-login pages
    const admin = await getCurrentAdmin();
    if (!admin) {
        redirect("/admin/login");
    }

    console.log('AdminLayout rendered, pathname:', pathname, 'admin:', admin.username);

    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-card/30">
                <div className="flex h-full flex-col">
                    {/* Logo */}
                    <div className="border-b border-border px-6 py-5">
                        <h1 className="text-xl font-bold text-foreground">管理面板</h1>
                        <p className="mt-1 text-xs text-muted-foreground">
                            欢迎，{admin.username}
                        </p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 p-4">
                        <Link
                            href="/admin/papers"
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary ${pathname === '/admin/papers' || pathname === '/admin'
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-foreground'
                                }`}
                        >
                            <FileText className="h-5 w-5" />
                            论文管理
                        </Link>
                        <span
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary opacity-50 cursor-not-allowed"
                            title="即将上线"
                        >
                            <MessageSquare className="h-5 w-5" />
                            论坛（即将上线）
                        </span>
                    </nav>

                    {/* Back to Frontend */}
                    <div className="border-t border-border p-4">
                        <a
                            href="/"
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                            data-testid="back-to-frontend"
                        >
                            <Home className="h-5 w-5" />
                            返回前台
                        </a>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1 overflow-auto">
                <div className="container mx-auto p-8">{children}</div>
            </main>
        </div>
    );
}
