# 71 — Database Conventions

---

## Executive Summary

This document defines database design conventions for SoftwBot AI.

---

## Purpose

Ensure consistent, performant, and maintainable database design.

---

## Table Conventions

### Naming

- Use snake_case for table names
- Use plural nouns (users, bots, conversations)
- Use singular for junction tables (workspace_members)

### Column Naming

- Use snake_case for column names
- Use id for primary keys
- Use _id suffix for foreign keys
- Use created_at, updated_at for timestamps
- Use is_ prefix for boolean flags

---

## Standard Columns

Every table should have:

```sql
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
created_at TIMESTAMP NOT NULL DEFAULT NOW(),
updated_at TIMESTAMP NOT NULL DEFAULT NOW()
```

Optional standard columns:

```sql
deleted_at TIMESTAMP,           -- Soft delete
created_by UUID REFERENCES users(id),
updated_by UUID REFERENCES users(id)
```

---

## Primary Keys

```sql
-- Always use UUIDs
id UUID PRIMARY KEY DEFAULT gen_random_uuid()
```

---

## Foreign Keys

```sql
-- Explicit constraint names
CONSTRAINT fk_bots_workspace
  FOREIGN KEY (workspace_id) 
  REFERENCES workspaces(id)
  ON DELETE CASCADE
```

### Cascade Rules

| Relationship | Cascade |
|-------------|---------|
| Workspace → Bots | CASCADE |
| Bot → Conversations | CASCADE |
| Conversation → Messages | CASCADE |
| User → Workspaces | RESTRICT |

---

## Indexes

### Naming Convention

```sql
-- Format: idx_{table}_{columns}
CREATE INDEX idx_bots_workspace_id ON bots(workspace_id);
CREATE INDEX idx_conversations_bot_status ON conversations(bot_id, status);
```

### Index Types

| Type | Use Case |
|------|----------|
| B-tree | Default, equality/range |
| GIN | Arrays, JSONB, full-text |
| HNSW | Vector similarity |
| Partial | Filtered indexes |

---

## JSONB Columns

### Usage

```sql
-- Store flexible metadata
settings JSONB DEFAULT '{}',
custom_fields JSONB DEFAULT '{}'
```

### Querying

```sql
-- JSONB containment
WHERE settings @> '{"theme": "dark"}'

-- JSONB path access
WHERE (settings->>'theme') = 'dark'
```

---

## Timestamps

### Storage

```sql
-- Always UTC
created_at TIMESTAMP NOT NULL DEFAULT NOW(),
updated_at TIMESTAMP NOT NULL DEFAULT NOW()
```

### Auto-Update Trigger

```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_updated_at
  BEFORE UPDATE ON bots
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

---

## Soft Deletes

```sql
-- Add deleted_at column
deleted_at TIMESTAMP

-- Query non-deleted records
WHERE deleted_at IS NULL

-- Soft delete
UPDATE table SET deleted_at = NOW() WHERE id = $1
```

---

## Migrations

### Rules

1. Never modify existing migrations
2. Always create new migrations
3. Always test rollback
4. Always document changes
5. Use IF NOT EXISTS / IF EXISTS

### Naming

```
001_initial_schema.sql
002_add_bots_table.sql
003_add_knowledge_base.sql
```

---

## Query Conventions

### Drizzle ORM

```typescript
// ✅ Good - Use Drizzle
const bot = await db.query.bots.findFirst({
  where: eq(bots.id, botId),
  with: { conversations: true }
});

// ❌ Bad - Raw SQL
const bot = await db.execute(`SELECT * FROM bots WHERE id = '${botId}'`);
```

### Select Specific Columns

```typescript
// ✅ Good - Select only needed columns
const bots = await db.query.bots.findMany({
  columns: { id: true, name: true, status: true }
});
```

---

## Performance Rules

1. Always use indexes for queries
2. Avoid SELECT * in production
3. Use connection pooling
4. Paginate large result sets
5. Use EXPLAIN ANALYZE for slow queries

---

## Developer Notes

- Follow these conventions strictly
- Review schema changes in PRs
- Test migrations before applying
- Document all schema changes

## Future Improvements

- Schema validation automation
- Query performance monitoring
- Index recommendation
- Schema documentation generation
