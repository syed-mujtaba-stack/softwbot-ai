// whatsapp-web.js is a Node.js-only CommonJS package (uses Puppeteer)
// Must use eval('require') to completely bypass Turbopack static analysis
// This module should ONLY be imported in server-side code

let _client: any = null;
let _qrCode: string | null = null;
let _connectionStatus: "disconnected" | "qr" | "connected" | "error" = "disconnected";
let _initialized = false;

function getModule(name: string): any {
  // eslint-disable-next-line no-eval
  return eval("require")(name);
}

// Find Chrome on the system
function findChromePath(): string {
  const paths = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
    // Edge as fallback
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  ];

  const fs = getModule("fs");
  for (const p of paths) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error(
    "Chrome/Edge not found. Install Google Chrome or Microsoft Edge."
  );
}

function getClient() {
  if (_initialized) return _client;
  _initialized = true;

  const wwebjs = getModule("whatsapp-web.js");
  const QRCode = getModule("qrcode");
  const chromePath = findChromePath();

  console.log("Using browser:", chromePath);

  _client = new wwebjs.Client({
    authStrategy: new wwebjs.LocalAuth({
      dataPath: "./whatsapp-session",
    }),
    puppeteer: {
      headless: true,
      executablePath: chromePath,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
        "--disable-gpu",
      ],
    },
  });

  _client.on("qr", async (qr: string) => {
    console.log("WhatsApp QR received");
    _connectionStatus = "qr";
    _qrCode = await QRCode.toDataURL(qr);
  });

  _client.on("ready", () => {
    console.log("WhatsApp client ready!");
    _connectionStatus = "connected";
    _qrCode = null;
  });

  _client.on("authenticated", () => {
    console.log("WhatsApp authenticated");
  });

  _client.on("auth_failure", (msg: string) => {
    console.error("WhatsApp auth failure:", msg);
    _connectionStatus = "error";
  });

  _client.on("disconnected", (reason: string) => {
    console.log("WhatsApp disconnected:", reason);
    _connectionStatus = "disconnected";
    _client = null;
    _initialized = false;
  });

  _client.on("message", async (msg: any) => {
    try {
      const { handleIncomingMessage } = await import("./handler");
      await handleIncomingMessage(msg);
    } catch (error) {
      console.error("Error handling incoming message:", error);
    }
  });

  _client.initialize();

  return _client;
}

export function getWhatsAppClient() {
  return getClient();
}

export async function getQRCode(): Promise<string | null> {
  if (_connectionStatus === "connected") return null;
  return _qrCode;
}

export function getConnectionStatus() {
  return _connectionStatus;
}

export async function sendMessageToWhatsApp(
  to: string,
  message: string
): Promise<any> {
  if (!_client || _connectionStatus !== "connected") {
    console.error("WhatsApp not connected");
    return null;
  }

  try {
    const chatId = to.includes("@") ? to : `${to}@c.us`;
    return await _client.sendMessage(chatId, message);
  } catch (error) {
    console.error("Failed to send WhatsApp message:", error);
    return null;
  }
}

export async function disconnectWhatsApp() {
  if (_client) {
    await _client.destroy();
    _client = null;
    _connectionStatus = "disconnected";
    _qrCode = null;
    _initialized = false;
  }
}
