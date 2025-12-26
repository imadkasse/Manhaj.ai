import supabase from "@/supabase/supabase";
import { Database } from "@/types/supabase.types";

export type Scholar = Database["public"]["Tables"]["scholars"]["Row"];
export type CreateScholarDTO =
  Database["public"]["Tables"]["scholars"]["Insert"];
export type UpdateScholarDTO =
  Database["public"]["Tables"]["scholars"]["Update"];

export const scholarsService = {
  async getAllScholars() {
    const { data, error } = await supabase
      .from("scholars")
      .select("*")
      .order("name", { ascending: true });

    if (error) throw error;
    return data;
  },

  async getScholarById(id: string) {
    const { data, error } = await supabase
      .from("scholars")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async createScholar(scholar: CreateScholarDTO) {
    const { data, error } = await supabase
      .from("scholars")
      .insert(scholar)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateScholar(id: string, updates: UpdateScholarDTO) {
    const { data, error } = await supabase
      .from("scholars")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteScholar(id: string) {
    const { error } = await supabase.from("scholars").delete().eq("id", id);

    if (error) throw error;
  },
};
