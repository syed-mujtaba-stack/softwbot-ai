# Troubleshooting

---

## Executive Summary

Common issues and solutions for SoftwBot AI.

---

## Purpose

Quick reference for resolving problems.

---

## Connection Issues

### WhatsApp Not Connecting

**Symptoms**: QR code not loading, connection timeout

**Solutions**:
1. Check Green API instance is active
2. Verify API credentials in `.env`
3. Check network connectivity
4. Restart Green API instance
5. Clear session data and reconnect

```bash
# Check Green API status
curl https://api.green-api.com/waInstanceYOUR_ID/getState/YOUR_TOKEN
```

### Database Connection Failed

**Symptoms**: ECONNREFUSED, connection timeout

**Solutions**:
1. Verify PostgreSQL is running
2. Check `DATABASE_URL` format
3. Verify credentials
4. Check firewall rules
5. Ensure database exists

```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

### Redis Connection Failed

**Symptoms**: ECONNREFUSED on Redis port

**Solutions**:
1. Verify Redis is running
2. Check `REDIS_URL` format
3. Check firewall rules
4. Verify password if set

```bash
# Test connection
redis-cli ping
```

---

## AI Issues

### OpenRouter API Error

**Symptoms**: 401, 429, 500 errors

**Solutions**:
1. Verify API key is correct
2. Check account balance
3. Review rate limits
4. Try different model

```bash
# Test API key
curl https://openrouter.ai/api/v1/auth/key \
  -H "Authorization: Bearer $OPENROUTER_API_KEY"
```

### Poor Response Quality

**Symptoms**: Irrelevant or inaccurate responses

**Solutions**:
1. Improve system prompt
2. Add more context
3. Adjust temperature (lower = more focused)
4. Add knowledge base documents
5. Test with different models

---

## Performance Issues

### Slow API Responses

**Symptoms**: Requests timing out, slow page loads

**Solutions**:
1. Check database indexes
2. Review slow queries
3. Enable caching
4. Optimize N+1 queries
5. Check Redis connection

```sql
-- Find slow queries
SELECT query, mean_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;
```

### High Memory Usage

**Symptoms**: Server crashing, OOM errors

**Solutions**:
1. Check for memory leaks
2. Review data fetching patterns
3. Optimize large queries
4. Add pagination
5. Monitor with Sentry

---

## Deployment Issues

### Build Fails

**Symptoms**: Vercel build errors

**Solutions**:
1. Check TypeScript errors
2. Review ESLint errors
3. Verify environment variables
4. Check dependency versions

```bash
# Run locally
npm run build
```

### Environment Variables Not Working

**Symptoms**: Undefined values in production

**Solutions**:
1. Verify variables in Vercel dashboard
2. Check variable names match exactly
3. Redeploy after adding variables
4. Check for typos

---

## Common Error Messages

### "Unauthorized"

User not authenticated. Check:
- Clerk authentication working
- User is signed in
- Session hasn't expired

### "Not Found"

Resource doesn't exist. Check:
- Resource ID is correct
- User has access to resource
- Resource hasn't been deleted

### "Rate Limited"

Too many requests. Check:
- Implement retry logic
- Add exponential backoff
- Cache responses
- Review rate limits

---

## Getting Help

1. Check this troubleshooting guide
2. Review documentation
3. Check GitHub issues
4. Contact support

---

## Developer Notes

- Document new issues as they arise
- Update troubleshooting guide
- Share solutions with team
- Monitor error trends

## Future Improvements

- Automated diagnostics
- Health check endpoints
- Error reporting dashboard
- Self-healing systems
