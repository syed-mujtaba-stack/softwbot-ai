# 23 — RBAC (Role-Based Access Control)

---

## Executive Summary

This document defines the role hierarchy, permission matrix, and enforcement strategy for SoftwBot AI's multi-tenant workspace system.

---

## Purpose

RBAC ensures users can only access resources appropriate to their role, preventing unauthorized actions while enabling team collaboration.

---

## Role Hierarchy

| Role | Description | Count Limit |
|------|------------|-------------|
| Owner | Full control, billing, deletion | 1 per workspace |
| Admin | Manage team, bots, settings | Up to 5 |
| Member | Create/manage bots, conversations | Unlimited |
| Viewer | Read-only access to all data | Unlimited |

---

## Permission Matrix

### Bot Management

| Action | Owner | Admin | Member | Viewer |
|--------|-------|-------|--------|--------|
| Create bot | ✅ | ✅ | ✅ | ❌ |
| Edit bot config | ✅ | ✅ | ✅ | ❌ |
| Delete bot | ✅ | ✅ | ❌ | ❌ |
| Clone bot | ✅ | ✅ | ✅ | ❌ |
| Activate/pause bot | ✅ | ✅ | ✅ | ❌ |
| View bot | ✅ | ✅ | ✅ | ✅ |

### Knowledge Base

| Action | Owner | Admin | Member | Viewer |
|--------|-------|-------|--------|--------|
| Create KB | ✅ | ✅ | ✅ | ❌ |
| Upload files | ✅ | ✅ | ✅ | ❌ |
| Delete files | ✅ | ✅ | ✅ | ❌ |
| Search KB | ✅ | ✅ | ✅ | ✅ |
| Delete KB | ✅ | ✅ | ❌ | ❌ |

### Conversations

| Action | Owner | Admin | Member | Viewer |
|--------|-------|-------|--------|--------|
| View conversations | ✅ | ✅ | ✅ | ✅ |
| Send messages | ✅ | ✅ | ✅ | ❌ |
| Human takeover | ✅ | ✅ | ✅ | ❌ |
| Resolve conversations | ✅ | ✅ | ✅ | ❌ |
| Add internal notes | ✅ | ✅ | ✅ | ❌ |
| Delete conversations | ✅ | ✅ | ❌ | ❌ |

### Contacts & Leads

| Action | Owner | Admin | Member | Viewer |
|--------|-------|-------|--------|--------|
| View contacts | ✅ | ✅ | ✅ | ✅ |
| Create/edit contacts | ✅ | ✅ | ✅ | ❌ |
| Delete contacts | ✅ | ✅ | ❌ | ❌ |
| Import/export | ✅ | ✅ | ❌ | ❌ |
| View leads | ✅ | ✅ | ✅ | ✅ |
| Manage leads | ✅ | ✅ | ✅ | ❌ |

### Automation

| Action | Owner | Admin | Member | Viewer |
|--------|-------|-------|--------|--------|
| Create rules | ✅ | ✅ | ✅ | ❌ |
| Edit rules | ✅ | ✅ | ✅ | ❌ |
| Delete rules | ✅ | ✅ | ❌ | ❌ |
| Toggle rules | ✅ | ✅ | ✅ | ❌ |
| View executions | ✅ | ✅ | ✅ | ✅ |

### Broadcasts

| Action | Owner | Admin | Member | Viewer |
|--------|-------|-------|--------|--------|
| Create broadcast | ✅ | ✅ | ✅ | ❌ |
| Send broadcast | ✅ | ✅ | ❌ | ❌ |
| Cancel broadcast | ✅ | ✅ | ❌ | ❌ |
| View reports | ✅ | ✅ | ✅ | ✅ |

### Analytics

| Action | Owner | Admin | Member | Viewer |
|--------|-------|-------|--------|--------|
| View analytics | ✅ | ✅ | ✅ | ✅ |
| Export reports | ✅ | ✅ | ❌ | ❌ |
| Custom dashboards | ✅ | ✅ | ❌ | ❌ |

### Settings & Billing

| Action | Owner | Admin | Member | Viewer |
|--------|-------|-------|--------|--------|
| View workspace settings | ✅ | ✅ | ✅ | ✅ |
| Edit workspace settings | ✅ | ✅ | ❌ | ❌ |
| Manage billing | ✅ | ❌ | ❌ | ❌ |
| Manage team | ✅ | ✅ | ❌ | ❌ |
| API key management | ✅ | ✅ | ❌ | ❌ |
| Delete workspace | ✅ | ❌ | ❌ | ❌ |

---

## Implementation

### Database Check

Every query includes workspace scope:

```typescript
const member = await db.query.workspaceMembers.findFirst({
  where: and(
    eq(workspaceMembers.workspaceId, workspaceId),
    eq(workspaceMembers.userId, userId),
    eq(workspaceMembers.isActive, true)
  )
});

if (!member) throw new ForbiddenError('Not a workspace member');
```

### Permission Check Middleware

```typescript
function requireRole(minRole: Role) {
  return async (req, res, next) => {
    const userRole = await getWorkspaceRole(req.userId, req.workspaceId);
    if (roleHierarchy[userRole] < roleHierarchy[minRole]) {
      throw new ForbiddenError('Insufficient permissions');
    }
    next();
  };
}
```

### UI Permission Rendering

```typescript
const { role } = useWorkspace();
const canDeleteBot = ['owner', 'admin'].includes(role);
const canManageTeam = ['owner', 'admin'].includes(role);
const canManageBilling = role === 'owner';
```

---

## Custom Permissions

Workspace owners can override default permissions per member. All overrides are logged for audit purposes.

---

## Audit Trail

All permission-sensitive actions logged with user ID, action, target resource, and timestamp.

---

## Developer Notes

- Always check permissions server-side (never trust client-side checks)
- Use the permission matrix as the source of truth
- Audit all permission-sensitive actions
- Review permissions quarterly

## Future Improvements

- Custom role creation
- Granular permission toggles
- Permission groups
- API rate limits per role
