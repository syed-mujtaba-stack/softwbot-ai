"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, Wifi, WifiOff, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function WhatsAppPage() {
  const [qr, setQr] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("disconnected");
  const [loading, setLoading] = useState(true);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/whatsapp/status");
      if (res.ok) {
        const data = await res.json();
        setStatus(data.status);
        setQr(data.qr || null);
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 3000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  const handleConnect = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/whatsapp/connect", { method: "POST" });
      if (res.ok) {
        toast.success("WhatsApp connecting... Scan QR code when ready");
        fetchStatus();
      } else {
        toast.error("Failed to connect");
      }
    } catch {
      toast.error("Connection error");
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      const res = await fetch("/api/whatsapp/disconnect", { method: "POST" });
      if (res.ok) {
        toast.success("WhatsApp disconnected");
        fetchStatus();
      }
    } catch {
      toast.error("Disconnect error");
    }
  };

  const statusConfig = {
    connected: { label: "Connected", color: "bg-green-500", icon: Wifi },
    qr: { label: "Scan QR Code", color: "bg-yellow-500", icon: QrCode },
    disconnected: { label: "Disconnected", color: "bg-gray-500", icon: WifiOff },
    error: { label: "Error", color: "bg-red-500", icon: WifiOff },
  };

  const current = statusConfig[status as keyof typeof statusConfig] || statusConfig.disconnected;
  const Icon = current.icon;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">WhatsApp Connection</h1>
        <p className="text-muted-foreground">
          Connect your WhatsApp account to receive and send messages
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            Connection Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`h-3 w-3 rounded-full ${current.color}`} />
            <Badge variant={status === "connected" ? "default" : "secondary"}>
              {current.label}
            </Badge>
          </div>

          {qr && (
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Scan this QR code with your WhatsApp app
              </p>
              <div className="flex justify-center">
                <img
                  src={qr}
                  alt="WhatsApp QR Code"
                  className="border rounded-lg"
                  width={280}
                  height={280}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Open WhatsApp &rarr; Settings &rarr; Linked Devices &rarr; Link a Device
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            {status === "disconnected" || status === "error" ? (
              <Button onClick={handleConnect} disabled={loading} className="gap-2">
                <Wifi className="h-4 w-4" />
                Connect
              </Button>
            ) : status === "connected" ? (
              <Button
                variant="destructive"
                onClick={handleDisconnect}
                className="gap-2"
              >
                <WifiOff className="h-4 w-4" />
                Disconnect
              </Button>
            ) : null}
            <Button variant="outline" onClick={fetchStatus} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {status === "connected" && (
        <Card>
          <CardHeader>
            <CardTitle>Quick Info</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your WhatsApp is connected. Messages sent to your linked number
              will be automatically processed by your active bots.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
