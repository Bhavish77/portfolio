"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, Star } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  categoryKey: string;
  categoryLabel: string;
  description: string;
  tags: string[];
  stars: number;
  githubUrl: string;
  liveUrl: string;
}

export default function ProjectsWidget() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const projects: ProjectItem[] = [
    {
      id: "1",
      title: "Resonance Chat Platform",
      categoryKey: "fullstack",
      categoryLabel: "Full-Stack / AI Real-Time",
      description: "A real-time workspace collaboration suite featuring AI assistance, voice channels, and instant messaging.",
      tags: ["Next.js 15", "FastAPI", "WebSockets", "SQLite", "Tailwind CSS"],
      stars: 128,
      githubUrl: "https://github.com",
      liveUrl: "#",
    },
    {
      id: "2",
      title: "Quantitative Trading Engine",
      categoryKey: "systems",
      categoryLabel: "Python / Data Science",
      description: "High-frequency backtester processing historical market data streams with real-time performance indicator charting.",
      tags: ["Python", "Pandas", "WebSockets", "FastAPI"],
      stars: 84,
      githubUrl: "https://github.com",
      liveUrl: "#",
    },
    {
      id: "3",
      title: "Visual CSS Canvas Builder",
      categoryKey: "frontend",
      categoryLabel: "Frontend UI / Tooling",
      description: "An interactive grid layout generator supporting drag-and-drop elements and zero-overhead CSS code generation.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Canvas API"],
      stars: 210,
      githubUrl: "https://github.com",
      liveUrl: "#",
    },
    {
      id: "4",
      title: "AI Semantic Document Search",
      categoryKey: "ai",
      categoryLabel: "AI Engineering / RAG",
      description: "Vector search platform using Gemini embedding pipelines and Pinecone indexes for unstructured Markdown documentation.",
      tags: ["Vercel AI SDK", "Gemini 1.5", "Pinecone", "TypeScript"],
      stars: 96,
      githubUrl: "https://github.com",
      liveUrl: "#",
    },
  ];

  const filterTabs = [
    { id: "all", label: "All Projects (4)" },
    { id: "ai", label: "🤖 AI & RAG" },
    { id: "fullstack", label: "🚀 Full-Stack" },
    { id: "frontend", label: "🎨 Frontend UI" },
    { id: "systems", label: "⚡ Systems & Python" },
  ];

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.categoryKey === activeFilter);

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

      {/* Un-boxed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="group relative p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider block mb-0.5">
                      {project.categoryLabel}
                    </span>
                    <h4 className="text-sm font-bold text-card-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-bold shrink-0">
                    <Star size={10} className="fill-amber-500 text-amber-500" />
                    {project.stars}
                  </div>
                </div>

                <p className="text-xs text-card-foreground/80 leading-relaxed mb-3">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-foreground border border-border font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-2 pt-2 border-t border-border/60">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-muted hover:bg-muted/80 border border-border hover:border-primary text-xs font-mono font-bold text-foreground transition-all"
                  >
                    <Github size={12} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/30 text-xs font-mono font-bold text-primary transition-all"
                  >
                    <ExternalLink size={12} />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
