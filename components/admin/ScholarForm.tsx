"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { scholarsService, CreateScholarDTO } from "@/services/scholars";
import { useState } from "react";
import { cn } from "@/lib/utils";

const scholarSchema = z.object({
  name: z.string().min(2, "Name is required"),
  bio: z.string().optional(),
  country: z.string().optional(),
  verified: z.boolean().optional(),
  web_urls: z.string().optional(), // We'll handle comma separation
});

type ScholarFormData = z.infer<typeof scholarSchema>;

interface Props {
  initialData?: any;
  isEdit?: boolean;
}

export function ScholarForm({ initialData, isEdit = false }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ScholarFormData>({
    resolver: zodResolver(scholarSchema),
    defaultValues: {
      name: initialData?.name || "",
      bio: initialData?.bio || "",
      country: initialData?.country || "",
      verified: initialData?.verified || false,
      web_urls: initialData?.web_urls ? initialData.web_urls.join(", ") : "",
    },
  });

  const onSubmit = async (data: ScholarFormData) => {
    setLoading(true);
    setError(null);
    try {
      const payload: any = {
        name: data.name,
        bio: data.bio || null,
        country: data.country || null,
        verified: data.verified || false,
        web_urls: data.web_urls
          ? data.web_urls
              .split(",")
              .map((url) => url.trim())
              .filter(Boolean)
          : [],
      };

      if (isEdit && initialData?.id) {
        await scholarsService.updateScholar(initialData.id, payload);
      } else {
        await scholarsService.createScholar(payload);
      }

      router.push("/admin/scholars");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to save scholar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl bg-card p-6 rounded-lg border border-border">
      {error && (
        <div className="bg-destructive/10 text-destructive p-3 rounded text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          {...register("name")}
          className={cn(
            "w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none",
            errors.name ? "border-destructive" : "border-input"
          )}
          placeholder="Scholar Name"
        />
        {errors.name && (
          <p className="text-destructive text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Bio</label>
        <textarea
          {...register("bio")}
          rows={4}
          className="w-full p-2 border border-input rounded focus:ring-2 focus:ring-primary focus:outline-none"
          placeholder="Biography..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <input
            {...register("country")}
            className="w-full p-2 border border-input rounded focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="e.g. Saudi Arabia"
          />
        </div>

        <div className="flex items-center mt-6">
          <input
            type="checkbox"
            id="verified"
            {...register("verified")}
            className="h-4 w-4 text-primary focus:ring-primary border-input rounded"
          />
          <label htmlFor="verified" className="ml-2 block text-sm font-medium">
            Verified Scholar
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Web URLs (comma separated)
        </label>
        <input
          {...register("web_urls")}
          className="w-full p-2 border border-input rounded focus:ring-2 focus:ring-primary focus:outline-none"
          placeholder="https://example.com, https://twitter.com/..."
        />
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
          {loading ? "Saving..." : isEdit ? "Update Scholar" : "Create Scholar"}
        </button>
      </div>
    </form>
  );
}
