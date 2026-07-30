"use client";

import React from "react";
import { GraduationCap, Award, Calendar, CheckCircle2 } from "lucide-react";
import { BHAVISH_EDUCATION } from "@/data/digitalCloneKnowledge";

export default function EducationWidget() {
  return (
    <div className="w-full rounded-2xl bg-card border border-border p-4 sm:p-5 space-y-3 shadow-sm text-left my-2 font-mono">
      {/* Top Header Line */}
      <div className="flex items-center justify-between pb-2.5 border-b border-border">
        <div className="flex items-center gap-2">
          <GraduationCap size={16} className="text-primary" />
          <span className="text-xs font-bold text-foreground tracking-wider uppercase">
            ACADEMIC EDUCATION
          </span>
        </div>
        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold whitespace-nowrap flex items-center gap-1">
          <Calendar size={10} />
          Class of {BHAVISH_EDUCATION.year}
        </span>
      </div>

      {/* Main Degree Info */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm sm:text-base font-extrabold text-foreground tracking-tight">
            {BHAVISH_EDUCATION.degree}
          </h3>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400">
            Graduated
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed pt-1">
          Advanced computer science curriculum focused on distributed systems, algorithm optimization, software engineering patterns, and artificial intelligence.
        </p>
      </div>

      {/* Key Academic Highlights */}
      <div className="pt-2 border-t border-border/50 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 size={12} className="text-primary shrink-0" />
          <span>Core Systems &amp; Data Structures</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 size={12} className="text-primary shrink-0" />
          <span>Software Architecture &amp; Design</span>
        </div>
      </div>
    </div>
  );
}
