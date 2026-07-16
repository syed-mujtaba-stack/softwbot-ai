import { NextResponse } from "next/server";
import { getQRCode, getConnectionStatus } from "@/lib/whatsapp/client";

export async function GET() {
  const status = getConnectionStatus();
  const qr = await getQRCode();

  return NextResponse.json({
    status,
    qr,
  });
}
