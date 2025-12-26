import { articlesService } from "@/services/articles";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

interface Props {
  params: { id: string };
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;

  try {
    const article = await articlesService.getArticleById(id);

    if (!article) {
      notFound();
    }

    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link
          href={`/scholars/${article.scholar_id}`}
          className="inline-flex items-center text-sm text-secondary hover:underline mb-6">
          ← Back to Scholar
        </Link>

        <article className="bg-card border border-border rounded-lg p-8 shadow-sm">
          <header className="mb-8 border-b pb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-medium uppercase tracking-wide">
                {article.type || "Article"}
              </span>
              {article.topics && (
                <span className="bg-muted text-muted-foreground px-3 py-1 rounded text-sm">
                  {article.topics.name}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold font-amiri leading-tight mb-4 text-primary">
              {article.title}
            </h1>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>By</span>
                <Link
                  href={`/scholars/${article.scholar_id}`}
                  className="font-bold text-foreground hover:text-secondary">
                  {article.scholars?.name || "Unknown Scholar"}
                </Link>
              </div>
              <time dateTime={article.created_at || ""}>
                {new Date(article.created_at || "").toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </time>
            </div>
          </header>

          <div className="prose prose-lg prose-headings:font-amiri prose-p:font-noto-naskh max-w-none text-foreground/90">
            {/* 
                In a real app, we might use a markdown renderer here. 
                For now, simple whitespace preservation.
             */}
            <div className="whitespace-pre-wrap leading-relaxed">
              {article.body}
            </div>
          </div>
        </article>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
