"use client";

import { motion } from "motion/react";
import { Briefcase, Calendar, Sparkles } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      role: "Full-Stack Developer",
      company: "TechResonance Labs",
      duration: "2024 - Present",
      description: [
        "Led the migration of legacy MVC backend endpoints to high-performance FastAPI routers, cutting API response times by 35%.",
        "Developed and maintained modular user sign-up pages and collaborative canvas dashboards using React, Next.js, and shadcn/ui.",
        "Engineered WebSocket routers to support robust real-time text sync and voice channels across active project portals.",
      ],
    },
    {
      role: "Software Engineering Intern",
      company: "AlphaStream Systems",
      duration: "2023 - 2024",
      description: [
        "Collaborated on designing robust SQLAlchemy models, Postgres indexes, and data retrieval scripts.",
        "Refactored backend test suites and expanded unit testing coverage from 60% to 92% utilizing Pytest.",
        "Authored custom dark-mode component libraries and responsive layout grids styled with Tailwind CSS.",
      ],
    },
    {
      role: "Open Source Contributor",
      company: "GitHub / Developer Community",
      duration: "2022 - Present",
      description: [
        "Published lightweight Tailwind layout utilities, UI plugins, and custom canvas drawing modules.",
        "Reviewed community pull requests, resolved routing issues in public repositories, and optimized documentation.",
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 bg-neutral-950 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-mono mb-4">
            <Sparkles size={12} />
            <span>Timeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent">
            Work Experience
          </h2>
          <div className="w-12 h-1 bg-violet-500 rounded mt-4" />
        </div>

        {/* Timeline container */}
        <div className="relative border-l border-neutral-800 ml-4 md:ml-6 pl-6 md:pl-8 space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.role}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Timeline marker */}
              <span className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-black border border-violet-500/50 group-hover:border-violet-400 group-hover:scale-125 transition-all duration-300 shadow-md shadow-violet-500/20" />

              {/* Box */}
              <div className="p-6 rounded-2xl border border-border/40 bg-neutral-900/20 hover:border-violet-500/20 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-100 group-hover:text-violet-400 transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-neutral-400 font-medium flex items-center gap-1.5 mt-1">
                      <Briefcase size={14} className="text-violet-500" />
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-violet-400 bg-violet-500/5 border border-violet-500/20 px-3 py-1 rounded-full self-start md:self-center flex items-center gap-1.5">
                    <Calendar size={12} />
                    {exp.duration}
                  </span>
                </div>

                <ul className="space-y-2.5 text-neutral-400 text-sm list-disc pl-4 leading-relaxed">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx} className="hover:text-neutral-300 transition-colors">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
