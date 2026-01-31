"use client";

import { useState, useEffect } from "react";
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
    const [papers, setPapers] = useState<Publication[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState<PaperFormData>({
        title: "",
        authors: "",
        journal: "",
        year: "",
        link: "",
    });

    // Fetch papers
    const fetchPapers = async () => {
        try {
            const res = await fetch("/api/admin/papers");
            const data = await res.json();
            setPapers(data.papers || []);
        } catch (error) {
            console.error("Error fetching papers:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPapers();
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

            if (res.ok) {
                await fetchPapers();
                resetForm();
            }
        } catch (error) {
            console.error("Error saving paper:", error);
        }
    };

    // Handle delete
    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this paper?")) return;

        try {
            const res = await fetch(`/api/admin/papers/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                await fetchPapers();
            }
        } catch (error) {
            console.error("Error deleting paper:", error);
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
                <div className="text-muted-foreground">Loading...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Papers Management</h1>
                    <p className="mt-2 text-muted-foreground">
                        Manage your research publications
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                    <Plus className="h-4 w-4" />
                    Add Paper
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-2xl rounded-xl border border-border bg-card p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-foreground">
                                {editingId ? "Edit Paper" : "Add New Paper"}
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
                                    Title *
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
                                    Authors * (comma-separated)
                                </label>
                                <input
                                    type="text"
                                    value={formData.authors}
                                    onChange={(e) =>
                                        setFormData({ ...formData, authors: e.target.value })
                                    }
                                    placeholder="John Doe, Jane Smith"
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    required
                                />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-foreground">
                                        Journal *
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
                                        Year *
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
                                    Link (optional)
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
                                    {editingId ? "Update" : "Create"}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                                >
                                    Cancel
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
                                    Title
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                                    Authors
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                                    Journal
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                                    Year
                                </th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                                    Actions
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
                                        No papers found. Click "Add Paper" to create one.
                                    </td>
                                </tr>
                            ) : (
                                papers.map((paper) => (
                                    <tr
                                        key={paper.id}
                                        className="border-b border-border transition-colors hover:bg-muted/50"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-foreground">
                                                {paper.title}
                                            </div>
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
                                                    title="Edit"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(paper.id)}
                                                    className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-500/10"
                                                    title="Delete"
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
        </div>
    );
}
