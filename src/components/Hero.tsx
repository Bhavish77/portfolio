"use client";

import { ArrowRight, Download, Terminal } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-black overflow-hidden pt-20">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-fuchsia-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
        {/* Terminal Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/5 text-violet-400 text-xs font-mono mb-6 hover:border-violet-500/50 hover:bg-violet-500/10 transition-all duration-300">
          <Terminal size={12} />
          <span>npm run dev --open</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6">
          <span className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent block">
            Hi, I&apos;m Bhavish
          </span>
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
            Full-Stack Developer
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl mb-10 leading-relaxed">
          I build high-performance, visually stunning web applications with Next.js, React, and robust Python backends. Passionate about clean code, interactive UI, and fluid animations.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href="#projects"
            className={buttonVariants({
              className: "w-full sm:w-auto bg-violet-600 hover:bg-violet-500 text-white rounded-full px-8 py-6 text-base font-semibold group shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 hover:scale-105 transition-all duration-300 flex items-center justify-center"
            })}
          >
            View Work
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className={buttonVariants({
              variant: "outline",
              className: "w-full sm:w-auto border-neutral-800 hover:border-neutral-700 bg-neutral-900/50 hover:bg-neutral-900 hover:scale-105 text-foreground rounded-full px-8 py-6 text-base font-semibold transition-all duration-300 flex items-center justify-center"
            })}
          >
            Let&apos;s Talk
          </a>
        </div>
      </div>

      {/* Animated Beams Background */}
      <BackgroundBeams />
    </section>
  );
}
