"use client";

import { motion } from "motion/react";
import { Cpu, Database, Layout, Server, Wrench } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: { name: string; level: string; core?: boolean }[];
}

export default function TechStackWidget() {
  const categories: SkillCategory[] = [
    {
      title: "Frontend & UI Engineering",
      icon: <Layout size={16} className="text-primary" />,
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
      title: "Backend & Systems Architecture",
      icon: <Server size={16} className="text-primary" />,
      skills: [
        { name: "Python", level: "Advanced", core: true },
        { name: "FastAPI", level: "Advanced", core: true },
        { name: "Node.js", level: "Intermediate" },
        { name: "RESTful APIs", level: "Expert", core: true },
        { name: "WebSockets", level: "Advanced" },
      ],
    },
    {
      title: "AI Engineering & Vector Databases",
      icon: <Cpu size={16} className="text-primary" />,
      skills: [
        { name: "Vercel AI SDK", level: "Advanced", core: true },
        { name: "Gemini 1.5 Flash", level: "Advanced", core: true },
        { name: "Pinecone Vector DB", level: "Advanced", core: true },
        { name: "Embeddings RAG", level: "Advanced", core: true },
        { name: "Langfuse Tracing", level: "Intermediate" },
      ],
    },
    {
      title: "Database & DevOps Infrastructure",
      icon: <Database size={16} className="text-primary" />,
      skills: [
        { name: "PostgreSQL", level: "Advanced", core: true },
        { name: "SQLite", level: "Advanced" },
        { name: "Docker", level: "Intermediate" },
        { name: "Vercel Serverless", level: "Expert", core: true },
        { name: "Git & GitHub", level: "Expert", core: true },
      ],
    },
  ];

  return (
    <div className="w-full my-3 p-4 sm:p-6 rounded-2xl bg-card border border-border space-y-4 text-left font-mono shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
            <Wrench size={14} />
          </div>
          <span className="text-xs font-bold text-foreground tracking-wide uppercase">
            Technical Stack Architecture
          </span>
        </div>
        <span className="text-xs text-muted-foreground font-mono">20 Total Tools</span>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="p-4 rounded-xl bg-muted/40 border border-border space-y-3"
          >
            <div className="flex items-center gap-2 border-b border-border pb-2">
              {cat.icon}
              <h4 className="text-xs font-bold text-card-foreground uppercase tracking-wider font-mono">
                {cat.title}
              </h4>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((skill) => (
                <span
                  key={skill.name}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono border transition-all ${
                    skill.core
                      ? "bg-primary/15 text-primary border-primary/40 font-bold"
                      : "bg-background text-card-foreground border-border hover:border-primary/40"
                  }`}
                >
                  {skill.core && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
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
      </div>
    </div>
  );
}
