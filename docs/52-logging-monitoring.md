# 52 — Logging & Monitoring

---

## Executive Summary

This document defines the logging strategy, monitoring setup, and observability practices for SoftwBot AI.

---

## Purpose

Ensure visibility into application behavior, performance, and errors.

---

## Logging Levels

| Level | Usage | Examples |
|-------|-------|---------|
| ERROR | System errors, failures | API errors, DB failures |
| WARN | Potential issues | Rate limits approaching, retries |
| INFO | Business events | Bot created, message sent |
| DEBUG | Development details | Request/response bodies |

---

## Structured Logging

```typescript
// utils/logger.ts
interface LogEntry {
  timestamp: string;
  level: 'error' | 'warn' | 'info' | 'debug';
  message: string;
  service: string;
  requestId?: string;
  userId?: string;
  metadata?: Record<string, unknown>;
}

function createLogger(service: string) {
  return {
    error: (message: string, metadata?: Record<string, unknown>) => {
      log({ timestamp: new Date().toISOString(), level: 'error', message, service, metadata });
    },
    warn: (message: string, metadata?: Record<string, unknown>) => {
      log({ timestamp: new Date().toISOString(), level: 'warn', message, service, metadata });
    },
    info: (message: string, metadata?: Record<string, unknown>) => {
      log({ timestamp: new Date().toISOString(), level: 'info', message, service, metadata });
    },
    debug: (message: string, metadata?: Record<string, unknown>) => {
      log({ timestamp: new Date().toISOString(), level: 'debug', message, service, metadata });
    },
  };
}
```

---

## Request Logging

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const requestId = crypto.randomUUID();
  
  // Add requestId to headers
  const response = NextResponse.next();
  response.headers.set('X-Request-ID', requestId);
  
  // Log request
  logger.info('Request received', {
    requestId,
    method: request.method,
    url: request.url,
    userAgent: request.headers.get('user-agent'),
  });
  
  return response;
}
```

---

## Error Monitoring

### Sentry Integration

```typescript
// sentry.client.config.ts
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

### Error Capture

```typescript
import * as Sentry from '@sentry/nextjs';

try {
  await processMessage(message);
} catch (error) {
  Sentry.captureException(error, {
    tags: { module: 'whatsapp', botId: bot.id },
    extra: { messageId: message.id },
  });
  throw error;
}
```

---

## Performance Monitoring

### Metrics to Track

| Metric | Target | Alert |
|--------|--------|-------|
| API p95 latency | < 200ms | > 500ms |
| API p99 latency | < 500ms | > 1s |
| AI response time | < 5s | > 10s |
| DB query time | < 50ms | > 100ms |
| Error rate | < 1% | > 5% |
| Queue lag | < 100 | > 1000 |

### Custom Metrics

```typescript
// metrics.ts
import { Metrics } from '@opentelemetry/metrics';

const metrics = new Metrics({
  serviceName: 'softwbot-ai',
});

// Business metrics
export const messageCounter = metrics.createCounter('messages_total', {
  description: 'Total messages processed',
});

export const botLatency = metrics.createHistogram('bot_response_latency', {
  description: 'Bot response latency',
  boundaries: [100, 500, 1000, 2000, 5000],
});
```

---

## Uptime Monitoring

### Health Check Endpoints

```typescript
// api/health/route.ts
export async function GET() {
  const checks = {
    database: await checkDatabase(),
    redis: await checkRedis(),
    whatsapp: await checkWhatsApp(),
    ai: await checkAI(),
  };
  
  const healthy = Object.values(checks).every(c => c.status === 'ok');
  
  return NextResponse.json({
    status: healthy ? 'healthy' : 'degraded',
    checks,
    timestamp: new Date().toISOString(),
  });
}
```

---

## Alerting Rules

| Alert | Condition | Severity |
|-------|-----------|----------|
| High Error Rate | > 5% errors for 5 min | Critical |
| High Latency | p95 > 1s for 5 min | High |
| Queue Backlog | > 1000 jobs pending | High |
| DB Connection Pool | > 80% utilized | Medium |
| Memory Usage | > 80% utilized | Medium |
| Disk Usage | > 90% utilized | High |

---

## Log Retention

| Log Type | Retention |
|----------|-----------|
| Application logs | 30 days |
| Access logs | 90 days |
| Error logs | 90 days |
| Audit logs | 1 year |
| Metrics | 90 days |

---

## Developer Notes

- Always use structured logging
- Never log sensitive data
- Always include request ID
- Keep log messages concise
- Use appropriate log levels

## Future Improvements

- Log aggregation dashboard
- Distributed tracing
- Anomaly detection
- Automated alerting
