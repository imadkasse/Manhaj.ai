"use client";

import { ArticleForm } from "@/components/admin/ArticleForm";
import { articlesService } from "@/services/articles";
import { useEffect, useState, use } from "react";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditArticlePage({ params }: Props) {
  const { id } = use(params);
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await articlesService.getArticleById(id);
        if (data) {
          setArticle(data);
        } else {
          notFound();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!article) return <div>Article not found</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold font-amiri text-primary mb-6">
        Edit Content
      </h1>
      <ArticleForm initialData={article} isEdit={true} />
    </div>
  );
}
