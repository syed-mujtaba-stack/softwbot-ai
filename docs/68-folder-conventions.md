# 68 — Folder Conventions

---

## Executive Summary

This document defines folder organization rules for SoftwBot AI.

---

## Purpose

Ensure consistent file organization across the codebase.

---

## Root Structure

```
softwbot-ai/
├── docs/                  # Documentation
├── public/                # Static assets
├── src/                   # Source code
├── tests/                 # Test files
├── scripts/               # Utility scripts
├── planning/              # Planning documents
└── walkthrough/           # Walkthrough documents
```

---

## src/ Structure

```
src/
├── app/                   # Next.js App Router
│   ├── (auth)/            # Auth route group
│   ├── (dashboard)/       # Dashboard route group
│   └── api/               # API routes
│
├── components/            # React components
│   ├── ui/                # Shadcn UI primitives
│   ├── layout/            # Layout components
│   ├── shared/            # Cross-module components
│   ├── dashboard/         # Dashboard-specific
│   └── bot-architect/     # Bot Architect specific
│
├── lib/                   # Business logic
│   ├── db/                # Database
│   ├── ai/                # AI services
│   ├── whatsapp/          # WhatsApp integration
│   ├── queue/             # Job queues
│   ├── storage/           # File storage
│   ├── auth/              # Authentication
│   ├── billing/           # Billing
│   ├── email/             # Email service
│   ├── validators/        # Zod schemas
│   └── utils/             # Utilities
│
├── hooks/                 # React hooks
├── stores/                # State management
└── types/                 # TypeScript types
```

---

## Module Folder Structure

```
module-name/
├── actions/               # Server actions
├── api/                   # Route handlers
├── components/            # UI components
├── hooks/                 # React hooks
├── lib/                   # Business logic
├── types/                 # TypeScript types
└── validators/            # Zod schemas
```

---

## Component Organization

```
components/
├── ui/                    # Shadcn primitives (never modify)
│   ├── button.tsx
│   ├── card.tsx
│   └── index.ts
│
├── layout/                # App layout
│   ├── sidebar.tsx
│   ├── topbar.tsx
│   └── dashboard-layout.tsx
│
├── shared/                # Reusable across modules
│   ├── empty-state.tsx
│   ├── error-boundary.tsx
│   └── data-table.tsx
│
└── dashboard/             # Dashboard-specific
    ├── overview/
    ├── bots/
    ├── conversations/
    └── analytics/
```

---

## File Placement Rules

### Components

| Component Type | Location |
|---------------|----------|
| Shadcn primitive | `components/ui/` |
| Layout component | `components/layout/` |
| Shared component | `components/shared/` |
| Feature component | `components/{feature}/` |
| Page component | `app/{route}/page.tsx` |

### Business Logic

| Logic Type | Location |
|-----------|----------|
| Database queries | `lib/db/` |
| AI services | `lib/ai/` |
| External integrations | `lib/{service}/` |
| Validation schemas | `lib/validators/` |
| Utility functions | `lib/utils/` |

---

## Barrel Exports

### Component Index

```typescript
// components/dashboard/bots/index.ts
export { BotCard } from './bot-card';
export { BotList } from './bot-list';
export { BotGrid } from './bot-grid';
```

### Lib Index

```typescript
// lib/ai/index.ts
export { openrouter } from './openrouter';
export { models } from './models';
export { conversationAgent } from './conversation';
```

---

## Anti-Patterns

### ❌ Don't

- Put business logic in components
- Put UI code in lib/
- Create deeply nested folders
- Mix feature-specific and shared code
- Use generic folder names (utils, helpers)

### ✅ Do

- Keep components focused
- Separate concerns clearly
- Use descriptive folder names
- Co-locate related files
- Use barrel exports

---

## Developer Notes

- Follow these conventions strictly
- Use the linter to enforce structure
- Document exceptions
- Review folder structure in PRs

## Future Improvements

- Automated folder structure validation
- Folder structure templates
- Folder structure analytics
