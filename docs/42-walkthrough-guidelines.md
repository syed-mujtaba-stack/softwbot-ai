# 42 — Walkthrough Guidelines

---

## Executive Summary

This document defines the required walkthrough structure, format, and update process for SoftwBot AI.

---

## Purpose

Provide comprehensive visibility into what was built, changed, and tested at each milestone.

---

## Walkthrough Directory

```
walkthrough/
├── project-status.md
├── completed-features.md
├── created-files.md
├── modified-files.md
├── database-changes.md
├── api-changes.md
├── ui-changes.md
├── agent-changes.md
├── architecture-changes.md
├── testing-report.md
├── known-issues.md
├── next-steps.md
└── decision-log.md
```

---

## File Templates

### project-status.md

```markdown
# Project Status

## Current Phase
[Phase name and number]

## Overall Status
[Green/Yellow/Red]

## Summary
[2-3 sentence overview]

## Key Metrics
| Metric | Value |
|--------|-------|
| Features completed | X/X |
| Tests passing | X/X |
| Code coverage | X% |
| Open bugs | X |

## Blockers
- [Blocker 1]

## Next Milestone
[Milestone name and date]
```

### completed-features.md

```markdown
# Completed Features

## [Feature Name]
- **Status:** Complete
- **Files:** [List of files]
- **Tests:** [Test file links]
- **Notes:** [Any notes]
```

### created-files.md

```markdown
# Created Files

## [Date]

| File | Purpose | Module |
|------|---------|--------|
| src/lib/ai/bot-architect.ts | Bot Architect agent | AI |
| src/app/bot-architect/page.tsx | Bot Architect UI | Dashboard |
```

### modified-files.md

```markdown
# Modified Files

## [Date]

| File | Changes | Reason |
|------|---------|--------|
| src/lib/db/schema.ts | Added bots table | Bot creation feature |
| src/app/api/bots/route.ts | Added POST endpoint | Bot creation API |
```

### database-changes.md

```markdown
# Database Changes

## [Date]

### New Tables
| Table | Purpose |
|-------|---------|
| bots | Bot configurations |

### Schema Changes
| Table | Change | SQL |
|-------|--------|-----|
| bots | Added column | `ALTER TABLE bots ADD COLUMN model text` |

### Indexes
| Table | Index | Purpose |
|-------|-------|---------|
| bots | idx_bots_workspace | Faster workspace lookups |
```

### api-changes.md

```markdown
# API Changes

## [Date]

### New Endpoints
| Method | Path | Purpose |
|--------|------|---------|
| POST | /api/v1/bots | Create bot |
| GET | /api/v1/bots | List bots |

### Modified Endpoints
| Method | Path | Changes |
|--------|------|---------|
| GET | /api/v1/bots/[id] | Added knowledge base count |

### Deprecated Endpoints
| Method | Path | Replacement |
|--------|------|-------------|
| POST | /api/v1/bot | Use /api/v1/bots |
```

### ui-changes.md

```markdown
# UI Changes

## [Date]

### New Pages
| Page | Route | Purpose |
|------|-------|---------|
| Bot Architect | /bot-architect | Create bots with AI |

### Modified Pages
| Page | Route | Changes |
|------|-------|---------|
| Bot List | /bots | Added grid view |

### New Components
| Component | Location | Purpose |
|-----------|----------|---------|
| BotCard | components/dashboard/bots/ | Bot display card |
```

### agent-changes.md

```markdown
# Agent Changes

## [Date]

### New Agents
| Agent | Purpose | Model |
|-------|---------|-------|
| Bot Architect | Generate bot configs | Claude 3.5 Sonnet |

### Modified Agents
| Agent | Changes |
|-------|---------|
| Conversation | Added knowledge context |
```

### testing-report.md

```markdown
# Testing Report

## [Date]

### Test Summary
| Type | Total | Passed | Failed | Coverage |
|------|-------|--------|--------|----------|
| Unit | X | X | X | X% |
| Integration | X | X | X | X% |
| E2E | X | X | X | - |

### Failed Tests
| Test | Error | Resolution |
|------|-------|------------|
| [Test name] | [Error] | [Fix] |

### New Tests Added
| Test File | Tests | Coverage |
|-----------|-------|----------|
| [File] | X | X% |
```

### known-issues.md

```markdown
# Known Issues

## [Issue Name]
- **Severity:** [Critical/High/Medium/Low]
- **Description:** [What's wrong]
- **Impact:** [Who's affected]
- **Workaround:** [If any]
- **Resolution:** [Plan to fix]
```

### next-steps.md

```markdown
# Next Steps

## Immediate (This Week)
- [Task 1]
- [Task 2]

## Short-term (Next Sprint)
- [Task 3]
- [Task 4]

## Long-term (Next Phase)
- [Task 5]
```

### decision-log.md

```markdown
# Decision Log

## [Date] — [Decision Title]

### Context
[Why this decision was needed]

### Options
1. [Option 1]: [Pros/Cons]
2. [Option 2]: [Pros/Cons]

### Decision
[What was decided]

### Rationale
[Why this option was chosen]

### Consequences
[What this means going forward]
```

---

## Update Rules

1. Update after every completed feature
2. Update at every milestone
3. Keep files current and accurate
4. Link related changes across files
5. Include file paths for all changes

---

## Developer Notes

- Walkthrough is the single source of truth for progress
- Be thorough and accurate
- Include screenshots for UI changes
- Link to relevant documentation
- Keep decision log updated

## Future Improvements

- Automated walkthrough generation
- Walkthrough diff between milestones
- Integration with project management
- Visual walkthrough dashboard
