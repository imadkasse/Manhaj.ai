import supabase from "@/supabase/supabase";
import { Database } from "@/types/supabase.types";

export type Article = Database["public"]["Tables"]["content"]["Row"] & {
  scholars?: { name: string } | null;
  topics?: { name: string } | null;
};
export type CreateArticleDTO =
  Database["public"]["Tables"]["content"]["Insert"];
export type UpdateArticleDTO =
  Database["public"]["Tables"]["content"]["Update"];

export const articlesService = {
  async getAllArticles(publishedOnly = true) {
    let query = supabase
      .from("content")
      .select("*, scholars(name), topics(name)")
      .order("created_at", { ascending: false });

    if (publishedOnly) {
      query = query.eq("published", true);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getArticleById(id: string) {
    const { data, error } = await supabase
      .from("content")
      .select("*, scholars(name), topics(name)")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async getArticlesByScholar(scholarId: string) {
    const { data, error } = await supabase
      .from("content")
      .select("*, topics(name)")
      .eq("scholar_id", scholarId)
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async createArticle(article: CreateArticleDTO) {
    const { data, error } = await supabase
      .from("content")
      .insert(article)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateArticle(id: string, updates: UpdateArticleDTO) {
    const { data, error } = await supabase
      .from("content")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteArticle(id: string) {
    const { error } = await supabase.from("content").delete().eq("id", id);

    if (error) throw error;
  },
};
