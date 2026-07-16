import OpenAI from "openai";

export const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    "X-Title": "SoftwBot AI",
  },
});

export type ModelId =
  | "openai/gpt-4o-mini"
  | "openai/gpt-4o"
  | "anthropic/claude-3.5-sonnet"
  | "deepseek/deepseek-chat";

export const MODELS: Record<
  ModelId,
  { name: string; maxTokens: number; costPer1k: number }
> = {
  "openai/gpt-4o-mini": {
    name: "GPT-4o Mini",
    maxTokens: 16384,
    costPer1k: 0.00015,
  },
  "openai/gpt-4o": {
    name: "GPT-4o",
    maxTokens: 16384,
    costPer1k: 0.005,
  },
  "anthropic/claude-3.5-sonnet": {
    name: "Claude 3.5 Sonnet",
    maxTokens: 8192,
    costPer1k: 0.003,
  },
  "deepseek/deepseek-chat": {
    name: "DeepSeek Chat",
    maxTokens: 4096,
    costPer1k: 0.00014,
  },
};
