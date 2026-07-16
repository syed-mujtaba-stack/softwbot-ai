# 59 — Backup Strategy

---

## Executive Summary

This document defines the backup strategy for SoftwBot AI, covering database, files, configuration, and code backups.

---

## Purpose

Ensure data can be recovered in case of failure, corruption, or disaster.

---

## Backup Types

| Type | Scope | Frequency | Retention |
|------|-------|-----------|-----------|
| Full | Entire database | Daily | 30 days |
| Incremental | Changes since last | Hourly | 7 days |
| Continuous | Real-time changes | Continuous | 24 hours |
| Manual | Pre-migration | On demand | Permanent |

---

## Database Backups

### Neon Automated Backups

- **Frequency:** Daily
- **Retention:** 30 days
- **Type:** Full + WAL archiving
- **Point-in-time recovery:** Supported

### Backup Verification

```sql
-- Verify backup integrity
SELECT pg_size_pretty(pg_database_size('softwbot'));

-- Check backup status
SELECT * FROM pg_stat_bgwriter;
```

### Restoration Process

```bash
# Point-in-time restore via Neon CLI
neonctl branches restore \
  --project-id <project-id> \
  --branch-id <branch-id> \
  --parent <parent-id> \
  --restore-to-time "2026-07-16T10:00:00Z"
```

---

## File Backups

### S3 Versioning

```json
{
  "VersioningConfiguration": {
    "Status": "Enabled",
    "NoncurrentVersionExpiration": {
      "NoncurrentDays": 90
    }
  }
}
```

### Cross-Region Replication

```json
{
  "Rule": {
    "Status": "Enabled",
    "Destination": {
      "Bucket": "arn:aws:s3:::softwbot-backup-us-west-2"
    }
  }
}
```

---

## Configuration Backups

### Environment Variables

```bash
# Backup environment variables
cp .env.local .env.local.backup.$(date +%Y%m%d)

# Or use Vercel CLI
vercel env pull .env.backup
```

### Secrets Backup

```bash
# Backup to secure location
aws s3 cp secrets/ s3://softwbot-secrets-backup/ --recursive
```

---

## Code Backups

### Git Repository

- **Primary:** GitHub
- **Backup:** GitLab mirror
- **Frequency:** Real-time (push)

### Git Mirror Setup

```bash
# Add mirror remote
git remote add mirror git@gitlab.com:softwbot/softwbot-ai.git

# Push to both
git push origin main
git push mirror main
```

---

## Backup Schedule

| Data | Method | Frequency | Retention |
|------|--------|-----------|-----------|
| PostgreSQL | Neon automated | Daily | 30 days |
| PostgreSQL WAL | Neon continuous | Continuous | 7 days |
| S3 files | Versioning | Continuous | 90 days |
| S3 cross-region | Replication | Daily | 30 days |
| Environment | Manual | On change | Permanent |
| Code | Git | Real-time | Permanent |

---

## Backup Monitoring

### Health Checks

```typescript
interface BackupHealth {
  lastBackup: Date;
  size: number;
  status: 'healthy' | 'warning' | 'critical';
  errors: string[];
}
```

### Alerts

| Condition | Severity | Action |
|-----------|----------|--------|
| Backup failed | Critical | Immediate fix |
| Backup > 24 hours old | High | Investigate |
| Backup size abnormal | Medium | Review |
| Storage limit > 80% | High | Cleanup |

---

## Restoration Testing

### Monthly Test

1. Restore database to test branch
2. Verify data integrity
3. Test application functionality
4. Document results

### Restoration Commands

```bash
# Restore database
neonctl branches restore --branch-id test-restore --parent main

# Restore files
aws s3 sync s3://softwbot-backup/ s3://softwbot-production/ --dryrun

# Restore code
git clone git@gitlab.com:softwbot/softwbot-ai.git
```

---

## Backup Security

### Encryption

- All backups encrypted at rest (AES-256)
- All backups encrypted in transit (TLS 1.3)
- Encryption keys managed via AWS KMS

### Access Control

- Backup access requires admin role
- All access logged
- Regular access reviews

---

## Developer Notes

- Never delete backups manually
- Always verify backups after creation
- Test restoration regularly
- Keep backup documentation updated

## Future Improvements

- Automated backup verification
- Backup analytics dashboard
- Cross-region backup automation
- Backup cost optimization
