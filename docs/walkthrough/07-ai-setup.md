# AI Setup

---

## Executive Summary

Set up OpenRouter integration and AI agents.

---

## Duration

30 minutes

---

## Prerequisites

- Project setup complete
- OpenRouter account created

---

## Steps

### 1. Configure OpenRouter

```env
OPENROUTER_API_KEY=sk-or-...
OPENROUTER_APP_NAME=SoftwBot AI
OPENROUTER_SITE_URL=https://softwbot.com
```

### 2. Create AI Client

```typescript
// src/lib/ai/openrouter.ts
import OpenAI from 'openai';

export const openrouter = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': process.env.OPENROUTER_SITE_URL,
    'X-Title': process.env.OPENROUTER_APP_NAME,
  },
});

export type ModelId =
  | 'openai/gpt-4o-mini'
  | 'openai/gpt-4o'
  | 'anthropic/claude-3.5-sonnet'
  | 'deepseek/deepseek-chat';
```

### 3. Create Chat Completion Function

```typescript
// src/lib/ai/chat.ts
import { openrouter, type ModelId } from './openrouter';

interface ChatParams {
  model?: ModelId;
  systemPrompt: string;
  messages: { role: 'user' | 'assistant'; content: string }[];
  maxTokens?: number;
  temperature?: number;
}

export async function chat({
  model = 'openai/gpt-4o-mini',
  systemPrompt,
  messages,
  maxTokens = 1000,
  temperature = 0.7,
}: ChatParams) {
  const response = await openrouter.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages,
    ],
    max_tokens: maxTokens,
    temperature,
  });
  
  return {
    content: response.choices[0].message.content,
    tokens: response.usage?.total_tokens ?? 0,
    model: response.model,
  };
}
```

### 4. Create Conversation Agent

```typescript
// src/agents/conversation/index.ts
import { chat } from '@/lib/ai/chat';
import { db } from '@/lib/db';
import { messages } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

interface ConversationParams {
  botId: string;
  conversationId: string;
  userMessage: string;
}

export async function handleConversation({
  botId,
  conversationId,
  userMessage,
}: ConversationParams) {
  // Get bot configuration
  const bot = await db.query.bots.findFirst({
    where: (bots, { eq }) => eq(bots.id, botId),
  });
  
  if (!bot) throw new Error('Bot not found');
  
  // Get conversation history
  const history = await db.query.messages.findMany({
    where: (messages, { eq }) => eq(messages.conversationId, conversationId),
    orderBy: (messages, { asc }) => [asc(messages.createdAt)],
    limit: 20,
  });
  
  // Format messages for AI
  const aiMessages = history.map((msg) => ({
    role: msg.direction === 'incoming' ? 'user' as const : 'assistant' as const,
    content: msg.content,
  }));
  
  // Add current message
  aiMessages.push({ role: 'user', content: userMessage });
  
  // Generate response
  const response = await chat({
    model: (bot.model as any) ?? 'openai/gpt-4o-mini',
    systemPrompt: bot.systemPrompt ?? 'You are a helpful assistant.',
    messages: aiMessages,
  });
  
  // Store response
  await db.insert(messages).values({
    conversationId,
    content: response.content,
    direction: 'outgoing',
    tokensUsed: response.tokens,
  });
  
  return response;
}
```

### 5. Create Embeddings Function

```typescript
// src/lib/ai/embeddings.ts
import { openrouter } from './openrouter';

export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openrouter.embeddings.create({
    model: 'openai/text-embedding-3-small',
    input: text,
  });
  
  return response.data[0].embedding;
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const response = await openrouter.embeddings.create({
    model: 'openai/text-embedding-3-small',
    input: texts,
  });
  
  return response.data.map((item) => item.embedding);
}
```

---

## Verification

```typescript
// Test chat
const response = await chat({
  systemPrompt: 'You are a helpful assistant.',
  messages: [{ role: 'user', content: 'Hello!' }],
});
console.log(response.content);

// Test embedding
const embedding = await generateEmbedding('Test text');
console.log(embedding.length); // 1536
```

---

## Developer Notes

- Handle rate limits
- Implement fallbacks
- Cache responses when appropriate
- Monitor token usage

## Future Improvements

- Streaming responses
- Function calling
- Multi-modal support
- Custom model fine-tuning
