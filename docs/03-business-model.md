# 03 — Business Model

---

## Executive Summary

SoftwBot AI operates a **tiered subscription + usage overage** SaaS business model, targeting small-to-medium businesses that want AI-powered WhatsApp automation. The business achieves profitability through efficient infrastructure costs, AI API cost optimization, and a high-value product that drives organic growth and low churn.

---

## Purpose

This document defines the complete business model for SoftwBot AI, including revenue streams, cost structure, unit economics, pricing strategy, financial projections, go-to-market strategy, and growth levers.

---

## Business Model Canvas

| Block | Description |
|-------|-------------|
| **Customer Segments** | Small restaurants, e-commerce stores, real estate agencies, healthcare clinics, marketing agencies |
| **Value Propositions** | AI-powered WhatsApp bots created from natural language; 24/7 automation; no coding required; multi-model AI; self-hostable |
| **Channels** | Website, Product Hunt, YouTube tutorials, SEO content, WhatsApp communities, partnerships |
| **Customer Relationships** | Self-service (free/starter), email support (starter/pro), dedicated support (enterprise) |
| **Revenue Streams** | Subscriptions (70%), usage overage (15%), add-ons (10%), API access (5%) |
| **Key Resources** | Engineering team, AI infrastructure, WhatsApp integration, brand/trust |
| **Key Activities** | Product development, AI optimization, customer support, marketing, compliance monitoring |
| **Key Partners** | OpenRouter, Clerk, Stripe, Cloudflare, Vercel/Railway, content creators |
| **Cost Structure** | AI API costs (35%), infrastructure (20%), team (30%), marketing (10%), operations (5%) |

---

## Revenue Streams

### 1. Subscriptions (70% of Revenue)

| Plan | Monthly Price | Annual Price | Target Segment |
|------|--------------|-------------|----------------|
| Free | $0 | $0 | Trial, hobbyists |
| Starter | $29/mo | $290/yr (save 17%) | Small businesses |
| Pro | $79/mo | $790/yr (save 17%) | Growing businesses, agencies |
| Enterprise | Custom | Custom | Large businesses, white-label |

### 2. Usage Overage (15% of Revenue)

| Overage Type | Price |
|-------------|-------|
| Messages beyond plan limit | $0.01/message |
| Knowledge base storage beyond limit | $0.10/GB/month |
| File storage beyond limit | $0.05/GB/month |

### 3. Add-ons (10% of Revenue)

| Add-on | Price |
|--------|-------|
| Extra bots (per bot beyond plan) | $5/bot/month |
| Premium support | $99/month |
| White-label | $199/month |
| Custom branding | $49/month |

### 4. API Access (5% of Revenue)

| Tier | Price |
|------|-------|
| Starter API (1,000 calls/day) | Included in Pro plan |
| Pro API (10,000 calls/day) | $49/month |
| Enterprise API (unlimited) | Custom |

---

## Cost Structure

### Monthly Cost Breakdown (at 1,000 active bots)

| Category | Cost | % of Total | Notes |
|----------|------|-----------|-------|
| AI API (OpenRouter) | $3,500 | 35% | Scales with message volume |
| Infrastructure | $2,000 | 20% | Servers, database, Redis, storage |
| Team (3 engineers) | $3,000 | 30% | Salaries, benefits |
| Marketing | $1,000 | 10% | Content, ads, partnerships |
| Operations | $500 | 5% | Tools, support, legal |
| **Total** | **$10,000** | **100%** | |

### AI API Cost per Message

| Model | Cost per 1K tokens | Avg tokens/message | Cost per message |
|-------|-------------------|-------------------|-----------------|
| GPT-4o-mini | $0.15 | 500 | $0.000075 |
| GPT-4o | $2.50 | 500 | $0.00125 |
| Claude 3.5 Sonnet | $3.00 | 500 | $0.0015 |
| Claude 3.5 Haiku | $0.80 | 500 | $0.0004 |
| DeepSeek Chat | $0.14 | 500 | $0.00007 |
| Llama 3.1 70B | $0.52 | 500 | $0.00026 |

**Blended average cost per message: ~$0.0002**

---

## Unit Economics

| Metric | Value | Calculation |
|--------|-------|-------------|
| **CAC** (Customer Acquisition Cost) | $50 | $2,000 marketing / 40 sign-ups |
| **ARPU** (Average Revenue Per User) | $40/month | Blended across all paid plans |
| **LTV** (Customer Lifetime Value) | $480 | $40 × 12 months |
| **LTV:CAC Ratio** | 9.6:1 | $480 / $50 |
| **Gross Margin** | 75% | (Revenue - COGS) / Revenue |
| **Payback Period** | 1.25 months | $50 CAC / $40 ARPU |
| **Monthly Churn** | 5% | Target |
| **Annual Retention** | 46% | (1 - 0.05)^12 |
| **Months to Recover CAC** | 1.3 | CAC / (ARPU × margin) |

### Cost per Bot per Month

| Component | Cost |
|-----------|------|
| AI API (avg 500 messages) | $0.10 |
| Infrastructure share | $2.00 |
| Database storage | $0.50 |
| Support share | $0.40 |
| **Total COGS per bot** | **$3.00** |
| **Revenue per bot (Pro plan avg)** | **$8.00** |
| **Gross profit per bot** | **$5.00 (62.5%)** |

---

## Pricing Strategy

### Approach: Value-Based Pricing with Freemium

**Freemium Rationale:**
- Removes friction for trial
- Free tier showcases Bot Architect value
- Natural upgrade pressure as usage grows
- Word-of-mouth from free users

**Value-Based Pricing:**
- Starter plan priced at ~10% of a support agent's cost
- Pro plan priced at ~25% of a support agent's cost
- Enterprise priced at cost of 1-2 support agents

**Psychological Pricing:**
- $29 and $79 (charm pricing)
- Annual discount (17%) incentivizes commitment
- Free tier creates loss aversion

### Price Anchoring

The comparison is always against human labor:
- A part-time support agent: $1,500/month
- Starter plan ($29/month) = 2% of human cost
- Pro plan ($79/month) = 5% of human cost
- **Messaging: "Replace a $1,500/month employee with a $29/month AI"**

---

## Customer Acquisition Strategy

### Channels (Ranked by Priority)

| Channel | Strategy | CAC | Volume | Timeline |
|---------|----------|-----|--------|----------|
| **SEO/Content** | Blog posts, tutorials, guides on WhatsApp automation | $20 | High | Month 1+ |
| **Product Hunt** | Launch campaign with demo video | $5 | Burst | Month 3 |
| **YouTube** | Tutorials, demos, case studies | $30 | Medium | Month 2+ |
| **WhatsApp Communities** | Engage in business WhatsApp groups | $10 | Low-Medium | Month 1+ |
| **Partnerships** | Marketing agencies, consultants | $40 | Medium | Month 4+ |
| **Referrals** | Give $10 credit for each referral | $10 | Medium | Month 3+ |
| **Paid Ads** | Google Ads, Meta Ads | $80 | High | Month 6+ |
| **App Sumo / Lifetime Deals** | LTD campaign for initial traction | $15 | Burst | Month 4 |

### Conversion Funnel

```
Visitor → Sign-up (5%) → Onboard (60%) → Create Bot (80%) → Deploy (70%) → Activate (60%) → Convert to Paid (30%)
```

**Overall visitor-to-paid conversion: 0.5%**
**Sign-up to paid conversion: 10%**

---

## Customer Retention Strategy

1. **Value Realization:** Bot must work within first session (Bot Architect)
2. **Habit Formation:** Daily conversation notifications, weekly reports
3. **Switching Costs:** Knowledge base, conversation history, automation rules
4. **Community:** User community, success stories, webinars
5. **Continuous Improvement:** Regular feature updates, AI improvements
6. **Proactive Support:** Health checks, usage alerts, optimization suggestions
7. **Annual Incentives:** 17% discount for annual billing

---

## Financial Projections (3-Year)

### Year 1

| Month | Users | Paid Users | MRR | Costs | Net |
|-------|-------|-----------|-----|-------|-----|
| 1 | 100 | 5 | $200 | $8,000 | -$7,800 |
| 2 | 300 | 20 | $800 | $8,000 | -$7,200 |
| 3 | 600 | 50 | $2,000 | $9,000 | -$7,000 |
| 4 | 1,000 | 100 | $4,000 | $10,000 | -$6,000 |
| 5 | 1,500 | 170 | $6,800 | $10,000 | -$3,200 |
| 6 | 2,000 | 250 | $10,000 | $11,000 | -$1,000 |
| 7 | 2,800 | 350 | $14,000 | $12,000 | $2,000 |
| 8 | 3,500 | 470 | $18,800 | $13,000 | $5,800 |
| 9 | 4,500 | 620 | $24,800 | $14,000 | $10,800 |
| 10 | 5,500 | 800 | $32,000 | $16,000 | $16,000 |
| 11 | 7,000 | 1,050 | $42,000 | $18,000 | $24,000 |
| 12 | 9,000 | 1,400 | $56,000 | $20,000 | $36,000 |

**Year 1 Total:** $211,400 revenue, $149,000 costs, **$62,400 net**
**Year 1 End ARR:** $672,000

### Year 2

| Quarter | Users | Paid Users | MRR | ARR Run Rate |
|---------|-------|-----------|-----|-------------|
| Q1 | 15,000 | 2,500 | $100,000 | $1.2M |
| Q2 | 25,000 | 4,200 | $168,000 | $2.0M |
| Q3 | 35,000 | 6,300 | $252,000 | $3.0M |
| Q4 | 50,000 | 9,000 | $360,000 | $4.3M |

**Year 2 Total:** ~$2.5M revenue

### Year 3

| Quarter | Users | Paid Users | MRR | ARR Run Rate |
|---------|-------|-----------|-----|-------------|
| Q1 | 70,000 | 14,000 | $560,000 | $6.7M |
| Q2 | 100,000 | 21,000 | $840,000 | $10.1M |
| Q3 | 130,000 | 28,000 | $1,120,000 | $13.4M |
| Q4 | 170,000 | 38,000 | $1,520,000 | $18.2M |

**Year 3 Total:** ~$11.6M revenue

---

## Break-Even Analysis

- **Monthly fixed costs:** $8,000 (team, infrastructure minimum)
- **Variable cost per user:** ~$3/month (AI + infrastructure)
- **Average revenue per paid user:** $40/month
- **Contribution margin per paid user:** $37/month
- **Break-even paid users:** 217 ($8,000 / $37)
- **Break-even timeline:** Month 5-6

---

## Go-to-Market Strategy

### Phase 1: Private Beta (Month 1-2)
- 50 hand-picked beta users (restaurants, e-commerce)
- Personal onboarding calls
- Daily feedback collection
- Iterate rapidly on core experience

### Phase 2: Public Launch (Month 3)
- Product Hunt launch (target top 5 of the day)
- Landing page with demo video
- Launch discount (30% off first 3 months)
- Press coverage in SaaS/tech media
- WhatsApp community launch

### Phase 3: Growth (Month 4-6)
- SEO content machine (3 blog posts/week)
- YouTube channel (weekly tutorials)
- Referral program launch
- Partnership with marketing agencies
- Case studies from beta users

### Phase 4: Scale (Month 7-12)
- Paid advertising (Google, Meta)
- Conference presence
- White-label program for agencies
- Integration partnerships
- Enterprise sales (outbound)

---

## Partnership Strategy

| Partner Type | Examples | Value Exchange |
|-------------|----------|---------------|
| Marketing Agencies | Digital agencies, freelancers | White-label → revenue share |
| WhatsApp Communities | Business groups, entrepreneur networks | Education → sign-ups |
| Content Creators | YouTube, Twitter, LinkedIn | Affiliate commissions → content |
| Tech Partners | Zapier, HubSpot, Calendly | Integration → mutual users |
| Cloud Providers | Railway, Coolify | Credits → case studies |

---

## Developer Notes

- Unit economics assume blended model usage (mostly GPT-4o-mini)
- AI costs are the primary variable cost — optimize prompts aggressively
- Free tier cost should be < $1/user/month to remain sustainable
- Annual plans improve cash flow — incentivize heavily
- Monitor CAC by channel monthly; kill underperforming channels

## Future Improvements

- A/B test pricing (try $24/$69 vs $29/$79)
- Add usage-based pricing option for power users
- Explore credit-based model for AI usage
- Consider lifetime deal for initial traction
- Evaluate marketplace revenue opportunity
