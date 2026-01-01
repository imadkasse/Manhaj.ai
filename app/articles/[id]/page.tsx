import { articlesService } from "@/services/articles";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Share2, Printer, Bookmark } from "lucide-react";

export const revalidate = 60;

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;

  try {
    const article = await articlesService.getArticleById(id);

    if (!article) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-background" dir="rtl">
        {" "}
        {/* Explicitly enforcing the warm paper bg here for reading mode */}
        <div className="container max-w-4xl mx-auto px-4 py-12 md:py-16">
          <div className="mb-8">
            <Link href="/articles">
              <Button
                variant="ghost"
                className="pr-0 hover:pr-2 transition-all text-muted-foreground hover:text-primary font-noto-naskh">
                <ArrowRight className="ml-2 h-4 w-4 rotate-180" /> العودة
                للفتاوى
              </Button>
            </Link>
          </div>

          <article className="bg-white rounded-xl shadow-sm border border-border/40 overflow-hidden text-right">
            {/* Header */}
            <header className="bg-primary/5 p-8 md:p-12 border-b border-border/60">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-secondary/20 text-secondary-foreground px-3 py-1 rounded-md text-sm font-bold uppercase tracking-wider font-noto-naskh">
                  {article.type || "فتوى"}
                </span>
                {article.topics && (
                  <span className="bg-background text-muted-foreground border border-border px-3 py-1 rounded-md text-sm font-noto-naskh">
                    {article.topics.name}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-5xl font-bold font-amiri text-primary leading-tight mb-6">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-border/40">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {article.scholars?.name?.charAt(0) || "ع"}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold font-noto-naskh">
                      العالم
                    </p>
                    <Link
                      href={`/scholars/${article.scholar_id}`}
                      className="font-bold text-foreground hover:text-secondary transition-colors font-amiri">
                      {article.scholars?.name || "عالم غير معروف"}
                    </Link>
                  </div>
                </div>

                <div className="text-left">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold font-noto-naskh">
                    تاريخ النشر
                  </p>
                  <time className="font-medium font-noto-naskh">
                    {new Date(article.created_at || "").toLocaleDateString(
                      "ar-EG"
                    )}
                  </time>
                </div>
              </div>
            </header>

            {/* Functional Toolbar */}
            <div className="flex items-center justify-end px-8 py-4 bg-muted/20 border-b border-border/40 gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary font-noto-naskh">
                <Share2 className="h-4 w-4 ml-2" /> مشاركة
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary font-noto-naskh">
                <Printer className="h-4 w-4 ml-2" /> طباعة
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary font-noto-naskh">
                <Bookmark className="h-4 w-4 ml-2" /> حفظ
              </Button>
            </div>

            {/* Content Body */}
            <div className="p-8 md:p-12">
              <div className="prose prose-lg md:prose-xl max-w-none font-noto-naskh leading-loose text-gray-800 dir-rtl text-right">
                {/* Simulating rich text structure */}
                <div className="whitespace-pre-wrap">{article.body}</div>
              </div>

              {/* Reference Section (if applicable) */}
              <div className="mt-12 pt-8 border-t border-border/40">
                <h3 className="text-lg font-bold font-amiri text-primary mb-2">
                  المصادر والمراجع
                </h3>
                <p className="text-muted-foreground text-sm italic font-noto-naskh">
                  هذا المحتوى مأخوذ من مصادر موثوقة. يرجى مراجعة الكتب الأصلية
                  للتحقق.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
