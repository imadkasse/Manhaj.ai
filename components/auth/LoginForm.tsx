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

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg border border-border">
      <h1 className="text-3xl font-bold font-amiri text-center mb-6 text-primary">
        تسجيل الدخول
      </h1>
      {error && (
        <div className="bg-destructive/10 text-destructive p-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            البريد الإلكتروني
          </label>
          <input
            {...register("email")}
            className={cn(
              "w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none",
              errors.email ? "border-destructive" : "border-input"
            )}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-destructive text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">كلمة المرور</label>
          <input
            type="password"
            {...register("password")}
            className={cn(
              "w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none",
              errors.password ? "border-destructive" : "border-input"
            )}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-destructive text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground py-2 rounded hover:bg-primary/90 transition-colors disabled:opacity-50">
          {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        ليس لديك حساب؟{" "}
        <Link href="/signup" className="text-secondary hover:underline">
          إنشاء حساب
        </Link>
      </p>
    </div>
  );
}
