"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Bot } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const models = [
  { value: "openai/gpt-4o-mini", label: "GPT-4o Mini (Fast & Cheap)" },
  { value: "openai/gpt-4o", label: "GPT-4o (Best Quality)" },
  { value: "anthropic/claude-3.5-sonnet", label: "Claude 3.5 Sonnet" },
  { value: "deepseek/deepseek-chat", label: "DeepSeek (Budget)" },
];

const defaultPrompts = [
  {
    name: "Customer Support",
    prompt:
      "You are a friendly customer support agent. Answer questions about our products and services. Be helpful and professional.",
  },
  {
    name: "Sales",
    prompt:
      "You are a sales representative. Help customers find the right product. Be persuasive but not pushy.",
  },
  {
    name: "General Assistant",
    prompt:
      "You are a helpful assistant. Answer questions accurately and concisely.",
  },
];

export default function NewBotPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [model, setModel] = useState("openai/gpt-4o-mini");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/bots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          model,
          systemPrompt,
          welcomeMessage,
          workspaceId: "00000000-0000-0000-0000-000000000001",
        }),
      });

      if (!res.ok) throw new Error("Failed to create bot");

      toast.success("Bot created successfully!");
      router.push("/dashboard/bots");
    } catch {
      toast.error("Failed to create bot");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/bots">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Create Bot</h1>
          <p className="text-muted-foreground">
            Set up a new WhatsApp bot
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Bot Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Customer Support Bot"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="What does this bot do?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>AI Model</Label>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {models.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Quick Templates</Label>
              <div className="flex gap-2">
                {defaultPrompts.map((p) => (
                  <Button
                    key={p.name}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setSystemPrompt(p.prompt)}
                  >
                    {p.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prompt">System Prompt *</Label>
              <Textarea
                id="prompt"
                placeholder="You are a helpful assistant..."
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                rows={6}
                required
              />
              <p className="text-xs text-muted-foreground">
                This tells the bot how to behave and what it knows.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="welcome">Welcome Message</Label>
              <Input
                id="welcome"
                placeholder="Hi! How can I help you today?"
                value={welcomeMessage}
                onChange={(e) => setWelcomeMessage(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href="/dashboard/bots">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={loading} className="gap-2">
            <Bot className="h-4 w-4" />
            {loading ? "Creating..." : "Create Bot"}
          </Button>
        </div>
      </form>
    </div>
  );
}
