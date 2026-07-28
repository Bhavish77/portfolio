"use client";

import { motion } from "motion/react";
import { ExternalLink, Github, Rocket, Star } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  stars: number;
  githubUrl: string;
  liveUrl: string;
}

export default function ProjectsWidget() {
  const projects: ProjectItem[] = [
    {
      id: "1",
      title: "Resonance Chat Platform",
      category: "Full-Stack / AI Real-Time",
      description: "A real-time workspace collaboration suite featuring AI assistance, voice channels, and instant messaging.",
      tags: ["Next.js 15", "FastAPI", "WebSockets", "SQLite", "Tailwind CSS"],
      stars: 128,
      githubUrl: "https://github.com",
      liveUrl: "#",
    },
    {
      id: "2",
      title: "Quantitative Trading Engine",
      category: "Python / Data Science",
      description: "High-frequency backtester processing historical market data streams with real-time performance indicator charting.",
      tags: ["Python", "Pandas", "WebSockets", "FastAPI"],
      stars: 84,
      githubUrl: "https://github.com",
      liveUrl: "#",
    },
    {
      id: "3",
      title: "Visual CSS Canvas Builder",
      category: "Frontend UI / Tooling",
      description: "An interactive grid layout generator supporting drag-and-drop elements and zero-overhead CSS code generation.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Canvas API"],
      stars: 210,
      githubUrl: "https://github.com",
      liveUrl: "#",
    },
    {
      id: "4",
      title: "AI Semantic Document Search",
      category: "AI Engineering / RAG",
      description: "Vector search platform using Gemini embedding pipelines and Pinecone indexes for unstructured Markdown documentation.",
      tags: ["Vercel AI SDK", "Gemini 1.5", "Pinecone", "TypeScript"],
      stars: 96,
      githubUrl: "https://github.com",
      liveUrl: "#",
    },
  ];

  return (
    <div className="w-full my-3 p-4 sm:p-6 rounded-2xl bg-card border border-border space-y-4 text-left font-mono shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
            <Rocket size={14} />
          </div>
          <span className="text-xs font-bold text-foreground tracking-wide uppercase">
            Featured Projects Showcase
          </span>
        </div>
        <span className="text-xs text-muted-foreground font-mono">4 Repositories</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="group relative p-4 rounded-xl bg-muted/40 border border-border hover:border-primary/50 hover:bg-muted/70 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider block mb-0.5">
                    {project.category}
                  </span>
                  <h4 className="text-sm font-bold text-card-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-bold">
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
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-background text-foreground border border-border font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Tabs */}
              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-card border border-border hover:border-primary text-xs font-mono font-bold text-foreground transition-all"
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
      </div>
    </div>
  );
}
