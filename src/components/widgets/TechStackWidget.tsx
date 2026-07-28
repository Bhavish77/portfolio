"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, Cpu, Database, Layout, Server, Zap } from "lucide-react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiPython,
  SiFastapi,
  SiNodedotjs,
  SiPostgresql,
  SiSqlite,
  SiDocker,
  SiVercel,
  SiGit,
  SiGoogle,
} from "react-icons/si";
import { playClickSound } from "@/utils/audio";

interface SkillItem {
  name: string;
  level: string;
  core?: boolean;
  color: string;
  icon: React.ReactNode;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  skills: SkillItem[];
}

export default function TechStackWidget() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const categories: SkillCategory[] = [
    {
      id: "frontend",
      title: "Frontend & UI Engineering",
      icon: <Layout size={15} className="text-primary" />,
      skills: [
        { name: "Next.js 15", level: "Expert", core: true, color: "#ffffff", icon: <SiNextdotjs size={14} /> },
        { name: "React 19", level: "Expert", core: true, color: "#61DAFB", icon: <SiReact size={14} /> },
        { name: "TypeScript", level: "Advanced", core: true, color: "#3178C6", icon: <SiTypescript size={14} /> },
        { name: "Tailwind CSS v4", level: "Expert", core: true, color: "#06B6D4", icon: <SiTailwindcss size={14} /> },
        { name: "shadcn/ui", level: "Advanced", color: "#ffffff", icon: <SiNextdotjs size={14} /> },
        { name: "Framer Motion", level: "Advanced", color: "#0055FF", icon: <SiFramer size={14} /> },
      ],
    },
    {
      id: "backend",
      title: "Backend & Systems Architecture",
      icon: <Server size={15} className="text-primary" />,
      skills: [
        { name: "Python", level: "Advanced", core: true, color: "#3776AB", icon: <SiPython size={14} /> },
        { name: "FastAPI", level: "Advanced", core: true, color: "#009688", icon: <SiFastapi size={14} /> },
        { name: "Node.js", level: "Intermediate", color: "#5FA04E", icon: <SiNodedotjs size={14} /> },
        { name: "RESTful APIs", level: "Expert", core: true, color: "#00FFB3", icon: <Zap size={14} /> },
        { name: "WebSockets", level: "Advanced", color: "#FF6C37", icon: <Zap size={14} /> },
      ],
    },
    {
      id: "ai",
      title: "AI Engineering & Vector Databases",
      icon: <Cpu size={15} className="text-primary" />,
      skills: [
        { name: "Vercel AI SDK", level: "Advanced", core: true, color: "#ffffff", icon: <SiVercel size={14} /> },
        { name: "Gemini 1.5 Flash", level: "Advanced", core: true, color: "#8E75FF", icon: <SiGoogle size={14} /> },
        { name: "Pinecone Vector DB", level: "Advanced", core: true, color: "#00F0FF", icon: <Database size={14} /> },
        { name: "Embeddings RAG", level: "Advanced", core: true, color: "#00FFB3", icon: <Cpu size={14} /> },
        { name: "Langfuse Tracing", level: "Intermediate", color: "#FF9900", icon: <Bot size={14} /> },
      ],
    },
    {
      id: "devops",
      title: "Database & DevOps Infrastructure",
      icon: <Database size={15} className="text-primary" />,
      skills: [
        { name: "PostgreSQL", level: "Advanced", core: true, color: "#4169E1", icon: <SiPostgresql size={14} /> },
        { name: "SQLite", level: "Advanced", color: "#003B57", icon: <SiSqlite size={14} /> },
        { name: "Docker", level: "Intermediate", color: "#2496ED", icon: <SiDocker size={14} /> },
        { name: "Vercel Serverless", level: "Expert", core: true, color: "#ffffff", icon: <SiVercel size={14} /> },
        { name: "Git & GitHub", level: "Expert", core: true, color: "#F05032", icon: <SiGit size={14} /> },
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
      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                playClickSound();
                setActiveFilter(tab.id);
              }}
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

      {/* Grid */}
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
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono border transition-all duration-200 group cursor-default ${
                      skill.core
                        ? "bg-primary/15 text-primary border-primary/40 font-bold hover:shadow-md hover:shadow-primary/20"
                        : "bg-muted text-card-foreground border-border hover:border-primary/40"
                    }`}
                  >
                    <span className="shrink-0 transition-transform group-hover:scale-110" style={{ color: skill.color }}>
                      {skill.icon}
                    </span>
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
