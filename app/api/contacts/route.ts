import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contacts } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";

async function getSession(request: Request) {
  try {
    return await auth.api.getSession({ headers: request.headers });
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const session = await getSession(request);
  if (!session && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const workspaceId = url.searchParams.get("workspaceId");

  let data;
  if (workspaceId) {
    data = await db.query.contacts.findMany({
      where: eq(contacts.workspaceId, workspaceId),
      orderBy: [desc(contacts.createdAt)],
    });
  } else {
    data = await db.query.contacts.findMany({
      orderBy: [desc(contacts.createdAt)],
    });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await getSession(request);
  if (!session && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const [contact] = await db
    .insert(contacts)
    .values({
      workspaceId: body.workspaceId || "default",
      phoneNumber: body.phoneNumber,
      name: body.name,
      email: body.email,
      tags: body.tags || [],
      source: body.source,
    })
    .returning();

  return NextResponse.json(contact, { status: 201 });
}
