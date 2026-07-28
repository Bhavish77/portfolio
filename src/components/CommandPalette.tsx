"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Briefcase, Rocket, Wrench, Palette, RefreshCw, Mail, Download, X, ArrowRight } from "lucide-react";
import { playClickSound } from "@/utils/audio";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (actionId: string) => void;
}

export default function CommandPalette({ isOpen, onClose, onSelectAction }: CommandPaletteProps) {
  const [query, setQuery] = useState("");

  const actions = [
    {
      id: "sec-experience",
      title: "Jump to Work Experience",
      category: "Navigation",
      icon: <Briefcase size={16} className="text-primary" />,
    },
    {
      id: "sec-projects",
      title: "Jump to Main Projects",
      category: "Navigation",
      icon: <Rocket size={16} className="text-primary" />,
    },
    {
      id: "sec-techstack",
      title: "Jump to Tech Stack Architecture",
      category: "Navigation",
      icon: <Wrench size={16} className="text-primary" />,
    },
    {
      id: "theme-toggle",
      title: "Toggle Matrix Theme (Dark / Light)",
      category: "Appearance",
      icon: <Palette size={16} className="text-primary" />,
    },
    {
      id: "reset-chat",
      title: "Reset Conversation Stream",
      category: "System",
      icon: <RefreshCw size={16} className="text-primary" />,
    },
    {
      id: "download-resume",
      title: "Download Resume PDF",
      category: "Action",
      icon: <Download size={16} className="text-primary" />,
    },
    {
      id: "contact-email",
      title: "Send Email to Bhavish",
      category: "Action",
      icon: <Mail size={16} className="text-primary" />,
    },
  ];

  const filteredActions = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  // Close on Escape or click backdrop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-md font-mono">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.18 }}
          className="w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Input Box Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-muted/30">
            <Search size={18} className="text-primary shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search..."
              className="w-full bg-transparent text-card-foreground placeholder:text-muted-foreground outline-none text-sm"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Action List */}
          <div className="max-h-72 overflow-y-auto p-2 space-y-1">
            {filteredActions.length === 0 ? (
              <div className="p-4 text-center text-xs text-muted-foreground">
                No matching commands found.
              </div>
            ) : (
              filteredActions.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    playClickSound();
                    onSelectAction(item.id);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-primary/15 border border-transparent hover:border-primary/30 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted border border-border group-hover:border-primary/40">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-card-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 text-primary transition-opacity" />
                </button>
              ))
            )}
          </div>

          {/* Footer Shortcuts Info */}
          <div className="px-4 py-2 bg-muted/40 border-t border-border flex items-center justify-between text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              Press <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-foreground font-mono">ESC</kbd> to exit
            </span>
            <span className="flex items-center gap-1.5">
              Press <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-foreground font-mono">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-foreground font-mono">K</kbd> anywhere
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
