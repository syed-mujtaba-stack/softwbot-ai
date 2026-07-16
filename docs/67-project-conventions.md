# 67 — Project Conventions

---

## Executive Summary

This document defines project-wide conventions for SoftwBot AI that apply across all modules and contributors.

---

## Purpose

Ensure consistency and reduce cognitive load when working across the codebase.

---

## Naming Conventions

### Files

| Type | Convention | Example |
|------|-----------|---------|
| React components | kebab-case | `bot-card.tsx` |
| Page files | page.tsx | `page.tsx` |
| Layout files | layout.tsx | `layout.tsx` |
| Route handlers | route.ts | `route.ts` |
| Server actions | actions.ts | `actions.ts` |
| Utilities | kebab-case | `format-date.ts` |
| Types | kebab-case | `bot-types.ts` |
| Validators | kebab-case | `bot-schema.ts` |
| Tests | `*.test.ts` | `client.test.ts` |
| E2E tests | `*.spec.ts` | `auth.spec.ts` |

### Code

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `BotCard` |
| Functions | camelCase | `formatDate` |
| Variables | camelCase | `botName` |
| Constants | UPPER_SNAKE_CASE | `MAX_TOKENS` |
| Types/Interfaces | PascalCase | `BotConfig` |
| Enums | PascalCase | `BotStatus` |
| DB tables | snake_case | `knowledge_chunks` |
| DB columns | snake_case | `created_at` |

---

## Import Conventions

### Path Aliases

```typescript
// tsconfig.json
{
  "paths": {
    "@/*": ["./src/*"],
    "@/components/*": ["./src/components/*"],
    "@/lib/*": ["./src/lib/*"],
    "@/types/*": ["./src/types/*"]
  }
}
```

### Import Order

```typescript
// 1. React/Next.js
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// 2. External libraries
import { z } from 'zod';
import { format } from 'date-fns';

// 3. UI components (Shadcn)
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// 4. Shared components
import { EmptyState } from '@/components/shared/empty-state';

// 5. Feature components
import { BotCard } from '@/components/dashboard/bots/bot-card';

// 6. Lib utilities
import { cn } from '@/lib/utils/cn';
import { db } from '@/lib/db';

// 7. Types
import type { Bot } from '@/types/bot';
```

---

## Comment Conventions

### File Header

```typescript
/**
 * Bot Card Component
 * 
 * Displays a bot's summary information in a card format.
 * Used in the bot list and dashboard overview.
 */
```

### TODO Format

```typescript
// TODO: [description] — [ticket-number]
// TODO: Add rate limiting — SOFT-123
```

### FIXME Format

```typescript
// FIXME: [description] — [ticket-number]
// FIXME: Memory leak on large datasets — SOFT-456
```

---

## Error Message Conventions

### User-Facing Messages

```typescript
// ✅ Good - Clear and actionable
'Please enter a bot name'
'Bot name must be at most 100 characters'
'Failed to create bot. Please try again.'

// ❌ Bad - Unclear
'Invalid input'
'Error'
'Something went wrong'
```

### Developer-Facing Messages

```typescript
// ✅ Good - Includes context
`Failed to create bot: ${error.message}`
`WhatsApp connection timeout after ${timeout}ms`

// ❌ Bad - No context
'Error'
'Failed'
```

---

## URL Conventions

### Routes

```
/bots                    # List
/bots/new                # Create
/bots/[id]               # Detail
/bots/[id]/configuration # Sub-page
```

### API Endpoints

```
/api/v1/bots             # GET, POST
/api/v1/bots/[id]        # GET, PATCH, DELETE
/api/v1/bots/[id]/activate # POST
```

---

## Date/Time Conventions

### Storage

- All timestamps stored as UTC
- Use `timestamp with time zone` in PostgreSQL
- Use `Date` objects in TypeScript

### Display

- Convert to user's timezone for display
- Use `date-fns` for formatting
- Relative time for recent events ("2 hours ago")

---

## Developer Notes

- Follow these conventions consistently
- Use the linter to enforce conventions
- Update conventions when patterns change
- Document exceptions explicitly

## Future Improvements

- Automated convention enforcement
- Convention linting rules
- Convention analytics
- Convention training
