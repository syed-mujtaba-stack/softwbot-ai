# SoftwBot AI — Product Documentation

> **AI-Powered WhatsApp Employees for Every Business**

Version: 2.0.0 | Last Updated: July 2026

---

## What is SoftwBot AI?

SoftwBot AI is a SaaS platform that enables businesses to create AI-powered WhatsApp chatbots without writing a single line of code. Users describe their business in natural language, and our AI **Bot Architect** generates a complete, production-ready WhatsApp bot — including system prompts, personality, automation rules, knowledge base structure, and human handoff logic.

---

## Documentation Index

### Core Product Documentation (00–31)

| # | Document | Description |
|---|----------|-------------|
| 00 | [Project Overview](./00-project-overview.md) | High-level product summary, tech stack, timeline |
| 01 | [Vision](./01-vision.md) | Product vision, mission, market opportunity |
| 02 | [PRD](./02-prd.md) | Enterprise Product Requirements Document |
| 03 | [Business Model](./03-business-model.md) | Revenue model, pricing, unit economics |
| 04 | [User Personas](./04-user-personas.md) | Target audience profiles |
| 05 | [User Flows](./05-user-flows.md) | Step-by-step user journeys with diagrams |
| 06 | [Functional Requirements](./06-functional-requirements.md) | 130+ functional requirements |
| 07 | [Non-Functional Requirements](./07-non-functional-requirements.md) | Performance, security, scalability |
| 08 | [UI](./08-ui.md) | UI philosophy, patterns, page specs |
| 09 | [Design System](./09-design-system.md) | Tokens, components, custom components |
| 10 | [Dashboard](./10-dashboard.md) | Every dashboard page documented |
| 11 | [Bot Architect](./11-bot-architect.md) | AI bot creation engine |
| 12 | [WhatsApp Engine](./12-whatsapp-engine.md) | WhatsApp integration architecture |
| 13 | [RAG](./13-rag.md) | Knowledge base & retrieval-augmented generation |
| 14 | [AI Agents](./14-ai-agents.md) | All 10 AI agents documented |
| 15 | [Prompts](./15-prompts.md) | Prompt engineering & templates |
| 16 | [Automation Engine](./16-automation-engine.md) | Rule-based automation system |
| 17 | [Database](./17-database.md) | Complete PostgreSQL schema |
| 18 | [API](./18-api.md) | Full REST API reference |
| 19 | [Folder Structure](./19-folder-structure.md) | Project directory layout |
| 20 | [Architecture](./20-architecture.md) | System architecture & design |
| 21 | [Security](./21-security.md) | Security policies & practices |
| 22 | [Authentication](./22-authentication.md) | Clerk auth integration |
| 23 | [RBAC](./23-rbac.md) | Role-based access control |
| 24 | [Subscriptions](./24-subscriptions.md) | Billing & subscription management |
| 25 | [Notifications](./25-notifications.md) | Notification system |
| 26 | [Integrations](./26-integrations.md) | Third-party integrations |
| 27 | [Deployment](./27-deployment.md) | Docker, Coolify, Railway, VPS |
| 28 | [Testing](./28-testing.md) | Testing strategy & tools |
| 29 | [Dev Rules](./29-dev-rules.md) | Coding standards & conventions |
| 30 | [Roadmap](./30-roadmap.md) | Product roadmap |
| 31 | [Future Features](./31-future-features.md) | Future feature ideas |

### Implementation & Workflow (32–43)

| # | Document | Description |
|---|----------|-------------|
| 32 | [Implementation Workflow](./32-implementation-workflow.md) | Step-by-step implementation process |
| 33 | [Development Phases](./33-development-phases.md) | Phased development plan |
| 34 | [Milestones](./34-milestones.md) | Project milestones & tracking |
| 35 | [Approval Process](./35-approval-process.md) | Code review & approval workflow |
| 36 | [Development Rules](./36-development-rules.md) | Development guidelines |
| 37 | [Code Review Process](./37-code-review-process.md) | PR review standards |
| 38 | [Testing Strategy](./38-testing-strategy.md) | Testing approach & coverage |
| 39 | [Quality Assurance](./39-quality-assurance.md) | QA processes & standards |
| 40 | [Git Workflow](./40-git-workflow.md) | Git branching & commit conventions |
| 41 | [Progress Reporting](./41-progress-reporting.md) | Progress tracking & reporting |
| 42 | [Walkthrough Guidelines](./42-walkthrough-guidelines.md) | How to write walkthroughs |
| 43 | [Documentation Maintenance](./43-documentation-maintenance.md) | Doc maintenance process |

### Technical Architecture (44–54)

| # | Document | Description |
|---|----------|-------------|
| 44 | [Agent Architecture](./44-agent-architecture.md) | AI agent system design |
| 45 | [Agent Registry](./45-agent-registry.md) | Agent registration & management |
| 46 | [Shared AI Core](./46-shared-ai-core.md) | Shared AI infrastructure |
| 47 | [Module Architecture](./47-module-architecture.md) | Feature module design |
| 48 | [Feature Development Order](./48-feature-development-order.md) | Feature build sequence |
| 49 | [Component Guidelines](./49-component-guidelines.md) | React component standards |
| 50 | [State Management](./50-state-management.md) | State management patterns |
| 51 | [Error Handling](./51-error-handling.md) | Error handling standards |
| 52 | [Logging & Monitoring](./52-logging-monitoring.md) | Observability setup |
| 53 | [Performance Guidelines](./53-performance-guidelines.md) | Performance optimization |
| 54 | [Scaling Strategy](./54-scaling-strategy.md) | Scaling approach |

### DevOps & Operations (55–60)

| # | Document | Description |
|---|----------|-------------|
| 55 | [Release Process](./55-release-process.md) | Release management |
| 56 | [Versioning](./56-versioning.md) | Version management |
| 57 | [Deployment Strategy](./57-deployment-strategy.md) | Deployment approach |
| 58 | [Disaster Recovery](./58-disaster-recovery.md) | DR planning |
| 59 | [Backup Strategy](./59-backup-strategy.md) | Backup procedures |
| 60 | [Observability](./60-observability.md) | Monitoring & alerting |

### Standards & Conventions (61–70)

| # | Document | Description |
|---|----------|-------------|
| 61 | [Coding Standards](./61-coding-standards.md) | Code quality standards |
| 62 | [Security Checklist](./62-security-checklist.md) | Security requirements |
| 63 | [Acceptance Criteria](./63-acceptance-criteria.md) | Feature acceptance standards |
| 64 | [Definition of Done](./64-definition-of-done.md) | Completion criteria |
| 65 | [Risk Management](./65-risk-management.md) | Risk assessment & mitigation |
| 66 | [Dependency Map](./66-dependency-map.md) | System dependencies |
| 67 | [Project Conventions](./67-project-conventions.md) | Project-wide conventions |
| 68 | [Folder Conventions](./68-folder-conventions.md) | Directory structure rules |
| 69 | [UI Patterns](./69-ui-patterns.md) | UI design patterns |
| 70 | [API Conventions](./70-api-conventions.md) | API design standards |

### Advanced Topics (71–75)

| # | Document | Description |
|---|----------|-------------|
| 71 | [Database Conventions](./71-database-conventions.md) | Database design standards |
| 72 | [AI Development Rules](./72-ai-development-rules.md) | AI-specific development rules |
| 73 | [Future Architecture](./73-future-architecture.md) | Architecture evolution plan |
| 74 | [Plugin System](./74-plugin-system.md) | Plugin architecture |
| 75 | [Extension System](./75-extension-system.md) | Extension points |

### Planning & Walkthroughs

| Directory | Documents | Description |
|-----------|-----------|-------------|
| [planning/](./planning/) | 8 files | Implementation planning docs |
| [walkthrough/](./walkthrough/) | 13 files | Step-by-step setup guides |

---

## Quick Start

### For Understanding the Product
1. Start with the [Project Overview](./00-project-overview.md)
2. Read the [PRD](./02-prd.md) for detailed requirements
3. Review the [Architecture](./20-architecture.md) for technical design

### For Implementation
1. Review the [Implementation Workflow](./32-implementation-workflow.md)
2. Check the [Development Phases](./33-development-phases.md)
3. Follow the [Walkthroughs](./walkthrough/00-overview.md)

### For AI Agent Development
1. Read [Agent Architecture](./44-agent-architecture.md)
2. Review [AI Development Rules](./72-ai-development-rules.md)
3. Check [Shared AI Core](./46-shared-ai-core.md)

---

## How to Use This Documentation

This documentation is designed so that an AI coding agent can build the entire product without additional clarification. Each document contains:

- **Executive Summary** — What this document covers
- **Purpose & Goals** — Why it exists
- **Detailed Content** — Full specifications
- **Examples** — Concrete usage examples
- **Edge Cases** — What can go wrong
- **Acceptance Criteria** — Definition of done
- **Developer Notes** — Implementation guidance
- **Future Improvements** — What comes next

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, TypeScript, Tailwind CSS v4, Shadcn UI, Framer Motion |
| Backend | Next.js Route Handlers, Server Actions |
| Database | PostgreSQL, Drizzle ORM, pgvector |
| AI | OpenRouter (GPT-4o-mini, GPT-4o, Claude 3.5 Sonnet, DeepSeek) |
| WhatsApp | whatsapp-web.js, Green API |
| Auth | Clerk |
| Storage | AWS S3 |
| Cache | Redis (Upstash) |
| Queue | BullMQ |
| Deployment | Vercel, Docker |
| Monitoring | Sentry |

---

## Documentation Statistics

| Category | Count |
|----------|-------|
| Core docs (00–31) | 32 |
| Implementation (32–43) | 12 |
| Architecture (44–54) | 11 |
| DevOps (55–60) | 6 |
| Standards (61–70) | 10 |
| Advanced (71–75) | 5 |
| Planning | 8 |
| Walkthroughs | 13 |
| **Total** | **97** |

---

## Contact

- **Product**: product@softwbot.ai
- **Engineering**: engineering@softwbot.ai
- **Support**: support@softwbot.ai

---

## License

Proprietary — All rights reserved.
