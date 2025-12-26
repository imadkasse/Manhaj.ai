"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, FileText, BookOpen, LayoutDashboard } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (user.role !== "admin") {
        router.push("/");
      } else {
        setAuthorized(true);
      }
    }
  }, [user, loading, router]);

  if (loading || !authorized) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading Admin Panel...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold font-amiri text-primary">
            Admin Panel
          </h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link
            href="/admin"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted text-foreground/80 hover:text-primary transition-colors">
            <LayoutDashboard size={20} />
            <span className="font-medium">Overview</span>
          </Link>
          <Link
            href="/admin/scholars"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted text-foreground/80 hover:text-primary transition-colors">
            <Users size={20} />
            <span className="font-medium">Scholars</span>
          </Link>
          <Link
            href="/admin/articles"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted text-foreground/80 hover:text-primary transition-colors">
            <FileText size={20} />
            <span className="font-medium">Articles & Ftawa</span>
          </Link>
          <Link
            href="/admin/topics"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted text-foreground/80 hover:text-primary transition-colors">
            <BookOpen size={20} />
            <span className="font-medium">Topics</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
