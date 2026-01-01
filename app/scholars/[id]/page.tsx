import { scholarsService } from "@/services/scholars";
import { articlesService } from "@/services/articles";
import { notFound } from "next/navigation";
import { ScholarProfile } from "@/components/scholars/ScholarProfile";

export const revalidate = 60;

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ScholarProfilePage({ params }: Props) {
  const { id } = await params;

  try {
    const scholar = await scholarsService.getScholarById(id);
    const articles = await articlesService.getArticlesByScholar(id);

    if (!scholar) {
      notFound();
    }

    return <ScholarProfile scholar={scholar} articles={articles || []} />;
  } catch (error) {
    notFound();
  }
}
