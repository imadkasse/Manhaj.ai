"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth";
import Link from "next/link";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

// Google Icon Component
const GoogleIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError(null);

    try {
      const {
        data: { user },
        error: authError,
      } = await authService.signIn(data.email, data.password);

      if (authError) {
        setError(authError.message);
        return;
      }

      if (user) {
        // Fetch role to redirect properly
        const role = await authService.getUserRole(user.id);
        if (role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError(null);

    try {
      const { error: authError } = await authService.signInWithGoogle();
      if (authError) {
        setError(authError.message);
        setGoogleLoading(false);
      }
      // If successful, user will be redirected by OAuth flow
    } catch (err: any) {
      setError(err.message || "An error occurred during Google sign in");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="p-8 bg-card/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-border/50">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-amiri mb-2 bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            تسجيل الدخول
          </h1>
          <p className="text-sm text-muted-foreground">
            مرحباً بعودتك إلى منهج
          </p>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-lg mb-6 text-sm border border-destructive/20">
            {error}
          </div>
        )}

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={googleLoading || loading}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg border-2 border-gray-200 transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed mb-6">
          <GoogleIcon />
          <span>
            {googleLoading ? "جاري التحميل..." : "تسجيل الدخول بواسطة Google"}
          </span>
        </button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-card text-muted-foreground">أو</span>
          </div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              البريد الإلكتروني
            </label>
            <input
              {...register("email")}
              className={cn(
                "w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all bg-background/50",
                errors.email
                  ? "border-destructive"
                  : "border-input hover:border-primary/30"
              )}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-destructive text-xs mt-1.5 flex items-center gap-1">
                <span>⚠</span>
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              كلمة المرور
            </label>
            <input
              type="password"
              {...register("password")}
              className={cn(
                "w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all bg-background/50",
                errors.password
                  ? "border-destructive"
                  : "border-input hover:border-primary/30"
              )}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-destructive text-xs mt-1.5 flex items-center gap-1">
                <span>⚠</span>
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full bg-linear-to-r from-primary to-primary/90 text-primary-foreground font-medium py-3 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          ليس لديك حساب؟{" "}
          <Link
            href="/signup"
            className="text-secondary font-medium hover:underline hover:text-secondary/80 transition-colors">
            إنشاء حساب
          </Link>
        </p>
      </div>
    </div>
  );
}
