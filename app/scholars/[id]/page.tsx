import { scholarsService } from "@/services/scholars";
import { articlesService } from "@/services/articles";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

interface Props {
  params: { id: string };
}

export default async function ScholarProfile({ params }: Props) {
  const { id } = await params;

  try {
    const scholar = await scholarsService.getScholarById(id);
    const articles = await articlesService.getArticlesByScholar(id);

    if (!scholar) {
      notFound();
    }

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-card border border-border rounded-lg p-8 shadow-sm mb-8 flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center text-4xl flex-shrink-0">
            👳
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold font-amiri text-primary mb-2">
              {scholar.name}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
              {scholar.country && (
                <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm">
                  📍 {scholar.country}
                </span>
              )}
              {scholar.verified && (
                <span className="bg-secondary/20 text-secondary-foreground px-3 py-1 rounded-full text-sm border border-secondary/50">
                  Verified Scholar
                </span>
              )}
            </div>
            <p className="text-lg text-foreground/80 leading-relaxed max-w-3xl">
              {scholar.bio || "No biography provided."}
            </p>
          </div>
        </div>

        {/* Content Tabs / List */}
        <div>
          <h2 className="text-2xl font-bold font-amiri text-primary mb-6 border-b pb-2">
            Knowledge from {scholar.name}
          </h2>

          <div className="space-y-4">
            {articles && articles.length > 0 ? (
              articles.map((article) => (
                <Link href={`/articles/${article.id}`} key={article.id}>
                  <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center text-xs text-muted-foreground mb-2 space-x-2">
                      <span className="uppercase tracking-wider font-semibold">
                        {article.type}
                      </span>
                      <span>•</span>
                      <span>
                        {new Date(
                          article.created_at || ""
                        ).toLocaleDateString()}
                      </span>
                      {article.topics && (
                        <>
                          <span>•</span>
                          <span className="bg-primary/5 px-2 py-0.5 rounded text-primary">
                            {article.topics.name}
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                    <p className="text-muted-foreground line-clamp-2 text-sm">
                      {article.body}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-muted-foreground italic text-center py-8">
                No articles or ftawa found for this scholar yet.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
