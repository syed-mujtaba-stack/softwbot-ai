# 04 — User Personas

---

## Executive Summary

This document defines six detailed user personas for SoftwBot AI, representing the primary target segments. Each persona includes demographics, goals, pain points, workflows, feature priorities, preferred pricing, success metrics, and objection handling. These personas should be referenced for every product decision.

---

## Purpose

User personas ensure that every feature, design, and marketing decision is made with a specific user in mind. They prevent building for ourselves and keep us focused on real user needs.

---

## Persona 1: Raj — Restaurant Owner

> *"I just want something that takes orders while I'm cooking."*

### Demographics

| Attribute | Value |
|-----------|-------|
| Name | Raj Patel |
| Age | 42 |
| Location | Mumbai, India |
| Business | "Spice Garden" — mid-range Indian restaurant |
| Revenue | $8,000/month |
| Team Size | 8 (2 kitchen, 3 service, 2 delivery, 1 manager) |
| Education | Business degree |
| Languages | Hindi, English, Marathi |

### Technology Profile

| Attribute | Value |
|-----------|-------|
| Devices | iPhone 13, Windows laptop |
| Daily Tech | WhatsApp (3+ hours), Instagram, Google Maps |
| Tech Comfort | Low-moderate |
| Current Tools | WhatsApp Business (basic), Google Sheets for orders |
| Has Website | No |
| Uses CRM | No |

### Goals

1. Automate order taking during peak hours (6pm-10pm)
2. Handle reservation bookings without phone calls
3. Answer common questions (menu, hours, delivery area) automatically
4. Reduce missed orders by 50%
5. Send promotional messages during festivals

### Pain Points

1. **Missed orders during rush hours** — Staff is too busy to answer WhatsApp
2. **Repeated questions** — "What are your hours?", "Do you deliver?", "What's the price of butter chicken?"
3. **No after-hours service** — Orders placed at 11pm get answered at 10am next day
4. **No system for reservations** — Written in a notebook, prone to errors
5. **Can't afford tech solutions** — Developer quotes are $5,000+, too expensive
6. **Language barrier** — Most automation tools are English-only

### Day in the Life

```
8:00 AM — Check WhatsApp for overnight messages (15-20 unread)
9:00 AM — Respond to order inquiries manually
10:00 AM — Prep for lunch service
12:00 PM — Lunch rush — misses 5 WhatsApp orders
2:00 PM — Catches up on messages
3:00 PM — Reviews Google Sheets for orders
5:00 PM — Dinner prep begins
6:00 PM — Dinner rush — misses 8+ WhatsApp orders
10:00 PM — Finally responds to all missed messages
10:30 PM — Closes shop, manually confirms tomorrow's reservations
```

### Feature Priorities

| Priority | Feature | Why |
|----------|---------|-----|
| 1 | Auto-reply to FAQs | Stop repeating menu/hours info |
| 2 | Order taking flow | Take orders via WhatsApp chat |
| 3 | Reservation booking | Book tables without phone calls |
| 4 | Welcome message | Greet new customers automatically |
| 5 | Human handoff | Escalate complaints to owner |

### Preferred Pricing

- **Free tier** to start (trial)
- **Starter plan ($29)** if value proven
- **Price sensitivity:** Very high — compares to employee cost
- **Key metric:** "This costs less than 1 hour of my staff's time"

### Success Metrics for Raj

- 50% reduction in missed orders within 1 month
- 80% of common questions handled by AI
- Customer satisfaction maintained (no complaints about bot)
- Revenue increase of $1,000/month from captured orders

### Objection Handling

| Objection | Response |
|-----------|----------|
| "I'm not technical" | "You just type what your restaurant does. The AI builds everything." |
| "Too expensive" | "It's $29/month. One extra order per day pays for it." |
| "My customers prefer humans" | "The bot handles simple questions. Complex issues go to you automatically." |
| "What if it says something wrong?" | "You can review and edit everything before going live. The bot will ask for help when unsure." |
| "I don't trust AI" | "You set the rules. The bot follows your instructions exactly." |

---

## Persona 2: Sarah — Marketing Agency Owner

> *"I need to onboard a client's bot in minutes, not days."*

### Demographics

| Attribute | Value |
|-----------|-------|
| Name | Sarah Chen |
| Age | 35 |
| Location | New York, USA |
| Business | "ChatFirst Agency" — WhatsApp marketing agency |
| Revenue | $80,000/month |
| Team Size | 12 (5 account managers, 3 developers, 2 designers, 2 ops) |
| Education | MBA, Marketing |
| Languages | English, Mandarin |

### Technology Profile

| Attribute | Value |
|-----------|-------|
| Devices | MacBook Pro, iPhone 15 Pro |
| Daily Tech | Slack, HubSpot, Google Workspace, Figma, VS Code |
| Tech Comfort | High |
| Current Tools | Respond.io, ChatGPT, Make.com, custom scripts |
| Has Website | Yes (next.js) |
| Uses CRM | HubSpot |

### Goals

1. Onboard new clients in under 1 hour (currently takes 2-3 days)
2. Offer AI-powered WhatsApp as a premium service
3. Manage 20+ client bots from one dashboard
4. Generate recurring revenue from bot management fees
5. Differentiate from competitors with AI-first approach

### Pain Points

1. **Slow client onboarding** — Each bot requires manual prompt writing, testing, configuration
2. **Inconsistent quality** — Different team members create bots with varying quality
3. **Scaling team** — Can't hire developers fast enough to match demand
4. **Client expectations** — Clients expect "ChatGPT-level" AI but bots are basic
5. **Margin pressure** — Developer hours eat into agency margins

### Day in the Life

```
8:00 AM — Review Slack messages from clients (20+ channels)
9:00 AM — Team standup, assign bot creation tasks
10:00 AM — Client call: onboarding a new restaurant chain (5 locations)
11:30 AM — Review bot configuration created by junior developer
12:00 PM — Lunch while responding to client emails
1:00 PM — Write custom system prompt for e-commerce client
2:30 PM — Demo Bot Architect to prospective client
3:30 PM — Review analytics dashboard for top 5 clients
4:30 PM — Strategize new service offering: "AI WhatsApp Package"
5:30 PM — Handle escalation: client's bot gave wrong information
6:30 PM — Update HubSpot with new lead information
7:30 PM — Plan tomorrow's priorities
```

### Feature Priorities

| Priority | Feature | Why |
|----------|---------|-----|
| 1 | Bot Architect | Eliminate manual bot creation |
| 2 | Multi-bot management | Manage all clients from one place |
| 3 | White-label | Brand the platform as our own |
| 4 | Client reporting | Share analytics with clients |
| 5 | Team permissions | Control what team members can access |

### Preferred Pricing

- **Pro plan ($79)** for agency use
- **Enterprise plan** for white-label and multi-bot
- **ROI calculation:** "If I save 2 hours per client onboarding at $100/hour = $200 saved per client × 10 clients/month = $2,000/month savings"
- **Key metric:** "Reduces my team's bot setup time by 80%"

### Success Metrics for Sarah

- Client onboarding time reduced from 3 days to 30 minutes
- 20+ client bots managed from single dashboard
- 40% profit margin on bot management service
- Client satisfaction scores > 9/10

### Objection Handling

| Objection | Response |
|-----------|----------|
| "I can build this myself" | "You can. But Bot Architect does it in 5 minutes vs. 5 hours. What's your time worth?" |
| "Need white-label" | "Enterprise plan includes full white-label with custom domain and branding." |
| "What about my existing workflows?" | "We integrate with Zapier, HubSpot, and webhooks. Your existing tools stay." |
| "Client data security" | "SOC2-ready infrastructure. Each client's data is isolated. GDPR compliant." |

---

## Persona 3: Mike — E-commerce Store Manager

> *"If I could automate order tracking, my team could focus on sales."*

### Demographics

| Attribute | Value |
|-----------|-------|
| Name | Mike Thompson |
| Age | 29 |
| Location | London, UK |
| Business | "TechGear UK" — online electronics retailer |
| Revenue | $200,000/month |
| Team Size | 6 (2 support, 2 warehouse, 1 marketing, 1 manager) |
| Education | Computer Science degree |
| Languages | English |

### Technology Profile

| Attribute | Value |
|-----------|-------|
| Devices | MacBook Pro, iPhone 14 |
| Daily Tech | Shopify, Slack, Google Analytics, Meta Ads |
| Tech Comfort | Moderate-high |
| Current Tools | Zendesk (support), Shopify (store), Mailchimp (email) |
| Has Website | Yes (Shopify) |
| Uses CRM | Zendesk |

### Goals

1. Automate 60% of customer support queries (order tracking, returns, product questions)
2. Reduce support response time from 4 hours to 10 minutes
3. Capture WhatsApp leads from Instagram and Facebook ads
4. Provide order tracking via WhatsApp without custom development
5. Decrease support team workload to focus on complex issues

### Pain Points

1. **Repetitive support queries** — 60% are "Where's my order?" and "How do I return?"
2. **High support costs** — 2 support agents at £2,500/month each
3. **Missed sales** — Instagram DM inquiries go unanswered for hours
4. **No WhatsApp integration** — Shopify doesn't natively support WhatsApp
5. **Holiday overwhelm** — Black Friday support volume 5x normal

### Day in the Life

```
8:00 AM — Check Zendesk: 45 open tickets (30 are order tracking)
8:30 AM — Respond to urgent tickets, assign routine ones
9:00 AM — Review Shopify dashboard: 120 orders yesterday
9:30 AM — Check Instagram DMs: 8 unanswered product inquiries
10:00 AM — Team meeting: discuss support backlog
10:30 AM — Manually send order tracking info to 15 customers
12:00 PM — Lunch while checking WhatsApp (personal + business)
1:00 PM — Process return requests (30 minutes)
1:30 PM — Review Meta Ads performance
2:00 PM — Handle escalation: customer received wrong item
3:00 PM — Update product descriptions based on common questions
4:00 PM — Plan weekend sale promotion
5:00 PM — End of day: 35 tickets still open (will carry over to tomorrow)
```

### Feature Priorities

| Priority | Feature | Why |
|----------|---------|-----|
| 1 | Order tracking automation | Stop answering "where's my order" manually |
| 2 | Product FAQ bot | Auto-answer product specs, compatibility, pricing |
| 3 | Shopify integration | Pull order data for real-time tracking |
| 4 | Lead capture from ads | Capture WhatsApp leads from Meta campaigns |
| 5 | Return/refund flow | Automate return eligibility and process |

### Preferred Pricing

- **Pro plan ($79)** — needs API access and integrations
- **ROI calculation:** "2 support agents cost £5,000/month. If bot handles 60%, I save £3,000/month"
- **Key metric:** "Replaces 60% of support agent workload"

### Success Metrics for Mike

- 60% of support queries handled by AI
- Average response time < 10 seconds (vs. 4 hours current)
- Support cost reduction of £2,000/month
- Zero missed WhatsApp DMs from ads

---

## Persona 4: Priya — Real Estate Agent

> *"I miss leads when I'm showing properties. AI could handle that."*

### Demographics

| Attribute | Value |
|-----------|-------|
| Name | Priya Sharma |
| Age | 38 |
| Location | Dubai, UAE |
| Business | Independent real estate agent |
| Revenue | $15,000/month (commission-based) |
| Team Size | 1 (herself + part-time assistant) |
| Education | MBA |
| Languages | English, Arabic, Hindi |

### Technology Profile

| Attribute | Value |
|-----------|-------|
| Devices | iPhone 15 Pro, iPad |
| Daily Tech | WhatsApp (primary business tool), Instagram, Property Finder |
| Tech Comfort | Moderate |
| Current Tools | WhatsApp Business (basic), Google Sheets, Canva |
| Has Website | No (uses Property Finder listing) |
| Uses CRM | No (WhatsApp IS her CRM) |

### Goals

1. Capture every property inquiry 24/7
2. Qualify leads automatically (budget, timeline, preferences)
3. Schedule property viewings without back-and-forth
4. Send property listings to interested buyers automatically
5. Follow up with cold leads automatically

### Pain Points

1. **Missed inquiries during viewings** — Can't check phone while showing properties
2. **Unqualified leads** — Spends time with people who can't afford the properties
3. **No follow-up system** — Forgets to follow up with warm leads
4. **Manual property matching** — Sends same listings to everyone
5. **After-hours inquiries** — International clients message at different times

### Day in the Life

```
7:00 AM — Check WhatsApp: 12 overnight messages from buyers
7:30 AM — Respond to inquiries, schedule viewings
8:30 AM — Prepare for morning viewings (3 properties)
9:00 AM — First viewing — misses 5 WhatsApp messages
10:30 AM — Second viewing — misses 8 more messages
12:00 PM — Check phone: 20+ unread messages, 3 hot leads gone cold
12:30 PM — Frantically respond to all missed messages
1:00 PM — Lunch meeting with potential seller
2:30 PM — Third viewing
4:00 PM — Follow up with morning leads (2 already found other agents)
5:00 PM — Update listing descriptions on Property Finder
6:00 PM — Post new property on Instagram
7:00 PM — Respond to evening messages
8:00 PM — Dinner with family (phone keeps buzzing)
```

### Feature Priorities

| Priority | Feature | Why |
|----------|---------|-----|
| 1 | 24/7 auto-reply | Never miss an inquiry |
| 2 | Lead qualification | Ask budget, timeline, preferences automatically |
| 3 | Viewing scheduler | Book viewings without back-and-forth |
| 4 | Property matching | Send relevant listings based on preferences |
| 5 | Follow-up automation | Re-engage cold leads automatically |

### Preferred Pricing

- **Starter plan ($29)** — simple needs, price-sensitive
- **ROI calculation:** "If I close just one extra deal per month from captured leads, that's $5,000+ commission"
- **Key metric:** "Never miss a lead again"

---

## Persona 5: Dr. Khan — Healthcare Clinic Admin

> *"We need something that handles booking so reception can focus on patients."*

### Demographics

| Attribute | Value |
|-----------|-------|
| Name | Dr. Ahmed Khan |
| Age | 45 |
| Location | Toronto, Canada |
| Business | "Wellness Clinic" — family medical practice |
| Revenue | $150,000/month |
| Team Size | 15 (4 doctors, 3 nurses, 2 reception, 2 admin, 1 janitor, 3 part-time) |
| Education | MD, MBA |
| Languages | English, Urdu |

### Technology Profile

| Attribute | Value |
|-----------|-------|
| Devices | iPhone 14, Windows desktop |
| Daily Tech | EMR system, WhatsApp, Email |
| Tech Comfort | Low (focused on clinical work) |
| Current Tools | Oscar EMR, WhatsApp Business, phone system |
| Has Website | Yes (basic, informational) |
| Uses CRM | No |

### Goals

1. Automate appointment booking (currently 40% of reception calls)
2. Send appointment reminders to reduce 20% no-show rate
3. Handle common health FAQs (hours, services, insurance accepted)
4. Provide after-hours booking capability
5. Free up reception to focus on in-person patients

### Pain Points

1. **Reception overwhelmed** — 80+ calls/day, mostly booking-related
2. **No-show rate at 20%** — Costs ~$3,000/month in lost revenue
3. **After-hours calls go to voicemail** — 30% of patients call after hours
4. **Insurance questions** — Same questions about 15 different insurance providers
5. **Privacy concerns** — Must comply with healthcare regulations (PIPEDA)

### Feature Priorities

| Priority | Feature | Why |
|----------|---------|-----|
| 1 | Appointment booking | Automate 40% of reception calls |
| 2 | Appointment reminders | Reduce no-show rate |
| 3 | FAQ automation | Handle insurance, hours, services questions |
| 4 | After-hours booking | Capture after-hours patient inquiries |
| 5 | Privacy compliance | PIPEDA-compliant data handling |

### Preferred Pricing

- **Pro plan ($79)** — needs reliability and support
- **Key metric:** "Reduce no-show rate from 20% to 5%"
- **Sensitivity:** Low — budget is not an issue, reliability and compliance are

### Special Requirements

- PIPEDA (Canadian privacy law) compliance
- No storage of medical information in chat
- Human handoff for all medical questions
- HIPAA-adjacent security practices

---

## Persona 6: Alex — SaaS Startup Founder

> *"I want to automate customer onboarding without hiring support staff."*

### Demographics

| Attribute | Value |
|-----------|-------|
| Name | Alex Rodriguez |
| Age | 31 |
| Location | Austin, Texas, USA |
| Business | "TaskFlow" — project management SaaS |
| Revenue | $50,000 MRR (growing 20% MoM) |
| Team Size | 5 (2 engineers, 1 designer, 1 marketer, 1 founder) |
| Education | CS degree, dropout |
| Languages | English, Spanish |

### Technology Profile

| Attribute | Value |
|-----------|-------|
| Devices | MacBook Pro, iPhone 15 |
| Daily Tech | Slack, Linear, GitHub, Vercel, Stripe |
| Tech Comfort | Very high (technical founder) |
| Current Tools | Intercom (support), Segment (analytics), custom scripts |
| Has Website | Yes (Next.js) |
| Uses CRM | HubSpot (free) |

### Goals

1. Automate customer onboarding (currently 30-minute manual process per user)
2. Handle common support questions (billing, features, how-to)
3. Capture leads from website visitors via WhatsApp widget
4. Scale support without hiring (current: 0 dedicated support staff)
5. Provide 24/7 support for global user base

### Pain Points

1. **Onboarding bottleneck** — Founder does all onboarding, can't scale
2. **Technical questions repetitive** — "How do I integrate with Slack?", "How do I export data?"
3. **Global customers** — Users in different time zones, no after-hours support
4. **Can't afford support hire yet** — At $50K MRR, every dollar counts
5. **WhatsApp for business is trending** — Customers asking for WhatsApp support

### Feature Priorities

| Priority | Feature | Why |
|----------|---------|-----|
| 1 | Knowledge base + RAG | Auto-answer product documentation questions |
| 2 | Onboarding flow | Guide new users through setup |
| 3 | Lead capture | Convert website visitors to sign-ups |
| 4 | API access | Integrate with existing tools |
| 5 | Analytics | Track bot performance and user satisfaction |

### Preferred Pricing

- **Pro plan ($79)** — needs API and integrations
- **ROI calculation:** "If bot handles 50% of onboarding, that's 10 hours/week saved × $100/hour = $4,000/month"
- **Key metric:** "Replaces need for first support hire ($5K/month)"

---

## Cross-Persona Insights

### Common Needs

| Need | Raj | Sarah | Mike | Priya | Dr. Khan | Alex |
|------|-----|-------|------|-------|----------|------|
| 24/7 availability | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ |
| No-code setup | ✅ | ❌ | ⚠️ | ✅ | ✅ | ❌ |
| Lead capture | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ |
| Human handoff | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Multi-language | ✅ | ⚠️ | ❌ | ✅ | ✅ | ❌ |
| API access | ❌ | ✅ | ⚠️ | ❌ | ❌ | ✅ |
| White-label | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Analytics | ⚠️ | ✅ | ✅ | ⚠️ | ⚠️ | ✅ |

### Pricing Sensitivity Ranking

1. Raj — Very High (price-sensitive, needs to see immediate ROI)
2. Priya — High (solo agent, tight margins)
3. Mike — Medium (sees clear cost savings)
4. Dr. Khan — Low (clinic budget, values reliability)
5. Alex — Low (technical, sees strategic value)
6. Sarah — Lowest (agency model, passes cost to clients)

---

## Developer Notes

- Build features that serve multiple personas (lead capture, human handoff, knowledge base)
- Start with Raj and Mike personas for MVP (highest volume segments)
- Sarah persona drives agency revenue — prioritize for Phase 2
- Dr. Khan persona requires compliance features — Phase 3
- All personas value "time to first bot" — optimize onboarding relentlessly

## Future Improvements

- Validate personas with 10+ user interviews per segment
- Create user journey maps for top 3 personas
- Build persona-specific onboarding flows
- Track which persona drives most revenue
- Update personas quarterly based on user data
