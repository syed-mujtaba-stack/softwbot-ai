# Deployment Setup

---

## Executive Summary

Set up deployment to Vercel with production configuration.

---

## Duration

30 minutes

---

## Prerequisites

- Project setup complete
- Vercel account created
- GitHub repository

---

## Steps

### 1. Connect to Vercel

1. Go to vercel.com
2. Import GitHub repository
3. Configure project settings

### 2. Configure Environment Variables

Add all environment variables in Vercel dashboard:

```
DATABASE_URL
REDIS_URL
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
OPENROUTER_API_KEY
WHATSAPP_PROVIDER
WHATSAPP_API_URL
WHATSAPP_INSTANCE_ID
WHATSAPP_API_TOKEN
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
S3_BUCKET
NEXT_PUBLIC_APP_URL
```

### 3. Configure Build Settings

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
```

### 4. Add Production Environment

```env
# .env.production
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### 5. Configure Domains

1. Go to Vercel project settings
2. Add custom domain
3. Configure DNS

### 6. Setup Preview Deployments

Vercel automatically creates preview deployments for PRs.

---

## Post-Deployment

### Verify Deployment

1. Check build logs
2. Test all features
3. Monitor error tracking
4. Check performance

### Setup Monitoring

1. Connect Sentry
2. Setup alerts
3. Configure dashboards

---

## Common Issues

### Issue: Build fails

Check build logs for errors. Common issues:
- Missing environment variables
- TypeScript errors
- ESLint errors

### Issue: Database connection fails

Ensure `DATABASE_URL` is correct and database is accessible from Vercel.

### Issue: Redis connection fails

Ensure `REDIS_URL` is correct and Redis is accessible from Vercel.

---

## Developer Notes

- Test before deploying
- Use preview deployments
- Monitor after deployment
- Keep secrets secure

## Future Improvements

- CI/CD automation
- Blue-green deployments
- Rollback capability
- Performance monitoring
