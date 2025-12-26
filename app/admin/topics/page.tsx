"use client";

import { useEffect, useState } from "react";
import { topicsService } from "@/services/topics";
import { Plus, Trash, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminTopics() {
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    try {
      const data = await topicsService.getAllTopics();
      setTopics(data || []);
    } catch (error) {
      console.error("Failed to load topics", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newTopicName.trim()) return;
    try {
      await topicsService.createTopic({
        name: newTopicName,
        slug: newTopicName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      });
      setNewTopicName("");
      setIsAdding(false);
      loadTopics();
    } catch (error) {
      alert("Failed to create topic");
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm("Are you sure? This might affect articles linked to this topic.")
    )
      return;
    try {
      await topicsService.deleteTopic(id);
      loadTopics();
    } catch (error) {
      alert("Failed to delete topic");
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-amiri text-primary">
          Manage Topics
        </h1>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded flex items-center hover:bg-primary/90">
          <Plus size={18} className="mr-2" /> Add Topic
        </button>
      </div>

      {isAdding && (
        <div className="bg-muted/50 p-4 rounded-lg mb-6 flex items-center gap-4">
          <input
            value={newTopicName}
            onChange={(e) => setNewTopicName(e.target.value)}
            className="flex-1 p-2 border border-input rounded"
            placeholder="Topic Name"
            autoFocus
          />
          <button
            onClick={handleCreate}
            className="bg-secondary text-primary px-4 py-2 rounded flex items-center">
            <Save size={18} className="mr-2" /> Save
          </button>
          <button
            onClick={() => setIsAdding(false)}
            className="text-muted-foreground hover:text-foreground">
            <X size={24} />
          </button>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="bg-card border border-border p-4 rounded flex justify-between items-center group">
              <span className="font-medium">{topic.name}</span>
              <button
                onClick={() => handleDelete(topic.id)}
                className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-destructive/10 rounded">
                <Trash size={16} />
              </button>
            </div>
          ))}
          {topics.length === 0 && (
            <p className="text-muted-foreground col-span-3 text-center py-8">
              No topics found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
