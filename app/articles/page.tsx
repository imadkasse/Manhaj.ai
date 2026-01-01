import { articlesService } from "@/services/articles";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

import { topicsService } from "@/services/topics";

export const revalidate = 60;

export default async function ArticlesPage() {
  const articles = await articlesService.getAllArticles();
  const topics = await topicsService.getAllTopics();

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold font-amiri text-primary">
              الفتاوى والمقالات
            </h1>
            <p className="text-muted-foreground mt-1 font-noto-naskh">
              علم شرعي مؤصل في مختلف الأبواب.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative grow md:grow-0 md:min-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ابحث في المواضيع..."
                className="pl-10 h-10 text-right dir-rtl font-noto-naskh"
                dir="rtl"
              />
            </div>
            <Button variant="outline" size="icon" className="shrink-0">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-6 mb-2 no-scrollbar">
          <Button
            variant="default"
            size="sm"
            className="rounded-full px-4 text-sm whitespace-nowrap font-noto-naskh">
            الكل
          </Button>
          {topics?.map((topic) => (
            <Button
              key={topic.id}
              variant="outline"
              size="sm"
              className="rounded-full px-4 text-sm whitespace-nowrap font-noto-naskh">
              {topic.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles && articles.length > 0 ? (
            articles.map((article) => (
              <ArticleCard
                key={article.id}
                id={article.id}
                title={article.title}
                category={article.type || "فتوى"}
                scholarName={article.scholars?.name}
                date={new Date(article.created_at || "").toLocaleDateString(
                  "ar-EG"
                )}
                excerpt={
                  article.body ? article.body.substring(0, 150) + "..." : ""
                }
              />
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground py-10 font-noto-naskh">
              لا توجد مقالات.
            </p>
          )}
        </div>

        <div className="mt-16 flex justify-center">
          <Button
            variant="outline"
            size="lg"
            className="min-w-[200px] font-noto-naskh">
            عرض المزيد
          </Button>
        </div>
      </div>
    </div>
  );
}
