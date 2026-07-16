# Create Your First Bot

---

## Executive Summary

Walk through creating and deploying a working bot.

---

## Duration

60 minutes

---

## Prerequisites

- All previous walkthroughs completed
- WhatsApp connected

---

## Steps

### 1. Navigate to Bot Builder

1. Sign in to dashboard
2. Click "Bots" in sidebar
3. Click "Create Bot"

### 2. Configure Bot

```
Name: Customer Support Bot
Description: Handles customer inquiries
Model: GPT-4o-mini
```

### 3. Write System Prompt

```
You are a customer support bot for Acme Corp.

Your role:
- Answer questions about our products
- Help with order issues
- Provide pricing information
- Escalate complex issues to human support

Guidelines:
- Be friendly and professional
- Keep responses concise
- Always verify order numbers before providing details
- If unsure, offer to connect with human support

Business Hours:
- Monday-Friday: 9am-6pm EST
- Saturday: 10am-2pm EST
- Sunday: Closed

Pricing:
- Basic Plan: $9/month
- Pro Plan: $29/month
- Enterprise: Custom pricing

Contact:
- Email: support@acme.com
- Phone: 1-800-ACME
```

### 4. Add Knowledge Base

1. Click "Knowledge Base" tab
2. Upload documents:
   - `product-faq.pdf`
   - `pricing-guide.pdf`
   - `return-policy.txt`
3. Wait for processing

### 5. Test Bot

1. Click "Preview" tab
2. Send test messages:
   - "What are your prices?"
   - "How do I return a product?"
   - "I need help with my order"
3. Verify responses

### 6. Deploy Bot

1. Click "Deploy" button
2. Select WhatsApp account
3. Click "Activate"

### 7. Test on WhatsApp

1. Send message to WhatsApp number
2. Verify bot responds
3. Test edge cases

---

## Expected Results

- Bot responds within 2 seconds
- Responses are accurate
- Tone is friendly
- Complex issues escalated

---

## Troubleshooting

### Bot not responding

1. Check bot is active
2. Check WhatsApp is connected
3. Check logs for errors
4. Verify webhook is configured

### Responses inaccurate

1. Improve system prompt
2. Add more knowledge base documents
3. Adjust temperature setting
4. Test with different prompts

---

## Developer Notes

- Start with simple prompts
- Test thoroughly before deploying
- Monitor performance
- Iterate based on feedback

## Future Improvements

- Bot templates
- A/B testing
- Performance analytics
- Multi-language support
