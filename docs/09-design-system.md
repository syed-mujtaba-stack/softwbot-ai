# 09 — Design System

---

## Executive Summary

This document defines the complete design system for SoftwBot AI, including design tokens, Shadcn UI component specifications, custom component designs, and usage guidelines. It ensures visual consistency and development efficiency across the entire product.

---

## Purpose

The design system eliminates design debt, speeds up development, and ensures a cohesive user experience. Every UI element should trace back to this document.

---

## Design Tokens

### Colors

See [08-ui.md](./08-ui.md) for the complete color system. Design tokens are implemented as CSS custom properties.

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 6px | Badges, small elements |
| `radius-md` | 8px | Buttons, inputs |
| `radius-lg` | 12px | Cards, dropdowns |
| `radius-xl` | 16px | Modals, large cards |
| `radius-full` | 9999px | Avatars, pills |

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle elevation |
| `shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1)` | Cards, dropdowns |
| `shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1)` | Modals, popovers |
| `shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.1)` | Floating elements |

### Transitions

| Token | Value | Usage |
|-------|-------|-------|
| `transition-fast` | 150ms ease-in-out | Hover states |
| `transition-normal` | 200ms ease-in-out | General transitions |
| `transition-slow` | 300ms ease-in-out | Page transitions |

---

## Shadcn UI Components

### Button

| Prop | Type | Default | Options |
|------|------|---------|---------|
| `variant` | string | `default` | `default`, `destructive`, `outline`, `secondary`, `ghost`, `link` |
| `size` | string | `default` | `default`, `sm`, `lg`, `icon` |
| `disabled` | boolean | false | — |
| `loading` | boolean | false | Shows spinner, disables interaction |

**Variants:**
- **Default:** Green background (`#25D366`), white text — primary actions
- **Destructive:** Red background, white text — delete, remove
- **Outline:** Border only, transparent bg — secondary actions
- **Secondary:** Gray background — tertiary actions
- **Ghost:** No bg, no border — text-like actions, navigation
- **Link:** Underlined text — inline links

**States:** Default → Hover (darken 10%) → Active (darken 15%) → Disabled (opacity 50%) → Loading (spinner)

### Input

| Prop | Type | Default | Options |
|------|------|---------|---------|
| `type` | string | `text` | `text`, `email`, `password`, `number`, `tel`, `url` |
| `placeholder` | string | — | — |
| `disabled` | boolean | false | — |
| `error` | boolean | false | Red border + error message |

**States:** Default → Focus (ring color `#25D366`) → Error (red border + message) → Disabled (gray bg)

### Textarea

| Prop | Type | Default | Options |
|------|------|---------|---------|
| `rows` | number | 3 | — |
| `autoResize` | boolean | false | Grows with content |
| `maxLength` | number | — | Shows character count |

### Select

| Prop | Type | Default | Options |
|------|------|---------|---------|
| `options` | array | — | `{ label, value, disabled? }[]` |
| `placeholder` | string | `Select...` | — |
| `multiple` | boolean | false | — |

### Card

**Composition:**
```
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter>
    {/* Actions */}
  </CardFooter>
</Card>
```

### Dialog

| Prop | Type | Default | Options |
|------|------|---------|---------|
| `open` | boolean | — | Controlled state |
| `size` | string | `default` | `sm`, `default`, `lg`, `xl`, `full` |

**Behavior:** Focus trap, ESC to close, click outside to close, portal rendered

### Toast

| Prop | Type | Default | Options |
|------|------|---------|---------|
| `variant` | string | `default` | `default`, `success`, `error`, `warning`, `info` |
| `duration` | number | 5000 | Auto-dismiss ms |
| `action` | object | — | `{ label, onClick }` |

### Table

| Feature | Implementation |
|---------|---------------|
| Sorting | Click column header to sort asc/desc |
| Pagination | Bottom of table, 10/25/50 per page |
| Selection | Checkbox column, bulk actions bar |
| Empty state | Illustration + message + CTA |
| Loading | Skeleton rows matching table layout |

### Badge

| Prop | Type | Options |
|------|------|---------|
| `variant` | string | `default`, `secondary`, `destructive`, `outline` |
| `status` | string | `active`, `inactive`, `error`, `pending` |

### Tooltip

- Trigger on hover after 300ms delay
- Max width 250px
- Arrow pointing to trigger
- Light/dark mode aware

### Popover

- Trigger on click
- Dismiss on click outside or ESC
- Portal rendered
- Arrow pointing to trigger

### Separator

- Horizontal or vertical
- Default color: `--border-default`
- Use `my-4` for section breaks

---

## Custom Components

### BotCard

**Purpose:** Display bot information in grid/list view

```
┌─────────────────────────────────────┐
│ [Avatar] Bot Name          [Status] │
│ Restaurant AI Assistant             │
│                                     │
│ 📊 1.2K conversations  💬 8.5K msgs│
│ 🤖 GPT-4o-mini  ⏱ Active 2h ago   │
│                                     │
│ [Edit] [Pause] [More]              │
└─────────────────────────────────────┘
```

**Props:**
- `bot`: Bot object
- `onEdit`: Click handler
- `onPause`: Toggle handler
- `onMore`: Menu handler

**States:** Active (green dot), Paused (yellow dot), Error (red dot), Draft (gray dot)

### ConversationThread

**Purpose:** Display chat messages in WhatsApp-like format

**Message Types:**
- **User message:** Right-aligned, green background
- **AI message:** Left-aligned, blue/purple background, confidence badge
- **Human agent message:** Left-aligned, gray background, agent avatar
- **System message:** Center-aligned, gray text, italic

### MessageBubble

**Props:**
- `type`: `user` | `ai` | `human` | `system`
- `content`: Message text
- `timestamp`: Date/time
- `confidence?`: AI confidence score
- `agentName?`: Human agent name
- `mediaUrl?`: Attached media
- `status?`: `sent` | `delivered` | `read` | `failed`

### BotStatusIndicator

| Status | Color | Icon | Label |
|--------|-------|------|-------|
| Active | Green | ● | Online |
| Paused | Yellow | ● | Paused |
| Error | Red | ● | Error |
| Draft | Gray | ○ | Draft |
| Connecting | Blue | ◌ | Connecting... |

### WhatsAppQRCode

**Purpose:** Display QR code for WhatsApp connection

**Features:**
- Auto-refresh every 60 seconds
- Countdown timer for refresh
- Manual refresh button
- Loading state while generating
- Error state with retry

### KnowledgeBaseFileCard

**Props:**
- `file`: File object
- `onDelete`: Delete handler
- `onPreview`: Preview handler

**States:** Uploading (progress bar), Processing (spinner), Ready (checkmark), Error (retry button)

### AutomationRuleCard

**Props:**
- `rule`: Rule object
- `onToggle`: Enable/disable handler
- `onEdit`: Edit handler
- `onDelete`: Delete handler

**Display:** Rule name, trigger type icon, action count, execution count, last executed time, toggle switch

---

## Form Patterns

### Required Fields

- Red asterisk (*) after label
- Validation on blur AND on submit
- Error message below input in red text

### Helper Text

- Below input in gray text
- Shows character count for text areas
- Shows format requirements

### Form Layout

- Single column for narrow forms (login, settings)
- Two column for wide forms (bot configuration)
- Group related fields with section headings
- Sticky submit button on long forms

### Validation Messages

| Type | Color | Icon | Example |
|------|-------|------|---------|
| Error | Red | ⚠️ | "Email is required" |
| Warning | Amber | ⚠️ | "This will affect active bots" |
| Success | Green | ✓ | "Settings saved" |
| Info | Blue | ℹ️ | "Processing may take a few minutes" |

---

## Empty States

Every list page must have an empty state:

```
┌─────────────────────────────┐
│                             │
│     [Illustration]          │
│                             │
│   No conversations yet      │
│                             │
│   When customers message    │
│   your bot, conversations   │
│   will appear here.         │
│                             │
│   [Learn More]              │
│                             │
└─────────────────────────────┘
```

**Rules:**
- Custom illustration per page (not generic)
- Clear heading explaining what goes here
- Helpful description
- Primary CTA button
- Link to documentation or tutorial

---

## Loading States

### Page Skeleton

Matches the layout of the loaded page with pulsing gray rectangles:
- Card skeletons for metric cards
- Row skeletons for table/list
- Circle skeletons for avatars
- Line skeletons for text

### Inline Loading

- Button: Replace text with spinner, disable interaction
- Table: Show skeleton rows (match expected count)
- Chart: Show skeleton chart shape
- Form submission: Disable all inputs, show progress

---

## Developer Notes

- All components use Shadcn UI as base with custom theming via CSS variables
- Use `cn()` from `lib/utils` for conditional class merging
- All components must accept `className` prop
- Animations use Framer Motion
- Icons use Lucide React
- All components must support dark mode
- All components must be keyboard accessible
- Export components from `components/ui/` (shared) and `components/dashboard/` (feature-specific)

## Future Improvements

- Storybook for component documentation and visual testing
- Design token export for Figma integration
- Component-level analytics (which components are used most)
- A/B testing for component variants
- Accessibility automated testing in CI
