# 06 — Functional Requirements

---

## Executive Summary

This document contains 130+ functional requirements organized by module. Each requirement has a unique ID, title, description, priority (P0/P1/P2), acceptance criteria, dependencies, and validation rules. This is the authoritative source for feature scope.

---

## Purpose

Functional requirements define WHAT the system must do. They serve as the contract between product and engineering, and as the basis for acceptance testing.

---

## Module: Authentication (FR-001 to FR-010)

| ID | Title | Description | Priority | Acceptance Criteria | Dependencies | Validation |
|----|-------|-------------|----------|---------------------|-------------|------------|
| FR-001 | Email/Password Signup | User registers with email and password | P0 | Account created, verification email sent, can log in | Clerk configured | Email format valid, password 8+ chars, uppercase, number, special char |
| FR-002 | Google SSO Signup | User registers via Google OAuth | P0 | OAuth flow completes, profile populated | Clerk + Google OAuth | Valid Google account |
| FR-003 | GitHub SSO Signup | User registers via GitHub OAuth | P1 | OAuth flow completes, profile populated | Clerk + GitHub OAuth | Valid GitHub account |
| FR-004 | Email/Password Login | User logs in with credentials | P0 | Session created, redirect to dashboard | — | Valid credentials, account not locked |
| FR-005 | SSO Login | User logs in via SSO provider | P0 | Session created, redirect to dashboard | OAuth configured | Valid OAuth token |
| FR-006 | Password Reset | User resets forgotten password | P0 | Reset email sent, new password set, can log in | Email service | Valid email, new password meets policy |
| FR-007 | Session Expiry | Sessions expire after inactivity | P0 | User redirected to login after 7 days | — | Last activity tracked |
| FR-008 | MFA Setup | User enables TOTP-based MFA | P1 | MFA setup wizard, backup codes generated | TOTP library | Valid TOTP secret, backup codes stored |
| FR-009 | Profile Management | User edits name, avatar, email | P0 | Changes saved and reflected across app | S3 for avatar | Name 2-100 chars, valid email |
| FR-010 | Account Deletion | User deletes their account | P0 | Confirmation shown, data soft-deleted, 30-day grace period | — | Re-authentication required |

---

## Module: Workspace (FR-011 to FR-018)

| ID | Title | Description | Priority | Acceptance Criteria | Dependencies | Validation |
|----|-------|-------------|----------|---------------------|-------------|------------|
| FR-011 | Create Workspace | User creates a new workspace | P0 | Workspace created, user set as owner | — | Name 3-50 chars, slug auto-generated and unique |
| FR-012 | Switch Workspace | User switches between workspaces | P0 | Context switches, data updates | — | User is member of target workspace |
| FR-013 | Edit Workspace Settings | User updates workspace name, logo, timezone | P0 | Settings saved and reflected | S3 for logo | Name 3-50 chars, valid timezone |
| FR-014 | Delete Workspace | Owner deletes workspace | P0 | Confirmation, all data archived | — | Owner only, no active subscriptions |
| FR-015 | Invite Member | Owner/admin invites user by email | P0 | Invitation email sent, pending member shown | Email service | Valid email, not already member |
| FR-016 | Accept Invitation | Invited user accepts workspace invitation | P0 | User added as workspace member | — | Valid invitation token, not expired |
| FR-017 | Remove Member | Owner/admin removes workspace member | P0 | Member removed, access revoked | — | Cannot remove owner |
| FR-018 | Change Member Role | Owner/admin changes member role | P0 | Role updated, permissions changed | — | Valid role, cannot downgrade owner |

---

## Module: Bot Management (FR-019 to FR-033)

| ID | Title | Description | Priority | Acceptance Criteria | Dependencies | Validation |
|----|-------|-------------|----------|---------------------|-------------|------------|
| FR-019 | Create Bot | User creates a new bot | P0 | Bot created with defaults, appears in list | — | Name 2-50 chars, workspace has capacity |
| FR-020 | Edit Bot Config | User modifies bot settings | P0 | Changes saved, bot behavior updated | — | All fields validated |
| FR-021 | Delete Bot | User deletes a bot | P0 | Confirmation, bot archived, WhatsApp disconnected | WhatsApp engine | Bot must be paused first |
| FR-022 | Clone Bot | User duplicates a bot | P1 | Copy created with all settings, different name | — | Workspace has capacity |
| FR-023 | Activate Bot | User activates a bot | P0 | Bot status → active, WhatsApp connected | WhatsApp engine | WhatsApp session valid |
| FR-024 | Pause Bot | User pauses a bot | P0 | Bot status → paused, stops responding | WhatsApp engine | — |
| FR-025 | Select AI Model | User chooses AI model | P0 | Model saved, cost estimate shown | OpenRouter | Valid model ID, plan supports model |
| FR-026 | Set Temperature | User adjusts temperature 0-2 | P0 | Value saved, affects response creativity | — | Decimal 0.0-2.0 |
| FR-027 | Set Max Tokens | User sets max response tokens | P0 | Value saved, limits response length | — | Integer 50-4000 |
| FR-028 | Edit System Prompt | User edits the system prompt | P0 | Prompt saved, preview available, token count shown | — | Non-empty, within token limit |
| FR-029 | Configure Personality | User sets tone, style, greeting, farewell | P0 | Personality saved, affects bot responses | — | Tone: formal/casual/friendly/professional |
| FR-030 | Set Response Delay | User sets artificial response delay | P1 | Delay applied before sending | — | Integer 0-10000 ms |
| FR-031 | Set Business Hours | User configures operating hours | P0 | Bot respects hours, sends offline message | — | Valid time ranges per day |
| FR-032 | Set Welcome Message | User configures first-contact message | P0 | Shown to new contacts | — | Non-empty, max 1000 chars |
| FR-033 | Set Offline Message | User configures after-hours message | P0 | Shown outside business hours | — | Non-empty, max 1000 chars |

---

## Module: Bot Architect (FR-034 to FR-043)

| ID | Title | Description | Priority | Acceptance Criteria | Dependencies | Validation |
|----|-------|-------------|----------|---------------------|-------------|------------|
| FR-034 | Start Session | User opens Bot Architect | P0 | AI greeting displayed, session created | AI service | Workspace has Bot Architect access |
| FR-035 | Describe Business | User enters business description | P0 | Text accepted, AI begins analysis | AI service | 10-2000 characters |
| FR-036 | AI Analysis | AI analyzes business description | P0 | Industry detected, features suggested, within 10s | AI service | — |
| FR-037 | Generate System Prompt | AI creates system prompt | P0 | Complete prompt generated, editable | AI service | Token count within limits |
| FR-038 | Generate Personality | AI creates personality profile | P0 | Tone, style, greeting, farewell generated | AI service | — |
| FR-039 | Generate Automations | AI creates automation rules | P0 | Welcome, follow-up, handoff rules generated | AI service | — |
| FR-040 | Suggest Knowledge Base | AI suggests KB structure | P0 | Categories and FAQ topics suggested | AI service | — |
| FR-041 | Recommend Model | AI recommends best model | P0 | Model recommendation with reasoning | AI service | — |
| FR-042 | Generate Conversation Flow | AI creates conversation paths | P0 | Main path, branches, fallbacks generated | AI service | — |
| FR-043 | Edit Generated Config | User edits any AI-generated component | P0 | All generated content editable, changes saved | — | Same validation as manual config |

---

## Module: WhatsApp (FR-044 to FR-058)

| ID | Title | Description | Priority | Acceptance Criteria | Dependencies | Validation |
|----|-------|-------------|----------|---------------------|-------------|------------|
| FR-044 | QR Login | User scans QR to connect | P0 | QR displayed, scanned, session established | whatsapp-web.js | QR refreshes every 60s |
| FR-045 | Session Persistence | Session survives server restart | P0 | Auto-reconnect on restart | PostgreSQL session store | — |
| FR-046 | Auto-Reconnect | Reconnects on disconnect | P0 | Exponential backoff, max 10 retries | — | — |
| FR-047 | Receive Text Messages | Process incoming text | P0 | Message stored, processed, response generated | — | — |
| FR-048 | Send Text Messages | Send outgoing text | P0 | Message delivered, status tracked | — | Max 4096 chars |
| FR-049 | Handle Media Messages | Process images, video, docs | P1 | Media downloaded, stored in S3, context processed | S3 storage | Max 64MB per file |
| FR-050 | Voice Note Transcription | Transcribe audio messages | P1 | Audio transcribed to text, processed as message | Speech-to-text API | Max 5 min audio |
| FR-051 | Typing Indicator | Show "typing..." to contact | P1 | Indicator shown while generating response | — | Auto-hide after 30s |
| FR-052 | Group Message Support | Handle group messages | P1 | Responds only when mentioned | — | Configurable mention-only mode |
| FR-053 | Broadcast Messages | Send bulk messages | P1 | Messages sent in batches, delivery tracked | — | Rate limited, opt-out respected |
| FR-054 | Rate Limiting | Respect WhatsApp limits | P0 | Queue-based sending, ≤100 msg/sec | BullMQ | — |
| FR-055 | Human Takeover | Pause AI, enable human response | P0 | AI paused, human responds, AI resumes | — | — |
| FR-056 | Multi-Number Support | Multiple numbers per workspace | P1 | Each bot has own number | — | — |
| FR-057 | Delivery Status Tracking | Track sent/delivered/read | P0 | Status shown per message | — | — |
| FR-058 | Disconnect WhatsApp | User disconnects session | P0 | Session invalidated, bot paused | — | Confirmation required |

---

## Module: Knowledge Base (FR-059 to FR-073)

| ID | Title | Description | Priority | Acceptance Criteria | Dependencies | Validation |
|----|-------|-------------|----------|---------------------|-------------|------------|
| FR-059 | Upload PDF | Upload PDF document | P0 | PDF parsed, text extracted, chunked, embedded | PDF parser | Max 50MB, valid PDF |
| FR-060 | Upload DOCX | Upload Word document | P0 | Document parsed, text extracted, chunked, embedded | DOCX parser | Max 50MB, valid DOCX |
| FR-061 | Upload TXT | Upload text file | P0 | Text read, chunked, embedded | — | Max 10MB, valid text |
| FR-062 | Upload Markdown | Upload Markdown file | P0 | Markdown parsed, chunked, embedded | — | Max 10MB |
| FR-063 | Upload CSV | Upload CSV file | P1 | CSV parsed, chunked, embedded | — | Max 20MB, valid CSV |
| FR-064 | Configure Chunking | Set chunk size and overlap | P1 | Settings applied, preview available | — | Size 100-2000, overlap 0-200, overlap < size |
| FR-065 | Generate Embeddings | Create vector embeddings | P0 | Embeddings generated, stored in pgvector | Embedding API | — |
| FR-066 | Semantic Search | Search knowledge base | P0 | Results returned with relevance scores | pgvector | Query non-empty |
| FR-067 | Context Injection | Inject KB context into AI | P0 | Relevant chunks included in bot prompts | — | Token limit respected |
| FR-068 | Manage Files | List and delete files | P0 | File list with status, delete with confirmation | — | — |
| FR-069 | Track Storage | Show storage usage | P0 | Storage meter: used/total | — | — |
| FR-070 | Web Crawl | Crawl website for content | P1 | URL crawled, content extracted, chunked, embedded | Crawler | Valid URL, robots.txt respected |
| FR-071 | Auto-Extract FAQs | Extract FAQ from documents | P1 | FAQ candidates identified and displayed | AI service | — |
| FR-072 | Preview Content | View parsed document content | P1 | Content viewable before/after processing | — | — |
| FR-073 | Delete Knowledge Base | Delete entire knowledge base | P0 | Confirmation, all files and embeddings deleted | — | — |

---

## Module: Conversations (FR-074 to FR-088)

| ID | Title | Description | Priority | Acceptance Criteria | Dependencies | Validation |
|----|-------|-------------|----------|---------------------|-------------|------------|
| FR-074 | View Inbox | List all conversations | P0 | List with status, last message, timestamp | — | Paginated, 50 per page |
| FR-075 | View Thread | View message history | P0 | Full history, messages color-coded by sender | — | Paginated, 100 per page |
| FR-076 | Send Human Message | Agent sends response | P0 | Message sent via WhatsApp, attributed to human | WhatsApp engine | Non-empty, max 4096 chars |
| FR-077 | Add Internal Note | Add note visible to team | P1 | Note shown in thread, not sent to WhatsApp | — | Non-empty |
| FR-078 | Tag Conversations | Add/remove tags | P1 | Tags saved, filterable | — | Max 20 tags per conversation |
| FR-079 | Change Status | Set conversation status | P0 | Status updated: active/pending/resolved/archived | — | Valid status |
| FR-080 | Set Priority | Set conversation priority | P1 | Priority updated: low/medium/high/urgent | — | Valid priority |
| FR-081 | Assign Conversation | Assign to team member | P1 | Assignment saved, notification sent | Notification service | Valid team member |
| FR-082 | Search Conversations | Full-text search | P0 | Results returned with highlighting | — | Min 2 chars |
| FR-083 | Filter Conversations | Filter by bot, status, date | P0 | Filtered results displayed | — | Valid filter values |
| FR-084 | Bulk Actions | Archive, tag, assign multiple | P1 | Operation applied to selected conversations | — | At least 1 selected |
| FR-085 | AI Confidence Score | Show confidence per response | P0 | Score displayed (0-100%) | — | — |
| FR-086 | Conversation Metadata | Show stats per conversation | P0 | Duration, message count, AI usage displayed | — | — |
| FR-087 | Export Conversations | Export as CSV/JSON | P2 | File generated and downloadable | — | Date range required |
| FR-088 | Real-time Updates | Live message updates | P0 | New messages appear without refresh | WebSocket | — |

---

## Module: Leads (FR-089 to FR-098)

| ID | Title | Description | Priority | Acceptance Criteria | Dependencies | Validation |
|----|-------|-------------|----------|---------------------|-------------|------------|
| FR-089 | Auto-Capture Leads | Create leads from conversations | P0 | Lead created when criteria met | — | Configurable criteria |
| FR-090 | Score Leads | Automatic lead scoring | P1 | Score calculated (0-100) | — | Score based on engagement + data |
| FR-091 | Qualify via AI | AI asks qualification questions | P0 | AI asks questions, determines fit | AI service | Configurable questions |
| FR-091 | Assign Leads | Auto or manual assignment | P1 | Lead assigned, assignee notified | Notification service | Valid team member |
| FR-092 | Track Lead Status | Pipeline stages | P0 | Status tracked: new → qualified → won/lost | — | Valid status transition |
| FR-093 | Add Lead Notes | Notes with timestamps | P1 | Notes saved with author and time | — | Non-empty |
| FR-094 | Lead Activity Timeline | History of all interactions | P1 | Timeline displayed chronologically | — | — |
| FR-095 | Export Leads | Export as CSV | P1 | CSV file generated | — | — |
| FR-096 | Import Leads | CSV import | P2 | Leads imported with field mapping | — | Valid CSV, field mapping required |
| FR-097 | Lead Automation | Trigger rules from lead events | P1 | Lead events trigger automation rules | Automation engine | — |
| FR-098 | Delete Lead | Delete lead record | P1 | Confirmation, lead archived | — | — |

---

## Module: Automation (FR-099 to FR-113)

| ID | Title | Description | Priority | Acceptance Criteria | Dependencies | Validation |
|----|-------|-------------|----------|---------------------|-------------|------------|
| FR-099 | Create Rule | Create automation rule | P0 | Rule with trigger, conditions, actions | — | Name 2-50 chars |
| FR-100 | Configure Trigger | Set rule trigger | P0 | Trigger type and config saved | — | Valid trigger type |
| FR-101 | Set Conditions | Define rule conditions | P0 | Conditions validated and saved | — | Valid field/operator/value |
| FR-102 | Define Actions | Set rule actions | P0 | Actions configured and saved | — | At least one action |
| FR-103 | Schedule Rules | Cron-based scheduling | P1 | Rule runs on schedule | BullMQ scheduler | Valid cron expression |
| FR-104 | Toggle Rule | Enable/disable rule | P0 | Rule activated/deactivated immediately | — | — |
| FR-105 | View Execution History | See past executions | P1 | History list with status and timing | — | Paginated |
| FR-106 | Use Templates | Pre-built rule templates | P1 | Template applied, customizable | — | — |
| FR-107 | A/B Test Rules | Split traffic between variants | P2 | Traffic split, metrics tracked per variant | — | At least 2 variants |
| FR-108 | Test Rules | Simulation mode | P1 | Rule tested with sample data | — | — |
| FR-109 | Chain Automations | Rule triggers another rule | P2 | Chained execution, loop detection | — | Max chain depth: 5 |
| FR-110 | Webhook Actions | Send webhook on event | P1 | Webhook called with payload | — | Valid URL, timeout 10s |
| FR-111 | Delay Actions | Wait before executing | P1 | Delay applied correctly | BullMQ delay | 1 second to 7 days |
| FR-112 | Branch Conditions | If/else in automation | P2 | Conditional branching works | — | — |
| FR-113 | Automation Analytics | Rule execution metrics | P1 | Count, success rate, timing shown | — | — |

---

## Module: Analytics (FR-114 to FR-128)

| ID | Title | Description | Priority | Acceptance Criteria | Dependencies | Validation |
|----|-------|-------------|----------|---------------------|-------------|------------|
| FR-114 | Dashboard Overview | Key metrics cards | P0 | Total bots, conversations, messages, leads shown | — | — |
| FR-115 | Conversation Analytics | Volume, response time, resolution | P0 | Charts and metrics displayed | — | — |
| FR-116 | Bot Performance | Accuracy, fallback, confidence | P0 | Performance metrics shown | — | — |
| FR-117 | Lead Analytics | Capture rate, conversion | P1 | Lead metrics and funnel shown | — | — |
| FR-118 | Message Analytics | Sent, delivered, read, failed | P0 | Message status breakdown shown | — | — |
| FR-119 | Response Time Tracking | AI and human response times | P0 | Average and p95 response times shown | — | — |
| FR-120 | Date Range Filtering | Custom date range | P0 | Data filtered by selected range | — | Valid date range |
| FR-121 | Export Reports | PDF and CSV export | P1 | Report generated and downloadable | — | — |
| FR-122 | Comparative Analysis | Compare date ranges | P2 | Side-by-side comparison shown | — | — |
| FR-123 | Real-time Metrics | Live updating dashboard | P1 | Metrics update in real-time | WebSocket | — |
| FR-124 | Per-Bot Analytics | Metrics per bot | P0 | Bot-specific metrics displayed | — | — |
| FR-125 | Time Aggregation | Hourly/daily/weekly | P0 | Granularity selector works | — | Valid granularity |
| FR-126 | Top Conversations | Busiest conversations ranked | P1 | Ranked list displayed | — | — |
| FR-127 | Sentiment Trends | Sentiment over time | P2 | Sentiment chart displayed | — | — |
| FR-128 | Custom Dashboards | Drag-and-drop builder | P2 | Custom dashboard saved and displayed | — | — |

---

## Module: Settings (FR-129 to FR-138)

| ID | Title | Description | Priority | Acceptance Criteria | Dependencies | Validation |
|----|-------|-------------|----------|---------------------|-------------|------------|
| FR-129 | Workspace Settings | Edit workspace config | P0 | Settings saved | — | Valid values |
| FR-130 | Profile Settings | Edit user profile | P0 | Profile updated | — | Valid values |
| FR-131 | Notification Preferences | Configure notifications | P0 | Preferences saved | — | — |
| FR-132 | Security Settings | MFA, sessions | P1 | Security settings updated | — | — |
| FR-133 | Data & Privacy | Export/delete data | P1 | Data operations executed | — | Confirmation required |
| FR-134 | API Key Management | Create/revoke API keys | P1 | Keys created, displayed once, revocable | — | Name required |
| FR-135 | Webhook Configuration | Set up webhooks | P1 | Webhooks saved and testable | — | Valid URL |
| FR-136 | Integration Management | Connect/disconnect integrations | P1 | Integrations managed | — | OAuth flow for each |
| FR-137 | Billing Management | View plan, usage, invoices | P0 | Billing info displayed | Stripe | — |
| FR-138 | Delete Workspace | Permanently delete workspace | P0 | Multi-step confirmation, data deleted after grace period | — | Owner only, re-auth required |

---

## Priority Summary

| Priority | Count | Description |
|----------|-------|-------------|
| P0 | 65 | Must have for MVP |
| P1 | 48 | Important for growth phase |
| P2 | 22 | Nice to have, Phase 3+ |
| **Total** | **135** | |

---

## Developer Notes

- All P0 requirements must pass acceptance criteria before MVP launch
- Requirements with cross-module dependencies should be implemented together
- Validation rules must be enforced both client-side (Zod) and server-side
- Every requirement should have corresponding test cases
- Requirements may be refined during sprint planning

## Future Improvements

- Add user story format (As a... I want... So that...)
- Add effort estimates (story points)
- Link each requirement to design mockups
- Add performance benchmarks per requirement
- Create traceability matrix to test cases
