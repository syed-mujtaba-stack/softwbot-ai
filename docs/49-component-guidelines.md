# 49 — Component Guidelines

---

## Executive Summary

This document defines the guidelines for creating, naming, organizing, and testing React components in SoftwBot AI.

---

## Purpose

Ensure consistent, maintainable, and accessible UI components.

---

## Component Types

### Server Components (Default)

```typescript
// ServerComponent.tsx
// No 'use client' directive
// Can directly access database, APIs
// Cannot use hooks, browser APIs

import { db } from '@/lib/db';

export default async function BotPage({ params }) {
  const bot = await db.query.bots.findFirst({
    where: eq(bots.id, params.id)
  });
  
  return <BotDetails bot={bot} />;
}
```

### Client Components

```typescript
'use client';

// Has 'use client' directive
// Can use hooks, browser APIs
// Cannot directly access database

import { useState } from 'react';

export function BotForm() {
  const [name, setName] = useState('');
  return <input value={name} onChange={e => setName(e.target.value)} />;
}
```

---

## Component Structure

### File Structure

```
components/
├── ui/                    # Shadcn primitives
├── layout/                # Layout components
├── shared/                # Cross-module components
├── dashboard/             # Dashboard components
│   ├── bots/
│   │   ├── bot-card.tsx
│   │   ├── bot-list.tsx
│   │   └── index.ts
│   ├── conversations/
│   └── analytics/
└── bot-architect/
```

### Component File Template

```typescript
// ComponentName.tsx

import { cn } from '@/lib/utils/cn';
import type { ComponentNameProps } from './types';

export function ComponentName({ 
  prop1, 
  prop2, 
  className,
  ...props 
}: ComponentNameProps) {
  return (
    <div className={cn('base-classes', className)} {...props}>
      {/* Content */}
    </div>
  );
}
```

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Component file | kebab-case | `bot-card.tsx` |
| Component export | PascalCase | `BotCard` |
| Props interface | PascalCase + Props | `BotCardProps` |
| Hook file | use- prefix | `use-bot.ts` |
| Hook export | use- prefix | `useBot` |
| Utility file | kebab-case | `format-date.ts` |
| Utility export | camelCase | `formatDate` |

---

## Props Guidelines

### Required Props First

```typescript
interface BotCardProps {
  // Required
  bot: Bot;
  onSelect: (id: string) => void;
  
  // Optional
  variant?: 'default' | 'compact';
  showStatus?: boolean;
  className?: string;
}
```

### Use TypeScript Strictly

```typescript
// ✅ Good
interface BotCardProps {
  bot: Bot;
  onSelect: (id: string) => void;
}

// ❌ Bad
interface BotCardProps {
  bot: any;
  onSelect: Function;
}
```

---

## Styling Guidelines

### Use Tailwind Classes

```typescript
// ✅ Good
<div className="flex items-center gap-2 p-4">

// ❌ Bad
<div style={{ display: 'flex', alignItems: 'center' }}>
```

### Use cn() for Conditional Classes

```typescript
import { cn } from '@/lib/utils/cn';

<div className={cn(
  'base-class',
  isActive && 'active-class',
  variant === 'compact' && 'compact-class',
  className
)}>
```

---

## Accessibility Guidelines

### Semantic HTML

```typescript
// ✅ Good
<nav>
  <ul>
    <li><a href="/bots">Bots</a></li>
  </ul>
</nav>

// ❌ Bad
<div>
  <div onclick="navigate('/bots')">Bots</div>
</div>
```

### ARIA Attributes

```typescript
<button
  aria-label="Delete bot"
  aria-describedby="delete-warning"
>
  Delete
</button>
```

### Keyboard Navigation

```typescript
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick();
    }
  }}
>
```

---

## Performance Guidelines

### Lazy Loading

```typescript
import dynamic from 'next/dynamic';

const BotChart = dynamic(() => import('./bot-chart'), {
  loading: () => <Skeleton />,
  ssr: false
});
```

### Memoization

```typescript
const MemoizedBotCard = React.memo(BotCard, (prev, next) => {
  return prev.bot.id === next.bot.id;
});
```

---

## Testing Guidelines

### Component Test Template

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { BotCard } from './bot-card';

describe('BotCard', () => {
  const mockBot = {
    id: 'bot-1',
    name: 'Test Bot',
    status: 'active'
  };

  it('renders bot name', () => {
    render(<BotCard bot={mockBot} onSelect={vi.fn()} />);
    expect(screen.getByText('Test Bot')).toBeInTheDocument();
  });

  it('calls onSelect when clicked', async () => {
    const onSelect = vi.fn();
    render(<BotCard bot={mockBot} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onSelect).toHaveBeenCalledWith('bot-1');
  });
});
```

---

## Developer Notes

- Components should be small and focused
- One component per file
- Export components from index.ts
- Use TypeScript interfaces for props
- Test all interactive behavior

## Future Improvements

- Component storybook
- Visual regression testing
- Component analytics
- Accessibility automated testing
