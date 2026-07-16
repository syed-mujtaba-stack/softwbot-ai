import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { conversations, messages } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";

async function getSession(request: Request) {
  try {
    return await auth.api.getSession({ headers: request.headers });
  } catch {
    return null;
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession(request);
  if (!session && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const conversation = await db.query.conversations.findFirst({
    where: eq(conversations.id, id),
    with: {
      contact: true,
      bot: true,
    },
  });

  if (!conversation) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const conversationMessages = await db.query.messages.findMany({
    where: eq(messages.conversationId, id),
    orderBy: [desc(messages.createdAt)],
    limit: 100,
  });

  return NextResponse.json({
    ...conversation,
    messages: conversationMessages.reverse(),
  });
}
