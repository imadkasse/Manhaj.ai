"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth";
import Link from "next/link";
import { cn } from "@/lib/utils";

const signupSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    setError(null);

    try {
      const { data: authData, error: authError } = await authService.signUp(
        data.email,
        data.password
      );

      if (authError) {
        setError(authError.message);
        return;
      }

      // If needed, check if email confirmation is required by Supabase settings
      if (authData.user && !authData.session) {
        // Email confirmation required case
        setError("Please check your email to confirm your account.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred during sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg border border-border">
      <h1 className="text-3xl font-bold font-amiri text-center mb-6 text-primary">
        إنشاء حساب
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

        <div>
          <label className="block text-sm font-medium mb-1">
            تأكيد كلمة المرور
          </label>
          <input
            type="password"
            {...register("confirmPassword")}
            className={cn(
              "w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none",
              errors.confirmPassword ? "border-destructive" : "border-input"
            )}
            placeholder="••••••••"
          />
          {errors.confirmPassword && (
            <p className="text-destructive text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground py-2 rounded hover:bg-primary/90 transition-colors disabled:opacity-50">
          {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        لديك حساب بالفعل؟{" "}
        <Link href="/login" className="text-secondary hover:underline">
          تسجيل الدخول
        </Link>
      </p>
    </div>
  );
}
