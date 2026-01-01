"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { Menu, X, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Active link style handling could be added here similar to usePathname
  const navLinkClass =
    "text-foreground/80 hover:text-primary transition-colors px-3 py-2 text-base font-amiri font-bold";

  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Section */}
          <div className="shrink-0 flex items-center gap-2">
            <Link href="/" className="flex flex-col items-start bg-transparent">
              <span className="font-bold text-2xl font-amiri text-primary tracking-wide">
                منهج.ai
              </span>
              <span className="text-[0.65rem] text-muted-foreground uppercase tracking-widest hidden sm:block font-noto-naskh">
                حفظ العلم الشرعي الأصيل
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 space-x-reverse">
            <Link href="/" className={navLinkClass}>
              الرئيسية
            </Link>
            <Link href="/scholars" className={navLinkClass}>
              العلماء
            </Link>
            <Link href="/articles" className={navLinkClass}>
              الفتاوى والمقالات
            </Link>
            <Link href="/ai" className={navLinkClass}>
              المستشار الذكي
            </Link>
            {user?.role === "admin" && (
              <Link
                href="/admin"
                className={cn(navLinkClass, "text-amber-600")}>
                الإدارة
              </Link>
            )}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center gap-3 pl-2 border-l border-border/50">
                <div className="text-right hidden lg:block">
                  <p className="text-xs text-muted-foreground">حسابي</p>
                  <p className="text-sm font-medium leading-none">
                    {user.email?.split("@")[0]}
                  </p>
                </div>
                <button
                  onClick={signOut}
                  className="text-xs font-medium text-muted-foreground hover:text-destructive transition-colors">
                  الخروج
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors font-noto-naskh">
                  تسجيل الدخول
                </Link>
                <Link
                  href="/signup"
                  className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-bold hover:bg-primary/90 transition-all shadow-sm font-noto-naskh">
                  حساب جديد
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-primary focus:outline-none">
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-4 pt-4 pb-6 space-y-2 text-right">
            <Link
              href="/"
              className="block px-3 py-3 rounded-md text-base font-medium hover:bg-muted font-noto-naskh">
              الرئيسية
            </Link>
            <Link
              href="/scholars"
              className="block px-3 py-3 rounded-md text-base font-medium hover:bg-muted font-noto-naskh">
              العلماء
            </Link>
            <Link
              href="/articles"
              className="block px-3 py-3 rounded-md text-base font-medium hover:bg-muted font-noto-naskh">
              الفتاوى والمقالات
            </Link>
            <Link
              href="/ai"
              className="block px-3 py-3 rounded-md text-base font-medium hover:bg-muted font-noto-naskh">
              المستشار الذكي
            </Link>
            {user?.role === "admin" && (
              <Link
                href="/admin"
                className="block px-3 py-3 rounded-md text-base font-medium text-amber-600 hover:bg-muted font-noto-naskh">
                لوحة التحكم
              </Link>
            )}
          </div>
          <div className="pt-4 pb-6 border-t border-border px-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground font-noto-naskh">
                المظهر
              </span>
              <ThemeToggle />
            </div>
            {user ? (
              <div className="space-y-3 text-right">
                <div className="flex items-center justify-end px-3">
                  <span className="text-sm font-medium mr-2">{user.email}</span>
                  <UserIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <button
                  onClick={signOut}
                  className="w-full text-right block px-3 py-2 rounded-md text-base font-medium text-destructive hover:bg-destructive/10 font-noto-naskh">
                  تسجيل الخروج
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/login"
                  className="block text-center border border-input px-3 py-2 rounded-md font-medium hover:bg-muted font-noto-naskh">
                  دخول
                </Link>
                <Link
                  href="/signup"
                  className="block text-center bg-primary text-primary-foreground px-3 py-2 rounded-md font-medium hover:bg-primary/90 font-noto-naskh">
                  تسجيل
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
