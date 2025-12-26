"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { articlesService } from "@/services/articles";
import { scholarsService } from "@/services/scholars";
import { topicsService } from "@/services/topics";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const articleSchema = z.object({
  title: z.string().min(5, "Title is required"),
  body: z.string().min(20, "Content must be at least 20 chars"),
  type: z.enum(["article", "fatwa"]),
  scholar_id: z.string().min(1, "Scholar is required"),
  topic_id: z.string().optional(),
  published: z.boolean().optional(),
  published_at: z.string().optional(),
});

type ArticleFormData = z.infer<typeof articleSchema>;

interface Props {
  initialData?: any;
  isEdit?: boolean;
}

export function ArticleForm({ initialData, isEdit = false }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [scholars, setScholars] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);

  useEffect(() => {
    scholarsService.getAllScholars().then(setScholars).catch(console.error);
    topicsService.getAllTopics().then(setTopics).catch(console.error);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: initialData?.title || "",
      body: initialData?.body || "",
      type: initialData?.type || "article",
      scholar_id: initialData?.scholar_id || "",
      topic_id: initialData?.topic_id || "",
      published: initialData?.published || false,
      published_at: initialData?.published_at
        ? new Date(initialData.published_at).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = async (data: ArticleFormData) => {
    setLoading(true);
    setError(null);
    try {
      const payload: any = {
        title: data.title,
        body: data.body,
        type: data.type,
        scholar_id: data.scholar_id,
        topic_id: data.topic_id || null,
        published: data.published || false,
        published_at: data.published
          ? data.published_at || new Date().toISOString()
          : null,
        slug: data.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, ""),
      };

      if (isEdit && initialData?.id) {
        await articlesService.updateArticle(initialData.id, payload);
      } else {
        await articlesService.createArticle(payload);
      }

      router.push("/admin/articles");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to save article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-4xl bg-card p-6 rounded-lg border border-border">
      {error && (
        <div className="bg-destructive/10 text-destructive p-3 rounded text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            {...register("title")}
            className={cn(
              "w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none",
              errors.title ? "border-destructive" : "border-input"
            )}
            placeholder="Article Title"
          />
          {errors.title && (
            <p className="text-destructive text-xs mt-1">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            {...register("type")}
            className="w-full p-2 border border-input rounded focus:ring-2 focus:ring-primary focus:outline-none">
            <option value="article">Article</option>
            <option value="fatwa">Fatwa</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Scholar</label>
          <select
            {...register("scholar_id")}
            className={cn(
              "w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none",
              errors.scholar_id ? "border-destructive" : "border-input"
            )}>
            <option value="">Select Scholar...</option>
            {scholars.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          {errors.scholar_id && (
            <p className="text-destructive text-xs mt-1">
              {errors.scholar_id.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Topic</label>
          <select
            {...register("topic_id")}
            className="w-full p-2 border border-input rounded focus:ring-2 focus:ring-primary focus:outline-none">
            <option value="">Select Topic...</option>
            {topics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Publish Date</label>
          <input
            type="date"
            {...register("published_at")}
            className="w-full p-2 border border-input rounded focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Content</label>
        <textarea
          {...register("body")}
          rows={12}
          className={cn(
            "w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none font-noto-naskh text-lg",
            errors.body ? "border-destructive" : "border-input"
          )}
          placeholder="Write the content here..."
        />
        {errors.body && (
          <p className="text-destructive text-xs mt-1">{errors.body.message}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="published"
          {...register("published")}
          className="h-4 w-4 text-primary focus:ring-primary border-input rounded"
        />
        <label htmlFor="published" className="ml-2 block text-sm font-medium">
          Publish immediately
        </label>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-input rounded hover:bg-muted">
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50">
          {loading ? "Saving..." : isEdit ? "Update Content" : "Create Content"}
        </button>
      </div>
    </form>
  );
}
