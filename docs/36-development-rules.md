# 36 — Development Rules

---

## Executive Summary

This document defines the mandatory rules for AI-assisted development of SoftwBot AI.

---

## Purpose

Ensure AI coding agents produce consistent, high-quality, production-ready code.

---

## Mandatory Rules

### Rule 1: Read Before Write

Before writing any code:
1. Read ALL relevant documentation
2. Understand the module architecture
3. Review existing code patterns
4. Check for similar implementations

### Rule 2: Plan Before Implement

Before implementing:
1. Generate planning files
2. Wait for approval
3. Follow approved plan exactly
4. Document deviations

### Rule 3: Test Before Complete

Before marking complete:
1. Write unit tests
2. Run type checking
3. Run linting
4. Verify functionality

### Rule 4: Document Before Ship

Before shipping:
1. Update API docs
2. Update walkthrough
3. Update relevant module docs
4. Generate progress report

---

## Code Rules

### TypeScript Rules

```typescript
// ✅ Rule: No `any` types
function processData(data: BotConfig) { }

// ✅ Rule: Explicit return types
function getBot(id: string): Promise<Bot | null> { }

// ✅ Rule: Strict null checks
const bot = await getBot(id);
if (!bot) throw new NotFoundError('Bot');

// ✅ Rule: Use interfaces for object shapes
interface BotConfig {
  name: string;
  model: string;
}

// ❌ Rule: Never use `any`
const data: any = {};

// ❌ Rule: Never use `@ts-ignore`
// @ts-ignore
```

### React Rules

```typescript
// ✅ Rule: Server Components by default
export default async function BotPage({ params }) {
  const bot = await getBot(params.id);
  return <BotDetails bot={bot} />;
}

// ✅ Rule: Explicit 'use client' when needed
'use client';
export function BotForm() { }

// ✅ Rule: Props interface defined
interface BotCardProps {
  bot: Bot;
  onSelect: (id: string) => void;
}

// ❌ Rule: Never use inline styles
<div style={{ color: 'red' }}>

// ❌ Rule: Never use `className` with string concatenation
className={"btn " + active ? "active" : ""}
```

### API Rules

```typescript
// ✅ Rule: Always validate input
const data = createBotSchema.parse(body);

// ✅ Rule: Always handle errors
try {
  // ...
} catch (error) {
  if (error instanceof z.ZodError) {
    return NextResponse.json({ error: error.errors }, { status: 400 });
  }
  return NextResponse.json({ error: 'Internal error' }, { status: 500 });
}

// ✅ Rule: Always check auth
const { userId } = await auth();
if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

// ❌ Rule: Never trust client input
const data = await req.json(); // No validation!
```

### Database Rules

```typescript
// ✅ Rule: Use Drizzle ORM
const bot = await db.query.bots.findFirst({
  where: eq(bots.id, botId)
});

// ✅ Rule: Use parameterized queries
await db.select().from(bots).where(eq(bots.workspaceId, workspaceId));

// ❌ Rule: Never use raw SQL
await db.execute(`SELECT * FROM bots WHERE id = '${id}'`);
```

---

## File Rules

### File Organization

```
src/
├── app/           # Pages and routes only
├── components/    # React components
├── lib/           # Business logic
├── hooks/         # React hooks
├── stores/        # State management
└── types/         # TypeScript types
```

### File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Components | kebab-case | `bot-card.tsx` |
| Utilities | kebab-case | `format-date.ts` |
| Types | kebab-case | `bot-types.ts` |
| Tests | `*.test.ts` | `client.test.ts` |

### Import Order

```typescript
// 1. React/Next.js
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// 2. External libraries
import { z } from 'zod';

// 3. UI components
import { Button } from '@/components/ui/button';

// 4. Shared components
import { EmptyState } from '@/components/shared/empty-state';

// 5. Feature components
import { BotCard } from '@/components/dashboard/bots/bot-card';

// 6. Lib utilities
import { cn } from '@/lib/utils/cn';

// 7. Types
import type { Bot } from '@/types/bot';
```

---

## Testing Rules

### Unit Test Rules

```typescript
// ✅ Rule: Test behavior, not implementation
it('should create bot with valid data', async () => {
  const bot = await createBot({ name: 'Test Bot' });
  expect(bot.name).toBe('Test Bot');
});

// ✅ Rule: Use descriptive test names
it('should return 401 when token is expired', async () => { });

// ❌ Rule: Never test implementation details
it('should call db.insert', async () => { });
```

### Integration Test Rules

```typescript
// ✅ Rule: Test真实 scenarios
it('should create bot via API', async () => {
  const response = await request(app)
    .post('/api/v1/bots')
    .send({ name: 'Test Bot' });
  expect(response.status).toBe(201);
});

// ✅ Rule: Clean up after tests
afterEach(async () => {
  await db.delete(bots);
});
```

---

## Security Rules

1. **Never** commit secrets to git
2. **Never** log sensitive data
3. **Always** validate input
4. **Always** check authorization
5. **Always** use parameterized queries
6. **Always** encrypt sensitive data
7. **Always** use HTTPS
8. **Always** set secure headers

---

## Performance Rules

1. **Never** make N+1 queries
2. **Always** use indexes
3. **Always** paginate large datasets
4. **Always** cache expensive operations
5. **Always** use connection pooling
6. **Always** measure before optimizing

---

## Developer Notes

- These rules are mandatory for all contributors
- Exceptions require tech lead approval
- Rules are enforced via linting and code review
- Rules are updated based on lessons learned

## Future Improvements

- Automated rule enforcement
- Rule violation tracking
- Rule effectiveness metrics
