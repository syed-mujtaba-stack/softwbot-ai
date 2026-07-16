# 19 — Folder Structure

---

## Executive Summary

This document defines the complete project directory structure, file naming conventions, import patterns, and organization standards for the SoftwBot AI codebase.

---

## Purpose

A consistent folder structure ensures developers can find files quickly, understand code organization, and maintain the codebase at scale.

---

## Complete Directory Tree

```
softwbot-ai/
├── AGENTS.md                          # AI agent instructions
├── CLAUDE.md                          # Claude-specific instructions
├── README.md                          # Project README
├── package.json                       # Dependencies and scripts
├── package-lock.json                  # Lockfile
├── tsconfig.json                      # TypeScript config
├── next.config.ts                     # Next.js config
├── postcss.config.mjs                 # PostCSS config (Tailwind)
├── eslint.config.mjs                  # ESLint flat config
├── .env.local                         # Local environment variables
├── .env.example                       # Environment template
├── .gitignore                         # Git ignore rules
├── drizzle.config.ts                  # Drizzle ORM config
│
├── docs/                              # Product documentation
│   ├── README.md
│   ├── 00-project-overview.md
│   └── ... (31 docs)
│
├── public/                            # Static assets
│   ├── favicon.ico
│   ├── logo.svg
│   ├── og-image.png                   # Open Graph image
│   └── placeholder/                   # Placeholder images
│       ├── empty-conversations.svg
│         ├── empty-bots.svg
│         └── empty-knowledge.svg
│
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── layout.tsx                 # Root layout (HTML shell)
│   │   ├── page.tsx                   # Landing page
│   │   ├── globals.css                # Global styles + Tailwind
│   │   ├── not-found.tsx              # 404 page
│   │   ├── error.tsx                  # Global error boundary
│   │   ├── loading.tsx                # Global loading state
│   │   │
│   │   ├── (auth)/                    # Auth route group (no layout prefix)
│   │   │   ├── layout.tsx             # Auth layout (centered, no sidebar)
│   │   │   ├── sign-in/
│   │   │   │   └── page.tsx           # Sign in page
│   │   │   ├── sign-up/
│   │   │   │   └── page.tsx           # Sign up page
│   │   │   ├── verify-email/
│   │   │   │   └── page.tsx           # Email verification
│   │   │   ├── reset-password/
│   │   │   │   └── page.tsx           # Password reset
│   │   │   └── sso-callback/
│   │   │       └── page.tsx           # SSO callback handler
│   │   │
│   │   ├── (dashboard)/               # Dashboard route group
│   │   │   ├── layout.tsx             # Dashboard layout (sidebar + topbar)
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx           # Overview page
│   │   │   ├── bots/
│   │   │   │   ├── page.tsx           # Bot list
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx       # Create bot
│   │   │   │   └── [botId]/
│   │   │   │       ├── page.tsx       # Bot detail (overview tab)
│   │   │   │       ├── configuration/
│   │   │   │       │   └── page.tsx   # Bot configuration
│   │   │   │       ├── knowledge/
│   │   │   │       │   └── page.tsx   # Knowledge base
│   │   │   │       ├── conversations/
│   │   │   │       │   └── page.tsx   # Bot conversations
│   │   │   │       ├── automation/
│   │   │   │       │   └── page.tsx   # Bot automations
│   │   │   │       └── analytics/
│   │   │   │           └── page.tsx   # Bot analytics
│   │   │   ├── bot-architect/
│   │   │   │   └── page.tsx           # Bot Architect
│   │   │   ├── prompt-builder/
│   │   │   │   └── page.tsx           # Prompt builder
│   │   │   ├── conversations/
│   │   │   │   └── page.tsx           # All conversations inbox
│   │   │   ├── contacts/
│   │   │   │   └── page.tsx           # Contacts management
│   │   │   ├── leads/
│   │   │   │   └── page.tsx           # Lead pipeline
│   │   │   ├── automation/
│   │   │   │   └── page.tsx           # Automation rules
│   │   │   ├── broadcast/
│   │   │   │   └── page.tsx           # Broadcast campaigns
│   │   │   ├── analytics/
│   │   │   │   └── page.tsx           # Analytics dashboard
│   │   │   ├── integrations/
│   │   │   │   └── page.tsx           # Integrations
│   │   │   ├── settings/
│   │   │   │   ├── page.tsx           # Workspace settings
│   │   │   │   ├── profile/
│   │   │   │   │   └── page.tsx       # User profile
│   │   │   │   ├── security/
│   │   │   │   │   └── page.tsx       # Security settings
│   │   │   │   ├── notifications/
│   │   │   │   │   └── page.tsx       # Notification prefs
│   │   │   │   └── danger/
│   │   │   │       └── page.tsx       # Danger zone
│   │   │   ├── billing/
│   │   │   │   └── page.tsx           # Billing management
│   │   │   ├── team/
│   │   │   │   └── page.tsx           # Team members
│   │   │   └── notifications/
│   │   │       └── page.tsx           # Notification center
│   │   │
│   │   └── api/                       # Route Handlers
│   │       ├── v1/                    # API version
│   │       │   ├── auth/
│   │       │   │   └── webhook/
│   │       │   │       └── route.ts   # Clerk webhook
│   │       │   ├── workspaces/
│   │       │   │   ├── route.ts       # GET, POST
│   │       │   │   └── [id]/
│   │       │   │       ├── route.ts   # GET, PATCH, DELETE
│   │       │   │       ├── invite/
│   │       │   │       │   └── route.ts
│   │       │   │       └── members/
│   │       │   │           └── [userId]/
│   │       │   │               └── route.ts
│   │       │   ├── bots/
│   │       │   │   ├── [id]/
│   │       │   │   │   ├── route.ts
│   │       │   │   │   ├── activate/
│   │       │   │   │   │   └── route.ts
│   │       │   │   │   ├── pause/
│   │       │   │   │   │   └── route.ts
│   │       │   │   │   ├── clone/
│   │       │   │   │   │   └── route.ts
│   │       │   │   │   ├── whatsapp/
│   │       │   │   │   │   ├── qr/
│   │       │   │   │   │   │   └── route.ts
│   │       │   │   │   │   ├── status/
│   │       │   │   │   │   │   └── route.ts
│   │       │   │   │   │   ├── disconnect/
│   │       │   │   │   │   │   └── route.ts
│   │       │   │   │   │   └── reconnect/
│   │       │   │   │   │       └── route.ts
│   │       │   │   │   ├── knowledge/
│   │       │   │   │   │   └── [kid]/
│   │       │   │   │   │       ├── route.ts
│   │       │   │   │   │       ├── files/
│   │       │   │   │   │       │   └── [fid]/
│   │       │   │   │   │       │       └── route.ts
│   │       │   │   │   │       ├── crawl/
│   │       │   │   │   │       │   └── route.ts
│   │       │   │   │   │       └── search/
│   │       │   │   │   │           └── route.ts
│   │       │   │   │   ├── conversations/
│   │       │   │   │   │   └── [cid]/
│   │       │   │   │   │       ├── route.ts
│   │       │   │   │   │       ├── messages/
│   │       │   │   │   │       │   └── route.ts
│   │       │   │   │   │       ├── handoff/
│   │       │   │   │   │       │   └── route.ts
│   │       │   │   │   │       └── resolve/
│   │       │   │   │   │           └── route.ts
│   │       │   │   │   ├── automations/
│   │       │   │   │   │   └── [aid]/
│   │       │   │   │   │       ├── route.ts
│   │       │   │   │   │       ├── toggle/
│   │       │   │   │   │       │   └── route.ts
│   │       │   │   │   │       └── executions/
│   │       │   │   │   │           └── route.ts
│   │       │   │   │   └── analytics/
│   │       │   │   │       └── [type]/
│   │       │   │   │           └── route.ts
│   │       │   ├── bot-architect/
│   │       │   │   ├── start/
│   │       │   │   │   └── route.ts
│   │       │   │   ├── message/
│   │       │   │   │   └── route.ts
│   │       │   │   ├── session/
│   │       │   │   │   └── [id]/
│   │       │   │   │       └── route.ts
│   │       │   │   └── generate/
│   │       │   │       └── route.ts
│   │       │   ├── contacts/
│   │       │   │   └── ... (CRUD routes)
│   │       │   ├── leads/
│   │       │   │   └── ... (CRUD routes)
│   │       │   ├── broadcasts/
│   │       │   │   └── ... (CRUD routes)
│   │       │   ├── notifications/
│   │       │   │   └── ... (routes)
│   │       │   └── webhooks/
│   │       │       └── stripe/
│   │       │           └── route.ts   # Stripe webhook
│   │       └── webhooks/
│   │           └── whatsapp/
│   │               └── route.ts       # WhatsApp webhook
│   │
│   ├── components/                    # React components
│   │   ├── ui/                        # Shadcn UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── select.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── card.tsx
│   │   │   ├── table.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── tooltip.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── command.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── label.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── date-picker.tsx
│   │   │   ├── form.tsx               # React Hook Form integration
│   │   │   └── index.ts               # Barrel export
│   │   │
│   │   ├── layout/                    # Layout components
│   │   │   ├── sidebar.tsx
│   │   │   ├── topbar.tsx
│   │   │   ├── dashboard-layout.tsx
│   │   │   ├── auth-layout.tsx
│   │   │   ├── mobile-nav.tsx
│   │   │   └── breadcrumbs.tsx
│   │   │
│   │   ├── shared/                    # Shared components
│   │   │   ├── empty-state.tsx
│   │   │   ├── error-boundary.tsx
│   │   │   ├── loading-spinner.tsx
│   │   │   ├── data-table.tsx
│   │   │   ├── search-input.tsx
│   │   │   ├── date-range-picker.tsx
│   │   │   ├── confirm-dialog.tsx
│   │   │   ├── page-header.tsx
│   │   │   ├── metric-card.tsx
│   │   │   └── notification-bell.tsx
│   │   │
│   │   ├── dashboard/                 # Dashboard page components
│   │   │   ├── overview/
│   │   │   │   ├── metric-cards.tsx
│   │   │   │   ├── activity-feed.tsx
│   │   │   │   ├── performance-chart.tsx
│   │   │   │   └── bot-status-grid.tsx
│   │   │   ├── bots/
│   │   │   │   ├── bot-card.tsx
│   │   │   │   ├── bot-list.tsx
│   │   │   │   ├── bot-grid.tsx
│   │   │   │   └── create-bot-dialog.tsx
│   │   │   ├── conversations/
│   │   │   │   ├── conversation-list.tsx
│   │   │   │   ├── chat-thread.tsx
│   │   │   │   ├── message-bubble.tsx
│   │   │   │   ├── contact-sidebar.tsx
│   │   │   │   └── human-input.tsx
│   │   │   ├── knowledge/
│   │   │   │   ├── upload-zone.tsx
│   │   │   │   ├── file-list.tsx
│   │   │   │   ├── search-test.tsx
│   │   │   │   └── chunk-settings.tsx
│   │   │   ├── automation/
│   │   │   │   ├── rule-list.tsx
│   │   │   │   ├── rule-builder.tsx
│   │   │   │   └── template-gallery.tsx
│   │   │   ├── leads/
│   │   │   │   ├── kanban-board.tsx
│   │   │   │   ├── lead-card.tsx
│   │   │   │   └── lead-list.tsx
│   │   │   └── analytics/
│   │   │       ├── overview-charts.tsx
│   │   │       └── bot-performance.tsx
│   │   │
│   │   └── bot-architect/             # Bot Architect components
│   │       ├── chat-interface.tsx
│   │       ├── config-preview.tsx
│   │       ├── progress-stepper.tsx
│   │       └── deploy-button.tsx
│   │
│   ├── lib/                           # Utility libraries
│   │   ├── db/                        # Database
│   │   │   ├── index.ts               # Drizzle client
│   │   │   ├── schema.ts              # All table schemas
│   │   │   └── migrations/            # Drizzle migrations
│   │   │
│   │   ├── ai/                        # AI services
│   │   │   ├── openrouter.ts          # OpenRouter client
│   │   │   ├── models.ts              # Model definitions
│   │   │   ├── conversation.ts        # Conversation agent
│   │   │   ├── bot-architect.ts       # Bot Architect agent
│   │   │   ├── knowledge.ts           # Knowledge agent
│   │   │   ├── memory.ts              # Memory agent
│   │   │   ├── prompts.ts             # Prompt templates
│   │   │   └── tokens.ts              # Token counting
│   │   │
│   │   ├── whatsapp/                  # WhatsApp integration
│   │   │   ├── client.ts              # whatsapp-web.js wrapper
│   │   │   ├── session-manager.ts     # Session persistence
│   │   │   ├── message-handler.ts     # Message processing
│   │   │   ├── media-handler.ts       # Media processing
│   │   │   └── reconnect.ts           # Reconnect logic
│   │   │
│   │   ├── queue/                     # BullMQ queues
│   │   │   ├── index.ts               # Queue client
│   │   │   ├── message-processing.ts  # Message queue
│   │   │   ├── ai-response.ts         # AI response queue
│   │   │   ├── media-processing.ts    # Media queue
│   │   │   ├── broadcast.ts           # Broadcast queue
│   │   │   └── automation.ts          # Automation queue
│   │   │
│   │   ├── storage/                   # S3 storage
│   │   │   ├── client.ts              # S3 client
│   │   │   ├── upload.ts              # Upload helpers
│   │   │   └── presigned.ts           # Presigned URLs
│   │   │
│   │   ├── auth/                      # Authentication
│   │   │   ├── clerk.ts               # Clerk client
│   │   │   └── middleware.ts          # Auth middleware
│   │   │
│   │   ├── billing/                   # Stripe billing
│   │   │   ├── stripe.ts              # Stripe client
│   │   │   ├── subscriptions.ts       # Subscription logic
│   │   │   └── webhooks.ts            # Webhook handlers
│   │   │
│   │   ├── email/                     # Email service
│   │   │   ├── client.ts              # Email client
│   │   │   └── templates/             # Email templates
│   │   │       ├── welcome.ts
│   │   │       ├── weekly-digest.ts
│   │   │       └── billing.ts
│   │   │
│   │   ├── validators/                # Zod schemas
│   │   │   ├── auth.ts
│   │   │   ├── bot.ts
│   │   │   ├── knowledge.ts
│   │   │   ├── conversation.ts
│   │   │   ├── lead.ts
│   │   │   ├── automation.ts
│   │   │   └── index.ts
│   │   │
│   │   └── utils/                     # Utility functions
│   │       ├── cn.ts                  # Tailwind class merger
│   │       ├── format.ts              # Date/number formatting
│   │       ├── generate.ts            # ID/slug generation
│   │       ├── logger.ts              # Structured logging
│   │       └── rate-limit.ts          # Rate limiting
│   │
│   ├── hooks/                         # React hooks
│   │   ├── use-conversations.ts
│   │   ├── use-bot.ts
│   │   ├── use-realtime.ts
│   │   ├── use-debounce.ts
│   │   └── use-media-query.ts
│   │
│   ├── stores/                        # State management
│   │   ├── workspace-store.ts
│   │   └── ui-store.ts
│   │
│   └── types/                         # TypeScript types
│       ├── database.ts                # Generated DB types
│       ├── api.ts                     # API response types
│       ├── bot.ts                     # Bot types
│       ├── conversation.ts
│       ├── contact.ts
│       ├── lead.ts
│       └── index.ts
│
├── tests/                             # Test files
│   ├── unit/
│   │   ├── lib/
│   │   │   ├── ai/
│   │   │   └── validators/
│   │   └── components/
│   ├── integration/
│   │   ├── api/
│   │   └── db/
│   └── e2e/
│       ├── auth.spec.ts
│       ├── bots.spec.ts
│       └── conversations.spec.ts
│
└── scripts/                           # Utility scripts
    ├── seed.ts                        # Database seeding
    ├── migrate.ts                     # Migration runner
    └── generate-types.ts              # Type generation
```

---

## Naming Conventions

| Category | Convention | Example |
|----------|-----------|---------|
| Files (components) | kebab-case | `bot-card.tsx` |
| Files (utilities) | kebab-case | `rate-limit.ts` |
| Files (pages) | page.tsx | `page.tsx` |
| Files (layouts) | layout.tsx | `layout.tsx` |
| Components (export) | PascalCase | `BotCard` |
| Functions | camelCase | `formatDate` |
| Types/Interfaces | PascalCase | `BotConfig` |
| Constants | UPPER_SNAKE_CASE | `MAX_TOKENS` |
| Database tables | snake_case | `knowledge_chunks` |
| CSS variables | kebab-case | `--bg-primary` |

---

## Import Conventions

```typescript
// Path aliases (configured in tsconfig.json)
// @/* → ./*

// Import order:
// 1. React/Next.js
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// 2. External libraries
import { z } from 'zod';
import { format } from 'date-fns';

// 3. UI components
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

## Environment Variables

```env
# .env.local

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

# Database
DATABASE_URL=

# Redis
REDIS_URL=

# S3 Storage
S3_BUCKET=
S3_REGION=
S3_ACCESS_KEY=
S3_SECRET_KEY=
S3_ENDPOINT=

# OpenRouter
OPENROUTER_API_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

---

## Developer Notes

- Never use `@/` imports outside of `src/`
- Keep imports organized (follow import order)
- Use barrel exports (index.ts) for component directories
- Co-locate related files (component + tests + types)
- Database migrations in `src/lib/db/migrations/`

## Future Improvements

- ESLint import ordering rule
- Automatic barrel export generation
- Path alias for test utilities
- Monorepo structure for future mobile app
