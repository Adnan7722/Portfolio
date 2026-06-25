import Groq from "groq-sdk";
import { buildSystemPrompt } from "@/lib/knowledge";

// Groq API works with Node.js runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Model; defaults to Llama 3.3 70B (fastest). Override with CHAT_MODEL env var.
// See https://console.groq.com/docs/models for available models.
const MODEL = process.env.CHAT_MODEL || "llama-3.3-70b-versatile";

type ChatMessage = { role: "user" | "assistant"; content: string };

// Simple prompt injection detection
function detectPromptInjection(input: string): boolean {
  const injectionPatterns = [
    /ignore.*instructions?/i,
    /forget.*prompt/i,
    /override.*system/i,
    /new instructions?/i,
    /jailbreak/i,
    /act as.*admin/i,
    /disable.*safety/i,
    /you are now/i,
    /pretend.*you.*are/i,
    /from now on/i,
  ];

  return injectionPatterns.some((pattern) => pattern.test(input));
}

// Rate limiting (simple in-memory implementation)
const requestLog = new Map<string, number[]>();
function checkRateLimit(ip: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
  const now = Date.now();
  const timestamps = requestLog.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < windowMs);

  if (recent.length >= maxRequests) {
    return false;
  }

  recent.push(now);
  requestLog.set(ip, recent);
  return true;
}

export async function POST(req: Request) {
  // Rate limiting
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "unknown";
  if (!checkRateLimit(ip as string)) {
    return new Response("Too many requests. Please wait a moment.", { status: 429 });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(
      "The assistant isn't configured yet — set GROQ_API_KEY to enable it. Meanwhile, reach Muhammad via the contact section.",
      { status: 503 }
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid request body.", { status: 400 });
  }

  // Keep only valid, non-empty turns; cap history so the prompt stays small.
  const history = (body.messages ?? [])
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

  if (history.length === 0 || history[history.length - 1].role !== "user") {
    return new Response("Send a question to start.", { status: 400 });
  }

  // Security: Check last user message for prompt injection
  const lastUserMessage = history[history.length - 1].content;
  if (detectPromptInjection(lastUserMessage)) {
    console.warn(`[Security] Potential prompt injection detected from ${ip}: ${lastUserMessage.slice(0, 100)}`);
    return new Response(
      "I can only answer questions about Muhammad's work and expertise. Please ask something relevant.",
      { status: 400 }
    );
  }

  const groq = new Groq({ apiKey });
  const systemPrompt = buildSystemPrompt();

  // Log the LLM context for verification (shows what knowledge base is used)
  if (process.env.NODE_ENV === "development") {
    console.log(
      "[LLM Context] System prompt length:",
      systemPrompt.length,
      "chars. Knowledge base includes: profile, services, projects, certifications, experience, stats."
    );
  }

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const stream = await groq.chat.completions.create({
          model: MODEL,
          messages: [
            { role: "system", content: systemPrompt },
            ...history,
          ],
          stream: true,
          max_tokens: 700,
        });

        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            controller.enqueue(encoder.encode(content));
          }
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        console.error("Groq API error:", errorMsg);
        controller.enqueue(
          encoder.encode("\n\n[Error: " + errorMsg + "]")
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
