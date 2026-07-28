"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, ShieldCheck } from "lucide-react";
import { playBootSound } from "@/utils/audio";

export default function BootLoader() {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);

  const logs = [
    "> INITIALIZING_BHAVISH_OS_v1.0...",
    "> MOUNTING_DIGITAL_CLONE_KERNEL... [100%]",
    "> CONNECTING_DETERMINISTIC_INTERCEPTOR... [OK]",
    "> LOADING_VECTOR_RAG_PIPELINE... [OK]",
    "> SYSTEM_READY. ACCESS_GRANTED.",
  ];

  useEffect(() => {
    // Play boot sound
    playBootSound();

    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev < logs.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        setTimeout(() => setLoading(false), 300);
        return prev;
      });
    }, 280);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-50 bg-[#040d0a] text-[#00ffb3] font-mono flex flex-col items-center justify-center p-6 select-none"
      >
        {/* Matrix Scanlines Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

        <div className="max-w-md w-full space-y-6 relative z-10">
          {/* Logo Badge */}
          <div className="flex items-center gap-3 border-b border-[#00ffb3]/20 pb-4">
            <div className="w-10 h-10 rounded-xl bg-[#00ffb3]/10 border border-[#00ffb3]/40 flex items-center justify-center text-[#00ffb3] shadow-lg shadow-[#00ffb3]/20 animate-pulse">
              <Terminal size={22} />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight text-white flex items-center gap-2">
                Bhavish<span className="text-[#00ffb3]">.ai</span>
              </h1>
              <p className="text-xs text-[#00ffb3]/70">Hybrid AI Agent Workstation</p>
            </div>
          </div>

          {/* Terminal Code Stream */}
          <div className="space-y-2 bg-[#091f18]/80 p-4 rounded-xl border border-[#00ffb3]/20 text-xs shadow-inner">
            {logs.slice(0, step + 1).map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between"
              >
                <span>{log}</span>
                {index === logs.length - 1 && step === logs.length - 1 && (
                  <ShieldCheck size={14} className="text-[#00ffb3] animate-bounce" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#0d2a20] rounded-full h-1.5 overflow-hidden border border-[#00ffb3]/30">
            <motion.div
              className="bg-[#00ffb3] h-full shadow-[0_0_12px_#00ffb3]"
              initial={{ width: "0%" }}
              animate={{ width: `${((step + 1) / logs.length) * 100}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
