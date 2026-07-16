# 32 — Implementation Workflow

---

## Executive Summary

This document defines the mandatory two-phase development workflow for SoftwBot AI. No implementation proceeds without explicit approval at each gate.

---

## Purpose

Prevent wasted effort by ensuring planning is complete before coding begins.

---

## Mandatory Workflow

### Phase 1: Planning

```
Read Documentation
       ↓
Analyze Requirements
       ↓
Generate Planning Files
       ↓
STOP — Wait for Approval
```

### Phase 2: Implementation

```
Implement Approved Features
       ↓
Testing (Unit + Integration)
       ↓
Documentation Update
       ↓
Walkthrough Update
       ↓
Progress Report
       ↓
STOP — Wait for Approval
```

---

## Phase 1: Planning Gates

### Gate 1: Documentation Read

Before any work, read ALL relevant documentation:

| Document | Required |
|----------|----------|
| 00-project-overview.md | Yes |
| 02-prd.md | Yes |
| Relevant module docs | Yes |
| 17-database.md | If DB changes |
| 18-api.md | If API changes |
| 47-module-architecture.md | If module changes |

### Gate 2: Requirements Analysis

Analyze and document:
- What features are being built
- What dependencies exist
- What risks are involved
- What the acceptance criteria are

### Gate 3: Planning Files

Generate these files in `planning/`:

| File | Content |
|------|---------|
| implementation-plan.md | Step-by-step plan |
| milestones.md | Milestone definitions |
| development-order.md | Build sequence |
| folder-plan.md | Files to create/modify |
| risk-analysis.md | Risk assessment |
| dependency-analysis.md | Dependencies |
| architecture-summary.md | Architecture impact |
| acceptance-checklist.md | Done criteria |

### Gate 4: Approval

**STOP.** Present planning files. Wait for explicit approval before proceeding.

---

## Phase 2: Implementation Gates

### Gate 5: Implementation

Implement only what was approved:
- Follow coding standards (61-coding-standards.md)
- Follow module architecture (47-module-architecture.md)
- Follow component guidelines (49-component-guidelines.md)
- Follow API conventions (70-api-conventions.md)

### Gate 6: Testing

Run all required tests:
- Unit tests for new code
- Integration tests for API routes
- Type checking passes
- Linting passes

### Gate 7: Documentation Update

Update relevant docs:
- API docs if endpoints changed
- Database docs if schema changed
- Module docs if architecture changed

### Gate 8: Walkthrough Update

Update walkthrough files:
- created-files.md
- modified-files.md
- database-changes.md
- api-changes.md
- testing-report.md

### Gate 9: Progress Report

Generate progress report:
- What was completed
- What changed from plan
- What issues were encountered
- What is next

### Gate 10: Approval

**STOP.** Present progress. Wait for explicit approval before continuing.

---

## Workflow Rules

1. Never skip a gate
2. Never proceed without approval
3. Never implement unapproved features
4. Always update walkthrough after implementation
5. Always run tests before reporting completion
6. Always document deviations from plan

---

## Approval Format

```markdown
## Approval Request

### What was planned
[Summary of planned work]

### What was implemented
[Summary of actual work]

### Changes from plan
[Any deviations]

### Testing results
[Test output]

### Files changed
[List of files]

### Ready for review: YES/NO
```

---

## Developer Notes

- This workflow applies to ALL implementation work
- Emergency fixes follow abbreviated workflow (35-approval-process.md)
- AI agents must follow this workflow exactly
- Human developers may request workflow exceptions

## Future Improvements

- Automated workflow tracking
- CI/CD integration for approval gates
- Workflow analytics dashboard
