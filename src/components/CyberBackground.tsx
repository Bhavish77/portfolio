"use client";

import { useEffect, useRef } from "react";

interface BinaryParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  fontSize: number;
  alpha: number;
  orbitOffset: number; // Stable angle offset around cursor
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
    let orbitAngle = 0;

    const isMobile = width < 768;

    const mouse = {
      x: -1000,
      y: -1000,
      radius: isMobile ? 120 : 160,
      orbitRadius: isMobile ? 40 : 52,
      maxCapacity: isMobile ? 15 : 30,
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

    // Optimized Particle Count: 22 on Mobile (<768px) for 60fps, 65 on Desktop
    const particleCount = isMobile ? 22 : 65;
    const lineDistance = isMobile ? 95 : 125;

    const particles: BinaryParticle[] = Array.from({ length: particleCount }).map((_, idx) => ({
      id: idx,
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      char: Math.random() > 0.5 ? "1" : "0",
      fontSize: Math.floor(Math.random() * 4) + 11, // 11px to 14px
      alpha: Math.random() * 0.5 + 0.35,
      orbitOffset: (idx / particleCount) * Math.PI * 2, // Fixed unique angle slot
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      orbitAngle += 0.015; // Smooth slow ring rotation

      // Accurately detect Light Mode class on theme container
      const isLightMode = Boolean(document.querySelector(".theme-matrix-light"));
      const isDark = !isLightMode;

      // Dark Mode = Bright Neon (0, 255, 179) / Light Mode = High-Contrast Dark Teal (15, 118, 110)
      const rgbColor = isDark ? "0, 255, 179" : "15, 118, 110";
      const shadowColor = isDark ? "#00ffb3" : "#0f766e";

      // Identify nearby nodes capped at maxCapacity
      const nearbyNodes = particles
        .map((p) => {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          return { p, dist };
        })
        .filter((item) => item.dist < mouse.radius)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, mouse.maxCapacity)
        .map((item) => item.p);

      const nearbySet = new Set(nearbyNodes.map((p) => p.id));

      // Draw dashed orbital ring around cursor when nearby
      if (mouse.x > 0 && mouse.y > 0 && nearbyNodes.length > 0) {
        ctx.strokeStyle = `rgba(${rgbColor}, ${isDark ? 0.35 : 0.75})`;
        ctx.lineWidth = isDark ? 1.2 : 1.6;
        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = isDark ? 8 : 4;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.orbitRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]); // Reset line dash
      }

      // Render & Update Binary Particles
      particles.forEach((p) => {
        // Occasionally flip 0 <-> 1 (digital code stream simulation)
        if (Math.random() < 0.015) {
          p.char = p.char === "1" ? "0" : "1";
        }

        const isNearMouse = nearbySet.has(p.id);

        if (isNearMouse) {
          // Calculate stable circular target position around mouse
          const angle = orbitAngle + p.orbitOffset;
          const targetX = mouse.x + mouse.orbitRadius * Math.cos(angle);
          const targetY = mouse.y + mouse.orbitRadius * Math.sin(angle);

          // Smooth silky interpolation towards orbit position
          p.x += (targetX - p.x) * 0.07;
          p.y += (targetY - p.y) * 0.07;
        } else {
          // Free floating velocity motion
          p.x += p.vx;
          p.y += p.vy;
        }

        // Wrap boundaries
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Draw Binary Character (High contrast dark teal in Light Mode)
        ctx.font = `bold ${p.fontSize}px var(--font-geist-mono), monospace`;
        ctx.fillStyle = `rgba(${rgbColor}, ${isNearMouse ? 0.95 : (isDark ? p.alpha : Math.min(0.9, p.alpha + 0.35))})`;
        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = isNearMouse ? (isDark ? 12 : 4) : (isDark ? 6 : 2);
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

          if (dist < lineDistance) {
            const lineOpacity = isDark
              ? 0.28 * (1 - dist / lineDistance)
              : 0.55 * (1 - dist / lineDistance);
            ctx.strokeStyle = `rgba(${rgbColor}, ${lineOpacity})`;
            ctx.lineWidth = isDark ? 0.8 : 1.2;
            ctx.shadowColor = shadowColor;
            ctx.shadowBlur = isDark ? 3 : 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw Constellation Lines to Mouse Cursor
      nearbyNodes.forEach((p) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const rayOpacity = isDark
            ? 0.4 * (1 - dist / mouse.radius)
            : 0.7 * (1 - dist / mouse.radius);
          ctx.strokeStyle = `rgba(${rgbColor}, ${rayOpacity})`;
          ctx.lineWidth = isDark ? 1.0 : 1.4;
          ctx.shadowColor = shadowColor;
          ctx.shadowBlur = isDark ? 6 : 3;
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
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
    />
  );
}
