import { openrouter } from "./openrouter";

export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openrouter.embeddings.create({
    model: "openai/text-embedding-3-small",
    input: text,
  });

  return response.data[0].embedding;
}

export async function generateEmbeddings(
  texts: string[]
): Promise<number[][]> {
  const response = await openrouter.embeddings.create({
    model: "openai/text-embedding-3-small",
    input: texts,
  });

  return response.data.map(
    (item: { embedding: number[] }) => item.embedding
  );
}
