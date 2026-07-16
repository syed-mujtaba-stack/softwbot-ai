import { NextResponse } from "next/server";
import { handleIncomingMessage } from "@/lib/whatsapp";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Verify webhook token
    const authHeader = request.headers.get("authorization");
    if (authHeader !== process.env.WHATSAPP_API_TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await handleIncomingMessage(body);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("WhatsApp webhook error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
