import { scholarsService } from "@/services/scholars";
import { ScholarCard } from "@/components/scholars/ScholarCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const revalidate = 60; // ISR

export default async function ScholarsPage() {
  const scholars = await scholarsService.getAllScholars();

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-start gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold font-amiri text-primary mb-3">
              علماء السنة
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl font-noto-naskh">
              تصفح سير ومؤلفات العلماء الراسخين.
            </p>
          </div>

          <div className="w-full max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="ابحث عن عالم..."
              className="pl-10 text-right dir-rtl font-noto-naskh"
              dir="rtl"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {scholars && scholars.length > 0 ? (
            scholars.map((scholar) => (
              <ScholarCard
                key={scholar.id}
                id={scholar.id}
                name={scholar.name}
                bio={scholar.bio || undefined}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground py-10 font-noto-naskh">
              لم يتم العثور على علماء.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
