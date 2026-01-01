"use client";

import { useEffect, useState } from "react";
import { articlesService, Article } from "@/services/articles";
import Link from "next/link";
import { Plus, Edit, Trash, CheckCircle, XCircle } from "lucide-react";

export default function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const data = await articlesService.getAllArticles(); // fetch all including unpublished
      setArticles(data || []);
    } catch (error) {
      console.error("Failed to load articles", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      await articlesService.deleteArticle(id);
      loadArticles();
    } catch (error) {
      alert("Failed to delete article");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-amiri text-primary">
          Manage Articles & Ftawa
        </h1>
        <Link
          href="/admin/articles/new"
          className="bg-primary text-primary-foreground px-4 py-2 rounded flex items-center hover:bg-primary/90">
          <Plus size={18} className="mr-2" /> Add Content
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-muted">
              <tr>
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Scholar</th>
                <th className="p-4 font-medium">Published</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr
                  key={article.id}
                  className="border-t border-border hover:bg-muted/50">
                  <td className="p-4 font-medium">{article.title}</td>
                  <td className="p-4 text-xs uppercase text-muted-foreground">
                    {article.type || "Article"}
                  </td>
                  <td className="p-4 text-sm">
                    {article.scholars?.name || "-"}
                  </td>
                  <td className="p-4">
                    {article.published ? (
                      <CheckCircle size={18} className="text-green-600" />
                    ) : (
                      <XCircle size={18} className="text-gray-400" />
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Link
                      href={`/admin/articles/${article.id}`}
                      className="inline-block p-2 text-blue-600 hover:bg-blue-50 rounded">
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded">
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {articles.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center text-muted-foreground">
                    No content found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
