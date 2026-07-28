"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles, RefreshCw, Palette, User, ArrowRight, Zap, Layers, Volume2, VolumeX, Search } from "lucide-react";
import WorkExperienceWidget from "./widgets/WorkExperienceWidget";
import ProjectsWidget from "./widgets/ProjectsWidget";
import TechStackWidget from "./widgets/TechStackWidget";
import { Button } from "@/components/ui/button";
import { AsciiArt } from "@/components/ui/ascii-art";
import BootLoader from "./BootLoader";
import CommandPalette from "./CommandPalette";
import CyberBackground from "./CyberBackground";
import { playClickSound, playToggleSound, toggleSound, isSoundEnabled } from "@/utils/audio";

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
  const [soundOn, setSoundOn] = useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Pre-populated Traditional Portfolio Initial Stream
  const initialMessages: MessageItem[] = [
    {
      id: "init-1",
      role: "assistant",
      text: "👋 Welcome! I'm Bhavish's AI Digital Clone. Here is a complete breakdown of my work experience, featured projects, and engineering stack:",
      timestamp: new Date("2026-01-01T00:00:00Z"),
    },
    {
      id: "sec-experience",
      role: "assistant",
      text: "💼 Over the past 3+ years, I've architected multi-agent RAG pipelines and built full-stack production apps. Here is my career timeline:",
      widget: "work-experience",
      timestamp: new Date("2026-01-01T00:00:00Z"),
    },
    {
      id: "sec-projects",
      role: "assistant",
      text: "🚀 Here are 4 of my top open-source tools and production applications:",
      widget: "main-projects",
      timestamp: new Date("2026-01-01T00:00:00Z"),
    },
    {
      id: "sec-techstack",
      role: "assistant",
      text: "🛠️ Here is the complete breakdown of 20 core frameworks, databases, and AI tools I rely on daily:",
      widget: "tech-stack",
      timestamp: new Date("2026-01-01T00:00:00Z"),
    },
    {
      id: "init-prompt",
      role: "assistant",
      text: "💬 Feel free to ask my AI Digital Clone any questions about my background, technical decisions, or engineering projects below!",
      suggestion: "Or click any item in the left navigation dock to jump directly to that section.",
      timestamp: new Date("2026-01-01T00:00:00Z"),
    },
  ];

  const [messages, setMessages] = useState<MessageItem[]>(initialMessages);

  // Scroll to bottom on user input or typing state update
  useEffect(() => {
    if (messages.length > initialMessages.length || isTyping) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Command palette action handler
  const handleCommandPaletteAction = (actionId: string) => {
    if (actionId === "download-resume") {
      alert("Downloading Bhavish's Resume PDF...");
      return;
    }
    if (actionId === "contact-email") {
      window.location.href = "mailto:bhavish@example.com";
      return;
    }
    if (actionId === "reset-chat") {
      resetChat();
      return;
    }
    scrollToSection(actionId, actionId);
  };

  // Smooth scroll handler for quick action dock
  const scrollToSection = (targetId: string, queryLabel: string) => {
    playClickSound();
    // Check if theme toggle
    if (targetId === "theme-toggle") {
      const nextTheme = theme === "dark" ? "light" : "dark";
      setTheme(nextTheme);
      playToggleSound();

      const assistantMessage: MessageItem = {
        id: `ast-${Date.now()}`,
        role: "assistant",
        text: `Switched UI mode to MATRIX ${nextTheme.toUpperCase()}!`,
        widget: "theme-feedback",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      return;
    }

    // Try scrolling to existing pre-populated section
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      handleSend(queryLabel);
    }
  };

  // Handle Interceptor / Deterministic Path A vs Path B
  const handleSend = (overrideQuery?: string) => {
    const query = (overrideQuery || input).trim();
    if (!query) return;

    playClickSound();
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
        suggestion: "Want to try light mode? Click [☀️ Light / 🌙 Dark Mode] to toggle theme modes!",
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
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      return;
    }

    // 5. Fallback for conversational queries (Phase 1 Stub, connected to Gemini 1.5 in Phase 2)
    const fallbackMessage: MessageItem = {
      id: `ast-${Date.now()}`,
      role: "assistant",
      text: `I received your query: "${query}". I am operating in Phase 1 (UI & Deterministic Router). Multi-step RAG inference via Gemini 1.5 Flash & Pinecone will be hooked up in Phase 2! In the meantime, try one of the prompt chips.`,
      suggestion: "Click [🚀 Main Projects] to see my project showcase.",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, fallbackMessage]);
  };

  const resetChat = () => {
    playClickSound();
    setMessages(initialMessages);
  };

  const promptChips = [
    { label: "💼 Work Experience", targetId: "sec-experience", query: "💼 Work Experience" },
    { label: "🚀 Main Projects", targetId: "sec-projects", query: "🚀 Main Projects" },
    { label: "🛠️ Tech Stack", targetId: "sec-techstack", query: "🛠️ Tech Stack" },
    { label: "☀️ Light / 🌙 Dark Mode", targetId: "theme-toggle", query: "☀️ Light / 🌙 Dark Mode" },
  ];

  return (
    <div className={`w-full h-screen flex flex-col overflow-hidden bg-background text-foreground font-mono relative ${theme === "dark" ? "theme-matrix-dark dark" : "theme-matrix-light"}`}>
      {/* 1. Terminal Boot Loader Screen */}
      <BootLoader />

      {/* 2. Cyber Ambient Canvas Overlay */}
      <CyberBackground />

      {/* 3. Command Palette Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectAction={handleCommandPaletteAction}
      />

      {/* Super Slim Header Bar (44px height) */}
      <header className="h-11 border-b border-border/40 bg-background/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-2.5">
          {/* ASCII Avatar Logo in Navbar */}
          <div className="w-6 h-6 rounded-md overflow-hidden border border-primary/40 bg-black flex items-center justify-center">
            <AsciiArt
              src="https://assets.aceternity.com/avatars/manu.webp"
              resolution={25}
              color="var(--primary)"
              animated={false}
              animationStyle="none"
              animateOnView={false}
              className="w-full h-full scale-125"
            />
          </div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-sm tracking-tight flex items-center gap-1.5">
              Bhavish<span className="text-primary font-extrabold">.ai</span>
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary hidden sm:inline-block">
              Digital Clone v1.0
            </span>
          </div>
        </div>

        {/* Navbar Controls */}
        <div className="flex items-center gap-2">
          {/* Cmd + K Command Palette Button */}
          <button
            onClick={() => {
              playClickSound();
              setCommandPaletteOpen(true);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted border border-border/50 text-[11px] font-mono text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
            title="Open Command Palette (Ctrl+K)"
          >
            <Search size={12} className="text-primary" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="text-[9px] px-1 py-0.2 rounded bg-background border border-border text-primary font-bold">
              ⌘K
            </kbd>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              const state = toggleSound();
              setSoundOn(state);
            }}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title={soundOn ? "Mute Sci-Fi Audio" : "Unmute Sci-Fi Audio"}
          >
            {soundOn ? <Volume2 size={15} className="text-primary" /> : <VolumeX size={15} />}
          </button>

          {/* Theme Mode Toggle */}
          <button
            onClick={() => {
              const nextTheme = theme === "dark" ? "light" : "dark";
              setTheme(nextTheme);
              playToggleSound();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted border border-border/50 text-[11px] font-mono text-foreground hover:border-primary/50 transition-all"
            title="Toggle theme mode"
          >
            <Palette size={12} className="text-primary" />
            <span>MODE: MATRIX {theme.toUpperCase()}</span>
          </button>

          {/* Reset Chat */}
          <button
            onClick={resetChat}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title="Reset Conversation"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </header>

      {/* Main Workspace (Sidebar + Central Chat Area) */}
      <div className="flex-1 flex overflow-hidden w-full relative z-10">
        {/* Desktop Sidebar Quick Action Dock */}
        <aside className="hidden md:flex flex-col w-60 border-r border-border bg-card/30 p-3 shrink-0 justify-between backdrop-blur-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-border/40">
              <span className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase flex items-center gap-1.5">
                <Zap size={12} className="text-primary" />
                Quick Navigation
              </span>
            </div>

            <div className="space-y-1.5">
              {promptChips.map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => scrollToSection(chip.targetId, chip.query)}
                  className="w-full text-left px-3 py-2.5 rounded-xl bg-muted/40 hover:bg-primary/15 border border-border/50 hover:border-primary/40 text-xs font-semibold text-foreground transition-all duration-200 flex items-center justify-between group shadow-sm"
                >
                  <span className="truncate">{chip.label}</span>
                  <ArrowRight size={12} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-primary shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar Status Footer */}
          <div className="p-3 rounded-xl bg-muted/30 border border-border/40 space-y-1.5 text-[10px] font-mono text-muted-foreground">
            <div className="flex items-center justify-between text-foreground font-bold">
              <span className="flex items-center gap-1">
                <Layers size={11} className="text-primary" /> Architecture
              </span>
              <span className="text-primary font-mono text-[9px]">Digital Clone Active</span>
            </div>
            <p className="leading-tight text-[10px] text-muted-foreground">
              Direct conversational AI intent routing & 0ms pre-populated widgets.
            </p>
          </div>
        </aside>

        {/* Central Chat Console Area */}
        <main className="flex-1 flex flex-col h-full min-w-0 bg-background relative">
          {/* Message Stream */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-5 max-w-4xl mx-auto w-full scroll-smooth">
            {/* Pinned Digital Clone Hero Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border flex flex-col sm:flex-row items-center gap-5 shadow-sm text-center sm:text-left mb-4">
              {/* ASCII Art Avatar Hero Container */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-primary/40 shadow-lg shadow-primary/20 shrink-0 bg-black flex items-center justify-center">
                <AsciiArt
                  src="https://assets.aceternity.com/avatars/manu.webp"
                  resolution={55}
                  color="var(--primary)"
                  animationStyle="fade"
                  animationDuration={1.2}
                  animateOnView={false}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                  Digital Clone Online
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                  Hey, I&apos;m Bhavish 👋
                </h2>
                <p className="text-xs sm:text-sm font-bold text-primary">
                  Full-Stack AI Engineer
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed pt-1 max-w-lg">
                  Welcome to my interactive console! You&apos;re chatting directly with my digital clone. Ask me about my architecture choices, check out my work history, or demo my live projects below!
                </p>
              </div>
            </div>

            {/* Pre-populated & Dynamic Conversation Stream */}
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  id={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-2.5 pt-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full overflow-hidden border border-primary/40 bg-black shrink-0 mt-0.5 flex items-center justify-center shadow-sm">
                      <AsciiArt
                        src="https://assets.aceternity.com/avatars/manu.webp"
                        resolution={20}
                        color="var(--primary)"
                        animated={false}
                        animationStyle="none"
                        animateOnView={false}
                        className="w-full h-full scale-125"
                      />
                    </div>
                  )}

                  <div className={`max-w-[90%] sm:max-w-[80%] space-y-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                    {/* Text Content */}
                    {msg.text && (
                      <div
                        className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
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
                      <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/30 text-xs font-mono text-foreground font-semibold">
                        ✨ Applied MATRIX {theme.toUpperCase()} theme tokens to root CSS state.
                      </div>
                    )}

                    {/* Guided Journey Suggestion Prompt */}
                    {msg.suggestion && (
                      <div className="inline-flex items-center gap-1.5 p-2 rounded-xl bg-muted border border-border text-[11px] text-muted-foreground font-mono">
                        <Sparkles size={12} className="text-primary shrink-0 animate-pulse" />
                        <span>{msg.suggestion}</span>
                      </div>
                    )}
                  </div>

                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-muted border border-border flex items-center justify-center text-foreground shrink-0 mt-0.5">
                      <User size={15} />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-2.5 justify-start items-center">
                <div className="w-7 h-7 rounded-full overflow-hidden border border-primary/40 bg-black shrink-0 flex items-center justify-center">
                  <AsciiArt
                    src="https://assets.aceternity.com/avatars/manu.webp"
                    resolution={20}
                    color="var(--primary)"
                    animated={false}
                    animationStyle="none"
                    animateOnView={false}
                    className="w-full h-full scale-125"
                  />
                </div>
                <div className="p-2.5 rounded-2xl bg-card border border-border text-xs font-mono text-foreground flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-2 text-muted-foreground text-[11px]">Processing intent...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Toolbar & Compact Input */}
          <footer className="p-2.5 sm:p-3 border-t border-border/40 bg-background/95 backdrop-blur-md shrink-0 z-20">
            <div className="max-w-4xl mx-auto space-y-2">
              {/* Mobile Quick Actions */}
              <div className="md:hidden flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {promptChips.map((chip) => (
                  <button
                    key={chip.label}
                    onClick={() => scrollToSection(chip.targetId, chip.query)}
                    className="px-2.5 py-1 rounded-full bg-muted border border-border text-[11px] font-semibold text-foreground shrink-0 flex items-center gap-1"
                  >
                    <span>{chip.label}</span>
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
                  placeholder="Talk to my digital clone or ask anything about my work..."
                  className="flex-1 bg-card border border-border focus:border-primary rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-card-foreground placeholder:text-muted-foreground outline-none transition-colors"
                />
                <Button
                  type="submit"
                  disabled={!input.trim()}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl px-4 py-2.5 shadow-md shadow-primary/20 transition-all disabled:opacity-40"
                >
                  <Send size={15} />
                </Button>
              </form>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
