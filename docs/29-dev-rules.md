# 29 — Developer Rules

---

## Executive Summary

This document defines coding standards, conventions, and rules for all developers contributing to SoftwBot AI.

---

## Purpose

Maintain code consistency, quality, and maintainability across the entire codebase.

---

## Tech Stack Rules

| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 16.x | Framework |
| TypeScript | 5.x | Language |
| React | 19.x | UI |
| Tailwind CSS | 4.x | Styling |
| Drizzle ORM | Latest | Database |
| Vitest | Latest | Unit/Integration tests |
| Playwright | Latest | E2E tests |

---

## File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `BotCard.tsx` |
| Pages | lowercase | `page.tsx` |
| API Routes | lowercase | `route.ts` |
| Utilities | camelCase | `formatPhone.ts` |
| Types | PascalCase | `types.ts` |
| Constants | UPPER_SNAKE_CASE | `API_ENDPOINTS.ts` |
| Test files | `*.test.ts` | `client.test.ts` |
| Hook files | `use` prefix | `useBot.ts` |

---

## Component Rules

### Server Components (Default)

```typescript
// ✅ Good — Server Component by default
import { db } from '@/lib/db';

export default async function BotPage({ params }) {
  const bot = await db.query.bots.findFirst({
    where: eq(bots.id, params.id)
  });
  
  return <BotDetails bot={bot} />;
}
```

### Client Components (Explicit)

```typescript
// ✅ Good — Explicitly marked as Client
'use client';

import { useState } from 'react';

export function BotForm() {
  const [name, setName] = useState('');
  return <input value={name} onChange={e => setName(e.target.value)} />;
}
```

---

## API Route Rules

```typescript
// ✅ Good — Standard API route structure
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const createBotSchema = z.object({
  name: z.string().min(1).max(100),
  businessDescription: z.string().min(10).max(5000),
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    const data = createBotSchema.parse(body);
    
    const bot = await db.insert(bots).values({
      ...data,
      userId,
    }).returning();
    
    return NextResponse.json(bot, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Create bot error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
```

---

## Database Rules

```typescript
// ✅ Good — Drizzle schema definition
import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const bots = pgTable('bots', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ✅ Good — Query with proper typing
const bot = await db.query.bots.findFirst({
  where: eq(bots.id, botId),
  columns: { id: true, name: true },
});
```

---

## Error Handling Rules

```typescript
// ✅ Good — Typed error handling
class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
  }
}

class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND', 404);
  }
}

// ✅ Good — Usage
const bot = await getBot(botId);
if (!bot) throw new NotFoundError('Bot');
```

---

## Environment Variables

```typescript
// ✅ Good — Validated env vars
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  CLERK_SECRET_KEY: z.string().min(1),
  OPENROUTER_API_KEY: z.string().min(1),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
});

export const env = envSchema.parse(process.env);
```

---

## Git Rules

### Commit Messages

```
feat: add bot creation flow
fix: resolve webhook delivery issue
docs: update API documentation
refactor: simplify RAG pipeline
test: add unit tests for billing
chore: update dependencies
```

### Branch Naming

```
feat/bot-creation-flow
fix/webhook-delivery
docs/api-reference
refactor/rag-pipeline
```

---

## Linting Rules

```bash
npm run lint        # ESLint
npm run typecheck   # TypeScript
npm run format      # Prettier
```

---

## Code Review Checklist

- [ ] TypeScript strict mode compliant
- [ ] No `any` types
- [ ] Error handling present
- [ ] Loading states implemented
- [ ] Empty states handled
- [ ] Mobile responsive
- [ ] Tests written
- [ ] Documentation updated

---

## Forbidden Patterns

```typescript
// ❌ Never use `any`
const data: any = {};

// ❌ Never use `console.log` in production
console.log('debug info');

// ❌ Never store secrets in code
const apiKey = 'sk-xxx';

// ❌ Never use inline styles
<div style={{ color: 'red' }}>

// ❌ Never use `@ts-ignore`
// @ts-ignore
```

---

## Developer Notes

- All new features require tests
- Bug fixes require regression tests
- API changes require documentation updates
- Breaking changes require migration guide

## Future Improvements

- Pre-commit hooks (Husky)
- Automated code review (AI)
- Code generation templates
- Architecture decision records (ADR)
