import { getOpenRouter, type ModelId } from "./openrouter";

interface ChatParams {
  model?: ModelId;
  systemPrompt: string;
  messages: { role: "user" | "assistant"; content: string }[];
  maxTokens?: number;
  temperature?: number;
}

export async function chat({
  model = "openai/gpt-4o-mini",
  systemPrompt,
  messages,
  maxTokens = 1000,
  temperature = 0.7,
}: ChatParams) {
  const openrouter = getOpenRouter();
  const response = await openrouter.chat.completions.create({
    model,
    messages: [{ role: "system", content: systemPrompt }, ...messages],
    max_tokens: maxTokens,
    temperature,
  });

  return {
    content: response.choices[0].message.content ?? "",
    tokens: response.usage?.total_tokens ?? 0,
    model: response.model,
  };
}

export async function chatStream({
  model = "openai/gpt-4o-mini",
  systemPrompt,
  messages,
  maxTokens = 1000,
  temperature = 0.7,
}: ChatParams) {
  const openrouter = getOpenRouter();
  const response = await openrouter.chat.completions.create({
    model,
    messages: [{ role: "system", content: systemPrompt }, ...messages],
    max_tokens: maxTokens,
    temperature,
    stream: true,
  });

  return response;
}
