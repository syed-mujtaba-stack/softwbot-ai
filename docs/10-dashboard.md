# 10 — Dashboard Pages

---

## Executive Summary

This document specifies every page of the SoftwBot AI dashboard, including purpose, components, buttons, forms, tables, dialogs, actions, permissions, API requirements, database requirements, and UI states (loading, empty, error, success) for each page.

---

## Purpose

The dashboard is the primary workspace for all users. Every page must be fully specified to ensure consistent implementation.

---

## 1. Dashboard Overview

### Purpose
At-a-glance summary of workspace health and activity.

### Components

| Component | Type | Description |
|-----------|------|-------------|
| MetricCard | Card | 4 cards: Total Bots, Active Conversations, Messages Today, Leads This Week |
| ActivityFeed | List | Last 20 events (bot created, message sent, lead captured, etc.) |
| QuickActions | Button group | Create Bot, View Conversations, Send Broadcast |
| PerformanceChart | Line chart | Messages over time (7d/30d/90d toggle) |
| BotStatusGrid | Grid | Each bot with name, status indicator, last active time |

### Buttons
- "Create Bot" → Bot Architect or manual creation
- "View All" on ActivityFeed → Conversations page
- Date range picker on PerformanceChart

### API Requirements
- `GET /workspaces/:wid/dashboard` — aggregates metrics
- `GET /workspaces/:wid/activity` — recent activity feed
- `GET /workspaces/:wid/bots` — bot list for status grid

### Database Requirements
- Query `bots` table for count and status
- Query `conversations` table for active count
- Query `messages` table for today's count (indexed on `created_at`)
- Query `leads` table for this week's count

### Permissions
- All workspace members can view
- Metrics filtered by role (viewers see limited data)

### UI States

| State | Display |
|-------|---------|
| Loading | 4 skeleton metric cards, skeleton feed, skeleton chart |
| Empty | "Welcome to SoftwBot AI! Create your first bot to get started." + Create Bot CTA |
| Error | "Unable to load dashboard. Please try again." + Retry button |
| Success | Full dashboard with live-updating metrics |

---

## 2. Bots List

### Purpose
View, manage, and create all bots in the workspace.

### Components

| Component | Type | Description |
|-----------|------|-------------|
| BotGrid | Grid/List toggle | Grid of BotCards or table view |
| SearchInput | Input | Search by bot name |
| FilterDropdown | Dropdown | Filter by status, model, creation date |
| SortSelect | Select | Sort by name, created, last active, conversations |
| BulkActionsBar | Toolbar | Show when items selected: Activate, Pause, Delete |
| CreateBotButton | Button (primary) | Opens bot creation flow |

### Table Columns (list view)
| Column | Sortable | Width |
|--------|----------|-------|
| Checkbox | No | 40px |
| Bot Name | Yes | auto |
| Status | Yes | 100px |
| Model | No | 150px |
| Conversations | Yes | 120px |
| Messages | Yes | 120px |
| Last Active | Yes | 150px |
| Actions | No | 100px |

### Actions
- Click bot name → Bot Detail page
- Edit → Bot Configuration
- Pause/Resume → Toggle bot status
- Clone → Duplicate bot
- Delete → Confirmation dialog

### API Requirements
- `GET /workspaces/:wid/bots` — list with pagination, search, filter, sort
- `POST /bots/:id/activate` — activate
- `POST /bots/:id/pause` — pause
- `POST /bots/:id/clone` — clone
- `DELETE /bots/:id` — delete

### Permissions
- Admin/Owner: Full CRUD
- Member: Create, Read, Update (no delete)
- Viewer: Read only

### UI States

| State | Display |
|-------|---------|
| Loading | Skeleton bot cards (6 cards) |
| Empty | "No bots yet. Create your first AI WhatsApp Employee." + Create Bot CTA |
| Error | "Failed to load bots." + Retry |
| Success | Bot grid/list with real-time status updates |

---

## 3. Bot Detail Page

### Purpose
View and manage all aspects of a single bot.

### Tabs

| Tab | Content |
|-----|---------|
| Overview | Bot stats, recent conversations, performance summary |
| Configuration | Model, temperature, max tokens, system prompt, personality |
| Knowledge Base | Linked knowledge bases, upload, search test |
| Automation | Active rules, create rule, rule history |
| Conversations | Bot's conversations list |
| Analytics | Bot-specific analytics charts |
| Settings | Advanced settings, danger zone |

### Configuration Tab

**Components:**
- ModelSelector (dropdown with model info and cost estimate)
- TemperatureSlider (0-2 with label)
- MaxTokensInput (50-4000)
- SystemPromptEditor (textarea with token counter, syntax highlighting)
- PersonalityEditor (tone, style, greeting, farewell fields)
- WelcomeMessageInput
- OfflineMessageInput
- BusinessHoursEditor (day-by-day toggle with time pickers)
- HumanHandoffConfig (keywords, sentiment threshold)
- ResponseDelayInput (0-10000ms)

### Buttons
- "Save Changes" → Save all config
- "Test Bot" → Open test chat panel
- "Activate/Pause" → Toggle bot status
- "Delete Bot" → Confirmation dialog with re-auth

### API Requirements
- `GET /bots/:id` — full bot configuration
- `PATCH /bots/:id` — update configuration
- `POST /bots/:id/activate` — activate
- `POST /bots/:id/pause` — pause
- `DELETE /bots/:id` — delete

---

## 4. Bot Architect

### Purpose
Create or modify bots via AI-powered conversation.

### Components

| Component | Type | Description |
|-----------|------|-------------|
| ChatInterface | Thread | Message thread with AI responses |
| TextInput | Input | Message input with send button |
| ProgressStepper | Stepper | Describe → Features → Configure → Preview → Deploy |
| ConfigPreview | Panel | Right sidebar showing generated configuration |
| PreviewChat | Chat | Test the bot before deploying |
| DeployButton | Button | Deploy the configured bot |

### Chat Interface Features
- AI messages with SoftwBot avatar
- User messages right-aligned
- Typing indicator while AI generates
- Code blocks for generated prompts
- Collapsible sections for each generated component
- Edit inline on any generated content

### API Requirements
- `POST /bot-architect/start` — start session
- `POST /bot-architect/message` — send message
- `GET /bot-architect/session/:id` — get session state
- `POST /bot-architect/generate` — generate bot from session
- `POST /bots` — create bot from generated config

---

## 5. Prompt Builder

### Purpose
Visual editor for bot system prompts and personality.

### Components

| Component | Type | Description |
|-----------|------|-------------|
| PromptEditor | Rich textarea | System prompt with token counter |
| PersonalityPanel | Form | Tone, style, greeting, farewell selectors |
| TemplateLibrary | Grid | Pre-built prompt templates by industry |
| VersionHistory | List | Previous prompt versions with diff |
| ABTestPanel | Form | Create A/B test for prompts |
| TestChat | Chat | Test prompt in real-time |

### Forms
- ToneSelector: Radio group (Formal, Casual, Friendly, Professional, Humorous)
- StyleSelector: Radio group (Concise, Detailed, Empathetic, Direct)
- GreetingEditor: Text input with variable support ({{contact.name}})
- FarewellEditor: Text input with variable support

### API Requirements
- `GET /bots/:id/prompt` — get current prompt config
- `PATCH /bots/:id/prompt` — update prompt
- `GET /bots/:id/prompt/versions` — version history
- `POST /bots/:id/prompt/test` — test prompt with sample message

---

## 6. Knowledge Base

### Purpose
Manage bot knowledge base documents.

### Components

| Component | Type | Description |
|-----------|------|-------------|
| UploadZone | Dropzone | Drag & drop or click to upload |
| FileList | Table | Files with status, size, chunks, actions |
| StorageMeter | Progress bar | Used / total storage |
| SearchTest | Input + results | Test semantic search |
| CrawlConfig | Form | URL input, depth, scope |
| ChunkSettings | Form | Chunk size, overlap sliders |
| FAQManager | List | Auto-extracted and manual FAQs |

### File List Columns
| Column | Description |
|--------|-------------|
| Name | File name with type icon |
| Status | Processing/Ready/Error badge |
| Type | PDF, DOCX, TXT, MD, CSV |
| Chunks | Number of chunks created |
| Size | File size |
| Uploaded | Upload date |
| Actions | Preview, Re-process, Delete |

### API Requirements
- `GET /bots/:id/knowledge` — list knowledge bases
- `POST /bots/:id/knowledge` — create knowledge base
- `POST /bots/:id/knowledge/:kid/files` — upload file
- `DELETE /bots/:id/knowledge/:kid/files/:fid` — delete file
- `POST /bots/:id/knowledge/:kid/search` — test search

---

## 7. Conversations

### Purpose
View and manage all WhatsApp conversations.

### Layout: Three-panel

| Panel | Width | Content |
|-------|-------|---------|
| Left | 320px | Conversation list |
| Center | Flex | Chat thread |
| Right | 300px | Contact info (collapsible) |

### Conversation List Items
- Contact avatar (generated from initials or photo)
- Contact name (or phone number)
- Last message preview (truncated to 2 lines)
- Timestamp (relative: "2m ago", "1h ago", "Yesterday")
- Status badge (Active, Pending, Resolved)
- Unread count (if any)
- Bot name (if multiple bots)

### Chat Thread
- Message bubbles (color-coded by sender type)
- Timestamps between message groups
- AI confidence score on AI messages
- Typing indicator when AI is generating
- Human message input (if agent has access)
- Internal note toggle (for team-only notes)

### Contact Sidebar
- Contact name, phone, email
- Tags (editable)
- Lead score and status
- Total conversations count
- Last seen timestamp
- Custom fields
- Activity timeline

### Actions
- Reply as human
- Add internal note
- Change status (Active/Pending/Resolved/Archived)
- Set priority (Low/Medium/High/Urgent)
- Add/remove tags
- Assign to team member
- Export conversation
- Start human handoff
- Resume AI

### Filters
- By bot
- By status
- By assignee
- By date range
- By tags
- By priority
- By AI confidence

### API Requirements
- `GET /bots/:id/conversations` — list with filters
- `GET /conversations/:id` — full conversation
- `GET /conversations/:id/messages` — messages with pagination
- `POST /conversations/:id/messages` — send message
- `PATCH /conversations/:id` — update status/tags/assignee
- `POST /conversations/:id/handoff` — start handoff
- `POST /conversations/:id/resolve` — resolve

---

## 8. Contacts

### Purpose
Manage all contacts captured from conversations.

### Table Columns
| Column | Sortable | Description |
|--------|----------|-------------|
| Checkbox | No | Selection |
| Avatar+Name | Yes | Contact name with avatar |
| Phone | Yes | WhatsApp number |
| Email | No | Email address |
| Lead Score | Yes | Score 0-100 |
| Lead Status | Yes | New/Qualified/Converted/Lost |
| Tags | No | Tag badges |
| Last Seen | Yes | Last activity timestamp |
| Actions | No | Edit, View, Delete |

### Actions
- View contact → Contact detail page
- Edit → Edit dialog
- Add tags → Tag selector
- Import → CSV upload dialog
- Export → CSV download
- Merge → Merge duplicate contacts dialog

### API Requirements
- `GET /workspaces/:wid/contacts` — list with pagination, search, filter
- `POST /workspaces/:wid/contacts` — create
- `PATCH /workspaces/:wid/contacts/:id` — update
- `DELETE /workspaces/:wid/contacts/:id` — delete
- `POST /workspaces/:wid/contacts/import` — import CSV
- `GET /workspaces/:wid/contacts/export` — export CSV

---

## 9. Leads

### Purpose
Track and manage sales leads.

### Views
1. **Pipeline View (Kanban):** Drag-and-drop cards across stages
2. **List View:** Sortable, filterable table

### Pipeline Stages
| Stage | Color | Description |
|-------|-------|-------------|
| New | Blue | Newly captured |
| Contacted | Yellow | First contact made |
| Qualified | Green | Meets qualification criteria |
| Proposal | Purple | Proposal/quote sent |
| Won | Green (bright) | Deal closed |
| Lost | Red | Deal lost |

### Lead Card
- Contact name
- Lead score badge
- Source (where lead came from)
- Last activity timestamp
- Assigned agent avatar
- Value (if set)

### Actions
- Drag between pipeline stages
- Click to view lead detail
- Assign to team member
- Add notes
- Set value
- Mark as won/lost
- Export lead
- Start conversation

### API Requirements
- `GET /workspaces/:wid/leads` — list with pipeline stage filter
- `POST /workspaces/:wid/leads` — create
- `PATCH /workspaces/:wid/leads/:id` — update (stage, assignee, value, etc.)
- `GET /workspaces/:wid/leads/:id/activities` — activity timeline
- `POST /workspaces/:wid/leads/:id/activities` — add activity

---

## 10. Automation

### Purpose
Create and manage automation rules.

### Components

| Component | Type | Description |
|-----------|------|-------------|
| RuleList | Table | All rules with status, trigger, actions, stats |
| RuleBuilder | Visual editor | Trigger → Conditions → Actions flow |
| TemplateGallery | Grid | Pre-built rule templates |
| ExecutionLog | Table | Rule execution history |

### Rule Builder

**Trigger Section:**
- Dropdown: Message Received, New Contact, Time-Based, Webhook, Lead Status Changed
- Config fields change based on trigger type

**Conditions Section:**
- Add condition button
- Condition row: Field + Operator + Value
- Operators: equals, contains, starts with, greater than, less than, between

**Actions Section:**
- Add action button
- Action row: Type + Configuration
- Action types: Send Message, Update Contact, Assign, Handoff, Webhook, Delay

### API Requirements
- `GET /bots/:id/automations` — list rules
- `POST /bots/:id/automations` — create rule
- `PATCH /bots/:id/automations/:aid` — update rule
- `DELETE /bots/:id/automations/:aid` — delete rule
- `POST /bots/:id/automations/:aid/toggle` — enable/disable
- `GET /bots/:id/automations/:aid/executions` — execution history

---

## 11. Broadcast

### Purpose
Send bulk messages to targeted audiences.

### Campaign List Table
| Column | Description |
|--------|-------------|
| Name | Campaign name |
| Status | Draft/Sending/Sent/Failed badge |
| Audience | Recipient count |
| Sent | Messages sent |
| Delivered | Delivery rate |
| Read | Read rate |
| Scheduled | Send time |
| Actions | Edit, Send, Cancel, View Report |

### Create Campaign Wizard

| Step | Content |
|------|---------|
| 1. Name | Campaign name input |
| 2. Audience | Filter builder (tags, lead status, custom fields) |
| 3. Compose | Message editor with variable insertion ({{name}}, {{phone}}) |
| 4. Media | Optional attachment |
| 5. Schedule | Send now or schedule picker |
| 6. Confirm | Review audience count, message preview |

---

## 12. Analytics

### Purpose
View detailed performance analytics.

### Dashboard Sections

| Section | Charts/Metrics |
|---------|---------------|
| Overview | 4 metric cards, line chart (volume), pie chart (status) |
| Conversations | Volume over time, avg response time, resolution rate |
| Bot Performance | Accuracy, fallback rate, model distribution, token usage |
| Leads | Pipeline value, conversion funnel, source breakdown |
| Messages | Sent/delivered/read breakdown, delivery rate |

### Features
- Date range picker (7d, 30d, 90d, custom)
- Granularity toggle (hourly, daily, weekly)
- Export as PDF or CSV
- Per-bot filtering

---

## 13. Settings

### Pages

| Page | Content |
|------|---------|
| Workspace | Name, logo, slug, timezone |
| Profile | Name, email, avatar, password |
| Notifications | Email, push, in-app preferences |
| Security | MFA, active sessions, API keys |
| Data & Privacy | Export data, delete account |
| Danger Zone | Delete workspace |

---

## 14. Billing

### Components
- CurrentPlanCard (plan name, price, renewal date)
- UsageMetrics (messages used/limit, storage used/limit, bots used/limit)
- PlanComparison (table of all plans with features)
- UpgradeButton → Stripe Checkout
- PaymentMethod (card display, update)
- InvoiceHistory (table with download links)
- UsageAlerts (configure thresholds)

---

## 15. Team Members

### Components
- MemberList (table: name, email, role, joined, actions)
- InviteDialog (email input, role selector, permission checkboxes)
- RoleEditor (role dropdown with permission matrix preview)
- RemoveMemberDialog (confirmation)

---

## 16. Notifications

### Components
- NotificationBell (icon with unread count badge)
- NotificationList (list: icon, title, body, time, read/unread)
- NotificationPreferences (toggle switches per type and channel)

---

## 17. Profile

### Components
- AvatarUpload (drag & drop or click)
- ProfileForm (name, email, phone, timezone, language)
- PasswordChange (current password, new password, confirm)
- MFASetup (QR code, verification, backup codes)
- ConnectedAccounts (Google, GitHub)
- SessionList (device, location, last active, revoke button)

---

## Developer Notes

- All pages use Server Components by default
- Only interactive elements (forms, buttons, filters) use `"use client"`
- All data fetching via Server Actions for mutations, Route Handlers for reads
- Real-time updates via WebSocket for conversations and notifications
- All tables support URL-based query params for filters/sort/pagination (bookmarkable)

## Future Improvements

- Customizable dashboard widgets
- Command palette (Cmd+K) for quick navigation
- Keyboard shortcuts for all major actions
- Page-level loading states with Suspense boundaries
- Optimistic updates for form submissions
