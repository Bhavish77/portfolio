"use client";

import React from "react";
import { Mail, Download, Github, Linkedin, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { playClickSound } from "@/utils/audio";

export default function ContactWidget() {
  return (
    <div className="w-full rounded-2xl bg-card border border-border p-5 space-y-4 shadow-sm text-left my-2 font-mono">
      {/* Availability Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold text-foreground tracking-tight">
            STATUS: <span className="text-emerald-700 dark:text-emerald-400 font-extrabold">OPEN FOR FULL-STACK &amp; AI ROLES</span>
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground px-2 py-0.5 rounded-full bg-muted border border-border w-fit">
          ⚡ Immediate Availability
        </span>
      </div>

      {/* Main Pitch */}
      <p className="text-xs text-muted-foreground leading-relaxed">
        I&apos;m actively seeking Full-Stack &amp; AI Systems Engineering roles! Whether you want to discuss my vision-agentic testing pipeline, BrowserStack competitor device farm, or full-stack SaaS architectures—let&apos;s connect.
      </p>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        {/* 1. Download Resume PDF */}
        <a
          href="/bhavish_resume.pdf"
          download="Bhavish_Resume.pdf"
          onClick={() => playClickSound()}
          className="w-full"
        >
          <Button
            variant="default"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs rounded-xl py-2.5 flex items-center justify-center gap-2 shadow-md shadow-primary/20 transition-all"
          >
            <Download size={14} />
            <span>Download Resume (PDF)</span>
          </Button>
        </a>

        {/* 2. Direct Email */}
        <a
          href="mailto:bhavishmayyar77@gmail.com"
          onClick={() => playClickSound()}
          className="w-full"
        >
          <Button
            variant="outline"
            className="w-full bg-muted/50 hover:bg-primary/20 border-border hover:border-primary text-foreground font-semibold text-xs rounded-xl py-2.5 flex items-center justify-center gap-2 transition-all"
          >
            <Mail size={14} className="text-primary" />
            <span>bhavishmayyar77@gmail.com</span>
          </Button>
        </a>

        {/* 3. LinkedIn Profile */}
        <a
          href="https://www.linkedin.com/in/bhavish-mayyar-b19618217/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playClickSound()}
          className="w-full"
        >
          <Button
            variant="outline"
            className="w-full bg-muted/50 hover:bg-primary/20 border-border hover:border-primary text-foreground font-semibold text-xs rounded-xl py-2.5 flex items-center justify-center gap-2 transition-all"
          >
            <Linkedin size={14} className="text-primary" />
            <span>LinkedIn Profile</span>
            <ExternalLink size={11} className="opacity-40 ml-auto" />
          </Button>
        </a>

        {/* 4. GitHub Profile */}
        <a
          href="https://github.com/Bhavish77"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playClickSound()}
          className="w-full"
        >
          <Button
            variant="outline"
            className="w-full bg-muted/50 hover:bg-primary/20 border-border hover:border-primary text-foreground font-semibold text-xs rounded-xl py-2.5 flex items-center justify-center gap-2 transition-all"
          >
            <Github size={14} className="text-primary" />
            <span>GitHub (@Bhavish77)</span>
            <ExternalLink size={11} className="opacity-40 ml-auto" />
          </Button>
        </a>

        {/* 5. Resonance Live SaaS */}
        <a
          href="https://resonance-kappa-seven.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playClickSound()}
          className="w-full sm:col-span-2"
        >
          <Button
            variant="outline"
            className="w-full bg-muted/50 hover:bg-primary/20 border-border hover:border-primary text-foreground font-semibold text-xs rounded-xl py-2.5 flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles size={14} className="text-primary" />
            <span>Resonance AI Voice SaaS (Live Demo)</span>
            <ExternalLink size={11} className="opacity-40 ml-auto" />
          </Button>
        </a>
      </div>

      {/* Quick Location & Response Time Footer */}
      <div className="pt-2 border-t border-border flex items-center justify-between text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <CheckCircle2 size={12} className="text-emerald-700 dark:text-emerald-400" />
          <span>Typically responds within &lt; 2 hours</span>
        </span>
        <span className="font-bold text-foreground">India (IST / UTC+5:30)</span>
      </div>
    </div>
  );
}
