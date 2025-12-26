"use client";

import { useEffect, useState } from "react";
import { scholarsService, Scholar } from "@/services/scholars";
import Link from "next/link";
import { Plus, Edit, Trash } from "lucide-react";

export default function AdminScholars() {
  const [scholars, setScholars] = useState<Scholar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadScholars();
  }, []);

  const loadScholars = async () => {
    try {
      const data = await scholarsService.getAllScholars();
      setScholars(data || []);
    } catch (error) {
      console.error("Failed to load scholars", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this scholar?")) return;
    try {
      await scholarsService.deleteScholar(id);
      loadScholars();
    } catch (error) {
      alert("Failed to delete scholar");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-amiri text-primary">
          Manage Scholars
        </h1>
        <Link
          href="/admin/scholars/new"
          className="bg-primary text-primary-foreground px-4 py-2 rounded flex items-center hover:bg-primary/90">
          <Plus size={18} className="mr-2" /> Add Scholar
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-muted">
              <tr>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Country</th>
                <th className="p-4 font-medium">Verified</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {scholars.map((scholar) => (
                <tr
                  key={scholar.id}
                  className="border-t border-border hover:bg-muted/50">
                  <td className="p-4 font-medium">{scholar.name}</td>
                  <td className="p-4 text-muted-foreground">
                    {scholar.country || "-"}
                  </td>
                  <td className="p-4">
                    {scholar.verified ? (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        Yes
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                        No
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2 flex justify-end">
                    <Link
                      href={`/admin/scholars/${scholar.id}`}
                      className="inline-block p-2 text-blue-600 hover:bg-blue-50 rounded">
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(scholar.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded">
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {scholars.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="p-8 text-center text-muted-foreground">
                    No scholars found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
