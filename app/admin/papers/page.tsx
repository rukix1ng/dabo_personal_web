"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, X, Save } from "lucide-react";
import type { Publication } from "@/types/database";

interface PaperFormData {
    title: string;
    authors: string;
    journal: string;
    year: string;
    link: string;
}

export default function PapersManagementPage() {
    const router = useRouter();
    const [papers, setPapers] = useState<Publication[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState<{
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    } | null>(null);
    const [formData, setFormData] = useState<PaperFormData>({
        title: "",
        authors: "",
        journal: "",
        year: "",
        link: "",
    });

    // Fetch papers
    const fetchPapers = async (currentPage: number = 1) => {
        try {
            const res = await fetch(`/api/admin/papers?page=${currentPage}`);
            if (!res.ok) {
                if (res.status === 401) {
                    // 未授权，自动跳转到登录页面
                    router.push("/admin/login");
                    return;
                } else {
                    setError("获取论文失败");
                }
                setPapers([]);
                setPagination(null);
                return;
            }
            const data = await res.json();
            setPapers(data.papers || []);
            setPagination(data.pagination || null);
            setPage(currentPage);
            setError("");
        } catch (error) {
            console.error("获取论文出错:", error);
            setError("获取论文出错");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPapers(1);
    }, []);

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const authorsArray = formData.authors
                .split(",")
                .map((a) => a.trim())
                .filter((a) => a);

            const payload = {
                ...formData,
                authors: authorsArray,
                year: parseInt(formData.year),
            };

            const url = editingId
                ? `/api/admin/papers/${editingId}`
                : "/api/admin/papers";
            const method = editingId ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.status === 401) {
                // 未授权，自动跳转到登录页面
                router.push("/admin/login");
                return;
            }

            if (res.ok) {
                await fetchPapers();
                resetForm();
            }
        } catch (error) {
            console.error("保存论文出错:", error);
        }
    };

    // Handle delete
    const handleDelete = async (id: number) => {
        if (!confirm("确定要删除这篇论文吗？")) return;

        try {
            const res = await fetch(`/api/admin/papers/${id}`, {
                method: "DELETE",
            });

            if (res.status === 401) {
                // 未授权，自动跳转到登录页面
                router.push("/admin/login");
                return;
            }

            if (res.ok) {
                await fetchPapers();
            }
        } catch (error) {
            console.error("删除论文出错:", error);
        }
    };

    // Handle edit
    const handleEdit = (paper: Publication) => {
        setEditingId(paper.id);
        setFormData({
            title: paper.title,
            authors: Array.isArray(paper.authors)
                ? paper.authors.join(", ")
                : typeof paper.authors === "string" && paper.authors.includes("[")
                    ? JSON.parse(paper.authors).join(", ")
                    : paper.authors,
            journal: paper.journal,
            year: paper.year.toString(),
            link: paper.link || "",
        });
        setShowForm(true);
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            title: "",
            authors: "",
            journal: "",
            year: "",
            link: "",
        });
        setEditingId(null);
        setShowForm(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-muted-foreground">加载中...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">论文管理</h1>
                    <p className="mt-2 text-muted-foreground">
                        管理您的研究出版物
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                    <Plus className="h-4 w-4" />
                    添加论文
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                    {error}
                </div>
            )}

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-2xl rounded-xl border border-border bg-card p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-foreground">
                                {editingId ? "编辑论文" : "添加新论文"}
                            </h2>
                            <button
                                onClick={resetForm}
                                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-foreground">
                                    标题 *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-foreground">
                                    作者 * (逗号分隔)
                                </label>
                                <input
                                    type="text"
                                    value={formData.authors}
                                    onChange={(e) =>
                                        setFormData({ ...formData, authors: e.target.value })
                                    }
                                    placeholder="张三, 李四"
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    required
                                />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-foreground">
                                        期刊 *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.journal}
                                        onChange={(e) =>
                                            setFormData({ ...formData, journal: e.target.value })
                                        }
                                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-foreground">
                                        年份 *
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.year}
                                        onChange={(e) =>
                                            setFormData({ ...formData, year: e.target.value })
                                        }
                                        min="1900"
                                        max="2100"
                                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-foreground">
                                    链接 (可选)
                                </label>
                                <input
                                    type="url"
                                    value={formData.link}
                                    onChange={(e) =>
                                        setFormData({ ...formData, link: e.target.value })
                                    }
                                    placeholder="https://..."
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                                >
                                    <Save className="h-4 w-4" />
                                    {editingId ? "更新" : "创建"}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                                >
                                    取消
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Papers Table */}
            <div className="rounded-xl border border-border bg-card">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border bg-muted/50">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                                    标题
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                                    作者
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                                    期刊
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                                    年份
                                </th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {papers.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-6 py-12 text-center text-muted-foreground"
                                    >
                                        未找到论文。点击"添加论文"创建一个。
                                    </td>
                                </tr>
                            ) : (
                                papers.map((paper) => (
                                    <tr
                                        key={paper.id}
                                        className="border-b border-border transition-colors hover:bg-muted/50"
                                    >
                                        <td className="px-6 py-4">
                                            {paper.link ? (
                                                <a
                                                    href={paper.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-medium text-primary hover:underline"
                                                >
                                                    {paper.title}
                                                </a>
                                            ) : (
                                                <div className="font-medium text-foreground">
                                                    {paper.title}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-muted-foreground">
                                                {Array.isArray(paper.authors)
                                                    ? paper.authors.join(", ")
                                                    : typeof paper.authors === "string" &&
                                                        paper.authors.includes("[")
                                                        ? JSON.parse(paper.authors).join(", ")
                                                        : paper.authors}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-muted-foreground">
                                            {paper.journal}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-muted-foreground">
                                            {paper.year}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(paper)}
                                                    className="rounded-lg p-2 text-primary transition-colors hover:bg-primary/10"
                                                    title="编辑"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(paper.id)}
                                                    className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-500/10"
                                                    title="删除"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {pagination && (
                <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
                    <div className="text-sm text-muted-foreground">
                        共 <span className="font-semibold text-foreground">{pagination.total}</span> 篇论文
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => {
                                if (pagination.hasPrevPage) {
                                    fetchPapers(page - 1);
                                }
                            }}
                            disabled={!pagination.hasPrevPage}
                            className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            上一页
                        </button>
                        <div className="flex items-center gap-1">
                            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                                <button
                                    key={pageNum}
                                    onClick={() => fetchPapers(pageNum)}
                                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                                        pageNum === page
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-foreground hover:bg-muted'
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => {
                                if (pagination.hasNextPage) {
                                    fetchPapers(page + 1);
                                }
                            }}
                            disabled={!pagination.hasNextPage}
                            className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            下一页
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
