"use client";

import { useEffect, useRef, useState } from "react";

function reduced(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

/* -------------------------------------------------------------------------- */
/*  Confetti – leichter Canvas-Burst beim Abschluss                            */
/* -------------------------------------------------------------------------- */

export function Confetti({ run }: { run: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!run || reduced()) return;
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    resize();

    const colors = ["#22c55e", "#86efac", "#fcd34d", "#16a34a", "#bbf7d0", "#f59e0b"];
    const parts = Array.from({ length: 150 }, () => ({
      x: (window.innerWidth / 2) * dpr,
      y: window.innerHeight * 0.32 * dpr,
      vx: (Math.random() - 0.5) * 18 * dpr,
      vy: (Math.random() * -13 - 4) * dpr,
      g: (Math.random() * 0.3 + 0.32) * dpr,
      size: (Math.random() * 6 + 4) * dpr,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.35,
      color: colors[(Math.random() * colors.length) | 0],
    }));

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = now - start;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const alpha = Math.max(0, 1 - t / 2800);
      for (const p of parts) {
        p.vy += p.g;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
      if (t < 2800) raf = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [run]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] h-full w-full"
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  Scroll-Reveal                                                              */
/* -------------------------------------------------------------------------- */

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  GaugeRing – animierter Kreisfortschritt                                    */
/* -------------------------------------------------------------------------- */

export function GaugeRing({
  pct,
  size = 132,
  children,
}: {
  pct: number;
  size?: number;
  children?: React.ReactNode;
}) {
  const r = 56;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.max(0, Math.min(pct, 1)));
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 132 132" className="h-full w-full -rotate-90">
        <circle cx="66" cy="66" r={r} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="10" />
        <circle
          cx="66"
          cy="66"
          r={r}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)" }}
        />
        <defs>
          <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="55%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#fcd34d" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  HeroArt – Premium-SVG-Illustration für den Intro-Screen                    */
/* -------------------------------------------------------------------------- */

export function HeroArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 280" className={className} fill="none" aria-hidden>
      <defs>
        <linearGradient id="haHouse" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="haLeaf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bbf7d0" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
        <linearGradient id="haGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <radialGradient id="haGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Glow */}
      <ellipse cx="160" cy="150" rx="130" ry="120" fill="url(#haGlow)" />

      {/* Orbit-Ring */}
      <g className="fx-spin-slow" style={{ transformOrigin: "160px 150px" }}>
        <circle cx="160" cy="150" r="104" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" strokeDasharray="2 10" />
        <circle cx="160" cy="46" r="4" fill="#fcd34d" />
        <circle cx="264" cy="150" r="3" fill="#86efac" />
      </g>

      {/* Zentrales Hexagon (ENOX-Mark) */}
      <g className="fx-float">
        <path d="M160 70l60 35v70l-60 35-60-35v-70l60-35Z" fill="url(#haHouse)" />
        <path d="M160 70l60 35v70l-60 35-60-35v-70l60-35Z" fill="none" stroke="rgba(255,255,255,0.25)" />
        <path
          d="M183 150c-12 12-30 12-42 2-10-8-12-23-7-35 10 0 23 3 31 10 9 7 13 15 18 23Z"
          fill="url(#haLeaf)"
          opacity="0.95"
        />
        <path d="M120 156c10-18 25-30 44-33" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Floating-Pill „bis zu 70%" */}
      <g className="fx-float" style={{ transformOrigin: "center", animationDelay: "1.2s" }}>
        <rect x="186" y="78" width="104" height="40" rx="20" fill="url(#haGold)" />
        <text x="238" y="103" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="18" fill="#1c2a22">
          70%
        </text>
        <circle cx="206" cy="98" r="9" fill="#1c2a22" opacity="0.18" />
        <path d="M202 98l3 3 5-6" stroke="#1c2a22" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Floating-Pill „€" */}
      <g className="fx-float-slow" style={{ transformOrigin: "center", animationDelay: "0.5s" }}>
        <rect x="34" y="168" width="92" height="40" rx="20" className="glass" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" />
        <text x="56" y="194" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="20" fill="#fcd34d">
          €
        </text>
        <rect x="74" y="180" width="40" height="6" rx="3" fill="rgba(255,255,255,0.35)" />
        <rect x="74" y="192" width="26" height="6" rx="3" fill="rgba(255,255,255,0.2)" />
      </g>

      {/* Sparkles */}
      <g fill="#fcd34d">
        <path className="fx-float" d="M250 40c.5 4 2 5.5 6 6-4 .5-5.5 2-6 6-.5-4-2-5.5-6-6 4-.5 5.5-2 6-6Z" />
        <path className="fx-float-slow" d="M58 96c.4 3 1.5 4 4.5 4.5-3 .4-4 1.5-4.5 4.5-.4-3-1.5-4-4.5-4.5 3-.4 4-1.5 4.5-4.5Z" />
      </g>
    </svg>
  );
}
