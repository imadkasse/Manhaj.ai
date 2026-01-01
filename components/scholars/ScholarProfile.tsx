"use client";

import Link from "next/link";
import { Scholar } from "@/services/scholars";
import { Article } from "@/services/articles";
import { Globe, BookOpen, Quote } from "lucide-react";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { Button } from "@/components/ui/button";
import { Badge } from "lucide-react";

// ... imports

interface ScholarProfileProps {
  scholar: Scholar;
  articles: Article[];
}

export function ScholarProfile({ scholar, articles }: ScholarProfileProps) {
  // Get first two letters for avatar
  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase();
  };

  return (

    <div className="min-h-screen bg-background text-right" dir="rtl">
      {/* Profile Header */}
      <div className="bg-primary/5 border-b border-border/60 py-16">
        <div className="container mx-auto  px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative">
              <div className="h-40 w-40 rounded-full bg-white shadow-xl flex items-center justify-center text-5xl font-bold font-amiri text-primary shrink-0 border-4 border-white overflow-hidden">
                {getInitials(scholar.name)}
              </div>
              {scholar.verified && (
                <div
                  className="absolute bottom-1 right-1 bg-secondary text-primary-foreground p-2 rounded-full border-2 border-white shadow-sm"
                  title="عالم موثق">
                  <Badge className="h-5 w-5 fill-current" />
                </div>
              )}
            </div>

            <div className="text-center md:text-right flex-1">
              <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 font-noto-naskh">
                عالم من علماء السنة
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-amiri text-primary mb-4 leading-tight">
                {scholar.name}
              </h1>

              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6 text-muted-foreground font-noto-naskh">
                {scholar.country && (
                  <span className="flex items-center gap-1">
                    📍 {scholar.country}
                  </span>
                )}
                {articles.length > 0 && (
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" /> {articles.length} فتوى
                    ومقال
                  </span>
                )}
              </div>

              <p className="text-lg text-foreground/80 leading-relaxed max-w-3xl mx-auto md:mx-0 font-noto-naskh">
                {scholar.bio ||
                  "عالم جليل، معروف بتمسكه بالكتاب والسنة ونشر العلم الشرعي."}
              </p>

              {scholar.web_urls && scholar.web_urls.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
                  {scholar.web_urls.map((url, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      asChild
                      className="rounded-full font-noto-naskh">
                      <a href={url} target="_blank" rel="noreferrer">
                        <Globe className="ml-2 h-4 w-4" />
                        {new URL(url).hostname}
                      </a>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="flex items-center gap-3 mb-8">
          <Quote className="h-8 w-8 text-secondary/40" />
          <h2 className="text-3xl font-bold font-amiri text-primary">
            العلم والفتاوى
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles && articles.length > 0 ? (
            articles.map((article) => (
              <ArticleCard
                key={article.id}
                id={article.id}
                title={article.title}
                category={article.type || "فتوى"}
                date={new Date(article.created_at || "").toLocaleDateString(
                  "ar-EG"
                )}
                scholarName={scholar.name} // Pass scholar name if needed in card
                excerpt={
                  article.body ? article.body.substring(0, 150) + "..." : ""
                }
              />
            ))
          ) : (
            <div className="col-span-full py-16 text-center bg-muted/30 rounded-lg border border-dashed border-border">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground font-amiri text-xl">
                لا توجد فتاوى أو مقالات لهذا العالم بعد.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
