# Project Setup

---

## Executive Summary

Set up the development environment for SoftwBot AI.

---

## Duration

30 minutes

---

## Steps

### 1. Clone Repository

```bash
git clone https://github.com/softwbot/ai.git
cd ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/softwbot

# Redis
REDIS_URL=redis://localhost:6379

# Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# AI
OPENROUTER_API_KEY=sk-or-...

# WhatsApp
WHATSAPP_PROVIDER=green-api
WHATSAPP_API_URL=https://api.green-api.com
WHATSAPP_API_KEY=...

# Storage
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
S3_BUCKET=softwbot-storage

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Start Services

```bash
# Start PostgreSQL and Redis
docker-compose up -d

# Or use local installations
```

### 5. Initialize Database

```bash
npm run db:generate
npm run db:migrate
```

### 6. Start Development Server

```bash
npm run dev
```

### 7. Verify Setup

Open http://localhost:3000

---

## Verification Checklist

- [ ] Dependencies installed
- [ ] Environment configured
- [ ] Database running
- [ ] Redis running
- [ ] Migrations applied
- [ ] Server starts
- [ ] Page loads

---

## Common Issues

### Issue: Port already in use

```bash
# Find process using port
netstat -ano | findstr :3000

# Kill process
taskkill /PID <pid> /F
```

### Issue: Database connection failed

```bash
# Check PostgreSQL is running
docker ps

# Check connection string
echo $DATABASE_URL
```

### Issue: Redis connection failed

```bash
# Check Redis is running
docker ps

# Test connection
redis-cli ping
```

---

## Developer Notes

- Keep `.env` secure
- Don't commit secrets
- Use `.env.example` as template
- Document new variables

## Future Improvements

- Automated setup script
- Docker development environment
- VS Code devcontainer
- Setup verification script
