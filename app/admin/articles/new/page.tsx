"use client";

import { ArticleForm } from "@/components/admin/ArticleForm";

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-amiri text-primary mb-6">
        Add New Content
      </h1>
      <ArticleForm />
    </div>
  );
}
