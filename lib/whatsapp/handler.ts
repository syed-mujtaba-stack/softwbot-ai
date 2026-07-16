import { db } from "@/lib/db";
import { conversations, messages, contacts, bots } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { chat } from "@/lib/ai/chat";
import type { ModelId } from "@/lib/ai/openrouter";
import { sendMessageToWhatsApp } from "./client";

export async function handleIncomingMessage(msg: any) {
  const phone = msg.from.replace("@c.us", "");
  const text = msg.body;

  if (!text || msg.fromMe) return;

  // Find active bot
  const bot = await db.query.bots.findFirst({
    where: eq(bots.status, "active"),
  });

  if (!bot) return;

  // Find or create contact
  let contact = await db.query.contacts.findFirst({
    where: and(
      eq(contacts.workspaceId, bot.workspaceId),
      eq(contacts.phoneNumber, phone)
    ),
  });

  if (!contact) {
    const contactName = msg._data?.notifyName || phone;
    [contact] = await db
      .insert(contacts)
      .values({
        workspaceId: bot.workspaceId,
        phoneNumber: phone,
        name: contactName,
      })
      .returning();
  }

  // Find or create conversation
  let conversation = await db.query.conversations.findFirst({
    where: and(
      eq(conversations.botId, bot.id),
      eq(conversations.contactId, contact.id),
      eq(conversations.status, "active")
    ),
  });

  if (!conversation) {
    [conversation] = await db
      .insert(conversations)
      .values({
        botId: bot.id,
        contactId: contact.id,
      })
      .returning();
  }

  // Store incoming message
  await db.insert(messages).values({
    conversationId: conversation.id,
    senderType: "user",
    senderId: contact.id,
    content: text,
    whatsappMessageId: msg.id.id,
  });

  // Update conversation
  await db
    .update(conversations)
    .set({
      lastMessageAt: new Date(),
      messageCount: (conversation.messageCount || 0) + 1,
    })
    .where(eq(conversations.id, conversation.id));

  // Update contact stats
  await db
    .update(contacts)
    .set({
      lastSeenAt: new Date(),
      totalMessages: (contact.totalMessages || 0) + 1,
      totalConversations: (contact.totalConversations || 0) + 1,
    })
    .where(eq(contacts.id, contact.id));

  // Generate AI response if AI is active
  if (conversation.isAiActive) {
    // Check for human handoff triggers
    const handoffTriggers = ["human", "agent", "talk to person", "speak to someone"];
    const shouldHandoff = handoffTriggers.some((trigger) =>
      text.toLowerCase().includes(trigger)
    );

    if (shouldHandoff) {
      await sendMessageToWhatsApp(
        phone,
        "Let me connect you with a human agent. Please hold on..."
      );
      return;
    }

    // Get conversation history
    const history = await db.query.messages.findMany({
      where: eq(messages.conversationId, conversation.id),
      orderBy: [desc(messages.createdAt)],
      limit: bot.maxContextMessages || 20,
    });

    const aiMessages = history
      .reverse()
      .map((msg) => ({
        role: (msg.senderType === "user" ? "user" : "assistant") as
          | "user"
          | "assistant",
        content: msg.content,
      }))
      .filter((m) => m.content);

    try {
      const startTime = Date.now();
      const response = await chat({
        model: (bot.model as ModelId) || "openai/gpt-4o-mini",
        systemPrompt: bot.systemPrompt || "You are a helpful assistant.",
        messages: aiMessages,
        maxTokens: bot.maxTokens || 1000,
        temperature: Number(bot.temperature) || 0.7,
      });
      const latency = Date.now() - startTime;

      // Store AI response
      await db.insert(messages).values({
        conversationId: conversation.id,
        senderType: "ai",
        content: response.content,
        aiModelUsed: response.model,
        aiTokensUsed: response.tokens,
        aiLatencyMs: latency,
      });

      // Send via WhatsApp
      await sendMessageToWhatsApp(phone, response.content);
    } catch (error) {
      console.error("AI response error:", error);

      // Send fallback message
      const fallback =
        bot.fallbackMessage ||
        "Sorry, I'm having trouble right now. Please try again later.";
      await sendMessageToWhatsApp(phone, fallback);

      await db.insert(messages).values({
        conversationId: conversation.id,
        senderType: "system",
        content: fallback,
      });
    }
  }
}
