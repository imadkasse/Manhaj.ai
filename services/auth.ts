import supabase from "@/supabase/supabase";
import { Database } from "@/types/supabase.types";

export type UserRole = Database["public"]["Enums"]["user_role"];

export const authService = {
  async signUp(email: string, password: string, role: UserRole = "viewer") {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role },
      },
    });

    // We also need to create a profile entry if it doesn't exist via trigger,
    // but typically we might want to handle it here if no trigger.
    // Assuming Supabase trigger handles profile creation or we do it manually.
    // For this MVP, let's assume a trigger on public.users,
    // OR we explicitly insert into profiles if needed.
    // However, the best practice is to use metadata or a trigger.

    return { data, error };
  },

  async signIn(email: string, password: string) {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  async signInWithGoogle() {
    return await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  },

  async signOut() {
    return await supabase.auth.signOut();
  },

  async getCurrentUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error || !user) return null;

    // Fetch profile to get role
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    return {
      ...user,
      role: profile?.role || "viewer",
    };
  },

  async getUserRole(userId: string): Promise<UserRole | null> {
    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();

    if (error) return null;
    return data.role;
  },
};
