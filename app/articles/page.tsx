import { articlesService } from "@/services/articles";
import Link from "next/link";

export const revalidate = 60;

export default async function ArticlesPage() {
  const articles = await articlesService.getAllArticles(true);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold font-amiri text-primary mb-8 text-center">
        Knowledge & Ftawa
      </h1>

      <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
        {articles?.map((article) => (
          <Link href={`/articles/${article.id}`} key={article.id}>
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center text-xs text-muted-foreground mb-3 space-x-2">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full uppercase tracking-wide font-medium">
                    {article.type || "Article"}
                  </span>
                  <span>•</span>
                  <span>
                    {new Date(article.created_at || "").toLocaleDateString()}
                  </span>
                  {article.topics && (
                    <>
                      <span>•</span>
                      <span className="text-secondary">
                        {article.topics.name}
                      </span>
                    </>
                  )}
                </div>
                <h2 className="text-2xl font-bold font-amiri mb-2 text-foreground group-hover:text-primary transition-colors">
                  {article.title}
                </h2>
                <p className="text-muted-foreground line-clamp-2 mb-4">
                  {article.body
                    ? article.body.substring(0, 200) + "..."
                    : "Read more..."}
                </p>
                <div className="flex items-center text-sm font-medium text-primary">
                  <span className="text-muted-foreground mr-1">By</span>{" "}
                  {article.scholars?.name || "Unknown"}
                </div>
              </div>
            </div>
          </Link>
        ))}
        {articles?.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No articles found.
          </p>
        )}
      </div>
    </div>
  );
}
