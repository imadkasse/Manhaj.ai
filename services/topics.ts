import supabase from "@/supabase/supabase";
import { Database } from "@/types/supabase.types";

export type Topic = Database["public"]["Tables"]["topics"]["Row"];
export type CreateTopicDTO = Database["public"]["Tables"]["topics"]["Insert"];
export type UpdateTopicDTO = Database["public"]["Tables"]["topics"]["Update"];

export const topicsService = {
  async getAllTopics() {
    const { data, error } = await supabase
      .from("topics")
      .select("*")
      .order("name", { ascending: true });

    if (error) throw error;
    return data;
  },

  async createTopic(topic: CreateTopicDTO) {
    const { data, error } = await supabase
      .from("topics")
      .insert(topic)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateTopic(id: string, updates: UpdateTopicDTO) {
    const { data, error } = await supabase
      .from("topics")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteTopic(id: string) {
    const { error } = await supabase.from("topics").delete().eq("id", id);

    if (error) throw error;
  },
};
