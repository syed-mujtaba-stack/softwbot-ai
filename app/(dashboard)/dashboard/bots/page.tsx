"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Bot, MessageSquare, MoreVertical, Play, Pause, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Bot {
  id: string;
  name: string;
  description: string | null;
  status: string;
  model: string;
  totalConversations: number | null;
  totalMessages: number | null;
  createdAt: string;
}

export default function BotsPage() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBots();
  }, []);

  const fetchBots = async () => {
    try {
      const res = await fetch("/api/bots");
      if (res.ok) {
        setBots(await res.json());
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleDeploy = async (id: string) => {
    await fetch(`/api/bots/${id}/deploy`, { method: "POST" });
    fetchBots();
  };

  const deleteBot = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/bots/${id}`, { method: "DELETE" });
    fetchBots();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Bots</h1>
          <p className="text-muted-foreground">Manage your WhatsApp bots</p>
        </div>
        <Link href="/dashboard/bots/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Bot
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      ) : bots.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Bot className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No bots yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first bot to get started
            </p>
            <Link href="/dashboard/bots/new">
              <Button>Create Bot</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bots.map((bot) => (
            <Card key={bot.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg">{bot.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {bot.description || "No description"}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => toggleDeploy(bot.id)}>
                      {bot.status === "active" ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" /> Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" /> Activate
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => deleteBot(bot.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge
                    variant={
                      bot.status === "active" ? "default" : "secondary"
                    }
                  >
                    {bot.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {bot.model}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    {bot.totalConversations || 0} conversations
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
