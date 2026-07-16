# 02 — Product Requirements Document (PRD)

---

## Executive Summary

This PRD defines the complete requirements for SoftwBot AI, a SaaS platform that enables businesses to create AI-powered WhatsApp chatbots using natural language descriptions. The document covers product vision, features, functional and non-functional requirements, pricing, monetization, analytics, integrations, compliance, roadmap, and risks. It is designed to be comprehensive enough that an AI coding agent can build the product without additional clarification.

---

## Purpose

This document serves as the single source of truth for the SoftwBot AI product. All engineering, design, and business decisions should reference this PRD.

---

## Product Vision & Mission

**Vision:** Make AI-powered business communication accessible to everyone through WhatsApp.

**Mission:** Empower businesses to create intelligent WhatsApp employees that understand their business, serve their customers, and grow their revenue — without writing code.

---

## Business Goals & Objectives

| Goal | Objective | Metric | Timeline |
|------|-----------|--------|----------|
| Launch MVP | Ship core product | Feature-complete beta | Month 3 |
| User Acquisition | Attract early adopters | 1,000 sign-ups | Month 6 |
| Revenue | Achieve product-market fit | $15K MRR | Month 6 |
| Retention | Build habit-forming product | 40% monthly retention | Month 6 |
| Quality | Ensure bot quality | > 80% bots deployed without edits | Month 6 |
| Scale | Handle growth | 10,000 active bots | Month 12 |

---

## Problems Being Solved

### Problem 1: WhatsApp Automation is Technical
**Current State:** Creating a WhatsApp chatbot requires developer knowledge, API integration, and prompt engineering expertise.  
**Impact:** 90% of small businesses cannot automate WhatsApp.  
**Solution:** Bot Architect AI — describe your business, get a working bot.

### Problem 2: Customer Service is Expensive
**Current State:** Hiring support staff costs $30K-50K/year per agent. Available only during business hours.  
**Impact:** Businesses lose 40% of after-hours leads.  
**Solution:** 24/7 AI WhatsApp Employee at a fraction of the cost.

### Problem 3: Knowledge Management is Fragmented
**Current State:** Business knowledge lives in documents, websites, and employees' heads.  
**Impact:** Inconsistent customer responses, repeated information gathering.  
**Solution:** RAG-powered knowledge base that ingests documents and provides accurate, sourced answers.

### Problem 4: No-Code AI Tools are Limited
**Current State:** Existing tools offer basic keyword matching or simple FAQ bots.  
**Impact:** Poor customer experience, high fallback rates.  
**Solution:** Full LLM-powered conversations with context, memory, and personality.

### Problem 5: Lead Management is Manual
**Current State:** Leads from WhatsApp are tracked in spreadsheets or lost entirely.  
**Impact:** 35% of qualified leads are never followed up.  
**Solution:** Automatic lead capture, scoring, qualification, and assignment.

---

## Target Audience

| Segment | Description | Size | Priority |
|---------|-------------|------|----------|
| Small Restaurants | Order taking, reservations, FAQs | 15M globally | P0 |
| E-commerce Stores | Order tracking, product questions, support | 12M globally | P0 |
| Real Estate Agents | Property inquiries, scheduling, follow-ups | 5M globally | P1 |
| Healthcare Clinics | Appointment booking, reminders, FAQs | 8M globally | P1 |
| Marketing Agencies | Managing bots for multiple clients | 500K globally | P1 |
| SaaS Companies | Customer onboarding, support, lead capture | 2M globally | P2 |

---

## User Personas

### Persona 1: Raj — Restaurant Owner
- **Age:** 42, Mumbai
- **Tech Comfort:** Low-moderate (uses WhatsApp daily, struggles with tech)
- **Goal:** Automate order taking and reservation booking
- **Pain:** Missing orders during peak hours, no staff for after-hours
- **Quote:** "I just want something that takes orders while I'm cooking"

### Persona 2: Sarah — Marketing Agency Owner
- **Age:** 35, New York
- **Tech Comfort:** High (manages digital campaigns daily)
- **Goal:** Offer WhatsApp automation as a service to clients
- **Pain:** Each client needs custom setup, manual prompt writing takes hours
- **Quote:** "I need to onboard a client's bot in minutes, not days"

### Persona 3: Mike — E-commerce Store Manager
- **Age:** 29, London
- **Tech Comfort:** Moderate (uses Shopify, basic automation)
- **Goal:** Reduce support tickets, automate order tracking
- **Pain:** 60% of support queries are repetitive (where's my order?)
- **Quote:** "If I could automate order tracking, my team could focus on sales"

### Persona 4: Priya — Real Estate Agent
- **Age:** 38, Dubai
- **Tech Comfort:** Moderate (uses CRM, WhatsApp Business)
- **Goal:** Capture property inquiries 24/7, qualify leads automatically
- **Pain:** Missing inquiries during property viewings, no follow-up system
- **Quote:** "I miss leads when I'm showing properties. AI could handle that"

### Persona 5: Dr. Khan — Healthcare Clinic Admin
- **Age:** 45, Toronto
- **Tech Comfort:** Low (focused on clinical work)
- **Goal:** Automate appointment booking, send reminders
- **Pain:** Reception overwhelmed with calls, 20% no-show rate
- **Quote:** "We need something that handles booking so reception can focus on patients"

---

## Complete Feature List

### MVP Features (Phase 1)

| ID | Feature | Priority | Effort |
|----|---------|----------|--------|
| F001 | User signup/login (Clerk) | P0 | S |
| F002 | Workspace creation | P0 | S |
| F003 | Dashboard overview | P0 | M |
| F004 | Bot creation (manual) | P0 | M |
| F005 | Bot configuration (model, prompt, personality) | P0 | L |
| F006 | WhatsApp QR login | P0 | L |
| F007 | WhatsApp message receive/send | P0 | XL |
| F008 | AI conversation engine | P0 | XL |
| F009 | Basic prompt editor | P0 | M |
| F010 | Knowledge base (upload files) | P0 | L |
| F011 | Knowledge base (RAG search) | P0 | L |
| F012 | Conversation inbox | P0 | L |
| F013 | Human handoff | P0 | M |
| F014 | Contact management | P0 | M |
| F015 | Basic automation (welcome message) | P0 | M |
| F016 | Basic analytics (messages, conversations) | P0 | M |
| F017 | Bot settings (business hours, language) | P0 | S |
| F018 | Billing (Stripe integration) | P0 | L |
| F019 | Subscription plans (Free, Starter, Pro) | P0 | M |
| F020 | Usage metering | P0 | M |

### Phase 2 Features

| ID | Feature | Priority | Effort |
|----|---------|----------|--------|
| F021 | Bot Architect AI (natural language → bot) | P0 | XL |
| F022 | Advanced automation rules | P1 | L |
| F023 | Lead capture and scoring | P1 | L |
| F024 | Lead pipeline (Kanban) | P1 | M |
| F025 | Broadcast campaigns | P1 | L |
| F026 | Advanced analytics dashboard | P1 | L |
| F027 | Team management (roles, invitations) | P1 | M |
| F028 | Prompt builder (visual editor) | P1 | L |
| F029 | A/B testing for prompts | P1 | M |
| F030 | Web crawling for knowledge base | P1 | M |
| F031 | FAQ auto-extraction | P1 | M |
| F032 | Zapier integration | P1 | M |
| F033 | Webhook support | P1 | S |
| F034 | Email notifications | P1 | M |
| F035 | Conversation tags and filtering | P1 | S |

### Phase 3 Features

| ID | Feature | Priority | Effort |
|----|---------|----------|--------|
| F036 | Multi-bot management | P1 | L |
| F037 | CRM integrations (HubSpot, Salesforce) | P2 | L |
| F038 | API access (REST API + API keys) | P1 | L |
| F039 | White-label option | P2 | XL |
| F040 | Advanced lead scoring (AI-powered) | P2 | M |
| F041 | Conversation sentiment analysis | P2 | M |
| F042 | Export reports (PDF, CSV) | P2 | S |
| F043 | Custom dashboards | P2 | M |
| F044 | Conversation SLA tracking | P2 | M |
| F045 | Bulk operations (contacts, messages) | P2 | M |

### Phase 4 Features

| ID | Feature | Priority | Effort |
|----|---------|----------|--------|
| F046 | SSO/SAML authentication | P2 | L |
| F047 | Audit logs | P2 | M |
| F048 | Multi-channel (Instagram, Telegram) | P2 | XL |
| F049 | Bot templates marketplace | P3 | L |
| F050 | Developer SDK | P3 | XL |
| F051 | On-premise deployment | P3 | XL |
| F052 | Mobile app (React Native) | P3 | XL |
| F053 | Voice message AI responses | P3 | L |
| F054 | Multi-language bot generation | P3 | L |
| F055 | AI self-learning from conversations | P3 | XL |

---

## Functional Requirements

### Auth Module

| ID | Requirement | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| FR-001 | User can sign up with email/password | P0 | Account created, verification email sent, can log in |
| FR-002 | User can sign up with Google SSO | P0 | OAuth flow completes, account linked, profile populated |
| FR-003 | User can sign up with GitHub SSO | P1 | OAuth flow completes, account linked |
| FR-004 | User can log in with email/password | P0 | Session created, redirect to dashboard |
| FR-005 | User can log in with SSO providers | P0 | Session created, redirect to dashboard |
| FR-006 | User can reset password | P0 | Reset email sent, can set new password, can log in |
| FR-007 | Session expires after 7 days of inactivity | P0 | User redirected to login after expiry |
| FR-008 | User can enable MFA (TOTP) | P1 | MFA setup wizard, verification, backup codes |
| FR-009 | User can manage profile (name, avatar, email) | P0 | Changes saved and reflected across app |
| FR-010 | User can delete account | P0 | Confirmation dialog, data deleted within 30 days |

### Bot Management Module

| ID | Requirement | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| FR-011 | User can create a new bot | P0 | Bot created with default config, appears in bot list |
| FR-012 | User can edit bot configuration | P0 | All settings saveable, changes reflected in bot behavior |
| FR-013 | User can delete a bot | P0 | Confirmation dialog, bot deactivated and archived |
| FR-014 | User can clone a bot | P1 | Duplicate created with all settings, different name |
| FR-015 | Bot can be activated/deactivated | P0 | Status changes, WhatsApp connection managed |
| FR-016 | User can select AI model per bot | P0 | Model selector with options, cost estimate shown |
| FR-017 | User can set temperature | P0 | Slider 0-2, default 0.7, changes saved |
| FR-018 | User can set max tokens | P0 | Input field, default 1000, validation applied |
| FR-019 | User can edit system prompt | P0 | Text editor with token counter, preview available |
| FR-020 | User can configure personality | P0 | Tone, style, greeting, farewell fields |
| FR-021 | User can set response delay | P1 | Milliseconds input, 0-10000 range |
| FR-022 | User can set working hours | P0 | Day-by-day schedule, timezone selector |
| FR-023 | User can set language preference | P0 | Language selector, affects AI responses |
| FR-024 | User can set welcome message | P0 | Text field, preview available |
| FR-025 | User can set offline message | P0 | Text field, shown outside business hours |

### Bot Architect Module

| ID | Requirement | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| FR-026 | User can describe business in natural language | P0 | Text input accepts 10-2000 characters, any language |
| FR-027 | AI analyzes business description | P0 | Industry detected, features suggested, within 10 seconds |
| FR-028 | AI generates system prompt | P0 | Complete prompt generated, editable, token count shown |
| FR-029 | AI generates personality profile | P0 | Tone, style, greeting, farewell generated |
| FR-030 | AI generates automation rules | P0 | Welcome, follow-up, handoff rules generated |
| FR-031 | AI suggests knowledge base structure | P0 | Categories and FAQ topics suggested |
| FR-032 | AI recommends model | P0 | Model recommendation with cost/reasoning explanation |
| FR-033 | AI generates conversation flows | P0 | Main path, branches, fallbacks generated |
| FR-034 | User can preview generated bot | P0 | Live preview of bot responses before deployment |
| FR-035 | User can edit any generated component | P0 | All generated content is editable, changes saved |

### WhatsApp Module

| ID | Requirement | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| FR-036 | User can scan QR code to connect | P0 | QR displayed, WhatsApp scanned, session established |
| FR-037 | Session persists across server restarts | P0 | Bot reconnects automatically after restart |
| FR-038 | Auto-reconnect on disconnect | P0 | Exponential backoff, max 10 retries, alerts on failure |
| FR-039 | Receive text messages | P0 | Message stored, processed, AI response generated |
| FR-040 | Send text messages | P0 | Message delivered, status tracked |
| FR-041 | Handle media messages (images, video, docs) | P1 | Media downloaded, stored, context processed |
| FR-042 | Transcribe voice notes | P1 | Audio transcribed, text processed as message |
| FR-043 | Show typing indicator | P1 | Indicator shown while AI generates response |
| FR-044 | Support group messages (mentions only) | P1 | Bot responds only when mentioned in groups |
| FR-045 | Send broadcast messages | P1 | Messages sent in batches, delivery tracked |
| FR-046 | Handle rate limits (100 msg/sec) | P0 | Queue-based sending, respects WhatsApp limits |
| FR-047 | Human takeover support | P0 | AI paused, human responds, AI resumes |
| FR-048 | Support multiple phone numbers | P1 | Each bot can have its own number |
| FR-049 | Message delivery status tracking | P0 | Sent/delivered/read status shown |
| FR-050 | Media upload/download handling | P1 | Files stored in S3, URLs generated |

### Knowledge Base Module

| ID | Requirement | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| FR-051 | Upload PDF documents | P0 | PDF parsed, text extracted, chunked, embedded |
| FR-052 | Upload DOCX documents | P0 | Document parsed, text extracted, chunked, embedded |
| FR-053 | Upload TXT files | P0 | Text read, chunked, embedded |
| FR-054 | Upload Markdown files | P0 | Markdown parsed, chunked, embedded |
| FR-055 | Upload CSV files | P1 | CSV parsed row-by-row, chunked, embedded |
| FR-056 | Configure chunk size and overlap | P1 | Chunk settings adjustable, preview available |
| FR-057 | Generate embeddings automatically | P0 | Embeddings created on upload, status shown |
| FR-058 | Search knowledge base (semantic) | P0 | Query returns relevant chunks with scores |
| FR-059 | Inject context into AI responses | P0 | Relevant knowledge included in bot responses |
| FR-060 | Manage files (list, delete) | P0 | File list with status, delete with confirmation |
| FR-061 | Track storage usage | P0 | Storage meter showing used/total |
| FR-062 | Web crawling for knowledge base | P1 | URL input, crawl depth config, content extraction |
| FR-063 | Auto-extract FAQs | P1 | FAQ candidates identified from documents |
| FR-064 | Preview document content | P1 | Parsed content viewable before/after processing |
| FR-065 | Version control for documents | P2 | Document versions tracked, can revert |

### Conversations Module

| ID | Requirement | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| FR-066 | View conversation inbox | P0 | List of conversations with status, last message, time |
| FR-067 | View message thread | P0 | Full conversation history, AI/human/user messages distinguished |
| FR-068 | Send messages as human agent | P0 | Message sent via WhatsApp, attributed to human |
| FR-069 | Add internal notes | P1 | Notes visible to team, not sent to WhatsApp |
| FR-070 | Tag conversations | P1 | Add/remove tags, filter by tags |
| FR-071 | Change conversation status | P0 | Active/pending/resolved/archived |
| FR-072 | Set conversation priority | P1 | Low/medium/high/urgent |
| FR-073 | Assign conversations to team members | P1 | Assignment dropdown, notification sent |
| FR-074 | Search conversations | P0 | Full-text search across messages |
| FR-075 | Filter conversations | P0 | By bot, status, date range, assignee, tags |
| FR-076 | Bulk actions (archive, tag, assign) | P1 | Multi-select, bulk operation applied |
| FR-077 | Track AI confidence scores | P0 | Confidence shown per AI response |
| FR-078 | Show conversation metadata | P0 | Duration, message count, AI usage stats |
| FR-079 | Export conversation data | P2 | Export as CSV/JSON |
| FR-080 | Real-time message updates | P0 | New messages appear without refresh (WebSocket) |

### Leads Module

| ID | Requirement | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| FR-081 | Capture leads from conversations | P0 | Lead created when qualification criteria met |
| FR-082 | Score leads automatically | P1 | Score calculated based on engagement and data |
| FR-083 | Qualify leads via AI conversation | P0 | AI asks qualification questions, determines fit |
| FR-084 | Assign leads to team members | P1 | Auto-assignment rules, manual assignment |
| FR-085 | Track lead status | P0 | Pipeline stages: new → contacted → qualified → won/lost |
| FR-086 | Add notes to leads | P1 | Notes with timestamps and author |
| FR-087 | View lead activity history | P1 | Timeline of all interactions |
| FR-088 | Export leads | P1 | Export as CSV with all fields |
| FR-089 | Import leads | P2 | CSV import with field mapping |
| FR-090 | Trigger automation from lead events | P1 | Lead created/status change triggers rules |

### Automation Module

| ID | Requirement | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| FR-091 | Create automation rules | P0 | Rule with trigger, conditions, actions |
| FR-092 | Configure triggers | P0 | Message received, new contact, time-based, webhook |
| FR-093 | Set conditions | P0 | Contact attributes, message content, sentiment, time |
| FR-094 | Define actions | P0 | Send message, update contact, assign, handoff, webhook |
| FR-095 | Schedule automations | P1 | Cron-based scheduling with timezone support |
| FR-096 | Enable/disable rules | P0 | Toggle switch, rule stops/resumes immediately |
| FR-097 | View rule execution history | P1 | Log of executions with status and timing |
| FR-098 | Use automation templates | P1 | Pre-built templates for common scenarios |
| FR-099 | A/B test rules | P2 | Split traffic, track metrics per variant |
| FR-100 | Test rules before activation | P1 | Simulation mode with test data |
| FR-101 | Chain automations | P2 | One rule's action triggers another rule |
| FR-102 | Send webhooks on events | P1 | Configurable webhook URLs and payloads |
| FR-103 | Delay actions | P1 | Wait N minutes/hours before executing action |
| FR-104 | Branch on conditions | P2 | If/else branching in automation flow |
| FR-105 | Track automation analytics | P1 | Execution count, success rate, timing |

### Analytics Module

| ID | Requirement | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| FR-106 | Dashboard overview metrics | P0 | Total bots, conversations, messages, leads |
| FR-107 | Conversation analytics | P0 | Volume, response time, resolution rate |
| FR-108 | Bot performance metrics | P0 | Accuracy, fallback rate, AI confidence |
| FR-109 | Lead analytics | P1 | Capture rate, conversion, pipeline value |
| FR-110 | Message analytics | P0 | Sent, delivered, read, failed counts |
| FR-111 | Response time tracking | P0 | Average AI and human response times |
| FR-112 | Date range filtering | P0 | Custom date range with presets (7d, 30d, 90d) |
| FR-113 | Export reports | P1 | PDF and CSV export |
| FR-114 | Comparative analysis | P2 | Compare metrics across date ranges |
| FR-115 | Real-time metrics | P1 | Live updating dashboard |
| FR-116 | Per-bot analytics | P0 | Metrics broken down by individual bot |
| FR-117 | Hourly/daily/weekly aggregation | P0 | Granularity selector for charts |
| FR-118 | Top conversations by volume | P1 | Ranked list of busiest conversations |
| FR-119 | Sentiment trend analysis | P2 | Sentiment scores over time |
| FR-120 | Custom report builder | P2 | Drag-and-drop metric selection |

---

## Non-Functional Requirements

| ID | Category | Requirement | Target | Measurement |
|----|----------|------------|--------|-------------|
| NFR-001 | Performance | Page load time | < 2 seconds | Lighthouse score |
| NFR-002 | Performance | API response time | < 200ms (p95) | APM monitoring |
| NFR-003 | Performance | AI response time | < 5 seconds | Application logs |
| NFR-004 | Performance | Database query time | < 50ms (p95) | pg_stat_statements |
| NFR-005 | Performance | WebSocket latency | < 100ms | Connection monitoring |
| NFR-006 | Scalability | Concurrent WhatsApp connections | 10,000+ | Load testing |
| NFR-007 | Scalability | Messages per hour | 100,000+ | Queue monitoring |
| NFR-008 | Scalability | Horizontal scaling | Stateless app servers | Architecture review |
| NFR-009 | Availability | Uptime | 99.9% | Uptime monitoring |
| NFR-010 | Availability | Recovery Time Objective (RTO) | < 1 hour | DR testing |
| NFR-011 | Availability | Recovery Point Objective (RPO) | < 5 minutes | Backup verification |
| NFR-012 | Security | Encryption at rest | AES-256 | Infrastructure audit |
| NFR-013 | Security | Encryption in transit | TLS 1.3 | SSL Labs test |
| NFR-014 | Security | OWASP Top 10 | All mitigated | Security audit |
| NFR-015 | Security | GDPR compliance | Full compliance | Legal review |
| NFR-016 | Accessibility | WCAG 2.1 AA | Full compliance | Accessibility audit |
| NFR-017 | Accessibility | Keyboard navigation | All interactive elements | Manual testing |
| NFR-018 | Browser | Chrome, Firefox, Safari, Edge | Latest 2 versions | Cross-browser testing |
| NFR-019 | Mobile | Responsive design | All breakpoints | Device testing |
| NFR-020 | SEO | Meta tags and Open Graph | All public pages | SEO audit |

---

## Success Metrics & KPIs

### North Star Metric
**Weekly Active Bots** — Number of bots actively handling conversations each week.

### Supporting Metrics

| Metric | Definition | Target (Month 6) | Target (Month 12) |
|--------|-----------|-------------------|---------------------|
| Sign-ups | New user registrations | 1,000 | 5,000 |
| Activated Users | Users who create a bot | 500 (50%) | 2,500 (50%) |
| Deployed Bots | Bots connected to WhatsApp | 300 | 2,000 |
| Messages/Day | Total messages processed | 10,000 | 100,000 |
| MRR | Monthly Recurring Revenue | $15,000 | $50,000 |
| ARPU | Average Revenue Per User | $30 | $40 |
| Churn Rate | Monthly customer churn | < 8% | < 5% |
| NPS | Net Promoter Score | > 40 | > 50 |
| Bot Accuracy | Correct answers / total questions | > 80% | > 90% |
| Time to First Bot | Time from signup to live bot | < 30 min | < 10 min |
| Support Tickets | Tickets per 100 users/week | < 10 | < 5 |

---

## Monetization Strategy

### Revenue Model: Tiered Subscription + Usage Overage

**Why Subscription + Usage:**
- Predictable revenue for planning
- Usage-based component captures value from heavy users
- Free tier drives acquisition
- Overage creates natural upgrade pressure

### Revenue Streams

| Stream | Description | % of Revenue |
|--------|------------|-------------|
| Subscriptions | Monthly/annual plans | 70% |
| Usage Overage | Messages/storage beyond plan limits | 15% |
| Add-ons | Premium features (white-label, extra bots) | 10% |
| API Access | Developer API usage fees | 5% |

---

## Pricing Plans

| Feature | Free | Starter ($29/mo) | Pro ($79/mo) | Enterprise (Custom) |
|---------|------|-------------------|-------------|---------------------|
| Bots | 1 | 3 | 10 | Unlimited |
| Messages/month | 100 | 2,000 | 10,000 | Custom |
| Knowledge Base Chunks | 100 | 5,000 | 25,000 | Unlimited |
| Team Members | 1 | 3 | 10 | Unlimited |
| Automation Rules | 0 | 1 | Unlimited | Unlimited |
| Broadcast | ❌ | 1 campaign/mo | Unlimited | Unlimited |
| Analytics | Basic | Advanced | Full | Custom |
| API Access | ❌ | ❌ | ✅ | ✅ |
| Human Handoff | ❌ | ✅ | ✅ | ✅ |
| A/B Testing | ❌ | ❌ | ✅ | ✅ |
| CRM Integrations | ❌ | ❌ | ✅ | ✅ |
| White-label | ❌ | ❌ | ❌ | ✅ |
| SSO/SAML | ❌ | ❌ | ❌ | ✅ |
| Audit Logs | ❌ | ❌ | ❌ | ✅ |
| SLA | ❌ | ❌ | 99.9% | 99.99% |
| Support | Community | Email | Priority | Dedicated |
| Storage | 100MB | 1GB | 5GB | Custom |

### Overage Pricing
- Messages: $0.01 per message over limit
- Knowledge Base Storage: $0.10 per GB over limit
- File Storage: $0.05 per GB over limit

---

## Analytics Requirements

### User Analytics
- Sign-up source tracking
- Feature adoption rates
- User engagement scores
- Cohort analysis
- Funnel analysis (signup → create bot → deploy → active)

### Product Analytics
- Feature usage frequency
- Bot Architect completion rate
- Knowledge base upload success rate
- Conversation volume trends
- AI model usage distribution

### Business Analytics
- MRR and ARR tracking
- Customer lifetime value
- Customer acquisition cost
- Churn analysis
- Revenue per feature

---

## Integration Requirements

### MVP Integrations
- Clerk (Authentication)
- Stripe (Billing)
- OpenRouter (AI Models)
- S3 (File Storage)

### Phase 2 Integrations
- Zapier
- Webhooks (inbound/outbound)
- Google Analytics
- Slack (notifications)

### Phase 3 Integrations
- HubSpot (CRM)
- Salesforce (CRM)
- Google Calendar
- Calendly
- Make/Integromat

---

## Regulatory Compliance

| Regulation | Requirement | Implementation |
|-----------|-------------|----------------|
| GDPR | Data protection, right to erasure | Soft delete, data export, consent management |
| CCPA | Consumer privacy rights | Opt-out, data disclosure, deletion |
| WhatsApp Business Policy | Message templates, opt-in | Template approval, opt-out handling, no spam |
| PCI DSS | Payment card data security | Stripe handles all card data, no card data stored |
| SOC 2 | Security controls | Audit logging, access controls, encryption |

---

## Assumptions

1. whatsapp-web.js remains functional and compliant with WhatsApp ToS
2. OpenRouter maintains access to GPT, Claude, Gemini, DeepSeek, Llama
3. Clerk continues to provide reliable authentication
4. Users have basic familiarity with WhatsApp
5. Target users have basic computer literacy
6. WhatsApp does not block web-based API access during MVP period

## Constraints

1. MVP must launch within 3 months with a team of 2-3 engineers
2. Budget limited to $5,000/month for infrastructure and AI costs
3. Cannot use Official WhatsApp Business API (requires Meta approval, per-message fees)
4. Must comply with WhatsApp Business Policy at all times
5. Initial deployment must be single-region

## Dependencies

| Dependency | Type | Risk | Mitigation |
|-----------|------|------|------------|
| whatsapp-web.js | External | High | Monitor actively; prepare Official API fallback |
| OpenRouter | External | Medium | Multi-model strategy; direct API fallback |
| Clerk | External | Low | Well-funded, stable platform |
| Stripe | External | Low | Industry standard |
| PostgreSQL | Infrastructure | Low | Battle-tested, managed options available |
| Redis | Infrastructure | Low | Managed options available |

---

## Roadmap

See [30-roadmap.md](./30-roadmap.md) for detailed phase-by-phase roadmap.

---

## Future Scope

See [31-future-features.md](./31-future-features.md) for future feature ideas.

---

## Developer Notes

- This PRD is the authoritative source for feature requirements
- All user stories should trace back to FR-XXX IDs
- NFRs should be validated in every sprint review
- Pricing should be validated with real users before launch
- Compliance requirements should be verified with legal counsel

## Future Improvements

- Validate pricing with user research before launch
- Conduct competitive analysis quarterly
- Update PRD based on user feedback
- Add user stories for each functional requirement
- Include cost estimates per feature
