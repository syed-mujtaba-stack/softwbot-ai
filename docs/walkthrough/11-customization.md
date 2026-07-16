# Customization

---

## Executive Summary

Learn how to customize SoftwBot AI for your needs.

---

## Duration

45 minutes

---

## Prerequisites

- Basic walkthrough completed
- First bot created

---

## Customization Areas

### 1. Theme Customization

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0070f3',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f5f5f5',
          foreground: '#171717',
        },
      },
      borderRadius: {
        lg: '1rem',
        md: '0.75rem',
        sm: '0.5rem',
      },
    },
  },
};
```

### 2. Custom Components

```typescript
// src/components/ui/custom-button.tsx
import { Button } from '@/components/ui/button';

interface CustomButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function CustomButton({
  variant = 'primary',
  size = 'md',
  children,
}: CustomButtonProps) {
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <Button className={`${variantClasses[variant]} ${sizeClasses[size]}`}>
      {children}
    </Button>
  );
}
```

### 3. Custom Hooks

```typescript
// src/hooks/use-bot.ts
import { useState, useEffect } from 'react';
import { Bot } from '@/types';

export function useBot(botId: string) {
  const [bot, setBot] = useState<Bot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchBot() {
      try {
        const response = await fetch(`/api/bots/${botId}`);
        if (!response.ok) throw new Error('Failed to fetch bot');
        const data = await response.json();
        setBot(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    
    fetchBot();
  }, [botId]);
  
  return { bot, loading, error };
}
```

### 4. Custom API Routes

```typescript
// src/app/api/custom/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: Request) {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const body = await request.json();
  
  // Custom logic here
  
  return NextResponse.json({ success: true });
}
```

---

## Customization Examples

### Example 1: Custom Dashboard Widget

```typescript
// src/components/features/dashboard/custom-widget.tsx
export function CustomWidget({ data }) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-semibold">Custom Widget</h3>
      <p className="text-sm text-muted-foreground">
        {data.summary}
      </p>
      <div className="mt-4">
        {data.items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Example 2: Custom Notification

```typescript
// src/components/features/notifications/custom-notification.tsx
import { toast } from 'sonner';

export function showCustomNotification(message: string, type: 'success' | 'error') {
  toast[type](message, {
    description: new Date().toLocaleString(),
    action: {
      label: 'Dismiss',
      onClick: () => {},
    },
  });
}
```

---

## Developer Notes

- Keep customizations documented
- Use consistent naming
- Test customizations thoroughly
- Share with team

## Future Improvements

- Theme marketplace
- Component library
- Plugin system
- Custom workflow builder
