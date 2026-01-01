import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "lucide-react"; // Using this as placeholder if needed, but better to build custom badge
import Image from "next/image";
import Link from "next/link";

interface ScholarCardProps {
  id: string;
  name: string;
  image_url?: string;
  bio?: string;
  role?: string;
}

export function ScholarCard({
  id,
  name,
  bio,
  role,
}: Omit<ScholarCardProps, "image_url">) {
  return (
    <Link href={`/scholars/${id}`}>
      <Card className="h-full overflow-hidden hover:border-primary/50 group transition-all duration-300 hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative w-full aspect-[4/5] bg-muted overflow-hidden">
            <div className="w-full h-full flex items-center justify-center bg-secondary/10 text-secondary">
              <span className="font-amiri text-6xl opacity-20">ع</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            <div className="absolute bottom-4 right-4 text-white text-right">
              <p className="text-xs font-semibold uppercase tracking-wider opacity-90">
                {role || "عالم"}
              </p>
              <h3 className="font-amiri text-2xl font-bold mt-1 text-white leading-tight shadow-sm drop-shadow-md">
                {name}
              </h3>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4 text-right">
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed font-noto-naskh">
            {bio || "عالم جليل معروف بتمسكه بالكتاب والسنة."}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
