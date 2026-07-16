import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bots } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function GET(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userBots = await db.query.bots.findMany({
    orderBy: [desc(bots.createdAt)],
  });

  return NextResponse.json(userBots);
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const [bot] = await db
    .insert(bots)
    .values({
      workspaceId: body.workspaceId,
      name: body.name,
      description: body.description,
      model: body.model || "openai/gpt-4o-mini",
      systemPrompt: body.systemPrompt || "You are a helpful assistant.",
      temperature: body.temperature || "0.70",
      maxTokens: body.maxTokens || 1000,
      welcomeMessage: body.welcomeMessage,
      offlineMessage: body.offlineMessage,
      fallbackMessage: body.fallbackMessage,
    })
    .returning();

  return NextResponse.json(bot, { status: 201 });
}
