"use client";

import { useAuth } from "@/components/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Loader2, Mail, Shield, User, Calendar } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function UserProfile() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  const getInitials = (email: string) => {
    return email ? email.substring(0, 2).toUpperCase() : "U";
  };

  return (
    <div className="container max-w-4xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="relative mb-12">
        <div className="h-48 w-full bg-linear-to-r from-primary to-primary/60 rounded-xl shadow-inner relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-size-[16px_16px] opacity-20"></div>
          <div className="absolute -bottom-16 right-8 p-1 bg-background rounded-full">
            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
              <AvatarImage src="" alt={user.email || "User"} />
              <AvatarFallback className="text-4xl bg-primary/10 text-primary font-bold">
                {getInitials(user.email || "")}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="mt-16 mr-8 text-right">
          <h1 className="text-3xl font-bold font-amiri text-foreground">
            {user.email?.split("@")[0]}
          </h1>
          <p className="text-muted-foreground font-noto-naskh">
            عضو في مجتمع منهج
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Info Card */}
        <Card className="md:col-span-2 shadow-sm border-border/60">
          <CardHeader>
            <CardTitle className="font-amiri text-xl text-primary">
              المعلومات الشخصية
            </CardTitle>
            <CardDescription className="font-noto-naskh">
              تفاصيل حسابك الشخصي في المنصة
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-1">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Mail className="w-4 h-4" /> البريد الإلكتروني
              </label>
              <div className="p-3 bg-muted/50 rounded-md font-mono text-sm border border-border/50">
                {user.email}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-1">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Shield className="w-4 h-4" /> نوع الحساب
                </label>
                <div className="p-3 bg-muted/50 rounded-md text-sm border border-border/50 font-noto-naskh">
                  {user.role === "admin" ? "مدير النظام" : "مستخدم عادي"}
                </div>
              </div>
              <div className="grid gap-1">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <User className="w-4 h-4" /> معرف المستخدم
                </label>
                <div className="p-3 bg-muted/50 rounded-md font-mono text-xs border border-border/50 truncate">
                  {user.id}
                </div>
              </div>
            </div>

            <div className="grid gap-1">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" /> آخر تسجيل دخول
              </label>
              <div className="p-3 bg-muted/50 rounded-md text-sm border border-border/50 font-mono">
                {user.last_sign_in_at
                  ? format(new Date(user.last_sign_in_at), "PPP p")
                  : "غير متوفر"}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar / Actions */}
        <div className="space-y-6">
          <Card className="shadow-sm border-border/60">
            <CardHeader>
              <CardTitle className="font-amiri text-xl text-primary">
                إجراءات سريعة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start font-noto-naskh"
                asChild>
                <Link href="/">العودة للرئيسية</Link>
              </Button>
              {user.role === "admin" && (
                <Button
                  className="w-full justify-start bg-amber-600 hover:bg-amber-700 text-white font-noto-naskh"
                  asChild>
                  <Link href="/admin">لوحة التحكم</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
