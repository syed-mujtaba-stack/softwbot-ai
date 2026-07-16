# 38 — Testing Strategy

---

## Executive Summary

This document defines the comprehensive testing strategy for SoftwBot AI, covering all test types, tools, conventions, and coverage requirements.

---

## Purpose

Ensure code quality and prevent regressions through systematic testing at multiple levels.

---

## Testing Pyramid

```mermaid
pyramid
    title Testing Pyramid
    E2E Tests : 10%
    Integration Tests : 30%
    Unit Tests : 60%
```

---

## Test Types

### Unit Tests

| Aspect | Details |
|--------|---------|
| Framework | Vitest |
| Coverage | 80%+ line coverage |
| Location | `__tests__/*.test.ts` co-located |
| Speed | < 100ms per test |
| Isolation | Mock external dependencies |

#### What to Unit Test

- Utility functions
- Business logic
- Data transformations
- Validation schemas
- Helper functions

#### What NOT to Unit Test

- Framework code
- Third-party libraries
- Simple wrappers
- Configuration files

---

### Integration Tests

| Aspect | Details |
|--------|---------|
| Framework | Vitest |
| Coverage | All API routes, DB queries |
| Location | `tests/integration/` |
| Speed | < 5s per test |
| Database | Test database (Neon branch) |

#### What to Integration Test

- API routes end-to-end
- Database queries
- Authentication flows
- Authorization checks
- External service integrations (mocked)

---

### End-to-End Tests

| Aspect | Details |
|--------|---------|
| Framework | Playwright |
| Coverage | Critical user flows |
| Location | `tests/e2e/` |
| Speed | < 30s per test |
| Browser | Chromium, Firefox, WebKit |

#### What to E2E Test

- User signup → workspace creation → bot creation
- WhatsApp connection → message → AI response
- Knowledge base upload → search → answer
- Subscription upgrade → payment → activation
- Team invite → member joins → permissions work

---

## Test Conventions

### File Naming

```
src/lib/whatsapp/client.ts → src/lib/whatsapp/__tests__/client.test.ts
src/app/api/bots/route.ts → src/app/api/bots/__tests__/route.test.ts
```

### Test Structure

```typescript
describe('FeatureGroup', () => {
  describe('specificFeature', () => {
    it('should handle expected behavior', async () => {
      // Arrange
      const input = createTestData();
      
      // Act
      const result = await feature(input);
      
      // Assert
      expect(result).toEqual(expectedOutput);
    });
    
    it('should handle edge case', async () => {
      // ...
    });
    
    it('should throw on invalid input', async () => {
      // ...
    });
  });
});
```

### Naming Convention

```typescript
// ✅ Good
it('should return 401 when token is expired', () => {});
it('should create contact when phone number is new', () => {});
it('should throw NotFoundError when bot does not exist', () => {});

// ❌ Bad
it('works', () => {});
it('test 1', () => {});
it('should handle error', () => {});
```

---

## Mocking Strategy

### External Services

```typescript
vi.mock('@/lib/ai/openrouter', () => ({
  openrouter: {
    chat: vi.fn().mockResolvedValue({
      content: 'Mocked AI response'
    })
  }
}));

vi.mock('stripe', () => ({
  Stripe: vi.fn().mockImplementation(() => ({
    customers: { create: vi.fn().mockResolvedValue({ id: 'cus_mock' }) }
  }))
}));
```

### Database

```typescript
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

## Coverage Requirements

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

## Test Commands

```bash
npm run test:unit          # Unit tests
npm run test:integration   # Integration tests
npm run test:e2e           # E2E tests
npm run test:coverage      # With coverage report
npm run test:watch         # Watch mode
npm run test:all           # All tests
```

---

## CI Integration

| Trigger | Tests Run |
|---------|-----------|
| Every commit | Unit tests |
| Every PR | Unit + Integration |
| Merge to main | All tests including E2E |
| Nightly | Full suite + load tests |

---

## Test Data Management

### Factories

```typescript
function createBot(overrides?: Partial<Bot>) {
  return {
    id: uuid(),
    name: 'Test Bot',
    status: 'draft',
    model: 'openai/gpt-4o-mini',
    ...overrides
  };
}
```

### Fixtures

```typescript
// tests/fixtures/bots.ts
export const sampleBot = {
  id: 'bot_test_123',
  name: 'Test Bot',
  status: 'active'
};
```

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

## Developer Notes

- Write tests before fixing bugs (TDD for bug fixes)
- Mock external services, not internal modules
- Use factories for test data, not fixtures
- Keep tests fast — slow tests get skipped
- Tests must be deterministic (no flaky tests)

## Future Improvements

- Visual regression testing (Percy / Chromatic)
- Contract testing (Pact)
- Mutation testing (Stryker)
- Load testing in CI
- Test data management system
