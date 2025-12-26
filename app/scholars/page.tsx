import { scholarsService } from "@/services/scholars";
import Link from "next/link";

export const revalidate = 60;

export default async function ScholarsPage() {
  const scholars = await scholarsService.getAllScholars();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold font-amiri text-primary mb-8 text-center">
        Honored Scholars
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {scholars?.map((scholar) => (
          <Link href={`/scholars/${scholar.id}`} key={scholar.id}>
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col items-center text-center group">
              <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-4xl group-hover:bg-secondary/20 transition-colors">
                👳
              </div>
              <h2 className="text-2xl font-bold font-amiri mb-2 text-primary">
                {scholar.name}
              </h2>
              {scholar.country && (
                <span className="text-sm text-secondary font-medium mb-2 block">
                  {scholar.country}
                </span>
              )}
              <p className="text-sm text-muted-foreground line-clamp-3">
                {scholar.bio || "No biography available"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
