"use client";

import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="relative flex justify-center items-center min-h-[90vh] bg-linear-to-br from-background via-background to-accent/10 overflow-hidden">
      <SignupForm />
    </div>
  );
}
