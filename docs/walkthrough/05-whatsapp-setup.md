# WhatsApp Setup

---

## Executive Summary

Set up WhatsApp integration with Green API.

---

## Duration

45 minutes

---

## Prerequisites

- Project setup complete
- Green API account created

---

## Steps

### 1. Create Green API Instance

1. Go to green-api.com
2. Create account
3. Create instance
4. Copy Instance ID and API Token

### 2. Configure Environment

```env
WHATSAPP_PROVIDER=green-api
WHATSAPP_API_URL=https://api.green-api.com
WHATSAPP_INSTANCE_ID=your-instance-id
WHATSAPP_API_TOKEN=your-api-token
```

### 3. Install Dependencies

```bash
npm install axios
```

### 4. Create WhatsApp Client

```typescript
// src/lib/whatsapp/client.ts
import axios from 'axios';

export class WhatsAppClient {
  private apiUrl: string;
  private instanceId: string;
  private apiToken: string;
  
  constructor() {
    this.apiUrl = process.env.WHATSAPP_API_URL!;
    this.instanceId = process.env.WHATSAPP_INSTANCE_ID!;
    this.apiToken = process.env.WHATSAPP_API_TOKEN!;
  }
  
  async sendMessage(to: string, message: string) {
    const response = await axios.post(
      `${this.apiUrl}/waInstance${this.instanceId}/sendMessage/${this.apiToken}`,
      {
        chatId: `${to}@c.us`,
        message,
      }
    );
    return response.data;
  }
  
  async getQR() {
    const response = await axios.get(
      `${this.apiUrl}/waInstance${this.instanceId}/qr/${this.apiToken}`
    );
    return response.data;
  }
  
  async getConnectionState() {
    const response = await axios.get(
      `${this.apiUrl}/waInstance${this.instanceId}/getState/${this.apiToken}`
    );
    return response.data;
  }
}
```

### 5. Create Webhook Handler

```typescript
// src/app/api/webhooks/whatsapp/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { messages, conversations, contacts } from '@/lib/db/schema';

export async function POST(request: Request) {
  const body = await request.json();
  
  const { typeWebhook, instanceData, messageData, senderData } = body;
  
  if (typeWebhook === 'incomingMessageReceived') {
    const phone = senderData.chatId.replace('@c.us', '');
    const content = messageData.message;
    
    // Find or create contact
    let contact = await db.query.contacts.findFirst({
      where: (contacts, { eq }) => eq(contacts.phone, phone),
    });
    
    if (!contact) {
      [contact] = await db.insert(contacts).values({
        phone,
        name: senderData.senderName,
      }).returning();
    }
    
    // Find or create conversation
    let conversation = await db.query.conversations.findFirst({
      where: (conversations, { eq, and }) =>
        and(
          eq(conversations.contactId, contact!.id),
          eq(conversations.status, 'active')
        ),
    });
    
    if (!conversation) {
      [conversation] = await db.insert(conversations).values({
        contactId: contact!.id,
        botId: instanceData.botId,
      }).returning();
    }
    
    // Store message
    await db.insert(messages).values({
      conversationId: conversation!.id,
      content,
      direction: 'incoming',
      providerMessageId: messageData.idMessage,
    });
    
    // Process with AI...
  }
  
  return NextResponse.json({ success: true });
}
```

### 6. Setup Webhook in Green API

1. Go to Green API dashboard
2. Set webhook URL: `https://your-app.com/api/webhooks/whatsapp`
3. Enable `incomingMessageReceived`

---

## Verification

1. Start server
2. Connect WhatsApp (scan QR)
3. Send test message
4. Check database for message
5. Verify AI response

---

## Common Issues

### Issue: QR code not loading

Check Green API instance is active and API credentials are correct.

### Issue: Messages not received

Verify webhook URL is accessible and webhook is enabled.

### Issue: Messages not sent

Check API token permissions and phone number format.

---

## Developer Notes

- Handle webhook retries
- Validate webhook signatures
- Log all messages
- Handle rate limits

## Future Improvements

- Multiple WhatsApp accounts
- WhatsApp Business API
- Message templates
- Media handling
