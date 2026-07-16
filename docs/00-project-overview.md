# 00 — Project Overview

---

## Executive Summary

**SoftwBot AI** is a SaaS platform that empowers businesses of all sizes to deploy AI-powered WhatsApp chatbots — called "WhatsApp Employees" — without writing code. Users describe their business in natural language, and the platform's AI **Bot Architect** agent automatically generates a complete, production-ready bot configuration including system prompts, personality profiles, automation rules, knowledge base structures, lead capture logic, and human handoff protocols.

**Product Name:** SoftwBot AI  
**Version:** 1.0.0  
**Tagline:** "Your AI WhatsApp Employee — Built in Minutes, Not Months"  
**Category:** Conversational AI / WhatsApp Automation SaaS  

---

## Purpose

This document provides a high-level overview of the SoftwBot AI product, including its purpose, technology stack, target market, differentiators, timeline, and success criteria. It serves as the entry point for all stakeholders — product managers, engineers, designers, and investors.

---

## Goals

| Goal | Description | Success Metric |
|------|-------------|----------------|
| Democratize WhatsApp AI | Make AI chatbot creation accessible to non-technical users | 1,000 bots created in first 3 months |
| Time to Value | From sign-up to live bot in under 10 minutes | Median onboarding time < 10 min |
| Quality Output | Generated bots must be production-ready | > 80% of generated bots deployed without major edits |
| Scale | Support thousands of concurrent WhatsApp connections | 10,000 active bots at scale |
| Revenue | Achieve sustainable SaaS revenue | $50K MRR within 12 months |

---

## Scope

### In Scope (MVP)

- User authentication and workspace management
- WhatsApp account connection via QR code
- AI Bot Architect (business description → full bot config)
- Bot configuration editor (prompts, personality, settings)
- Knowledge base (PDF, DOCX, TXT, Markdown, CSV upload + web crawling)
- Real-time conversation inbox
- Basic automation rules (welcome message, follow-up, handoff)
- Lead capture and management
- Basic analytics dashboard
- Subscription billing (Free, Starter, Pro, Enterprise)

### Out of Scope (MVP)

- Multi-channel support (Instagram, Telegram, SMS)
- Native mobile apps
- On-premise deployment
- Custom AI model fine-tuning
- Voice/video bot support
- White-label (planned for Phase 3)
- Marketplace (planned for Phase 4)

---

## Product Summary

### What the Product Does

SoftwBot AI connects to a user's WhatsApp account via whatsapp-web.js and deploys an AI agent that handles customer conversations 24/7. The AI can:

- Answer questions about the business using uploaded knowledge base documents
- Capture leads and qualify prospects
- Schedule appointments
- Hand off complex issues to human agents
- Send broadcast messages
- Execute automation rules

### The Bot Architect Experience

Instead of requiring users to write complex system prompts, SoftwBot AI provides an intelligent **Bot Architect** agent:

```
User: "I own a pizza restaurant in downtown Austin. We're open 11am-10pm.
       We deliver within 5 miles. Our best sellers are the Margherita
       and the BBQ Chicken pizza. We take orders via WhatsApp."
            │
            ▼
   ┌─────────────────┐
   │  Bot Architect   │
   │  (AI Agent)      │
   └────────┬────────┘
            │
            ▼
   Generated Bot Configuration:
   ├── System Prompt (restaurant-specific)
   ├── Personality (friendly, food-enthusiastic)
   ├── Greeting: "Hey there! 🍕 Welcome to [Restaurant]..."
   ├── Knowledge Base Structure (menu, hours, delivery, FAQ)
   ├── Automation Rules:
   │   ├── Welcome message on first contact
   │   ├── Order confirmation flow
   │   ├── Delivery status updates
   │   └── Review request after delivery
   ├── Lead Capture (name, phone, order preferences)
   ├── Human Handoff (complex complaints, refunds)
   ├── Business Hours (11am-10pm, auto-offline outside hours)
   └── Model Recommendation: GPT-4o-mini (cost-efficient, fast)
```

---

## Technology Stack

### Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.x (App Router) | Full-stack React framework |
| TypeScript | 5.x | Type-safe development |
| Tailwind CSS | 4.x | Utility-first CSS |
| Shadcn UI | Latest | Accessible component library |
| Framer Motion | Latest | Animations and transitions |

### Backend

| Technology | Purpose |
|-----------|---------|
| Next.js Route Handlers | REST API endpoints |
| Server Actions | Form mutations and data operations |
| BullMQ + Redis | Background job processing |
| whatsapp-web.js | WhatsApp Web multi-device API |

### Database & Storage

| Technology | Purpose |
|-----------|---------|
| PostgreSQL | Primary relational database |
| Drizzle ORM | Type-safe database queries |
| pgvector | Vector similarity search for embeddings |
| Redis | Caching, queues, sessions |
| S3 Compatible Storage | File uploads, media storage |

### AI & ML

| Technology | Purpose |
|-----------|---------|
| OpenRouter | LLM gateway (multi-model) |
| GPT-4o / GPT-4o-mini | Primary conversation AI |
| Claude 3.5 Sonnet | Bot Architect, analytics |
| Gemini Pro | Alternative model |
| DeepSeek | Cost-efficient option |
| Llama | Open-source option |
| Text Embedding Models | Knowledge base embeddings |

### Authentication & Deployment

| Technology | Purpose |
|-----------|---------|
| Clerk | Authentication & user management |
| Docker | Containerization |
| Coolify | Self-hosted PaaS |
| Railway | Cloud PaaS |
| VPS (Ubuntu) | Direct server deployment |

---

## Competitive Landscape

| Feature | SoftwBot AI | Wati | Respond.io | Chatfuel | ManyChat |
|---------|------------|------|------------|----------|----------|
| AI Bot Creation | ✅ Natural language | ❌ Manual setup | ⚠️ Template-based | ❌ Manual | ❌ Manual |
| Bot Architect AI | ✅ | ❌ | ❌ | ❌ | ❌ |
| Knowledge Base RAG | ✅ | ⚠️ Basic | ✅ | ❌ | ❌ |
| WhatsApp Native | ✅ whatsapp-web.js | ✅ Official API | ✅ Official API | ✅ Official API | ✅ Official API |
| Open AI Models | ✅ Multi-model | ❌ Proprietary | ⚠️ Limited | ⚠️ Limited | ⚠️ Limited |
| Self-hosted Option | ✅ Docker | ❌ | ❌ | ❌ | ❌ |
| Pricing | $$ | $$$ | $$$ | $$ | $ |
| Automation Engine | ✅ Visual | ⚠️ Basic | ✅ Advanced | ⚠️ Basic | ⚠️ Basic |
| Lead Management | ✅ Built-in | ⚠️ Basic | ✅ | ❌ | ❌ |

### Key Differentiators

1. **Bot Architect AI** — Only platform where you describe your business and get a complete bot
2. **Multi-Model AI** — Users choose from GPT, Claude, Gemini, DeepSeek, Llama via OpenRouter
3. **Self-Hostable** — Docker deployment for data-sensitive businesses
4. **Open RAG Pipeline** — Full control over knowledge base chunking and embedding
5. **Cost Transparency** — Users pay AI API costs directly via OpenRouter, no markup

---

## Project Timeline

### Phase 1: MVP (Months 1–3)

| Week | Deliverable |
|------|------------|
| 1–2 | Project setup, database schema, auth integration |
| 3–4 | Dashboard layout, bot CRUD, basic settings |
| 5–6 | WhatsApp engine (QR login, message processing) |
| 7–8 | AI conversation engine, basic prompt system |
| 9–10 | Knowledge base (upload, chunk, embed, search) |
| 11–12 | Bot Architect (basic version), billing setup |

### Phase 2: Growth (Months 4–6)

| Month | Deliverable |
|-------|------------|
| 4 | Advanced Bot Architect, automation rules |
| 5 | Lead management, broadcast campaigns |
| 6 | Analytics dashboard, team features, Zapier integration |

### Phase 3: Scale (Months 7–9)

| Month | Deliverable |
|-------|------------|
| 7 | Multi-bot management, advanced analytics |
| 8 | CRM integrations (HubSpot, Salesforce) |
| 9 | Enterprise features, API access, white-label |

### Phase 4: Enterprise (Months 10–12)

| Month | Deliverable |
|-------|------------|
| 10 | SSO/SAML, audit logs, compliance certifications |
| 11 | Multi-channel support (Instagram, Telegram) |
| 12 | Marketplace, developer platform, mobile app planning |

---

## Success Criteria

### Launch Criteria (MVP)

- [ ] User can sign up and create a workspace in < 2 minutes
- [ ] User can connect WhatsApp via QR code in < 1 minute
- [ ] Bot Architect generates a working bot from business description
- [ ] Bot handles conversations with < 3 second average response time
- [ ] Knowledge base supports PDF, DOCX, TXT, Markdown, CSV
- [ ] Bot correctly answers questions from uploaded documents
- [ ] Human handoff works seamlessly
- [ ] Basic automation rules function (welcome, follow-up)
- [ ] Billing system processes payments correctly
- [ ] System handles 100 concurrent WhatsApp connections

### 6-Month Success Metrics

| Metric | Target |
|--------|--------|
| Registered users | 5,000 |
| Active workspaces | 1,500 |
| Active bots | 2,000 |
| Messages processed | 500,000/month |
| MRR | $15,000 |
| NPS score | > 40 |
| Uptime | 99.9% |
| Average bot response time | < 3 seconds |

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| WhatsApp blocks whatsapp-web.js | Medium | Critical | Monitor WhatsApp policy; prepare Official API migration path |
| AI API costs exceed revenue | Medium | High | Implement usage caps; optimize prompt efficiency; offer model selection |
| Bot quality insufficient | Low | Critical | Extensive prompt engineering; QA agent testing; user feedback loops |
| Scaling bottlenecks | Medium | High | Design for horizontal scaling from day 1; load testing |
| Competitor launches similar product | High | Medium | Move fast; focus on Bot Architect differentiation; build community |
| Data privacy regulations | Medium | High | GDPR compliance; data encryption; audit logs; DPA support |
| WhatsApp rate limits | Medium | Medium | Implement intelligent rate limiting; queue management |

---

## Developer Notes

- This is a **Next.js 16** project — refer to `node_modules/next/dist/docs/` for breaking changes
- All components should be **Server Components** by default; add `"use client"` only when needed
- Use **Drizzle ORM** for all database queries — no raw SQL unless absolutely necessary
- Use **Zod** for all input validation
- Use **Server Actions** for mutations, Route Handlers for API endpoints
- Follow the folder structure defined in `19-folder-structure.md`

## Future Improvements

- Official WhatsApp Business API support (as supplementary channel)
- Voice message understanding and response
- Multi-language bot generation
- AI self-learning from conversation data
- Predictive analytics and lead scoring
- Marketplace for bot templates
- Developer SDK and plugin system
