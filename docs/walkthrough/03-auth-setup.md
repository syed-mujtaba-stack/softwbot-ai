# Auth Setup

---

## Executive Summary

Set up Clerk authentication.

---

## Duration

30 minutes

---

## Prerequisites

- Project setup complete
- Clerk account created

---

## Steps

### 1. Create Clerk Application

1. Go to dashboard.clerk.com
2. Create new application
3. Copy API keys

### 2. Configure Environment

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 3. Install Clerk

```bash
npm install @clerk/nextjs
```

### 4. Setup Clerk Provider

```typescript
// src/app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

### 5. Add Middleware

```typescript
// src/middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
```

### 6. Add Auth Pages

```typescript
// src/app/(auth)/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return <SignIn />;
}

// src/app/(auth)/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return <SignUp />;
}
```

### 7. Protect Routes

```typescript
// src/app/(dashboard)/layout.tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }
  
  return <>{children}</>;
}
```

---

## Verification

1. Start server: `npm run dev`
2. Navigate to `/sign-in`
3. Create account
4. Access dashboard
5. Check user data in Clerk dashboard

---

## Common Issues

### Issue: Invalid publishable key

Check `.env` for correct `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`

### Issue: Middleware not working

Ensure `src/middleware.ts` is in project root

### Issue: User not found in database

Sync Clerk user to your database using webhooks

---

## Developer Notes

- Keep API keys secure
- Use environment variables
- Test auth flow thoroughly
- Handle edge cases

## Future Improvements

- Multi-factor authentication
- Social providers
- Custom auth pages
- Session management
