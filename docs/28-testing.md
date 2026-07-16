# 28 — Testing

---

## Executive Summary

This document defines the testing strategy, framework, conventions, and coverage requirements for SoftwBot AI.

---

## Purpose

Ensure code quality, prevent regressions, and maintain reliability through comprehensive testing at multiple levels.

---

## Testing Pyramid

```mermaid
pyramid
    title Testing Pyramid
    E2E Tests : 10
    Integration Tests : 30
    Unit Tests : 60
```

---

## Test Types

### Unit Tests

| Aspect | Details |
|--------|---------|
| Framework | Vitest |
| Coverage | 80%+ line coverage |
| Location | `__tests__/*.test.ts` co-located with source |
| Speed | < 100ms per test |
| Isolation | Mock external dependencies |

### Integration Tests

| Aspect | Details |
|--------|---------|
| Framework | Vitest |
| Coverage | All API routes, DB queries |
| Location | `__tests__/integration/` |
| Speed | < 5s per test |
| Database | Test database (Neon branch) |

### End-to-End Tests

| Aspect | Details |
|--------|---------|
| Framework | Playwright |
| Coverage | Critical user flows |
| Location | `tests/e2e/` |
| Speed | < 30s per test |
| Browser | Chromium, Firefox, WebKit |

---

## Test Conventions

### File Naming

```
src/lib/whatsapp/client.ts → src/lib/whatsapp/__tests__/client.test.ts
src/app/api/bots/route.ts → src/app/api/bots/__tests__/route.test.ts
```

### Test Structure

```typescript
describe('WhatsAppClient', () => {
  describe('sendMessage', () => {
    it('should send message to valid phone number', async () => {
      // Arrange
      const client = new WhatsAppClient(mockSocket);
      
      // Act
      const result = await client.sendMessage('+1234567890', 'Hello');
      
      // Assert
      expect(result.success).toBe(true);
      expect(mockSocket.emit).toHaveBeenCalledWith('message', expect.any(Object));
    });
    
    it('should reject invalid phone number', async () => {
      const client = new WhatsAppClient(mockSocket);
      
      await expect(
        client.sendMessage('invalid', 'Hello')
      ).rejects.toThrow('Invalid phone number');
    });
  });
});
```

### Naming Convention

```typescript
// Good
it('should return 401 when token is expired', () => {});
it('should create contact when phone number is new', () => {});
it('should throw NotFoundError when bot does not exist', () => {});

// Bad
it('works', () => {});
it('test 1', () => {});
it('should handle error', () => {});
```

---

## Mocking Strategy

### External Services

```typescript
// Mock OpenRouter
vi.mock('@/lib/ai/openrouter', () => ({
  openrouter: {
    chat: vi.fn().mockResolvedValue({
      content: 'Mocked AI response'
    })
  }
}));

// Mock Stripe
vi.mock('stripe', () => ({
  Stripe: vi.fn().mockImplementation(() => ({
    customers: { create: vi.fn().mockResolvedValue({ id: 'cus_mock' }) },
    subscriptions: { create: vi.fn().mockResolvedValue({ id: 'sub_mock' }) }
  }))
}));
```

### Database

```typescript
// Use test database branch
const testDb = await createTestDatabase();

afterEach(async () => {
  await testDb.delete(messages);
  await testDb.delete(conversations);
});

afterAll(async () => {
  await testDb.$client.end();
});
```

---

## Test Coverage Requirements

| Module | Minimum Coverage |
|--------|-----------------|
| Auth | 90% |
| API Routes | 85% |
| Bot Engine | 85% |
| RAG Pipeline | 80% |
| Billing | 90% |
| UI Components | 75% |
| Utilities | 95% |

---

## E2E Test Scenarios

### Critical Flows

1. User signup → workspace creation → bot creation
2. Connect WhatsApp → send test message → receive AI response
3. Upload document → bot answers question from document
4. Upgrade plan → payment → plan activated
5. Team invite → member accepts → permissions working
6. Human handoff → agent takes over → resolve conversation

---

## Performance Testing

### Load Test Scenarios

| Scenario | Target | Tool |
|----------|--------|------|
| Concurrent users | 1000 | k6 |
| API response time | p95 < 200ms | k6 |
| WebSocket connections | 500 | Artillery |
| File upload (50MB) | < 10s | k6 |

---

## Snapshot Testing

UI components use snapshot testing for visual regression:

```typescript
it('renders BotCard correctly', () => {
  const { container } = render(<BotCard bot={mockBot />);
  expect(container).toMatchSnapshot();
});
```

---

## Test Commands

```bash
npm run test:unit          # Unit tests
npm run test:integration   # Integration tests
npm run test:e2e           # E2E tests
npm run test:coverage      # With coverage report
npm run test:watch         # Watch mode
```

---

## CI Integration

Tests run automatically on:
- Every commit (unit tests)
- Every PR (unit + integration)
- Merge to main (all tests including E2E)

---

## Developer Notes

- Write tests before fixing bugs (TDD for bug fixes)
- Mock external services, not internal modules
- Use factories for test data, not fixtures
- Keep tests fast — slow tests get skipped

## Future Improvements

- Visual regression testing (Percy / Chromatic)
- Contract testing (Pact)
- Mutation testing (Stryker)
- Load testing in CI
- Test data management system
