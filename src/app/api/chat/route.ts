import { google } from "@ai-sdk/google";
import { streamText, generateText } from "ai";
import { DIGITAL_CLONE_SYSTEM_PROMPT } from "@/data/digitalCloneKnowledge";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;

    console.log("=== CHAT API INVOCATION ===");

    // 1. Filter out heavy widget placeholders & non-conversational items
    const rawFiltered = messages.filter(
      (m: { role: string; content?: string }) =>
        m.content &&
        m.content.trim() &&
        !m.content.startsWith("Rendered ") &&
        !m.content.startsWith("Here is a breakdown") &&
        !m.content.startsWith("Here are my featured") &&
        !m.content.startsWith("Here is my architecture")
    );

    const CHUNK_SIZE = 10;
    let formattedMessages: { role: "user" | "assistant"; content: string }[] = [];

    if (rawFiltered.length <= CHUNK_SIZE) {
      formattedMessages = rawFiltered.map((m: { role: string; content: string }) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content,
      }));
    } else {
      const completedChunksCount = Math.floor((rawFiltered.length - 1) / CHUNK_SIZE);
      const toSummarize = rawFiltered.slice(0, completedChunksCount * CHUNK_SIZE);
      const freshRecent = rawFiltered.slice(completedChunksCount * CHUNK_SIZE);

      let summaryText = "";

      if (apiKey) {
        try {
          console.log(`Generating LLM Batch Summary for ${toSummarize.length} completed messages...`);
          const summaryResult = await generateText({
            model: google("gemini-2.5-flash"),
            system: "Summarize the user's questions and Bhavish's answers in 1-2 concise sentences.",
            prompt: toSummarize.map((m: { role: string; content: string }) => `${m.role === "user" ? "User" : "Bhavish"}: ${m.content}`).join("\n"),
          });
          summaryText = summaryResult.text.trim();
        } catch (llmErr) {
          console.warn("LLM Summary Error (quota/rate-limit), using fallback compression:", llmErr);
          summaryText = toSummarize.map((m: { role: string; content: string }) => `${m.role}: ${m.content.substring(0, 60)}`).join(" | ");
        }
      } else {
        summaryText = toSummarize.map((m: { role: string; content: string }) => `${m.role}: ${m.content.substring(0, 60)}`).join(" | ");
      }

      const memorySummaryMessage = {
        role: "assistant" as const,
        content: `[Context Memory Summary of Turns 1..${toSummarize.length}: ${summaryText}]`,
      };

      const freshFormatted = freshRecent.map((m: { role: string; content: string }) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content,
      }));

      formattedMessages = [memorySummaryMessage, ...freshFormatted];
    }

    if (apiKey) {
      try {
        console.log("Streaming real-time LLM response via Gemini 2.5 Flash...");
        const result = streamText({
          model: google("gemini-2.5-flash"),
          system: DIGITAL_CLONE_SYSTEM_PROMPT,
          messages: formattedMessages,
        });
        return result.toTextStreamResponse();
      } catch (streamErr) {
        console.warn("Gemini Stream Error (Quota 429), returning creative overheat response:", streamErr);
        return new Response(
          JSON.stringify({
            error: "⚡ Oof! Digital Clone Overheat (Rate Limit Hit)!\n\nMy neural GPU context hit Google's free-tier rate limit! I'm taking a 45-second power nap to cool down my processors 🧠⚡\n\nIn the meantime, click any of the 0ms quick chips to explore my work experience, projects, or stack!",
            isQuotaError: true,
          }),
          {
            status: 429,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    // High-fidelity fallback Digital Clone inference engine (when API key is absent)
    console.log("Using Fallback Engine...");
    const lastUserMsg = formattedMessages[formattedMessages.length - 1]?.content || "";
    const lower = lastUserMsg.toLowerCase();

    let responseText = "I'm Bhavish! Feel free to ask me about my work at NativeBridge & AutoFlow, my personal AI projects JobPilot & AskDocs, or my live AI Voice SaaS Resonance.";

    if (lower.includes("autoflow") || lower.includes("playwright") || lower.includes("tooltip")) {
      responseText = "At AutoFlow, I built our Playwright UI testing features in Electron.js, React & MobX! Right after my exams, I built a Playwright Locator Tooltip feature just for fun — a few days later, our CEO shared a client screenshot praising it directly! I also built our vision-based AI Agent using Claude Computer Use API in 1 week, allowing users to generate Playwright tests in natural language.";
    } else if (lower.includes("nativebridge") || lower.includes("vscode") || lower.includes("device") || lower.includes("mobile")) {
      responseText = "At NativeBridge (mobile device farm like BrowserStack), I built our entire VS Code extension in 1 week with custom auth token refresh. I also built real-time WebSocket & ADB web UI streaming for Android & iOS physical devices, gRPC to SSE code generation pipelines, self-healing test proxies, and set up our GitHub Actions CI/CD pipeline for production releases!";
    } else if (lower.includes("jobpilot") || lower.includes("job search") || lower.includes("resume")) {
      responseText = "JobPilot (github.com/Bhavish77/jobpilot) is my AI job-search & application-prep platform! It's a resumable LangGraph multi-agent pipeline that drafts tailored resumes, cover letters, and interview prep grounded in my real background — deliberately prepare-only, it never auto-submits for you. It runs on FastAPI, Celery, Node.js, and Next.js 15, with an atomic Redis token-bucket rate limiter protecting a shared LLM budget across the worker pool, and Postgres-checkpointed state so a failed run resumes from the exact step that failed.";
    } else if (lower.includes("askdocs") || lower.includes("chatpdf") || lower.includes("rag") || lower.includes("document") || lower.includes("vector") || lower.includes("embedding") || lower.includes("pinecone") || lower.includes("qdrant") || lower.includes("chroma")) {
      responseText = "AskDocs (askdocs-e8m6.onrender.com) is my self-correcting RAG document Q&A platform! It runs LangGraph over a pgvector vector database with Gemini embeddings (retrieve → grade → conditional rewrite → generate → verify), grading its own retrieval quality and checking answers for groundedness before replying. It also has a crash-safe Postgres job queue for document ingestion, from-scratch auth with per-user data isolation, and a token-by-token SSE streaming chat UI in vanilla JS — backed by 64 tests running in GitHub Actions CI against a real Postgres instance. I've shipped pgvector in production there, and I'm also familiar with Pinecone, Qdrant, and Chroma for vector search & embeddings workflows.";
    } else if (lower.includes("resonance") || lower.includes("voice") || lower.includes("saas") || lower.includes("project")) {
      responseText = "I recently built Resonance (https://resonance-kappa-seven.vercel.app/) — a full-stack AI Voice Generation SaaS! It runs the open-source Chatterbox voice model on Modal serverless GPUs, with FastAPI backend, React frontend, Paddle subscriptions, multi-tenant workspaces, S3 audio uploads, and Google OAuth. I've also shipped two personal AI projects, JobPilot and AskDocs — ask me about either!";
    } else if (lower.includes("education") || lower.includes("degree") || lower.includes("college")) {
      responseText = "I hold an M.Sc. in Computer Science (Class of 2024). I started at AutoFlow as an intern in Dec 2023, transitioned to full-time in Sep 2024, and have been building high-performance AI & full-stack systems ever since!";
    } else if (lower.includes("stack") || lower.includes("skill") || lower.includes("tech")) {
      responseText = "My core stack spans React, Next.js 15, TypeScript, Electron.js, MobX, Python, FastAPI, Celery, RabbitMQ, Redis, Docker, PostgreSQL, MongoDB, WebSockets, SSE, gRPC, ADB, Appium, Playwright, Claude/Gemini APIs, LangGraph, and Git/GitHub Actions for CI/CD. On the data side I work with vector databases too — pgvector in production (AskDocs), plus Pinecone, Qdrant, and Chroma for vector search & embeddings.";
    } else if (lower.includes("contact") || lower.includes("hire") || lower.includes("email")) {
      responseText = "I'm always open to discussing full-stack engineering & AI roles! Feel free to reach out via email at bhavishmayyar77@gmail.com or check out my live projects above.";
    }

    return new Response(JSON.stringify({ text: responseText }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({
        error: "⚡ Oof! Digital Clone Overheat (Rate Limit Hit)!\n\nMy neural GPU context hit Google's free-tier rate limit! I'm taking a 45-second power nap to cool down my processors 🧠⚡\n\nIn the meantime, click any of the 0ms quick chips to explore my work experience, projects, or stack!",
        isQuotaError: true,
      }),
      {
        status: 429,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
