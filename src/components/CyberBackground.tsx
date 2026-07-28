"use client";

import { useEffect, useRef } from "react";

interface BinaryParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  fontSize: number;
  alpha: number;
}

export default function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Dynamic Binary Nodes (0s and 1s)
    const particleCount = 65;
    const particles: BinaryParticle[] = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      char: Math.random() > 0.5 ? "1" : "0",
      fontSize: Math.floor(Math.random() * 4) + 11, // 11px to 14px
      alpha: Math.random() * 0.5 + 0.35,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render & Update Binary Particles
      particles.forEach((p) => {
        // Occasionally flip 0 <-> 1 (digital code stream simulation)
        if (Math.random() < 0.015) {
          p.char = p.char === "1" ? "0" : "1";
        }

        // Mouse Repulsion & Magnetic Interaction
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * force * 3;
          p.y += Math.sin(angle) * force * 3;
        }

        // Velocity motion
        p.x += p.vx;
        p.y += p.vy;

        // Wrap boundaries
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Draw Binary Character
        ctx.font = `bold ${p.fontSize}px var(--font-geist-mono), monospace`;
        ctx.fillStyle = `rgba(0, 255, 179, ${p.alpha})`;
        ctx.shadowColor = "#00ffb3";
        ctx.shadowBlur = 8;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.char, p.x, p.y);
      });

      // Draw Constellation Lines Between Nearby Binary Nodes
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.strokeStyle = `rgba(0, 255, 179, ${0.28 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.shadowColor = "#00ffb3";
            ctx.shadowBlur = 3;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw Constellation Lines to Mouse Cursor
      particles.forEach((p) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          ctx.strokeStyle = `rgba(0, 255, 179, ${0.45 * (1 - dist / mouse.radius)})`;
          ctx.lineWidth = 1.2;
          ctx.shadowColor = "#00ffb3";
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-80"
    />
  );
}
