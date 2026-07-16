# Folder Plan

---

## Executive Summary

This document defines the folder structure for SoftwBot AI.

---

## Purpose

Provide clear organization and navigation.

---

## Root Structure

```
softwbot-ai/
├── docs/                    # Documentation
├── src/                     # Source code
├── scripts/                 # Utility scripts
├── docker/                  # Docker configuration
├── .github/                 # GitHub workflows
├── .env.example            # Environment template
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── tailwind.config.ts      # Tailwind config
├── drizzle.config.ts       # Drizzle config
├── next.config.ts          # Next.js config
└── README.md               # Project readme
```

---

## Source Structure

```
src/
├── app/                     # Next.js App Router
│   ├── (auth)/              # Auth routes
│   ├── (dashboard)/         # Dashboard routes
│   ├── api/                 # API routes
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── ui/                  # UI components
│   ├── features/            # Feature components
│   └── shared/              # Shared components
├── lib/                     # Utilities
│   ├── db/                  # Database
│   ├── ai/                  # AI services
│   ├── whatsapp/            # WhatsApp
│   ├── auth/                # Authentication
│   ├── storage/             # File storage
│   ├── cache/               # Caching
│   ├── queue/               # Job queue
│   └── utils/               # Utilities
├── agents/                  # AI agents
│   ├── conversation/        # Conversation agent
│   ├── bot-architect/       # Bot Architect
│   ├── qa-agent/            # QA Agent
│   └── shared/              # Shared AI
├── hooks/                   # React hooks
├── types/                   # TypeScript types
├── stores/                  # State stores
└── styles/                  # CSS styles
```

---

## Documentation Structure

```
docs/
├── 00-README.md
├── 01-project-overview.md
├── 02-prd.md
├── 03-architecture.md
├── 04-api-spec.md
├── 05-database-design.md
├── 06-functional-requirements.md
├── 07-non-functional-requirements.md
├── 08-ui-spec.md
├── 09-flow-diagrams.md
├── 10-user-stories.md
├── 11-technical-stack.md
├── 12-clerk-auth-setup.md
├── 13-database-setup.md
├── 14-s3-storage-setup.md
├── 15-redis-setup.md
├── 16-bullmq-setup.md
├── 17-docker-setup.md
├── 18-whatsapp-integration.md
├── 19-bot-management.md
├── 20-ai-integration.md
├── 21-contact-management.md
├── 22-analytics.md
├── 23-rbac.md
├── 24-workspaces.md
├── 25-notifications.md
├── 26-integrations.md
├── 27-conversation-management.md
├── 28-knowledge-base.md
├── 29-prompt-engineering.md
├── 30-data-architecture.md
├── 31-future-features.md
├── 32-implementation-workflow.md
├── 33-development-phases.md
├── 34-milestones.md
├── 35-approval-process.md
├── 36-development-rules.md
├── 37-code-review-process.md
├── 38-testing-strategy.md
├── 39-quality-assurance.md
├── 40-git-workflow.md
├── 41-progress-reporting.md
├── 42-walkthrough-guidelines.md
├── 43-documentation-maintenance.md
├── 44-agent-architecture.md
├── 45-agent-registry.md
├── 46-shared-ai-core.md
├── 47-module-architecture.md
├── 48-feature-development-order.md
├── 49-component-guidelines.md
├── 50-state-management.md
├── 51-error-handling.md
├── 52-logging-monitoring.md
├── 53-performance-guidelines.md
├── 54-scaling-strategy.md
├── 55-release-process.md
├── 56-versioning.md
├── 57-deployment-strategy.md
├── 58-disaster-recovery.md
├── 59-backup-strategy.md
├── 60-observability.md
├── 61-coding-standards.md
├── 62-security-checklist.md
├── 63-acceptance-criteria.md
├── 64-definition-of-done.md
├── 65-risk-management.md
├── 66-dependency-map.md
├── 67-project-conventions.md
├── 68-folder-conventions.md
├── 69-ui-patterns.md
├── 70-api-conventions.md
├── 71-database-conventions.md
├── 72-ai-development-rules.md
├── 73-future-architecture.md
├── 74-plugin-system.md
├── 75-extension-system.md
├── planning/                # Planning docs
│   ├── implementation-plan.md
│   ├── milestones.md
│   ├── development-order.md
│   ├── folder-plan.md
│   ├── risk-analysis.md
│   ├── dependency-analysis.md
│   ├── architecture-summary.md
│   └── acceptance-checklist.md
└── walkthrough/             # Walkthrough guides
    ├── 00-overview.md
    ├── 01-project-setup.md
    ├── 02-database-setup.md
    ├── 03-auth-setup.md
    ├── 04-api-setup.md
    ├── 05-whatsapp-setup.md
    ├── 06-bot-builder-setup.md
    ├── 07-ai-setup.md
    ├── 08-testing-setup.md
    ├── 09-deployment-setup.md
    ├── 10-first-bot.md
    ├── 11-customization.md
    └── 12-troubleshooting.md
```

---

## Folder Naming

### Conventions

- Use kebab-case for folders
- Use lowercase for files
- Use descriptive names
- Group by feature

### Examples

```
✅ components/ui/button.tsx
✅ lib/ai/openrouter.ts
✅ agents/conversation/prompts.ts

❌ Components/Button.tsx
❌ Lib/AI/OpenRouter.ts
❌ agents/Conversation/Prompts.ts
```

---

## Developer Notes

- Follow folder structure strictly
- Use appropriate folders
- Keep folders organized
- Document changes

## Future Improvements

- Automated folder validation
- Folder templates
- Folder documentation
- Folder analytics
