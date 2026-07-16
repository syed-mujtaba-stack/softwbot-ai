# 18 — API

---

## Executive Summary

This document defines every REST API endpoint for SoftwBot AI, including authentication, request/response schemas, validation rules, error handling, and rate limits. The API follows RESTful conventions with JSON payloads.

---

## Purpose

The API serves as the backend for the Next.js frontend, mobile apps (future), and third-party integrations.

---

## Base Configuration

| Property | Value |
|----------|-------|
| Base URL | `/api/v1` |
| Authentication | Bearer token (Clerk JWT) or API Key |
| Content-Type | `application/json` |
| Rate Limit | 100 req/min (authenticated), 20 req/min (unauthenticated) |

### Error Response Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [
      { "field": "name", "message": "Name must be 2-50 characters" }
    ]
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|------------|-------------|
| UNAUTHORIZED | 401 | Missing or invalid auth |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| VALIDATION_ERROR | 422 | Invalid input |
| RATE_LIMITED | 429 | Too many requests |
| INTERNAL_ERROR | 500 | Server error |
| CONFLICT | 409 | Resource already exists |

---

## Endpoints

### Authentication

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/auth/webhook` | Clerk webhook handler | Webhook signature |
| GET | `/auth/me` | Get current user | Bearer token |

### Workspaces

| Method | Route | Description | Auth | Role |
|--------|-------|-------------|------|------|
| GET | `/workspaces` | List user's workspaces | Bearer | Any member |
| POST | `/workspaces` | Create workspace | Bearer | Any user |
| GET | `/workspaces/:id` | Get workspace details | Bearer | Member |
| PATCH | `/workspaces/:id` | Update workspace | Bearer | Admin+ |
| DELETE | `/workspaces/:id` | Delete workspace | Bearer | Owner |
| POST | `/workspaces/:id/invite` | Invite member | Bearer | Admin+ |
| PATCH | `/workspaces/:id/members/:userId` | Update member role | Bearer | Admin+ |
| DELETE | `/workspaces/:id/members/:userId` | Remove member | Bearer | Admin+ |

### Bots

| Method | Route | Description | Auth | Role |
|--------|-------|-------------|------|------|
| GET | `/workspaces/:wid/bots` | List bots | Bearer | Member |
| POST | `/workspaces/:wid/bots` | Create bot | Bearer | Member |
| GET | `/workspaces/:wid/bots/:id` | Get bot details | Bearer | Member |
| PATCH | `/workspaces/:wid/bots/:id` | Update bot | Bearer | Member |
| DELETE | `/workspaces/:wid/bots/:id` | Delete bot | Bearer | Admin+ |
| POST | `/workspaces/:wid/bots/:id/clone` | Clone bot | Bearer | Member |
| POST | `/workspaces/:wid/bots/:id/activate` | Activate bot | Bearer | Member |
| POST | `/workspaces/:wid/bots/:id/pause` | Pause bot | Bearer | Member |

### Bot Architect

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/bot-architect/start` | Start session | Bearer |
| POST | `/bot-architect/message` | Send message | Bearer |
| GET | `/bot-architect/session/:id` | Get session state | Bearer |
| POST | `/bot-architect/generate` | Generate bot config | Bearer |

### WhatsApp

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | `/bots/:id/whatsapp/qr` | Get QR code | Bearer |
| GET | `/bots/:id/whatsapp/status` | Connection status | Bearer |
| POST | `/bots/:id/whatsapp/disconnect` | Disconnect | Bearer |
| POST | `/bots/:id/whatsapp/reconnect` | Reconnect | Bearer |

### Knowledge Base

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | `/bots/:id/knowledge` | List knowledge bases | Bearer |
| POST | `/bots/:id/knowledge` | Create knowledge base | Bearer |
| GET | `/bots/:id/knowledge/:kid` | Get knowledge base | Bearer |
| DELETE | `/bots/:id/knowledge/:kid` | Delete knowledge base | Bearer |
| POST | `/bots/:id/knowledge/:kid/files` | Upload file | Bearer |
| DELETE | `/bots/:id/knowledge/:kid/files/:fid` | Delete file | Bearer |
| POST | `/bots/:id/knowledge/:kid/crawl` | Start web crawl | Bearer |
| POST | `/bots/:id/knowledge/:kid/search` | Search KB | Bearer |

### Conversations

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | `/bots/:id/conversations` | List conversations | Bearer |
| GET | `/bots/:id/conversations/:cid` | Get conversation | Bearer |
| GET | `/bots/:id/conversations/:cid/messages` | Get messages | Bearer |
| POST | `/bots/:id/conversations/:cid/messages` | Send message | Bearer |
| POST | `/bots/:id/conversations/:cid/handoff` | Start handoff | Bearer |
| POST | `/bots/:id/conversations/:cid/resolve` | Resolve | Bearer |
| PATCH | `/bots/:id/conversations/:cid` | Update conversation | Bearer |

### Contacts

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | `/workspaces/:wid/contacts` | List contacts | Bearer |
| POST | `/workspaces/:wid/contacts` | Create contact | Bearer |
| GET | `/workspaces/:wid/contacts/:id` | Get contact | Bearer |
| PATCH | `/workspaces/:wid/contacts/:id` | Update contact | Bearer |
| DELETE | `/workspaces/:wid/contacts/:id` | Delete contact | Bearer |
| POST | `/workspaces/:wid/contacts/import` | Import CSV | Bearer |
| GET | `/workspaces/:wid/contacts/export` | Export CSV | Bearer |

### Leads

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | `/workspaces/:wid/leads` | List leads | Bearer |
| POST | `/workspaces/:wid/leads` | Create lead | Bearer |
| GET | `/workspaces/:wid/leads/:id` | Get lead | Bearer |
| PATCH | `/workspaces/:wid/leads/:id` | Update lead | Bearer |
| GET | `/workspaces/:wid/leads/:id/activities` | Get activities | Bearer |
| POST | `/workspaces/:wid/leads/:id/activities` | Add activity | Bearer |

### Automation

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | `/bots/:id/automations` | List rules | Bearer |
| POST | `/bots/:id/automations` | Create rule | Bearer |
| GET | `/bots/:id/automations/:aid` | Get rule | Bearer |
| PATCH | `/bots/:id/automations/:aid` | Update rule | Bearer |
| DELETE | `/bots/:id/automations/:aid` | Delete rule | Bearer |
| POST | `/bots/:id/automations/:aid/toggle` | Toggle rule | Bearer |
| GET | `/bots/:id/automations/:aid/executions` | Execution history | Bearer |

### Broadcasts

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | `/workspaces/:wid/broadcasts` | List broadcasts | Bearer |
| POST | `/workspaces/:wid/broadcasts` | Create broadcast | Bearer |
| GET | `/workspaces/:wid/broadcasts/:id` | Get broadcast | Bearer |
| POST | `/workspaces/:wid/broadcasts/:id/send` | Send broadcast | Bearer |
| POST | `/workspaces/:wid/broadcasts/:id/cancel` | Cancel broadcast | Bearer |

### Analytics

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | `/bots/:id/analytics/overview` | Bot overview | Bearer |
| GET | `/bots/:id/analytics/conversations` | Conversation metrics | Bearer |
| GET | `/bots/:id/analytics/messages` | Message metrics | Bearer |
| GET | `/bots/:id/analytics/leads` | Lead metrics | Bearer |
| GET | `/workspaces/:wid/analytics/overview` | Workspace overview | Bearer |

### Settings & Billing

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | `/workspaces/:wid/settings` | Get settings | Bearer |
| PATCH | `/workspaces/:wid/settings` | Update settings | Bearer |
| GET | `/workspaces/:wid/billing` | Get billing info | Bearer |
| POST | `/workspaces/:wid/billing/upgrade` | Upgrade plan | Bearer |
| GET | `/workspaces/:wid/api-keys` | List API keys | Bearer |
| POST | `/workspaces/:wid/api-keys` | Create API key | Bearer |
| DELETE | `/workspaces/:wid/api-keys/:id` | Revoke API key | Bearer |

### Notifications

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | `/notifications` | List notifications | Bearer |
| PATCH | `/notifications/:id/read` | Mark as read | Bearer |
| POST | `/notifications/read-all` | Mark all read | Bearer |
| GET | `/notifications/preferences` | Get preferences | Bearer |
| PATCH | `/notifications/preferences` | Update preferences | Bearer |

### Integrations

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | `/workspaces/:wid/integrations` | List integrations | Bearer |
| POST | `/workspaces/:wid/integrations` | Create integration | Bearer |
| PATCH | `/workspaces/:wid/integrations/:id` | Update integration | Bearer |
| DELETE | `/workspaces/:wid/integrations/:id` | Delete integration | Bearer |
| POST | `/workspaces/:wid/integrations/:id/test` | Test integration | Bearer |

---

## Example Request/Response

### Create Bot

**Request:**
```http
POST /api/v1/workspaces/w_abc123/bots
Authorization: Bearer eyJhbG...
Content-Type: application/json

{
  "name": "Pizza Palace Bot",
  "description": "Order-taking bot for pizza restaurant",
  "model": "openai/gpt-4o-mini",
  "system_prompt": "You are a helpful assistant for Pizza Palace...",
  "personality": {
    "tone": "friendly",
    "style": "casual",
    "greeting": "Hey there! 🍕 Welcome to Pizza Palace!",
    "farewell": "Thanks for ordering! Enjoy your meal!"
  }
}
```

**Response (201):**
```json
{
  "data": {
    "id": "bot_xyz789",
    "workspace_id": "w_abc123",
    "name": "Pizza Palace Bot",
    "status": "draft",
    "model": "openai/gpt-4o-mini",
    "created_at": "2026-07-16T10:00:00Z"
  }
}
```

---

## Developer Notes

- All mutation endpoints use Server Actions (not Route Handlers) for Next.js integration
- Route Handlers used for API endpoints consumed by external clients
- Zod validation on all request bodies
- CORS configured for dashboard domain only
- API versioning via URL path (/api/v1/)

## Future Improvements

- GraphQL API for complex queries
- WebSocket API for real-time updates
- SDK generation from OpenAPI spec
- API changelog and deprecation notices
- Request/response compression (gzip)
