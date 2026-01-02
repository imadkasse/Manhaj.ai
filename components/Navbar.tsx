"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import {
  Menu,
  X,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Active link style handling could be added here similar to usePathname
  const navLinkClass =
    "text-foreground/80 hover:text-primary transition-colors px-3 py-2 text-base font-amiri font-bold";

  const getInitials = (email: string) => {
    return email ? email.substring(0, 2).toUpperCase() : "U";
  };

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
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <DropdownMenu dir="rtl">
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-auto gap-3 rounded-full hover:bg-muted pl-2 pr-4 transition-all">
                    <Avatar className="h-8 w-8 border border-border">
                      <AvatarImage src="" alt={user.email || "User"} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(user.email || "")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden lg:flex flex-col items-start gap-0.5 text-right">
                      <span className="text-sm font-bold font-noto-naskh truncate max-w-[100px]">
                        {user.email?.split("@")[0]}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        مشترك
                      </span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1 text-right">
                      <p className="text-sm font-medium leading-none font-noto-naskh">
                        {user.email?.split("@")[0]}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    asChild
                    className="cursor-pointer justify-end focus:bg-primary/10 focus:text-primary">
                    <Link
                      href="/profile"
                      className="w-full flex items-center justify-end gap-2 font-noto-naskh">
                      <span>الملف الشخصي</span>
                      <UserIcon className="mr-2 h-4 w-4" />
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === "admin" && (
                    <DropdownMenuItem
                      asChild
                      className="cursor-pointer justify-end focus:bg-amber-50 focus:text-amber-600">
                      <Link
                        href="/admin"
                        className="w-full flex items-center justify-end gap-2 font-noto-naskh text-amber-600">
                        <span>لوحة التحكم</span>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="cursor-pointer justify-end focus:bg-muted font-noto-naskh">
                    <span className="ml-auto">الإعدادات</span>
                    <Settings className="ml-2 h-4 w-4" />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={signOut}
                    className="cursor-pointer justify-end text-destructive focus:bg-destructive/10 focus:text-destructive font-noto-naskh">
                    <span className="ml-auto">تسجيل الخروج</span>
                    <LogOut className="ml-2 h-4 w-4" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                <div className="flex items-center justify-end px-3 gap-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {user.email?.split("@")[0]}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarImage src="" alt={user.email || "User"} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(user.email || "")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <Link
                  href="/profile"
                  className="w-full text-right flex items-center justify-end gap-2 px-3 py-2 rounded-md text-base font-medium hover:bg-muted font-noto-naskh">
                  <span>الملف الشخصي</span>
                  <UserIcon className="h-4 w-4" />
                </Link>
                <Link
                  href="/profile"
                  className="w-full text-right flex items-center justify-end gap-2 px-3 py-2 rounded-md text-base font-medium hover:bg-muted font-noto-naskh">
                  <span>الإعدادات</span>
                  <Settings className="h-4 w-4" />
                </Link>
                <button
                  onClick={signOut}
                  className="w-full text-right flex items-center justify-end gap-2 px-3 py-2 rounded-md text-base font-medium text-destructive hover:bg-destructive/10 font-noto-naskh">
                  <span>تسجيل الخروج</span>
                  <LogOut className="h-4 w-4" />
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
