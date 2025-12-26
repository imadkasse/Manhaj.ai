"use client";

import { ScholarForm } from "@/components/admin/ScholarForm";

export default function NewScholarPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-amiri text-primary mb-6">
        Add New Scholar
      </h1>
      <ScholarForm />
    </div>
  );
}
