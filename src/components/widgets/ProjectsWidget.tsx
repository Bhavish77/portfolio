"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, Lock, Star, Trophy } from "lucide-react";
import { playClickSound } from "@/utils/audio";
import { BHAVISH_PROJECTS } from "@/data/digitalCloneKnowledge";

export default function ProjectsWidget() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filterTabs = [
    { id: "all", label: "All Showcase (4)" },
    { id: "ai", label: "🤖 AI & Agents" },
    { id: "saas", label: "⚡ Live SaaS" },
    { id: "systems", label: "⚙️ Mobile & Systems" },
  ];

  const filteredProjects = BHAVISH_PROJECTS.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "ai") return p.category.includes("AI");
    if (activeFilter === "saas") return p.category.includes("SAAS");
    if (activeFilter === "systems") return p.category.includes("SYSTEMS");
    return true;
  });

  return (
    <div className="w-full my-2 space-y-3 text-left font-mono">
      {/* Category Filter Chips */}
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="p-4 rounded-xl bg-card border border-border flex flex-col justify-between space-y-3 shadow-sm hover:border-primary/50 hover:shadow-md transition-all duration-200 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-primary tracking-wider uppercase">
                    {project.category}
                  </span>
                  {project.awardBadge ? (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center gap-1 shrink-0">
                      <Trophy size={10} />
                      {project.awardBadge.replace("🏆 ", "")}
                    </span>
                  ) : (
                    <div className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded-full border border-border">
                      <Star size={11} className="text-amber-400 fill-amber-400" />
                      <span>{project.stars}</span>
                    </div>
                  )}
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-card-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h4>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted/80 text-foreground border border-border font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions: Personal SaaS vs Proprietary Enterprise Code */}
                <div className="flex items-center gap-2 pt-1 border-t border-border/50">
                  {project.isProprietary ? (
                    <div className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/50 text-muted-foreground border border-border text-[11px] font-mono font-medium">
                      <Lock size={12} className="text-primary" />
                      <span>Proprietary Startup Code</span>
                    </div>
                  ) : (
                    <>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={playClickSound}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-primary/20 text-foreground hover:text-primary border border-border text-xs font-semibold transition-colors"
                        >
                          <Github size={13} />
                          <span>GitHub</span>
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={playClickSound}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground border border-primary text-xs font-bold shadow-sm transition-colors"
                        >
                          <ExternalLink size={13} />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
