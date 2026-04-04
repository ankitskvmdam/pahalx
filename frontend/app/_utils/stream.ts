import { fetchStream } from "../query-fetch";

export async function streamHandler(
  url: string,
  request: RequestInit,
  callbacks = {} as { onValue?: (value: string) => void; onDone?: () => void }
) {
  let reader: Awaited<ReturnType<typeof fetchStream>> | null = null;
  const { onValue, onDone } = callbacks;

  try {
    reader = await fetchStream(url, request);
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        onDone?.();
        break;
      }
      onValue?.(value);
    }
  } catch (error) {
    console.log("Error in the streamer", error);
    if (reader) {
      console.log("Closing reader", reader);
      await reader.cancel();
      reader.releaseLock();
    }
    return;
  }
}

export type TParsedStreamChoice = {
  index: number;
  delta: { content?: string; reasoning_content?: string };
  logprobs: null;
  finish_reason: null;
};

export type TParsedStream = {
  id: string;
  object: string;
  created: number;
  model: string;
  system_fingerprint: string;
  choices?: TParsedStreamChoice[];
};

export function parseStreamData(value: string): TParsedStream[] {
  if (!value || typeof value !== "string") return [];
  const parts = value.split("data: ").filter((v) => v.trim() !== "");

  if (parts[0] === "[DONE]") return [];

  return parts
    .map((p) => {
      try {
        return JSON.parse(p) as TParsedStream;
      } catch (error) {
        console.log("JSON parsing failed", error, p);
        return null;
      }
    })
    .filter(Boolean) as TParsedStream[];
}

export function getContentFromParsedStream(
  parsed: TParsedStream | TParsedStream[]
): string {
  const data = Array.isArray(parsed) ? parsed : [parsed];
  let content = "";

  data.forEach((d) => {
    content += d.choices?.[0]?.delta?.content ?? "";
  });

  return content;
}
