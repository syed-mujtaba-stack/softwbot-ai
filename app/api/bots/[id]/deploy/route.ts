import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bots } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { getConnectionStatus } from "@/lib/whatsapp/client";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const bot = await db.query.bots.findFirst({
    where: eq(bots.id, id),
  });

  if (!bot) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const newStatus = bot.status === "active" ? "paused" : "active";

  // Check WhatsApp connection when activating
  if (newStatus === "active") {
    const whatsappStatus = getConnectionStatus();
    if (whatsappStatus !== "connected") {
      return NextResponse.json(
        {
          error: "WhatsApp not connected. Please connect WhatsApp first.",
          whatsappStatus,
        },
        { status: 400 }
      );
    }
  }

  const [updated] = await db
    .update(bots)
    .set({
      status: newStatus,
      updatedAt: new Date(),
    })
    .where(eq(bots.id, id))
    .returning();

  return NextResponse.json(updated);
}
