"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, Cloud, Cpu, Database, Layout, Server, Zap } from "lucide-react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiPython,
  SiFastapi,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiGoogle,
  SiElectron,
  SiMongodb,
} from "react-icons/si";
import { playClickSound } from "@/utils/audio";

interface SkillItem {
  name: string;
  level?: string;
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
      title: "Frontend & Desktop Engineering",
      icon: <Layout size={15} className="text-primary" />,
      skills: [
        { name: "React 19", core: true, color: "#61DAFB", icon: <SiReact size={14} /> },
        { name: "Electron.js", core: true, color: "#47ABE8", icon: <SiElectron size={14} /> },
        { name: "TypeScript", core: true, color: "#3178C6", icon: <SiTypescript size={14} /> },
        { name: "MobX State", core: true, color: "#FF9955", icon: <Zap size={14} /> },
        { name: "Next.js 15", core: true, color: "#ffffff", icon: <SiNextdotjs size={14} /> },
        { name: "Tailwind CSS v4", core: true, color: "#06B6D4", icon: <SiTailwindcss size={14} /> },
      ],
    },
    {
      id: "backend",
      title: "Backend & Streaming Systems",
      icon: <Server size={15} className="text-primary" />,
      skills: [
        { name: "Python", core: true, color: "#3776AB", icon: <SiPython size={14} /> },
        { name: "FastAPI", core: true, color: "#009688", icon: <SiFastapi size={14} /> },
        { name: "WebSockets", core: true, color: "#FF6C37", icon: <Zap size={14} /> },
        { name: "SSE (Server-Sent Events)", core: true, color: "#00FFB3", icon: <Zap size={14} /> },
        { name: "gRPC Protocols", core: true, color: "#4285F4", icon: <Server size={14} /> },
        { name: "ADB & Android APIs", core: true, color: "#3DDC84", icon: <Cpu size={14} /> },
      ],
    },
    {
      id: "ai",
      title: "AI Agents & Testing Automation",
      icon: <Cpu size={15} className="text-primary" />,
      skills: [
        { name: "Claude Computer Use API", core: true, color: "#D97706", icon: <Bot size={14} /> },
        { name: "Playwright Automation", core: true, color: "#2EAD33", icon: <Zap size={14} /> },
        { name: "Appium & Maestro", core: true, color: "#E040FB", icon: <Bot size={14} /> },
        { name: "Gemini 3.5 Flash", core: true, color: "#8E75FF", icon: <SiGoogle size={14} /> },
        { name: "LangChain / LangGraph", core: true, color: "#FF9900", icon: <Bot size={14} /> },
      ],
    },
    {
      id: "devops",
      title: "DevOps, Cloud & Storage",
      icon: <Database size={15} className="text-primary" />,
      skills: [
        { name: "Docker", core: true, color: "#2496ED", icon: <SiDocker size={14} /> },
        { name: "PostgreSQL", core: true, color: "#4169E1", icon: <SiPostgresql size={14} /> },
        { name: "MongoDB", core: true, color: "#47A248", icon: <SiMongodb size={14} /> },
        { name: "Amazon S3", core: true, color: "#FF9900", icon: <Cloud size={14} /> },
        { name: "Modal Serverless GPUs", core: true, color: "#00FFB3", icon: <Server size={14} /> },
        { name: "GCP (Nginx, SSL)", core: true, color: "#4285F4", icon: <SiGoogle size={14} /> },
      ],
    },
  ];

  const filterTabs = [
    { id: "all", label: "All Stack" },
    { id: "ai", label: "🤖 AI & Automation" },
    { id: "frontend", label: "💻 Desktop & Web" },
    { id: "backend", label: "⚙️ Backend & Streaming" },
    { id: "devops", label: "☁️ Cloud & DevOps" },
  ];

  const filteredCategories = categories.filter((cat) => {
    if (activeFilter === "all") return true;
    return activeFilter === cat.id;
  });

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
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono border transition-all duration-200 group cursor-default bg-primary/15 text-primary border-primary/40 font-bold hover:shadow-md hover:shadow-primary/20"
                  >
                    <span className="shrink-0 transition-transform group-hover:scale-110" style={{ color: skill.color }}>
                      {skill.icon}
                    </span>
                    {skill.name}
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
