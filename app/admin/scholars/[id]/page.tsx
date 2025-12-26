"use client";

import { ScholarForm } from "@/components/admin/ScholarForm";
import { scholarsService } from "@/services/scholars";
import { useEffect, useState, use } from "react";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditScholarPage({ params }: Props) {
  const { id } = use(params);
  const [scholar, setScholar] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScholar = async () => {
      try {
        const data = await scholarsService.getScholarById(id);
        if (data) {
          setScholar(data);
        } else {
          notFound();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchScholar();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!scholar) return <div>Scholar not found</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold font-amiri text-primary mb-6">
        Edit Scholar
      </h1>
      <ScholarForm initialData={scholar} isEdit={true} />
    </div>
  );
}
