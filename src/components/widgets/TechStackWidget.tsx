"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Database, Layout, Server, Zap } from "lucide-react";

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  skills: { name: string; level: string; core?: boolean }[];
}

export default function TechStackWidget() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const categories: SkillCategory[] = [
    {
      id: "frontend",
      title: "Frontend & UI Engineering",
      icon: <Layout size={15} className="text-primary" />,
      skills: [
        { name: "Next.js 15", level: "Expert", core: true },
        { name: "React 19", level: "Expert", core: true },
        { name: "TypeScript", level: "Advanced", core: true },
        { name: "Tailwind CSS v4", level: "Expert", core: true },
        { name: "shadcn/ui", level: "Advanced" },
        { name: "Framer Motion", level: "Advanced" },
      ],
    },
    {
      id: "backend",
      title: "Backend & Systems Architecture",
      icon: <Server size={15} className="text-primary" />,
      skills: [
        { name: "Python", level: "Advanced", core: true },
        { name: "FastAPI", level: "Advanced", core: true },
        { name: "Node.js", level: "Intermediate" },
        { name: "RESTful APIs", level: "Expert", core: true },
        { name: "WebSockets", level: "Advanced" },
      ],
    },
    {
      id: "ai",
      title: "AI Engineering & Vector Databases",
      icon: <Cpu size={15} className="text-primary" />,
      skills: [
        { name: "Vercel AI SDK", level: "Advanced", core: true },
        { name: "Gemini 1.5 Flash", level: "Advanced", core: true },
        { name: "Pinecone Vector DB", level: "Advanced", core: true },
        { name: "Embeddings RAG", level: "Advanced", core: true },
        { name: "Langfuse Tracing", level: "Intermediate" },
      ],
    },
    {
      id: "devops",
      title: "Database & DevOps Infrastructure",
      icon: <Database size={15} className="text-primary" />,
      skills: [
        { name: "PostgreSQL", level: "Advanced", core: true },
        { name: "SQLite", level: "Advanced" },
        { name: "Docker", level: "Intermediate" },
        { name: "Vercel Serverless", level: "Expert", core: true },
        { name: "Git & GitHub", level: "Expert", core: true },
      ],
    },
  ];

  const filterTabs = [
    { id: "all", label: "All (20)" },
    { id: "core", label: "⚡ Core Stack" },
    { id: "ai", label: "🤖 AI & RAG" },
    { id: "frontend", label: "💻 Frontend" },
    { id: "backend", label: "⚙️ Backend" },
  ];

  const filteredCategories = categories.map((cat) => {
    if (activeFilter === "all") return cat;
    if (activeFilter === "core") {
      return {
        ...cat,
        skills: cat.skills.filter((s) => s.core),
      };
    }
    if (activeFilter === cat.id) return cat;
    return { ...cat, skills: [] };
  }).filter((cat) => cat.skills.length > 0);

  return (
    <div className="w-full my-2 space-y-3 text-left font-mono">
      {/* Interactive Filter Chips Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all duration-200 shrink-0 border ${
                isActive
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-muted/60 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Grid Layout (Un-boxed, clean surface grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <AnimatePresence mode="popLayout">
          {filteredCategories.map((cat) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="p-3.5 rounded-xl bg-card border border-border space-y-2.5 shadow-sm hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-2 border-b border-border/60 pb-2">
                {cat.icon}
                <h4 className="text-[11px] font-bold text-card-foreground uppercase tracking-wider">
                  {cat.title}
                </h4>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono border transition-all ${
                      skill.core
                        ? "bg-primary/15 text-primary border-primary/40 font-bold"
                        : "bg-muted text-card-foreground border-border hover:border-primary/30"
                    }`}
                  >
                    {skill.core && (
                      <Zap size={10} className="text-primary fill-primary shrink-0" />
                    )}
                    {skill.name}
                    <span className="text-[9px] text-muted-foreground font-normal">
                      ({skill.level})
                    </span>
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
