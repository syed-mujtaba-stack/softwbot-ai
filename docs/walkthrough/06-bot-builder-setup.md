# Bot Builder Setup

---

## Executive Summary

Set up the bot creation and management system.

---

## Duration

30 minutes

---

## Prerequisites

- Project setup complete
- Database setup complete
- AI setup complete

---

## Steps

### 1. Create Bot Schema

```typescript
// Add to src/lib/db/schema.ts
export const bots = pgTable('bots', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  model: varchar('model', { length: 50 }).default('gpt-4o-mini'),
  systemPrompt: text('system_prompt'),
  status: varchar('status', { length: 20 }).default('draft'),
  settings: jsonb('settings').default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

### 2. Create Bot Form Component

```typescript
// src/components/features/bots/bot-form.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function BotForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const response = await fetch('/api/bots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    });
    
    if (response.ok) {
      const bot = await response.json();
      router.push(`/bots/${bot.id}`);
    }
    
    setLoading(false);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Bot name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Bot'}
      </Button>
    </form>
  );
}
```

### 3. Create Bot List Page

```typescript
// src/app/(dashboard)/bots/page.tsx
import { db } from '@/lib/db';
import { bots } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';
import { BotCard } from '@/components/features/bots/bot-card';

export default async function BotsPage() {
  const { userId } = await auth();
  
  const userBots = await db.query.bots.findMany({
    where: eq(bots.userId, userId!),
    orderBy: (bots, { desc }) => [desc(bots.createdAt)],
  });
  
  return (
    <div>
      <h1>My Bots</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {userBots.map((bot) => (
          <BotCard key={bot.id} bot={bot} />
        ))}
      </div>
    </div>
  );
}
```

### 4. Create Bot Card Component

```typescript
// src/components/features/bots/bot-card.tsx
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BotCardProps {
  bot: {
    id: string;
    name: string;
    description: string | null;
    status: string;
  };
}

export function BotCard({ bot }: BotCardProps) {
  return (
    <Link href={`/bots/${bot.id}`}>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{bot.name}</CardTitle>
            <Badge variant={bot.status === 'active' ? 'default' : 'secondary'}>
              {bot.status}
            </Badge>
          </div>
          <CardDescription>{bot.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
```

---

## Verification

1. Navigate to `/bots`
2. Click "Create Bot"
3. Fill in form
4. Submit
5. Verify bot appears in list

---

## Developer Notes

- Validate all inputs
- Handle loading states
- Show error messages
- Refresh data after mutations

## Future Improvements

- Bot templates
- Bot cloning
- Bot sharing
- Bot analytics
