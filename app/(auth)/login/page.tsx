"use client";

import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="relative flex justify-center items-center min-h-[90vh] bg-linear-to-br from-background via-background to-accent/10 overflow-hidden">
      <LoginForm />
    </div>
  );
}
