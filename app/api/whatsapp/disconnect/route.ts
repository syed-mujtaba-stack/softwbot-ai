import { NextResponse } from "next/server";
import { disconnectWhatsApp } from "@/lib/whatsapp/client";

export async function POST() {
  try {
    await disconnectWhatsApp();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to disconnect" },
      { status: 500 }
    );
  }
}
