"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Terminal, Sparkles, RefreshCw, Palette, User, Bot, ArrowRight } from "lucide-react";
import WorkExperienceWidget from "./widgets/WorkExperienceWidget";
import ProjectsWidget from "./widgets/ProjectsWidget";
import TechStackWidget from "./widgets/TechStackWidget";
import { Button } from "@/components/ui/button";

export type MessageRole = "user" | "assistant";
export type WidgetType = "work-experience" | "main-projects" | "tech-stack" | "theme-feedback";

export interface MessageItem {
  id: string;
  role: MessageRole;
  text?: string;
  widget?: WidgetType;
  suggestion?: string;
  timestamp: Date;
}

export default function ChatConsole() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial Onboarding Messages
  const initialMessages: MessageItem[] = [
    {
      id: "init-1",
      role: "assistant",
      text: "👋 Welcome to my AI-powered portfolio! I'm Bhavish's Portfolio Agent. Instead of forcing you through traditional page scrolling, I route content directly based on your intent.",
      timestamp: new Date(),
    },
    {
      id: "init-2",
      role: "assistant",
      text: "Explore my background using the prompt chips below, or ask any question!",
      suggestion: "Try clicking [💼 Work Experience] to see my interactive career timeline.",
      timestamp: new Date(),
    },
  ];

  const [messages, setMessages] = useState<MessageItem[]>(initialMessages);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle Interceptor / Deterministic Path A vs Path B
  const handleSend = (overrideQuery?: string) => {
    const query = (overrideQuery || input).trim();
    if (!query) return;

    const userMessage: MessageItem = {
      id: `user-${Date.now()}`,
      role: "user",
      text: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!overrideQuery) setInput("");
    setIsTyping(true);

    // Simulate 0ms/fast response processing
    setTimeout(() => {
      processQuery(query);
      setIsTyping(false);
    }, 250);
  };

  // Deterministic Router Path A
  const processQuery = (query: string) => {
    const q = query.toLowerCase();

    // 1. Work Experience Intent
    if (q.includes("work experience") || q.includes("experience") || q.includes("💼")) {
      const assistantMessage: MessageItem = {
        id: `ast-${Date.now()}`,
        role: "assistant",
        text: "Here is a breakdown of my work experience timeline:",
        widget: "work-experience",
        suggestion: "Now that you've reviewed my experience, click [🚀 Main Projects] to see my applications in action!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      return;
    }

    // 2. Main Projects Intent
    if (q.includes("main projects") || q.includes("projects") || q.includes("🚀")) {
      const assistantMessage: MessageItem = {
        id: `ast-${Date.now()}`,
        role: "assistant",
        text: "Here are my featured production projects and repositories:",
        widget: "main-projects",
        suggestion: "Next, click [🛠️ Tech Stack] to see the complete breakdown of tools and frameworks I use!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      return;
    }

    // 3. Tech Stack Intent
    if (q.includes("tech stack") || q.includes("skills") || q.includes("🛠️")) {
      const assistantMessage: MessageItem = {
        id: `ast-${Date.now()}`,
        role: "assistant",
        text: "Here is my architecture tech stack breakdown:",
        widget: "tech-stack",
        suggestion: "Want to try another aesthetic? Click [🎨 Matrix UI Theme] to switch theme modes!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      return;
    }

    // 4. Matrix Theme / Mode Toggle Intent
    if (q.includes("theme") || q.includes("mode") || q.includes("light") || q.includes("dark") || q.includes("🎨") || q.includes("☀️")) {
      const nextTheme = theme === "dark" ? "light" : "dark";
      setTheme(nextTheme);

      const assistantMessage: MessageItem = {
        id: `ast-${Date.now()}`,
        role: "assistant",
        text: `Switched UI mode to MATRIX ${nextTheme.toUpperCase()}!`,
        widget: "theme-feedback",
        suggestion: "Click [💼 Work Experience] to view the timeline under this aesthetic.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      return;
    }

    // 5. Fallback for conversational queries (Phase 1 Stub, connected to Gemini 1.5 in Phase 2)
    const fallbackMessage: MessageItem = {
      id: `ast-${Date.now()}`,
      role: "assistant",
      text: `I received your query: "${query}". I am operating in Phase 1 (UI & Deterministic Router). Multi-step RAG inference via Gemini 1.5 Flash & Pinecone will be hooked up in Phase 2! In the meantime, try one of the prompt chips below.`,
      suggestion: "Click [🚀 Main Projects] to see my project showcase.",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, fallbackMessage]);
  };

  const resetChat = () => {
    setMessages(initialMessages);
  };

  const promptChips = [
    { label: "💼 Work Experience", query: "💼 Work Experience" },
    { label: "🚀 Main Projects", query: "🚀 Main Projects" },
    { label: "🛠️ Tech Stack", query: "🛠️ Tech Stack" },
    { label: "☀️ Light / 🌙 Dark Mode", query: "☀️ Light / 🌙 Dark Mode" },
  ];

  return (
    <div className={`w-full h-screen flex flex-col overflow-hidden bg-background text-foreground font-mono ${theme === "dark" ? "theme-matrix-dark dark" : "theme-matrix-light"}`}>
      {/* Header Bar */}
      <header className="h-16 border-b border-border/40 bg-background/80 backdrop-blur-md px-6 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold shadow-lg shadow-emerald-500/10">
            <Terminal size={18} />
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight flex items-center gap-2">
              Bhavish<span className="text-emerald-400 font-extrabold">.ai</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                Hybrid Console v1.0
              </span>
            </h1>
            <p className="text-[11px] text-neutral-400">0ms Deterministic Interceptor Active</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted border border-border/50 text-xs font-mono text-foreground hover:border-emerald-500/50 transition-all"
            title="Toggle theme mode"
          >
            <Palette size={13} className="text-emerald-500" />
            <span>Mode: MATRIX {theme.toUpperCase()}</span>
          </button>
          <button
            onClick={resetChat}
            className="p-2 rounded-full hover:bg-neutral-900 text-neutral-400 hover:text-white transition-colors"
            title="Reset Conversation"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </header>

      {/* Messages Stream Window */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 max-w-4xl mx-auto w-full">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-1">
                  <Bot size={16} />
                </div>
              )}

              <div className={`max-w-[85%] sm:max-w-[75%] space-y-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                {/* Text Content */}
                {msg.text && (
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary/20 text-foreground border border-primary/40 rounded-tr-none font-medium"
                        : "bg-card text-card-foreground border border-border rounded-tl-none shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                )}

                {/* Render Hardcoded Visual Widgets */}
                {msg.widget === "work-experience" && <WorkExperienceWidget />}
                {msg.widget === "main-projects" && <ProjectsWidget />}
                {msg.widget === "tech-stack" && <TechStackWidget />}
                {msg.widget === "theme-feedback" && (
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/30 text-xs font-mono text-foreground font-semibold">
                    ✨ Applied {theme.toUpperCase()} theme tokens to root CSS state.
                  </div>
                )}

                {/* Guided Journey Suggestion Prompt */}
                {msg.suggestion && (
                  <div className="inline-flex items-center gap-1.5 p-2.5 rounded-xl bg-muted border border-border text-xs text-muted-foreground font-mono">
                    <Sparkles size={13} className="text-primary shrink-0 animate-pulse" />
                    <span>{msg.suggestion}</span>
                  </div>
                )}
              </div>

              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center text-foreground shrink-0 mt-1">
                  <User size={16} />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3 justify-start items-center">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Bot size={16} />
            </div>
            <div className="p-3 rounded-2xl bg-card border border-border text-xs font-mono text-foreground flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
              <span className="ml-2 text-muted-foreground">Processing intent...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Sticky Action Chips & Input Area */}
      <footer className="p-4 border-t border-border/40 bg-background/90 backdrop-blur-md shrink-0 z-20">
        <div className="max-w-4xl mx-auto space-y-3">
          {/* Sticky Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-mono text-neutral-500 shrink-0 uppercase tracking-wider">
              Quick Actions:
            </span>
            {promptChips.map((chip) => (
              <button
                key={chip.label}
                onClick={() => handleSend(chip.query)}
                className="px-3 py-1.5 rounded-full bg-muted hover:bg-primary/20 border border-border hover:border-primary text-xs font-semibold text-foreground shrink-0 transition-all duration-200 flex items-center gap-1 group shadow-sm"
              >
                <span>{chip.label}</span>
                <ArrowRight size={11} className="opacity-60 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>

          {/* Form Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything or click a quick action prompt chip..."
              className="flex-1 bg-card border border-border focus:border-primary rounded-xl px-4 py-3 text-sm text-card-foreground placeholder:text-muted-foreground outline-none transition-colors"
            />
            <Button
              type="submit"
              disabled={!input.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl px-5 py-3 shadow-lg shadow-primary/20 transition-all disabled:opacity-40"
            >
              <Send size={16} />
            </Button>
          </form>
        </div>
      </footer>
    </div>
  );
}
