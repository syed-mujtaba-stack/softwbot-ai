# 75 — Extension System

---

## Executive Summary

This document defines the extension system for customizing SoftwBot AI beyond plugins.

---

## Purpose

Provide multiple extension points for customization.

---

## Extension Points

### 1. Custom Actions

```typescript
interface CustomAction {
  id: string;
  name: string;
  description: string;
  parameters: ZodSchema;
  execute: (params: unknown, context: ActionContext) => Promise<ActionResult>;
}

// Register custom action
registerAction({
  id: 'send-invoice',
  name: 'Send Invoice',
  description: 'Send invoice to customer',
  parameters: z.object({
    amount: z.number(),
    email: z.string().email(),
  }),
  execute: async (params, context) => {
    // Custom logic
    return { success: true };
  },
});
```

### 2. Custom Triggers

```typescript
interface CustomTrigger {
  id: string;
  name: string;
  description: string;
  condition: (event: TriggerEvent) => boolean;
  onTrigger: (context: TriggerContext) => Promise<void>;
}

// Register custom trigger
registerTrigger({
  id: 'high-value-lead',
  name: 'High Value Lead',
  description: 'Triggers when lead score > 80',
  condition: (event) => event.type === 'lead.scored' && event.score > 80,
  onTrigger: async (context) => {
    await context.notify('New high-value lead!');
  },
});
```

### 3. Custom Channels

```typescript
interface CustomChannel {
  id: string;
  name: string;
  sendMessage: (to: string, message: string) => Promise<void>;
  receiveMessage: (handler: MessageHandler) => void;
}

// Register custom channel
registerChannel({
  id: 'telegram',
  name: 'Telegram',
  sendMessage: async (to, message) => {
    // Telegram API call
  },
  receiveMessage: (handler) => {
    // Setup webhook
  },
});
```

### 4. Custom AI Models

```typescript
interface CustomModel {
  id: string;
  name: string;
  provider: string;
  chat: (params: ChatParams) => Promise<ChatResponse>;
  estimateCost: (tokens: number) => number;
}

// Register custom model
registerModel({
  id: 'my-model',
  name: 'My Custom Model',
  provider: 'custom',
  chat: async (params) => {
    // Custom API call
  },
  estimateCost: (tokens) => tokens * 0.00001,
});
```

### 5. Custom Validators

```typescript
interface CustomValidator {
  id: string;
  name: string;
  validate: (data: unknown) => ValidationResult;
}

// Register custom validator
registerValidator({
  id: 'phone-validator',
  name: 'Phone Validator',
  validate: (data) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return {
      valid: phoneRegex.test(data as string),
      message: 'Invalid phone number',
    };
  },
});
```

---

## Extension Lifecycle

### Registration

```typescript
// Register extension
softwbot.register({
  type: 'action',
  extension: myAction,
});
```

### Activation

```typescript
// Enable extension
softwbot.enable('my-action');
```

### Deactivation

```typescript
// Disable extension
softwbot.disable('my-action');
```

### Removal

```typescript
// Unregister extension
softwbot.unregister('my-action');
```

---

## Extension Configuration

```json
{
  "extensions": {
    "my-action": {
      "enabled": true,
      "config": {
        "apiKey": "",
        "endpoint": ""
      }
    }
  }
}
```

---

## Extension Security

### Permissions

```typescript
interface ExtensionPermissions {
  read: string[];
  write: string[];
  execute: string[];
}
```

### Validation

- All extensions validated on registration
- Runtime permission checks
- Audit logging for all operations

---

## Extension API

### Available APIs

```typescript
interface ExtensionAPI {
  // Data
  db: DatabaseClient;
  cache: CacheClient;
  
  // Services
  ai: AIService;
  whatsapp: WhatsAppService;
  
  // Utilities
  logger: Logger;
  metrics: Metrics;
  
  // UI
  ui: UIService;
}
```

---

## Extension Development

### Best Practices

1. Keep extensions focused
2. Handle errors gracefully
3. Use provided APIs
4. Test thoroughly
5. Document clearly

### Testing

```typescript
describe('My Extension', () => {
  it('should execute action', async () => {
    const result = await myAction.execute(params, context);
    expect(result.success).toBe(true);
  });
});
```

---

## Developer Notes

- Extensions must be sandboxed
- Extensions must be versioned
- Extensions must be tested
- Extensions must be documented

## Future Improvements

- Extension marketplace
- Extension analytics
- Extension monetization
- Extension templates
- Extension SDK
