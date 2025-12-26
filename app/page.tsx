import { scholarsService } from "@/services/scholars";
import { articlesService } from "@/services/articles";
import Link from "next/link";
import { Card } from "@/components/ui/card"; // Accessing standard shadcn-like structure if I had it, or just use div with classes

export const revalidate = 60; // Revalidate every minute

export default async function Home() {
  // Parallel fetch
  const [scholars, articles] = await Promise.all([
    scholarsService.getAllScholars(),
    articlesService.getAllArticles(true), // published only
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12 mb-12 bg-primary/5 rounded-2xl">
        <h1 className="text-4xl md:text-6xl font-bold font-amiri text-primary mb-4">
          Manhaj.ai
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-amiri">
          Preserving the legacy of authentic Islamic knowledge through the words
          of our scholars.
        </p>
      </section>

      {/* Scholars Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold font-amiri text-primary">
            Scholars
          </h2>
          <Link
            href="/scholars"
            className="text-secondary font-medium hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scholars?.slice(0, 4).map((scholar) => (
            <Link href={`/scholars/${scholar.id}`} key={scholar.id}>
              <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col items-center text-center">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-3xl">
                  {/* Placeholder avatar logic */}
                  👳
                </div>
                <h3 className="text-xl font-bold font-amiri mb-2">
                  {scholar.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {scholar.bio || "No biography available"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Articles Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold font-amiri text-primary">
            Latest Articles & Ftawa
          </h2>
          <Link
            href="/articles"
            className="text-secondary font-medium hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles?.slice(0, 6).map((article) => (
            <Link href={`/articles/${article.id}`} key={article.id}>
              <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="flex items-center text-xs text-muted-foreground mb-3 space-x-2">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {article.type || "Article"}
                  </span>
                  <span>
                    {new Date(article.created_at || "").toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-amiri mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {article.body
                    ? article.body.substring(0, 150) + "..."
                    : "Read more..."}
                </p>
                <div className="text-sm font-medium text-primary">
                  By {article.scholars?.name || "Unknown"}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
