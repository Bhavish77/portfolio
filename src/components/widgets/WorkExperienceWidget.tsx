"use client";

import { motion } from "motion/react";
import { Calendar, ChevronRight, MapPin } from "lucide-react";
import { useState } from "react";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  badge: string;
  highlights: string[];
  skills: string[];
}

export default function WorkExperienceWidget() {
  const [expandedId, setExpandedId] = useState<string>("1");

  const experiences: ExperienceItem[] = [
    {
      id: "1",
      role: "Lead Full-Stack AI Engineer",
      company: "TechResonance Labs",
      location: "Remote / India",
      period: "2024 - Present",
      badge: "Current Role",
      highlights: [
        "Architected multi-agent RAG pipelines using Vercel AI SDK and Gemini 1.5 Flash, reducing chat latency by 45%.",
        "Built dynamic deterministic bypass routers in Next.js 15, enabling 0ms latency responses for core portfolio queries.",
        "Managed SQLite & PostgreSQL vector embeddings with automated chunking and cosine similarity indexing.",
      ],
      skills: ["Next.js 15", "TypeScript", "Vercel AI SDK", "Python", "FastAPI", "Pinecone"],
    },
    {
      id: "2",
      role: "Senior Software Engineer Intern",
      company: "AlphaStream Systems",
      location: "Hybrid",
      period: "2023 - 2024",
      badge: "Internship",
      highlights: [
        "Engineered RESTful microservices in FastAPI with PostgreSQL & SQLAlchemy ORM.",
        "Created glassmorphic dark-mode component libraries matching Neura.ai and Aceternity UI aesthetics.",
        "Expanded Pytest test suites achieving 94% test coverage across core API routes.",
      ],
      skills: ["Python", "PostgreSQL", "Tailwind CSS", "React", "Docker"],
    },
    {
      id: "3",
      role: "Open-Source Core Contributor",
      company: "Developer Community",
      location: "Remote",
      period: "2022 - Present",
      badge: "Community",
      highlights: [
        "Authored modular Canvas & WebGL particles plugins downloaded over 50k+ times.",
        "Maintained component documentation, triaged GitHub issues, and reviewed community PRs.",
      ],
      skills: ["JavaScript", "WebGL", "Framer Motion", "Git"],
    },
  ];

  return (
    <div className="w-full my-2 space-y-3 text-left font-mono">
      {/* Timeline List (Un-boxed, clean surface nodes) */}
      <div className="relative border-l-2 border-border ml-2.5 pl-4 sm:pl-5 space-y-4 my-1">
        {experiences.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative group cursor-pointer"
              onClick={() => setExpandedId(isExpanded ? "" : item.id)}
            >
              {/* Glowing Node Dot */}
              <span
                className={`absolute -left-[23px] sm:-left-[27px] top-2.5 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                  isExpanded
                    ? "bg-primary border-primary scale-125 shadow-md shadow-primary/60"
                    : "bg-background border-border group-hover:border-primary"
                }`}
              />

              {/* Experience Item Card */}
              <div
                className={`p-3.5 sm:p-4 rounded-xl border transition-all duration-300 ${
                  isExpanded
                    ? "bg-card border-primary/50 shadow-md"
                    : "bg-card/80 border-border hover:border-primary/30"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-card-foreground flex flex-wrap items-center gap-2">
                      {item.role}
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/15 border border-primary/30 text-primary font-bold">
                        {item.badge}
                      </span>
                    </h4>
                    <p className="text-xs text-muted-foreground font-medium mt-1 flex items-center gap-2">
                      <span className="font-semibold text-foreground">{item.company}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <MapPin size={10} />
                        {item.location}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-1 sm:mt-0">
                    <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                      <Calendar size={11} className="text-primary" />
                      {item.period}
                    </span>
                    <ChevronRight
                      size={15}
                      className={`text-primary transition-transform duration-300 ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3 pt-3 border-t border-border/60 space-y-2.5"
                  >
                    <ul className="space-y-1.5 text-xs text-card-foreground/90 list-disc pl-4 leading-relaxed">
                      {item.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.skills.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded bg-muted text-[10px] text-foreground font-mono border border-border font-semibold"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
