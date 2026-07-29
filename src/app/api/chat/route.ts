import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { DIGITAL_CLONE_SYSTEM_PROMPT } from "@/data/digitalCloneKnowledge";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;

    console.log("=== CHAT API INVOCATION ===");
    console.log("API Key present:", Boolean(apiKey));

    // Filter out internal system/widget messages for LLM context
    const formattedMessages = messages
      .filter((m: { role: string; content?: string }) => m.content && m.content.trim())
      .map((m: { role: string; content: string }) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content,
      }));

    if (apiKey) {
      console.log("Streaming real-time LLM response via Gemini 2.5 Flash...");
      const result = streamText({
        model: google("gemini-2.5-flash"),
        system: DIGITAL_CLONE_SYSTEM_PROMPT,
        messages: formattedMessages,
      });
      return result.toTextStreamResponse();
    }

    // High-fidelity fallback Digital Clone inference engine (when API key is not present)
    console.log("Using Fallback Engine...");
    const lastUserMsg = formattedMessages[formattedMessages.length - 1]?.content || "";
    const lower = lastUserMsg.toLowerCase();

    let responseText = "I'm Bhavish! Feel free to ask me about my work at NativeBridge & AutoFlow, my VS Code extension, or my live AI Voice SaaS Resonance.";

    if (lower.includes("autoflow") || lower.includes("playwright") || lower.includes("tooltip")) {
      responseText = "At AutoFlow, I built our Playwright UI testing features in Electron.js, React & MobX! Right after my exams, I built a Playwright Locator Tooltip feature just for fun — a few days later, our CEO shared a client screenshot praising it directly! I also built our vision-based AI Agent using Claude Computer Use API in 1 week, allowing users to generate Playwright tests in natural language.";
    } else if (lower.includes("nativebridge") || lower.includes("vscode") || lower.includes("device") || lower.includes("mobile")) {
      responseText = "At NativeBridge (mobile device farm like BrowserStack), I built our entire VS Code extension in 1 week with custom auth token refresh. I also built real-time WebSocket & ADB web UI streaming for Android & iOS physical devices, gRPC to SSE code generation pipelines, and self-healing test proxies!";
    } else if (lower.includes("resonance") || lower.includes("voice") || lower.includes("saas") || lower.includes("project")) {
      responseText = "I recently built Resonance (https://resonance-kappa-seven.vercel.app/) — a full-stack AI Voice Generation SaaS! It runs the open-source Chatterbox voice model on Modal serverless GPUs, with FastAPI backend, React frontend, Paddle subscriptions, multi-tenant workspaces, S3 audio uploads, and Google OAuth.";
    } else if (lower.includes("education") || lower.includes("degree") || lower.includes("college")) {
      responseText = "I hold an M.Sc. in Computer Science (Class of 2024). I started at AutoFlow as an intern in Dec 2023, transitioned to full-time in Sep 2024, and have been building high-performance AI & full-stack systems ever since!";
    } else if (lower.includes("stack") || lower.includes("skill") || lower.includes("tech")) {
      responseText = "My core stack spans React, Next.js 15, TypeScript, Electron.js, MobX, Python, FastAPI, Docker, PostgreSQL, MongoDB, WebSockets, SSE, gRPC, ADB, Appium, Playwright, and Claude/Gemini APIs. I'm currently upskilling in LangChain & LangGraph!";
    } else if (lower.includes("contact") || lower.includes("hire") || lower.includes("email")) {
      responseText = "I'm always open to discussing full-stack engineering & AI roles! Feel free to reach out via email at bhavish@example.com or check out my live projects above.";
    }

    return new Response(JSON.stringify({ text: responseText }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: "Failed to process chat query" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
