import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { conversations, messages, contacts, bots } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function GET(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const botId = url.searchParams.get("botId");

  let query = db.query.conversations.findMany({
    with: {
      contact: true,
      bot: true,
      messages: {
        orderBy: [desc(messages.createdAt)],
        limit: 1,
      },
    },
    orderBy: [desc(conversations.lastMessageAt)],
  });

  if (botId) {
    query = db.query.conversations.findMany({
      where: eq(conversations.botId, botId),
      with: {
        contact: true,
        bot: true,
        messages: {
          orderBy: [desc(messages.createdAt)],
          limit: 1,
        },
      },
      orderBy: [desc(conversations.lastMessageAt)],
    });
  }

  const data = await query;
  return NextResponse.json(data);
}
