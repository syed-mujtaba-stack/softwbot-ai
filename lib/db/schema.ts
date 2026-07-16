import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  decimal,
  boolean,
  jsonb,
  pgEnum,
  bigint,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ─── Enums ──────────────────────────────────────────────

export const botStatusEnum = pgEnum("bot_status", [
  "draft",
  "active",
  "paused",
  "error",
]);

export const senderTypeEnum = pgEnum("sender_type", [
  "user",
  "ai",
  "human_agent",
  "system",
]);

export const conversationStatusEnum = pgEnum("conv_status", [
  "active",
  "pending",
  "resolved",
  "archived",
]);

export const messageTypeEnum = pgEnum("message_type", [
  "text",
  "image",
  "video",
  "audio",
  "document",
  "location",
  "sticker",
]);

export const whatsappStatusEnum = pgEnum("whatsapp_status", [
  "sent",
  "delivered",
  "read",
  "failed",
]);

export const leadStatusEnum = pgEnum("lead_status", [
  "new",
  "qualified",
  "unqualified",
  "converted",
  "lost",
]);

export const memberRoleEnum = pgEnum("member_role", [
  "owner",
  "admin",
  "member",
  "viewer",
]);

export const workspacePlanEnum = pgEnum("workspace_plan", [
  "free",
  "starter",
  "pro",
  "enterprise",
]);

// ─── Better Auth Tables ─────────────────────────────────

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  token: text("token").unique().notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  idToken: text("id_token"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── Business Tables ────────────────────────────────────

export const workspaces = pgTable("workspaces", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  ownerId: text("owner_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  logoUrl: text("logo_url"),
  settings: jsonb("settings").default({}),
  plan: workspacePlanEnum("plan").default("free").notNull(),
  trialEndsAt: timestamp("trial_ends_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const workspaceMembers = pgTable("workspace_members", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  role: memberRoleEnum("role").default("member").notNull(),
  permissions: jsonb("permissions").default({}),
  invitedAt: timestamp("invited_at").defaultNow(),
  joinedAt: timestamp("joined_at"),
  isActive: boolean("is_active").default(true),
});

export const bots = pgTable("bots", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  avatarUrl: text("avatar_url"),
  status: botStatusEnum("status").default("draft").notNull(),
  model: text("model").default("openai/gpt-4o-mini").notNull(),
  temperature: decimal("temperature", { precision: 3, scale: 2 }).default(
    "0.70"
  ),
  maxTokens: integer("max_tokens").default(1000),
  systemPrompt: text("system_prompt").notNull(),
  personality: jsonb("personality").default({}),
  businessHours: jsonb("business_hours").default({}),
  humanHandoffRules: jsonb("human_handoff_rules").default({}),
  settings: jsonb("settings").default({}),
  welcomeMessage: text("welcome_message"),
  offlineMessage: text("offline_message"),
  fallbackMessage: text("fallback_message"),
  maxContextMessages: integer("max_context_messages").default(20),
  responseDelayMs: integer("response_delay_ms").default(1000),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  lastActiveAt: timestamp("last_active_at"),
  totalConversations: integer("total_conversations").default(0),
  totalMessages: integer("total_messages").default(0),
});

export const whatsappSessions = pgTable("whatsapp_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  botId: uuid("bot_id")
    .unique()
    .notNull()
    .references(() => bots.id, { onDelete: "cascade" }),
  phoneNumber: text("phone_number"),
  phoneNumberId: text("phone_number_id"),
  sessionData: jsonb("session_data"),
  status: text("status").default("disconnected"),
  lastConnectedAt: timestamp("last_connected_at"),
  lastMessageAt: timestamp("last_message_at"),
  reconnectAttempts: integer("reconnect_attempts").default(0),
  maxReconnectAttempts: integer("max_reconnect_attempts").default(10),
  errorMessage: text("error_message"),
  deviceInfo: jsonb("device_info"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  phoneNumber: text("phone_number").notNull(),
  name: text("name"),
  email: text("email"),
  avatarUrl: text("avatar_url"),
  tags: text("tags").array().default([]),
  leadScore: integer("lead_score").default(0),
  leadStatus: leadStatusEnum("lead_status").default("new"),
  source: text("source"),
  firstSeenAt: timestamp("first_seen_at").defaultNow(),
  lastSeenAt: timestamp("last_seen_at"),
  totalConversations: integer("total_conversations").default(0),
  totalMessages: integer("total_messages").default(0),
  customFields: jsonb("custom_fields").default({}),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const conversations = pgTable("conversations", {
  id: uuid("id").defaultRandom().primaryKey(),
  botId: uuid("bot_id")
    .notNull()
    .references(() => bots.id, { onDelete: "cascade" }),
  contactId: uuid("contact_id")
    .notNull()
    .references(() => contacts.id, { onDelete: "cascade" }),
  status: conversationStatusEnum("status").default("active"),
  channel: text("channel").default("whatsapp"),
  isAiActive: boolean("is_ai_active").default(true),
  humanAgentId: text("human_agent_id"),
  tags: text("tags").array().default([]),
  priority: text("priority").default("medium"),
  startedAt: timestamp("started_at").defaultNow(),
  lastMessageAt: timestamp("last_message_at"),
  resolvedAt: timestamp("resolved_at"),
  messageCount: integer("message_count").default(0),
  aiConfidenceAvg: decimal("ai_confidence_avg", { precision: 5, scale: 2 }),
  sentimentScore: decimal("sentiment_score", { precision: 5, scale: 2 }),
  customFields: jsonb("custom_fields").default({}),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  conversationId: uuid("conversation_id")
    .notNull()
    .references(() => conversations.id, { onDelete: "cascade" }),
  senderType: senderTypeEnum("sender_type").notNull(),
  senderId: text("sender_id"),
  content: text("content").notNull(),
  contentType: messageTypeEnum("content_type").default("text"),
  mediaUrl: text("media_url"),
  mediaMetadata: jsonb("media_metadata"),
  isRead: boolean("is_read").default(false),
  isDelivered: boolean("is_delivered").default(false),
  whatsappMessageId: text("whatsapp_message_id"),
  whatsappStatus: whatsappStatusEnum("whatsapp_status").default("sent"),
  aiModelUsed: text("ai_model_used"),
  aiTokensUsed: integer("ai_tokens_used"),
  aiConfidence: decimal("ai_confidence", { precision: 5, scale: 2 }),
  aiLatencyMs: integer("ai_latency_ms"),
  knowledgeSources: jsonb("knowledge_sources").default([]),
  internalNote: boolean("internal_note").default(false),
  editedAt: timestamp("edited_at"),
  deletedAt: timestamp("deleted_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const knowledgeBases = pgTable("knowledge_bases", {
  id: uuid("id").defaultRandom().primaryKey(),
  botId: uuid("bot_id")
    .notNull()
    .references(() => bots.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  status: text("status").default("processing"),
  fileCount: integer("file_count").default(0),
  totalChunks: integer("total_chunks").default(0),
  embeddingModel: text("embedding_model").default("text-embedding-3-small"),
  embeddingDimensions: integer("embedding_dimensions").default(1536),
  chunkSize: integer("chunk_size").default(500),
  chunkOverlap: integer("chunk_overlap").default(50),
  settings: jsonb("settings").default({}),
  storageUsedBytes: bigint("storage_used_bytes", { mode: "number" }).default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  lastSyncedAt: timestamp("last_synced_at"),
});

export const knowledgeFiles = pgTable("knowledge_files", {
  id: uuid("id").defaultRandom().primaryKey(),
  knowledgeBaseId: uuid("knowledge_base_id")
    .notNull()
    .references(() => knowledgeBases.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  fileType: text("file_type").notNull(),
  fileUrl: text("file_url"),
  fileSize: integer("file_size"),
  status: text("status").default("uploading"),
  errorMessage: text("error_message"),
  chunkCount: integer("chunk_count").default(0),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  processedAt: timestamp("processed_at"),
});

export const automationRules = pgTable("automation_rules", {
  id: uuid("id").defaultRandom().primaryKey(),
  botId: uuid("bot_id")
    .notNull()
    .references(() => bots.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  trigger: jsonb("trigger").notNull(),
  actions: jsonb("actions").notNull(),
  isActive: boolean("is_active").default(true),
  executionCount: integer("execution_count").default(0),
  lastExecutedAt: timestamp("last_executed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const notifications = pgTable("notifications", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  actionUrl: text("action_url"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").defaultNow(),
});

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  plan: text("plan").notNull(),
  status: text("status").default("active"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  stripeCustomerId: text("stripe_customer_id"),
  currentPeriodStart: timestamp("current_period_start"),
  currentPeriodEnd: timestamp("current_period_end"),
  cancelAt: timestamp("cancel_at"),
  cancelledAt: timestamp("cancelled_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const apiKeys = pgTable("api_keys", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  key: text("key").unique().notNull(),
  lastUsedAt: timestamp("last_used_at"),
  expiresAt: timestamp("expires_at"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  userId: text("user_id").references(() => user.id),
  action: text("action").notNull(),
  resource: text("resource").notNull(),
  resourceId: text("resource_id"),
  details: jsonb("details").default({}),
  ipAddress: text("ip_address"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ─── Relations ──────────────────────────────────────────

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  ownedWorkspaces: many(workspaces),
  memberships: many(workspaceMembers),
  notifications: many(notifications),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const workspaceRelations = relations(workspaces, ({ one, many }) => ({
  owner: one(user, {
    fields: [workspaces.ownerId],
    references: [user.id],
  }),
  members: many(workspaceMembers),
  bots: many(bots),
  contacts: many(contacts),
}));

export const workspaceMemberRelations = relations(
  workspaceMembers,
  ({ one }) => ({
    workspace: one(workspaces, {
      fields: [workspaceMembers.workspaceId],
      references: [workspaces.id],
    }),
    user: one(user, {
      fields: [workspaceMembers.userId],
      references: [user.id],
    }),
  })
);

export const botRelations = relations(bots, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [bots.workspaceId],
    references: [workspaces.id],
  }),
  whatsappSession: one(whatsappSessions),
  conversations: many(conversations),
  knowledgeBases: many(knowledgeBases),
  automationRules: many(automationRules),
}));

export const contactRelations = relations(contacts, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [contacts.workspaceId],
    references: [workspaces.id],
  }),
  conversations: many(conversations),
}));

export const conversationRelations = relations(
  conversations,
  ({ one, many }) => ({
    bot: one(bots, {
      fields: [conversations.botId],
      references: [bots.id],
    }),
    contact: one(contacts, {
      fields: [conversations.contactId],
      references: [contacts.id],
    }),
    messages: many(messages),
  })
);

export const messageRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
}));

export const knowledgeBaseRelations = relations(
  knowledgeBases,
  ({ one, many }) => ({
    bot: one(bots, {
      fields: [knowledgeBases.botId],
      references: [bots.id],
    }),
    files: many(knowledgeFiles),
  })
);

export const knowledgeFileRelations = relations(
  knowledgeFiles,
  ({ one }) => ({
    knowledgeBase: one(knowledgeBases, {
      fields: [knowledgeFiles.knowledgeBaseId],
      references: [knowledgeBases.id],
    }),
  })
);

export const notificationRelations = relations(notifications, ({ one }) => ({
  user: one(user, {
    fields: [notifications.userId],
    references: [user.id],
  }),
}));
