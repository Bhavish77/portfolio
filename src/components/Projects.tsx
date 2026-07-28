"use client";

import { Sparkles } from "lucide-react";
import { HoverEffect } from "@/components/ui/card-hover-effect";

export default function Projects() {
  const projects = [
    {
      title: "Resonance Chat Platform",
      description: "A real-time workspace collaboration suite with voice calling, persistent messaging, and instant channels built with React, FastAPI, SQLite, and WebSockets.",
      link: "#",
    },
    {
      title: "Algorithmic Backtester",
      description: "A high-performance quantitative trading backtester that processes historical market data, supports custom indicator scripting, and compiles performance metrics.",
      link: "#",
    },
    {
      title: "Interactive Canvas Grid",
      description: "A visual CSS Grid generator and sandbox editor supporting drag-and-drop elements, live CSS export, and preset responsive layout models.",
      link: "#",
    },
    {
      title: "AI Semantic Search Engine",
      description: "A semantic search engine utilizing vector database indexes, embedding endpoints, and custom document parsers to search unstructured markdown files.",
      link: "#",
    },
    {
      title: "Smart Task Sync Widget",
      description: "An offline-first team tasks Kanban board featuring service workers, indexedDB syncing, dynamic filtering, and subtask trees.",
      link: "#",
    },
    {
      title: "Secure Auth Portal",
      description: "An open-source JWT-based user sign-up and authentication gateway featuring hardware-key WebAuthn endpoints and database integrations.",
      link: "#",
    },
  ];

  return (
    <section id="projects" className="py-24 bg-black relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-mono mb-4">
            <Sparkles size={12} />
            <span>Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent">
            Selected Projects
          </h2>
          <div className="w-12 h-1 bg-violet-500 rounded mt-4" />
          <p className="text-neutral-500 text-sm max-w-md mt-6">
            Hover over the cards below to see the interactive backdrop hover effect powered by Aceternity UI.
          </p>
        </div>

        {/* Hover Effect Component */}
        <HoverEffect items={projects} />
      </div>
    </section>
  );
}
