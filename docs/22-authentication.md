# 22 — Authentication

---

## Executive Summary

This document details the Clerk authentication integration, including signup/login flows, JWT validation, session management, MFA, OAuth providers, webhooks, protected routes, and API authentication.

---

## Purpose

Authentication is the first line of defense. This document ensures all auth flows are secure, reliable, and user-friendly.

---

## Authentication Architecture

```mermaid
sequenceDiagram
    actor User
    participant Frontend
    participant Clerk
    participant Middleware
    participant API

    User->>Frontend: Click "Sign Up"
    Frontend->>Clerk: Redirect to Clerk
    Clerk->>User: Auth form
    User->>Clerk: Submit credentials
    Clerk->>Clerk: Validate & create session
    Clerk-->>Frontend: JWT + session cookie
    Frontend->>Middleware: Request with cookie
    Middleware->>Clerk: Verify JWT
    Clerk-->>Middleware: Valid + user data
    Middleware->>API: Forward with user context
    API-->>Frontend: Response
```

---

## Auth Flows

### Signup Flow

1. User clicks "Get Started"
2. Redirected to Clerk sign-up page
3. Enter email/password or choose SSO provider
4. If email: verification email sent
5. Click verification link
6. Account created in Clerk
7. Webhook triggers → create user in SoftwBot DB
8. Redirect to onboarding wizard

### Login Flow

1. User clicks "Sign In"
2. Enter credentials
3. Clerk validates against stored hash
4. JWT issued with user metadata
5. Session cookie set (HttpOnly, Secure, SameSite=Lax)
6. Redirect to dashboard

### SSO Flow (Google/GitHub)

1. User clicks "Continue with Google/GitHub"
2. Redirect to OAuth provider
3. User authorizes application
4. Callback to Clerk with auth code
5. Clerk exchanges for tokens
6. User account linked or created
7. JWT issued, session set
8. Redirect to dashboard

### Password Reset Flow

1. User clicks "Forgot Password"
2. Enter email address
3. Reset email sent with time-limited token (1 hour)
4. User clicks link, enters new password
5. Password updated in Clerk
6. All existing sessions invalidated
7. Redirect to login

### MFA Flow

1. User enables MFA in settings
2. TOTP secret generated
3. QR code displayed for authenticator app
4. User scans and enters verification code
5. Backup codes generated (10 codes, each single-use)
6. MFA enabled for account

---

## JWT Validation

### Middleware Validation

```typescript
// middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  publicRoutes: [
    '/',
    '/api/v1/auth/webhook',
    '/api/v1/webhooks/*',
    '/sign-in',
    '/sign-up',
  ],
});

export const config = {
  matcher: ['/((?!_next|[^?]*\\.(html?|css|js(?!on)|jpg|jpeg|png|gif|svg|ttf|woff|woff2|ico|csv|docx?|xlsx?|zip|webmanifest)).*)'],
};
```

### JWT Claims Used

| Claim | Purpose |
|-------|---------|
| `sub` | User ID (Clerk ID) |
| `email` | User email |
| `org_id` | Active workspace ID |
| `metadata.role` | User role in workspace |
| `metadata.workspace_ids` | All workspace memberships |

---

## Session Management

| Config | Value |
|--------|-------|
| Session duration | 7 days |
| Idle timeout | 24 hours |
| Cookie type | HttpOnly, Secure, SameSite=Lax |
| Cookie name | `__session` |
| Refresh strategy | Automatic via Clerk SDK |

### Session Invalidation

- User clicks "Sign Out" → session destroyed
- Password changed → all sessions invalidated
- Account deleted → all sessions invalidated
- MFA enabled → existing sessions require re-auth for sensitive ops

---

## Protected Routes

### Public Routes (No Auth Required)

```
/ (landing page)
/sign-in
/sign-up
/verify-email
/reset-password
/sso-callback
/api/v1/auth/webhook
/api/v1/webhooks/*
```

### Protected Routes (Auth Required)

All routes not in public list require authentication.

### Role-Protected Routes

| Route | Minimum Role |
|-------|-------------|
| `/settings/billing` | Admin |
| `/settings/danger` | Owner |
| `/team` | Admin |
| `/api/v1/workspaces/:id` (DELETE) | Owner |

---

## API Authentication

### Bearer Token (JWT)

```http
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

### API Key

```http
Authorization: Bearer sk_live_xxxxxxxxxxxxx
```

### API Key Management

- Keys prefixed with `sk_live_` (production) or `sk_test_` (development)
- Keys hashed (SHA-256) before storage
- Only first 8 characters shown after creation
- Can be scoped to specific endpoints
- Revocable at any time

---

## Clerk Webhook Handler

### Events Handled

| Event | Action |
|-------|--------|
| `user.created` | Create user in SoftwBot DB |
| `user.updated` | Update user in SoftwBot DB |
| `user.deleted` | Soft-delete user, schedule data cleanup |
| `session.created` | Log login event |
| `session.ended` | Log logout event |

### Webhook Security

- Verify webhook signature (Clerk signs webhooks)
- Use Svix for webhook verification
- Reject requests with invalid signatures

---

## Error Handling

| Error | User Experience | Technical Action |
|-------|----------------|-----------------|
| Invalid credentials | "Incorrect email or password" | Generic message (no user enumeration) |
| Account locked | "Account temporarily locked. Try again in 15 minutes." | Lock for 15 min after 5 failures |
| Session expired | Redirect to login with "Session expired" message | Clear session, redirect |
| Invalid MFA code | "Invalid code. Please try again." | Allow 3 attempts before lockout |
| Email not verified | "Please verify your email" | Resend verification option |

---

## Developer Notes

- Never store passwords — Clerk handles all credential storage
- Always verify JWT on server-side (don't trust client)
- Use Clerk webhooks for user sync (don't duplicate auth logic)
- Test with Clerk test keys in development
- Monitor failed login attempts for security

## Future Improvements

- Passkey support (WebAuthn)
- Social login (LinkedIn, Apple)
- Organization-level SSO
- Device management (revoke sessions by device)
- Login notifications (email on new device)
