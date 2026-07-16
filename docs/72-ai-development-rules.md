# 72 — AI Development Rules

---

## Executive Summary

This document defines rules specific to AI agent development in SoftwBot AI.

---

## Purpose

Ensure AI agents are reliable, maintainable, and cost-effective.

---

## Model Selection Rules

### When to Use Each Model

| Model | Use Case | Cost |
|-------|----------|------|
| GPT-4o-mini | Chat, simple tasks | Low |
| GPT-4o | Complex reasoning | Medium |
| Claude 3.5 Sonnet | Structured generation, analysis | Medium |
| DeepSeek | Cost-sensitive tasks | Low |
| text-embedding-3-small | Embeddings | Low |

### Fallback Chain

```
Primary → GPT-4o-mini → Claude 3.5 Haiku → DeepSeek → Template
```

---

## Prompt Engineering Rules

### System Prompt Structure

```
1. Role definition
2. Task description
3. Constraints
4. Output format
5. Examples (if needed)
6. Context (dynamic)
```

### Prompt Versioning

```json
{
  "agentId": "conversation",
  "version": "1.2.0",
  "prompt": "...",
  "variables": ["businessContext", "knowledge"],
  "metadata": {
    "author": "ai-engineer",
    "performance": {
      "avgTokens": 850,
      "qualityScore": 0.92
    }
  }
}
```

---

## Token Management

### Limits

| Agent | Max Tokens | Warning |
|-------|-----------|---------|
| Conversation | 4096 | 3500 |
| Bot Architect | 4096 | 3500 |
| QA Agent | 2048 | 1800 |
| Analytics | 4096 | 3500 |

### Optimization

1. Use concise prompts
2. Limit context to relevant messages
3. Cache frequent queries
4. Use streaming for long responses

---

## Cost Control

### Per-Request Limits

```typescript
const costLimits = {
  conversation: {
    maxTokens: 1000,
    maxCostPerRequest: 0.01,  // $0.01
  },
  botArchitect: {
    maxTokens: 4096,
    maxCostPerRequest: 0.10,  // $0.10
  },
};
```

### Daily Limits

| Plan | Daily Token Limit |
|------|------------------|
| Free | 100,000 |
| Starter | 1,000,000 |
| Pro | 10,000,000 |
| Enterprise | Custom |

---

## Error Handling

### AI Errors

```typescript
async function aiRequest(request: AIRequest): Promise<AIResponse> {
  try {
    return await primaryModel(request);
  } catch (error) {
    if (error.status === 429) {
      // Rate limited - try fallback
      return await fallbackModel(request);
    }
    throw error;
  }
}
```

### Response Validation

```typescript
function validateResponse(response: string): boolean {
  // Check for hallucination indicators
  // Check for content policy violations
  // Check for required format
  return isValid;
}
```

---

## Quality Assurance

### QA Testing

```typescript
const testCases = [
  {
    input: "What are your hours?",
    expected: "Contains business hours",
    category: "knowledge",
  },
  {
    input: "I want to complain",
    expected: "Offers human handoff",
    category: "handoff",
  },
];
```

### Quality Metrics

| Metric | Target |
|--------|--------|
| Accuracy | > 90% |
| Relevance | > 85% |
| Tone consistency | > 95% |
| Handoff rate | < 10% |

---

## Memory Management

### Conversation Memory

- Store last 20 messages
- Summarize older messages
- Extract key facts

### Long-term Memory

- Store in contacts.metadata
- Decay over 90 days
- Relevance scoring

---

## Streaming Rules

### When to Stream

- Long responses (> 500 tokens)
- User-facing chat
- Bot Architect generation

### When Not to Stream

- Short responses (< 100 tokens)
- Background processing
- Batch operations

---

## Testing AI Agents

### Unit Tests

```typescript
it('should generate valid response', async () => {
  const response = await conversationAgent.generate({
    message: "What are your hours?",
    context: mockContext,
  });
  expect(response.content).toBeTruthy();
  expect(response.confidence).toBeGreaterThan(0.5);
});
```

### Integration Tests

```typescript
it('should handle full conversation flow', async () => {
  const response1 = await agent.chat("Hello");
  const response2 = await agent.chat("What services do you offer?");
  expect(response2.content).toContain("services");
});
```

---

## Developer Notes

- Always validate AI responses
- Monitor token usage
- Log all AI interactions
- Test edge cases thoroughly

## Future Improvements

- AI self-improvement
- Custom model fine-tuning
- Multi-agent collaboration
- AI performance analytics
