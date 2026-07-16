# 69 — UI Patterns

---

## Executive Summary

This document defines common UI patterns used throughout SoftwBot AI.

---

## Purpose

Ensure consistent UI behavior and user experience.

---

## Loading Patterns

### Skeleton Loading

```typescript
function BotCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mt-2" />
    </div>
  );
}
```

### Spinner Loading

```typescript
function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  return (
    <Loader2 
      className={cn(
        'animate-spin',
        size === 'sm' && 'h-4 w-4',
        size === 'md' && 'h-6 w-6',
        size === 'lg' && 'h-8 w-8'
      )} 
    />
  );
}
```

### Page Loading

```typescript
export default function BotsPage() {
  return <LoadingPage message="Loading bots..." />;
}
```

---

## Empty States

### Generic Empty State

```typescript
function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-muted-foreground">{icon}</div>
      <h3 className="mt-4 text-lg font-medium">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
```

### Usage

```typescript
<EmptyState
  icon={<BotIcon className="h-12 w-12" />}
  title="No bots yet"
  description="Create your first bot to get started"
  action={<Button onClick={createBot}>Create Bot</Button>}
/>
```

---

## Error States

### Inline Error

```typescript
function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="rounded-md bg-destructive/10 p-4">
      <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4 text-destructive" />
        <p className="text-sm text-destructive">{message}</p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-2">
          Retry
        </Button>
      )}
    </div>
  );
}
```

### Page Error

```typescript
function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <AlertCircle className="h-12 w-12 text-destructive" />
      <h2 className="mt-4 text-xl font-semibold">Something went wrong</h2>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
      <Button onClick={reset} className="mt-4">
        Try again
      </Button>
    </div>
  );
}
```

---

## Form Patterns

### Form with Validation

```typescript
function CreateBotForm() {
  const form = useForm({
    resolver: zodResolver(createBotSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bot Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Bot</Button>
      </form>
    </Form>
  );
}
```

---

## Modal Patterns

### Confirmation Dialog

```typescript
function DeleteBotDialog({ bot, onDelete }: DeleteBotDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Bot</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {bot.name}? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onDelete(bot.id)}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

---

## Table Patterns

### Data Table

```typescript
function BotTable({ bots }: BotTableProps) {
  const columns: ColumnDef<Bot>[] = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'createdAt', header: 'Created' },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return <DataTable columns={columns} data={bots} />;
}
```

---

## Notification Patterns

### Toast Notification

```typescript
import { toast } from 'sonner';

// Success
toast.success('Bot created successfully');

// Error
toast.error('Failed to create bot');

// With action
toast('Bot created', {
  action: {
    label: 'View',
    onClick: () => router.push(`/bots/${bot.id}`),
  },
});
```

---

## Responsive Patterns

### Mobile-First

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {bots.map(bot => <BotCard key={bot.id} bot={bot} />)}
</div>
```

### Mobile Navigation

```typescript
function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        {/* Navigation items */}
      </SheetContent>
    </Sheet>
  );
}
```

---

## Developer Notes

- Use consistent patterns across the app
- Keep patterns accessible
- Test patterns on mobile
- Document new patterns

## Future Improvements

- Pattern library (Storybook)
- Pattern analytics
- Pattern templates
- Pattern testing
