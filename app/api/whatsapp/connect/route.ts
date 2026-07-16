import { NextResponse } from "next/server";
import { getWhatsAppClient } from "@/lib/whatsapp/client";

export async function POST() {
  try {
    getWhatsAppClient();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to start WhatsApp client" },
      { status: 500 }
    );
  }
}
