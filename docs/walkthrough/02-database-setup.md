# Database Setup

---

## Executive Summary

Set up PostgreSQL database with Drizzle ORM.

---

## Duration

20 minutes

---

## Prerequisites

- Project setup complete
- PostgreSQL running

---

## Steps

### 1. Configure Database URL

```env
DATABASE_URL=postgresql://user:password@localhost:5432/softwbot
```

### 2. Configure Drizzle

```typescript
// drizzle.config.ts
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

### 3. Create Schema

```typescript
// src/lib/db/schema.ts
import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

### 4. Generate Migration

```bash
npm run db:generate
```

### 5. Apply Migration

```bash
npm run db:migrate
```

### 6. Open Studio

```bash
npm run db:studio
```

---

## Verification

```sql
-- Check tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check users table
SELECT * FROM users LIMIT 1;
```

---

## Common Commands

```bash
# Generate migration
npm run db:generate

# Apply migrations
npm run db:migrate

# Push schema changes
npm run db:push

# Open studio
npm run db:studio

# Drop database
npm run db:drop
```

---

## Developer Notes

- Always generate migrations
- Test migrations before applying
- Keep schema files organized
- Document schema changes

## Future Improvements

- Schema validation
- Migration testing
- Backup automation
- Performance monitoring
