"use client";

import { motion } from "motion/react";
import { Calendar, ChevronRight, MapPin, Trophy } from "lucide-react";
import { useState } from "react";
import { playClickSound } from "@/utils/audio";
import { BHAVISH_EXPERIENCE, BHAVISH_EDUCATION } from "@/data/digitalCloneKnowledge";

export default function WorkExperienceWidget() {
  const [expandedId, setExpandedId] = useState<string>("0");

  return (
    <div className="w-full my-2 space-y-3 text-left font-mono">
      {/* Education Header Badge */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border text-xs">
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold">🎓 Education:</span>
          <span className="text-card-foreground font-semibold">{BHAVISH_EDUCATION.degree}</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold whitespace-nowrap">
          Class of {BHAVISH_EDUCATION.year}
        </span>
      </div>

      {/* Experience Timeline */}
      <div className="relative border-l-2 border-border ml-2.5 pl-4 sm:pl-5 space-y-4 my-1">
        {BHAVISH_EXPERIENCE.map((item, idx) => {
          const isExpanded = expandedId === String(idx);
          return (
            <motion.div
              key={item.company + idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative group cursor-pointer"
              onClick={() => {
                playClickSound();
                setExpandedId(isExpanded ? "" : String(idx));
              }}
            >
              {/* Glowing Node Dot */}
              <span
                className={`absolute -left-[23px] sm:-left-[27px] top-3.5 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
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
                <div className="space-y-1.5">
                  {/* Top Line: Role Title + Badge + Chevron */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-card-foreground">
                        {item.role}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/15 border border-primary/30 text-primary font-bold whitespace-nowrap">
                        {item.badge}
                      </span>
                      {item.award && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/40 text-amber-800 dark:text-amber-400 flex items-center gap-1 whitespace-nowrap">
                          <Trophy size={10} className="text-amber-600 dark:text-amber-400" />
                          {item.award.replace("🏆 ", "")}
                        </span>
                      )}
                    </div>

                    <ChevronRight
                      size={16}
                      className={`text-primary shrink-0 transition-transform duration-300 ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                    />
                  </div>

                  {/* Metadata Row: Company + Location + Date */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-muted-foreground pt-0.5">
                    <span className="font-bold text-foreground whitespace-nowrap">{item.company}</span>
                    <span className="text-border hidden sm:inline">•</span>
                    <span className="flex items-center gap-1 text-muted-foreground whitespace-nowrap">
                      <MapPin size={11} className="text-primary shrink-0" />
                      {item.location}
                    </span>
                    <span className="text-border hidden sm:inline">•</span>
                    <span className="flex items-center gap-1 text-muted-foreground whitespace-nowrap sm:ml-auto">
                      <Calendar size={11} className="text-primary shrink-0" />
                      {item.period}
                    </span>
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
