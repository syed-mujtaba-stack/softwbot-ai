# 61 — Coding Standards

---

## Executive Summary

This document defines comprehensive coding standards for SoftwBot AI, covering TypeScript, React, API design, and general best practices.

---

## Purpose

Ensure consistent, high-quality, maintainable code across the entire codebase.

---

## TypeScript Standards

### Strict Mode

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### Type Definitions

```typescript
// ✅ Good - Explicit types
interface BotConfig {
  id: string;
  name: string;
  model: string;
  temperature: number;
}

// ❌ Bad - Implicit any
const config = { id: '1', name: 'Bot' };
```

### No `any`

```typescript
// ✅ Good - Use unknown or specific types
function processData(data: unknown) {
  if (typeof data === 'string') {
    return data.toUpperCase();
  }
}

// ❌ Bad - Using any
function processData(data: any) {
  return data.toUpperCase();
}
```

---

## React Standards

### Component Structure

```typescript
// ComponentName.tsx
import { cn } from '@/lib/utils/cn';
import type { ComponentNameProps } from './types';

export function ComponentName({ prop1, prop2, className }: ComponentNameProps) {
  return (
    <div className={cn('base-classes', className)}>
      {/* Content */}
    </div>
  );
}
```

### Server Components

```typescript
// ✅ Good - Server Component by default
export default async function BotPage({ params }) {
  const bot = await getBot(params.id);
  return <BotDetails bot={bot} />;
}
```

### Client Components

```typescript
// ✅ Good - Explicit 'use client'
'use client';

export function BotForm() {
  const [name, setName] = useState('');
  return <input value={name} onChange={e => setName(e.target.value)} />;
}
```

---

## API Standards

### Route Handler Structure

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1).max(100),
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    const data = schema.parse(body);
    
    // Process...
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
```

---

## Error Handling

```typescript
// ✅ Good - Typed errors
class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
  }
}

// Usage
const bot = await getBot(id);
if (!bot) throw new NotFoundError('Bot');
```

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Files (components) | kebab-case | `bot-card.tsx` |
| Files (utilities) | kebab-case | `format-date.ts` |
| Components | PascalCase | `BotCard` |
| Functions | camelCase | `formatDate` |
| Types | PascalCase | `BotConfig` |
| Constants | UPPER_SNAKE_CASE | `MAX_TOKENS` |
| Database tables | snake_case | `knowledge_chunks` |

---

## Import Order

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

## Forbidden Patterns

```typescript
// ❌ Never use `any`
const data: any = {};

// ❌ Never use `console.log` in production
console.log('debug');

// ❌ Never use `@ts-ignore`
// @ts-ignore

// ❌ Never use inline styles
<div style={{ color: 'red' }}>

// ❌ Never store secrets
const apiKey = 'sk-xxx';
```

---

## Code Review Checklist

- [ ] TypeScript strict mode compliant
- [ ] No `any` types
- [ ] Error handling present
- [ ] Tests written
- [ ] Documentation updated
- [ ] Accessible
- [ ] Responsive
- [ ] No console.log

---

## Developer Notes

- Standards are enforced via linting
- Exceptions require tech lead approval
- Standards are updated based on lessons learned

## Future Improvements

- Automated code formatting
- Pre-commit hooks
- AI code review
- Standards analytics
