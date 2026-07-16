# Testing Setup

---

## Executive Summary

Set up testing infrastructure with Vitest.

---

## Duration

20 minutes

---

## Prerequisites

- Project setup complete

---

## Steps

### 1. Install Dependencies

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

### 2. Configure Vitest

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### 3. Create Setup File

```typescript
// tests/setup.ts
import '@testing-library/jest-dom';
```

### 4. Add Test Scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

### 5. Create First Test

```typescript
// src/lib/__tests__/utils.test.ts
import { describe, it, expect } from 'vitest';
import { formatPhone, validateEmail } from '../utils';

describe('formatPhone', () => {
  it('should format phone number', () => {
    expect(formatPhone('1234567890')).toBe('(123) 456-7890');
  });
  
  it('should handle international format', () => {
    expect(formatPhone('+11234567890')).toBe('+1 (123) 456-7890');
  });
});

describe('validateEmail', () => {
  it('should validate correct email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });
  
  it('should reject invalid email', () => {
    expect(validateEmail('invalid')).toBe(false);
  });
});
```

### 6. Create Component Test

```typescript
// src/components/__tests__/button.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../ui/button';

describe('Button', () => {
  it('should render button', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
  
  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

---

## Running Tests

```bash
# Run tests
npm test

# Run tests once
npm run test:run

# Run with coverage
npm run test:coverage

# Run specific file
npm test utils.test.ts
```

---

## Test Structure

```
tests/
├── setup.ts
├── unit/
│   └── utils.test.ts
├── integration/
│   └── api.test.ts
└── fixtures/
    └── data.ts
```

---

## Developer Notes

- Write tests for new features
- Keep tests fast
- Use meaningful test names
- Mock external dependencies

## Future Improvements

- E2E testing with Playwright
- Visual regression testing
- Performance testing
- Security testing
