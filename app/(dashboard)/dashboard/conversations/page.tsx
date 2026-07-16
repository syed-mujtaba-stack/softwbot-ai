"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MessageSquare, Search, User } from "lucide-react";

interface Conversation {
  id: string;
  status: string;
  lastMessageAt: string;
  messageCount: number | null;
  contact: {
    id: string;
    name: string | null;
    phoneNumber: string;
  } | null;
  bot: {
    id: string;
    name: string;
  } | null;
  messages: Array<{
    content: string;
    senderType: string;
  }>;
}

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const res = await fetch("/api/conversations");
      if (res.ok) {
        setConversations(await res.json());
      }
    } finally {
      setLoading(false);
    }
  };

  const filtered = conversations.filter(
    (c) =>
      c.contact?.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.contact?.phoneNumber.includes(search)
  );

  const statusColors: Record<string, string> = {
    active: "bg-green-500",
    pending: "bg-yellow-500",
    resolved: "bg-blue-500",
    archived: "bg-gray-500",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Conversations</h1>
        <p className="text-muted-foreground">
          Manage WhatsApp conversations
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or phone..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">
          Loading...
        </div>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">
              No conversations yet
            </h3>
            <p className="text-muted-foreground">
              Conversations will appear here when customers message your bots
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {filtered.map((conv) => (
            <Card
              key={conv.id}
              className="hover:bg-muted/50 cursor-pointer transition-colors"
            >
              <CardContent className="flex items-center gap-4 py-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {conv.contact?.name || conv.contact?.phoneNumber || "Unknown"}
                    </span>
                    <div
                      className={`h-2 w-2 rounded-full ${statusColors[conv.status] || "bg-gray-500"}`}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {conv.messages[0]?.content || "No messages"}
                  </p>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <div>{conv.bot?.name}</div>
                  <div>{conv.messageCount || 0} msgs</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
