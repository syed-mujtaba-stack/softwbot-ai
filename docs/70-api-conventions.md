# 70 — API Conventions

---

## Executive Summary

This document defines API design conventions for SoftwBot AI.

---

## Purpose

Ensure consistent, predictable, and developer-friendly APIs.

---

## URL Structure

### Resource Naming

```
/api/v1/{resource}           # Collection
/api/v1/{resource}/{id}      # Single resource
/api/v1/{resource}/{id}/{action} # Action on resource
```

### Examples

```
GET    /api/v1/bots              # List bots
POST   /api/v1/bots              # Create bot
GET    /api/v1/bots/:id          # Get bot
PATCH  /api/v1/bots/:id          # Update bot
DELETE /api/v1/bots/:id          # Delete bot
POST   /api/v1/bots/:id/activate # Activate bot
```

---

## HTTP Methods

| Method | Purpose | Idempotent |
|--------|---------|------------|
| GET | Read resource | Yes |
| POST | Create resource | No |
| PUT | Replace resource | Yes |
| PATCH | Update resource | No |
| DELETE | Delete resource | Yes |

---

## Request/Response Format

### Request Body

```json
{
  "name": "My Bot",
  "model": "openai/gpt-4o-mini",
  "temperature": 0.7
}
```

### Success Response

```json
{
  "id": "bot_123",
  "name": "My Bot",
  "status": "draft",
  "createdAt": "2026-07-16T10:30:00Z"
}
```

### List Response

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "hasMore": true
  }
}
```

### Error Response

```json
{
  "error": "VALIDATION_ERROR",
  "message": "Name is required",
  "details": [
    {
      "field": "name",
      "message": "Required"
    }
  ]
}
```

---

## Status Codes

| Code | Usage |
|------|-------|
| 200 | Success |
| 201 | Created |
| 204 | No Content (delete) |
| 400 | Bad Request (validation) |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Unprocessable Entity |
| 429 | Rate Limited |
| 500 | Internal Server Error |

---

## Authentication

### Clerk Session

```typescript
export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // ...
}
```

### API Key (Future)

```typescript
export async function GET(req: NextRequest) {
  const apiKey = req.headers.get('x-api-key');
  if (!apiKey) {
    return NextResponse.json({ error: 'API key required' }, { status: 401 });
  }
  // ...
}
```

---

## Pagination

### Query Parameters

```
?page=1&limit=20
?page=2&limit=20
```

### Cursor-Based (Future)

```
?cursor=abc123&limit=20
```

---

## Filtering

### Query Parameters

```
?status=active&model=openai/gpt-4o-mini
```

### Complex Filtering

```
?filter[status]=active&filter[createdAt][gte]=2026-01-01
```

---

## Sorting

### Query Parameters

```
?sort=createdAt:desc
?sort=name:asc
```

---

## Field Selection

### Query Parameters

```
?fields=id,name,status
```

---

## Rate Limiting

### Headers

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1626422400
```

### Response (429)

```json
{
  "error": "RATE_LIMIT_EXCEEDED",
  "message": "Too many requests",
  "retryAfter": 60
}
```

---

## Versioning

### URL Versioning

```
/api/v1/bots
/api/v2/bots
```

### Header Versioning

```
X-API-Version: 1.0.0
```

---

## Validation

### Zod Schema

```typescript
const createBotSchema = z.object({
  name: z.string().min(1).max(100),
  model: z.string().default('openai/gpt-4o-mini'),
  temperature: z.number().min(0).max(2).default(0.7),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = createBotSchema.parse(body);
  // ...
}
```

---

## Developer Notes

- Follow REST conventions
- Use consistent naming
- Validate all inputs
- Return meaningful errors
- Document all endpoints

## Future Improvements

- GraphQL support
- WebSocket API
- API versioning automation
- API analytics
