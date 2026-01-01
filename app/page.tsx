import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, BookOpen, Quote } from "lucide-react";
import Link from "next/link";
import { ScholarCard } from "@/components/scholars/ScholarCard";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { articlesService } from "@/services/articles";
import { scholarsService } from "@/services/scholars";

export const revalidate = 60;

export default async function Home() {
  const latestArticles = await articlesService.getAllArticles();
  const scholars = await scholarsService.getAllScholars();
  const featuredScholars = scholars?.slice(0, 4) || [];
  const recentContent = latestArticles?.slice(0, 3) || [];

  return (
    <div className="">
      <div className=" mb-12">
        {/* Hero Section */}
        <div className="bg-primary/5 border-b border-border/60">
          <section className="container mx-auto  relative w-full py-24 md:py-32  overflow-hidden">
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 pointer-events-none" />{" "}
            {/* Placeholder for subtle islamic pattern */}
            <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
              <div className="inline-block rounded-full bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary mb-6 border border-secondary/20 font-noto-naskh">
                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-amiri tracking-tight text-primary mb-6 drop-shadow-sm">
                نحفظ الموروث العلمي الأصيل <br className="hidden md:block" />
                <span className="text-foreground">للعلم الشرعي</span>
              </h1>
              <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl/relaxed lg:text-2xl/relaxed mb-8 leading-relaxed font-noto-naskh">
                تواصل مع تراث السلف الصالح عبر فتاوى ومقالات أصيلة وتوجيهات
                العلماء الراسخين.
              </p>

              <div className="w-full max-w-lg relative mb-10">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    className="pl-10 py-6 text-lg bg-background shadow-md border-primary/10 focus-visible:ring-primary/30 rounded-full font-noto-naskh text-right dir-rtl"
                    placeholder="ابحث عن فتوى، موضوع، أو عالم..."
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/articles">
                  <Button
                    size="lg"
                    className="rounded-full px-8 text-base font-bold shadow-lg shadow-primary/20 font-noto-naskh">
                    تصفح الفتاوى
                  </Button>
                </Link>
                <Link href="/scholars">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 text-base border-primary/20 hover:bg-primary/5 hover:text-primary font-noto-naskh">
                    استكشف العلماء
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* Featured Section */}
        <section className="container mx-auto py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row-reverse items-center justify-between mb-12">
              <div className="text-right w-full md:w-auto">
                <h2 className="text-3xl font-bold tracking-tight font-amiri text-primary">
                  أحدث الفتاوى والمقالات
                </h2>
                <p className="text-muted-foreground mt-2 font-noto-naskh">
                  توجيهات نشرت حديثاً من أهل العلم.
                </p>
              </div>
              <Link
                href="/articles"
                className="group flex items-center gap-1 text-primary font-medium hover:text-primary/80 mt-4 md:mt-0 transition-colors font-noto-naskh">
                عرض الكل{" "}
                <ArrowRight className="h-4 w-4 group-hover:-translate-x-1 transition-transform rotate-180" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentContent.length > 0 ? (
                recentContent.map((article) => (
                  <ArticleCard
                    key={article.id}
                    id={article.id}
                    title={article.title}
                    scholarName={article.scholars?.name}
                    date={new Date(article.created_at || "").toLocaleDateString(
                      "ar-EG"
                    )}
                    category={article.type || "فتوى"}
                    excerpt={
                      article.body ? article.body.substring(0, 150) + "..." : ""
                    }
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-10 bg-muted/20 rounded-lg">
                  <p className="text-muted-foreground font-noto-naskh">
                    لا توجد مقالات حديثة.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Scholars Highlight */}
        <div className="bg-muted/30 border-t border-border/60">
          <section className="container mx-auto py-16 md:py-24 ">
            <div className="container px-4 md:px-6">
              <div className="flex items-center justify-center mb-12 text-center">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight font-amiri text-primary">
                    علماء السنة
                  </h2>
                  <p className="text-muted-foreground mt-2 max-w-[600px] mx-auto font-noto-naskh">
                    الوصول إلى ميراث كبار علماء السنة.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {featuredScholars.length > 0 ? (
                  featuredScholars.map((scholar) => (
                    <ScholarCard
                      key={scholar.id}
                      id={scholar.id}
                      name={scholar.name}
                      role="عالم"
                      bio={scholar.bio || undefined}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-muted-foreground font-noto-naskh">
                      لم يتم إضافة علماء مميزين بعد.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-12 text-center">
                <Link href="/scholars">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full border-primary/20 text-primary hover:bg-primary/5 font-noto-naskh">
                    عرض جميع العلماء
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* Quote/CTA Section */}
        <div className="bg-primary text-primary-foreground">
          <section className="py-20 container mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />
            <div className="container px-4 text-center relative z-10">
              <Quote className="h-12 w-12 mx-auto mb-6 text-secondary opacity-80" />
              <blockquote className="text-2xl md:text-4xl font-amiri leading-relaxed max-w-4xl mx-auto mb-8">
                "إن هذا العلم دين، فانظروا عمن تأخذون دينكم."
              </blockquote>
              <cite className="not-italic text-lg opacity-80 font-medium block mb-10 font-noto-naskh">
                — محمد بن سيرين
              </cite>

              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-secondary text-primary hover:bg-secondary/90 font-bold px-10 rounded-full shadow-2xl font-noto-naskh">
                  ابدأ التعلم
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
