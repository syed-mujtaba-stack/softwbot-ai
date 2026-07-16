# 64 — Definition of Done

---

## Executive Summary

This document defines the definition of done (DoD) for all work items in SoftwBot AI.

---

## Purpose

Ensure consistent completion standards across the team.

---

## Definition of Done

### For Features

- [ ] All acceptance criteria met
- [ ] Code reviewed and approved
- [ ] Unit tests written (80%+ coverage)
- [ ] Integration tests written
- [ ] E2E tests written (critical paths)
- [ ] Type checking passes
- [ ] Linting passes
- [ ] Documentation updated
- [ ] Walkthrough updated
- [ ] Performance targets met
- [ ] Accessibility verified
- [ ] Security reviewed
- [ ] No critical/high bugs

### For Bug Fixes

- [ ] Bug reproduced
- [ ] Root cause identified
- [ ] Fix implemented
- [ ] Regression test written
- [ ] Original test case passes
- [ ] No side effects
- [ ] Code reviewed
- [ ] Documentation updated (if needed)

### For Refactoring

- [ ] No behavior changes
- [ ] All existing tests pass
- [ ] New tests added (if needed)
- [ ] Performance verified
- [ ] Code reviewed
- [ ] Documentation updated

### For Documentation

- [ ] Content accurate
- [ ] Examples work
- [ ] Links valid
- [ ] Formatting correct
- [ ] Reviewed by subject matter expert

---

## Quality Gates

### Code Quality

| Gate | Requirement | Tool |
|------|-------------|------|
| TypeScript | Zero errors | tsc |
| ESLint | Zero errors | eslint |
| Tests | 80%+ coverage | vitest |
| Build | Successful | next build |

### Performance

| Gate | Requirement | Tool |
|------|-------------|------|
| Page load | < 2s | Lighthouse |
| API response | p95 < 200ms | APM |
| Bundle size | < 200KB | next build |

### Security

| Gate | Requirement | Tool |
|------|-------------|------|
| No secrets | Zero | git-secrets |
| Dependencies | No critical vulns | npm audit |
| Headers | All set | security-headers |

---

## Checklist Template

```markdown
## DoD Checklist

### Code
- [ ] TypeScript strict mode
- [ ] No `any` types
- [ ] Error handling
- [ ] Loading states
- [ ] Empty states
- [ ] Responsive
- [ ] Accessible

### Testing
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests (if critical)
- [ ] Edge cases
- [ ] Error scenarios

### Documentation
- [ ] API docs
- [ ] User docs
- [ ] Walkthrough
- [ ] Code comments

### Review
- [ ] Code review
- [ ] Security review
- [ ] Performance review

### Deployment
- [ ] Staging tested
- [ ] Production ready
- [ ] Rollback plan
```

---

## DoD Exceptions

### Emergency Fixes

- Code review: Required (expedited)
- Tests: Required (can be added post-fix)
- Documentation: Required (within 48 hours)

### Technical Debt

- Tests: Required
- Documentation: Required
- Code review: Required

---

## DoD Verification

### Self-Review

Before submitting for review:
1. Run all tests
2. Check type checking
3. Check linting
4. Test manually
5. Review own code

### Peer Review

Reviewer checks:
1. Code quality
2. Test coverage
3. Documentation
4. Security
5. Performance

---

## Developer Notes

- DoD is mandatory for all work
- Exceptions require tech lead approval
- DoD is enforced via code review
- DoD is updated based on lessons learned

## Future Improvements

- Automated DoD verification
- DoD analytics
- DoD templates
- DoD training
