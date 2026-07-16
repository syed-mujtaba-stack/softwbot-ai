# API Setup

---

## Executive Summary

Set up Next.js App Router API structure.

---

## Duration

30 minutes

---

## Prerequisites

- Project setup complete
- Database setup complete
- Auth setup complete

---

## Steps

### 1. Create API Structure

```
src/app/api/
├── bots/
│   ├── route.ts           # GET, POST
│   └── [id]/
│       ├── route.ts       # GET, PUT, DELETE
│       └── deploy/
│           └── route.ts   # POST
├── conversations/
│   ├── route.ts
│   └── [id]/
│       └── route.ts
├── contacts/
│   ├── route.ts
│   └── [id]/
│       └── route.ts
├── knowledge/
│   ├── route.ts
│   └── upload/
│       └── route.ts
└── webhooks/
    └── stripe/
        └── route.ts
```

### 2. Create Base Route

```typescript
// src/app/api/bots/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { bots } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const userBots = await db.query.bots.findMany({
    where: eq(bots.userId, userId),
  });
  
  return NextResponse.json(userBots);
}

export async function POST(request: Request) {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const body = await request.json();
  
  const [bot] = await db.insert(bots).values({
    userId,
    name: body.name,
    description: body.description,
  }).returning();
  
  return NextResponse.json(bot, { status: 201 });
}
```

### 3. Add Validation

```typescript
// src/lib/validations/bot.ts
import { z } from 'zod';

export const createBotSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  model: z.enum(['gpt-4o-mini', 'gpt-4o', 'claude-3-5-sonnet']),
  systemPrompt: z.string().max(10000),
});

export type CreateBotInput = z.infer<typeof createBotSchema>;
```

### 4. Add Error Handling

```typescript
// src/lib/api/errors.ts
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
  }
}

export function handleApiError(error: unknown) {
  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode },
    );
  }
  
  console.error(error);
  return NextResponse.json(
    { error: 'Internal Server Error' },
    { status: 500 },
  );
}
```

---

## API Conventions

### Request Format

```typescript
// GET /api/bots
// No body needed

// POST /api/bots
{
  "name": "My Bot",
  "description": "A helpful bot"
}

// PUT /api/bots/[id]
{
  "name": "Updated Bot"
}

// DELETE /api/bots/[id]
// No body needed
```

### Response Format

```typescript
// Success
{
  "data": { ... }
}

// List
{
  "data": [...],
  "total": 100,
  "page": 1,
  "pageSize": 10
}

// Error
{
  "error": "Error message"
}
```

---

## Verification

```bash
# Test GET
curl http://localhost:3000/api/bots

# Test POST
curl -X POST http://localhost:3000/api/bots \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Bot"}'
```

---

## Developer Notes

- Always authenticate requests
- Validate all inputs
- Handle errors gracefully
- Log API calls

## Future Improvements

- API versioning
- Rate limiting
- API documentation
- SDK generation
