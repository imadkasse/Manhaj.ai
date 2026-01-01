import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, User } from "lucide-react";

interface ArticleCardProps {
  id: string;
  title: string;
  scholarName?: string;
  date?: string;
  excerpt?: string;
  category?: string;
}

export function ArticleCard({
  id,
  title,
  scholarName,
  date,
  excerpt,
  category,
}: ArticleCardProps) {
  return (
    <Link href={`/articles/${id}`}>
      <Card className="h-full hover:border-primary/40 transition-colors group">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
              {category || "فتوى"}
            </span>
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-3">
          <CardDescription className="line-clamp-3">{excerpt}</CardDescription>
        </CardContent>
        <CardFooter className="pt- flex items-center justify-between text-xs text-muted-foreground border-t border-border/40 mt-auto pt-3 mx-6 px-0 pb-4">
          {scholarName && (
            <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <User className="h-3 w-3" />
              <span className="font-medium">{scholarName}</span>
            </div>
          )}
          {date && (
            <div className="flex items-center gap-1.5 opacity-80">
              <Calendar className="h-3 w-3" />
              <span>{date}</span>
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
