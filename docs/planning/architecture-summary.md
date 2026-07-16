# Architecture Summary

---

## Executive Summary

This document provides a high-level architecture summary.

---

## Purpose

Quick reference for understanding the system architecture.

---

## System Overview

```mermaid
graph TB
    subgraph Frontend
        Next[Next.js App]
        React[React Components]
        Tailwind[Tailwind CSS]
    end
    
    subgraph Backend
        API[API Routes]
        Auth[Auth Middleware]
        Validation[Validation]
    end
    
    subgraph Services
        AI[AI Service]
        WhatsApp[WhatsApp Service]
        Storage[Storage Service]
        Queue[Queue Service]
    end
    
    subgraph Data
        DB[(PostgreSQL)]
        Redis[(Redis)]
        S3[(S3)]
    end
    
    subgraph External
        Clerk[Clerk]
        OpenRouter[OpenRouter]
        WA[WhatsApp API]
    end
    
    Next --> API
    API --> Auth
    API --> Validation
    API --> AI
    API --> WhatsApp
    API --> Storage
    API --> Queue
    
    AI --> DB
    AI --> Redis
    AI --> OpenRouter
    
    WhatsApp --> DB
    WhatsApp --> Redis
    WhatsApp --> WA
    
    Storage --> S3
    
    Auth --> Clerk
```

---

## Key Components

### Frontend

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Framework | Next.js 16 | App router, SSR |
| UI | Shadcn UI | Components |
| Styling | Tailwind CSS | Design system |
| State | Zustand | Client state |
| Animation | Framer Motion | Transitions |

### Backend

| Component | Technology | Purpose |
|-----------|-----------|---------|
| API | Next.js API Routes | Endpoints |
| Auth | Clerk | Authentication |
| Validation | Zod | Input validation |
| ORM | Drizzle | Database access |
| Cache | ioredis | Redis client |

### Services

| Component | Technology | Purpose |
|-----------|-----------|---------|
| AI | OpenRouter | LLM gateway |
| WhatsApp | whatsapp-web.js | Messaging |
| Storage | AWS S3 | File storage |
| Queue | BullMQ | Job processing |

---

## Data Flow

### Message Flow

```mermaid
sequenceDiagram
    participant User
    participant WhatsApp
    participant API
    participant AI
    participant DB
    
    User->>WhatsApp: Send message
    WhatsApp->>API: Webhook
    API->>DB: Store message
    API->>AI: Generate response
    AI->>DB: Store response
    AI->>API: Return response
    API->>WhatsApp: Send response
    WhatsApp->>User: Deliver message
```

### Bot Creation Flow

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant API
    participant AI
    participant DB
    
    User->>UI: Create bot
    UI->>API: Submit form
    API->>DB: Create bot
    API->>AI: Configure bot
    AI->>DB: Store config
    AI->>API: Return config
    API->>UI: Show success
    UI->>User: Bot created
```

---

## Security Layers

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Authentication | Clerk | User identity |
| Authorization | RBAC | Access control |
| Validation | Zod | Input sanitization |
| Encryption | AES-256 | Data protection |
| Rate Limiting | Redis | Abuse prevention |

---

## Scalability

### Current Capacity

| Metric | Capacity |
|--------|----------|
| Users | 1,000 |
| Bots | 500 |
| Messages/day | 10,000 |
| Storage | 100GB |

### Scaling Strategy

| Component | Strategy |
|-----------|----------|
| Frontend | CDN, edge functions |
| Backend | Serverless functions |
| Database | Read replicas |
| Cache | Cluster mode |
| Storage | CDN, lifecycle |

---

## Developer Notes

- This is a quick reference
- See detailed docs for specifics
- Keep this updated
- Review architecture regularly

## Future Improvements

- Interactive architecture diagrams
- Architecture decision records
- Performance benchmarks
- Cost analysis
