"use client";

import { useState } from "react";
import { Copy, Check, Mail, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "hello@bhavish.dev";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    
    // Trigger confetti explosion
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#8b5cf6", "#d946ef", "#6366f1"],
    });

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        {/* Section Title */}
        <div className="flex flex-col items-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-mono mb-4">
            <Sparkles size={12} />
            <span>Connect</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="w-12 h-1 bg-violet-500 rounded mt-4" />
          <p className="text-neutral-400 max-w-md mt-6">
            Looking for a new developer to join your team, want to collaborate on a project, or just say hello? Drop a line!
          </p>
        </div>

        {/* Contact Widget Card */}
        <div className="max-w-xl mx-auto p-8 rounded-3xl border border-border/40 bg-neutral-900/30 backdrop-blur-sm shadow-xl shadow-black/20 hover:border-violet-500/25 transition-all duration-300">
          <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mx-auto mb-6">
            <Mail size={32} />
          </div>

          <h3 className="text-2xl font-bold text-neutral-100 mb-2">
            Reach out via email
          </h3>
          <p className="text-sm text-neutral-400 mb-6">
            Click to copy email address & trigger a tiny celebration!
          </p>

          {/* Email Copy Box */}
          <div className="flex items-center justify-between p-3 pl-5 rounded-2xl bg-neutral-950 border border-border/60 hover:border-violet-500/40 transition-colors duration-300 group max-w-md mx-auto mb-8">
            <span className="text-neutral-300 font-mono text-sm sm:text-base select-all">
              {emailAddress}
            </span>
            <Button
              onClick={handleCopyEmail}
              size="icon"
              className="bg-violet-600 hover:bg-violet-500 text-white rounded-xl shadow-lg shadow-violet-500/25 transition-all duration-300"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
            <MessageSquare size={14} className="text-violet-500/70" />
            <span>Average response time: &lt; 24 hours</span>
          </div>
        </div>
      </div>
    </section>
  );
}
