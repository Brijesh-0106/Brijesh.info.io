"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

type ExpItem = {
  role: string;
  company: string;
  period: string;
  current: boolean;
  website?: string;
  linkedin?: string;
  description: string;
  bullets: string[];
  stack: string[];
};

const EXPERIENCE: ExpItem[] = [
  {
    role: "Software Engineer",
    company: "TCS",
    period: "Nov 2024 – Present",
    current: true,
    website: "https://jsparkAI.com",
    linkedin: "https://linkedin.com/company/jspark-ai",
    description:
      "Working as a full-stack developer building scalable web applications and backend systems.",
    bullets: [
      "Built a multi-role CRM system with RBAC, enabling structured workflows.",
      "Built a weather forecast platform using IMD datasets for real-time data delivery.",
      "Contributing to end-to-end feature development across frontend and backend.",
    ],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    role: "SDE Intern",
    company: "Jspark AI",
    period: "Jan 2024 – Nov 2024",
    current: true,
    website: "https://jsparkAI.com",
    linkedin: "https://linkedin.com/company/jspark-ai",
    description:
      "Working as a full-stack developer building scalable web applications and backend systems.",
    bullets: [
      "Built a multi-role CRM system with RBAC, enabling structured workflows.",
      "Built a weather forecast platform using IMD datasets for real-time data delivery.",
      "Contributing to end-to-end feature development across frontend and backend.",
    ],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    role: "Student",
    company: "GTU",
    period: "2020 – 2024",
    current: false,
    website: "https://gtu.ac.in",
    linkedin: "https://linkedin.com/company/jspark-ai",
    description:
      "Working as a full-stack developer building scalable web applications and backend systems.",
    bullets: [
      "Built a multi-role CRM system with RBAC, enabling structured workflows.",
      "Built a weather forecast platform using IMD datasets for real-time data delivery.",
      "Contributing to end-to-end feature development across frontend and backend.",
    ],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Docker"],
  },
];

function WebIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function ExperienceCard({ exp, progress, index, total }: { exp: ExpItem; progress: any; index: number; total: number }) {
  // Determine strictly increasing points between 0 and 1 for WAAPI compatibility
  const step = 1 / total;
  const start = index * step;
  const end = (index + 1) * step;
  const margin = step * 0.2;

  const p1 = index === 0 ? 0 : start;
  const p2 = index === 0 ? 0.0001 : start + margin;
  const p3 = index === total - 1 ? 0.9999 : end - margin;
  const p4 = index === total - 1 ? 1 : end;

  const opacityValues = index === 0 ? [1, 1, 1, 0] : index === total - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0];
  const yValues = index === 0 ? [0, 0, 0, -50] : index === total - 1 ? [50, 0, 0, 0] : [50, 0, 0, -50];
  const scaleValues = index === 0 ? [1, 1, 1, 0.9] : index === total - 1 ? [0.9, 1, 1, 1] : [0.9, 1, 1, 0.9];

  // Fade in, hold, fade out
  const opacity = useTransform(
    progress,
    [p1, p2, p3, p4],
    opacityValues
  );

  // Slide up from bottom, then slide out to top
  const y = useTransform(
    progress,
    [p1, p2, p3, p4],
    yValues
  );

  const scale = useTransform(
    progress,
    [p1, p2, p3, p4],
    scaleValues
  );

  // Prevent pointer events when invisible to allow clicking links
  const pointerEvents = useTransform(opacity, (o) => (o > 0.5 ? "auto" : "none"));

  return (
    <motion.div
      style={{ opacity, y, scale, pointerEvents }}
      className="absolute inset-0 flex flex-col justify-center items-center w-full"
    >
      <div className="w-full max-w-3xl bg-[var(--color-glass)] backdrop-blur-xl border border-white/10 rounded-2xl p-5 md:p-8 shadow-2xl relative overflow-hidden group">
        
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl" />
        
        <div className="relative z-10">
          {/* Role + period row */}
          <div className="flex flex-col gap-2 mb-4 md:mb-6">
            {/* Top row: role title + period pill */}
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <h3 className="text-xl md:text-2xl font-bold text-white font-heading leading-tight">{exp.role}</h3>
              <span className="text-violet-400 text-xs md:text-sm font-semibold font-mono whitespace-nowrap bg-violet-500/10 px-2.5 py-1 rounded-full border border-violet-500/20 shrink-0">
                {exp.period}
              </span>
            </div>
            {/* Company + links + badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-cyan-400 font-semibold font-mono text-sm">{exp.company}</span>
              {exp.website && (
                <a href={exp.website} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  <WebIcon />
                </a>
              )}
              {exp.linkedin && (
                <a href={exp.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-500 transition-colors">
                  <LinkedInIcon />
                </a>
              )}
              {exp.current && (
                <span className="text-[10px] font-bold tracking-widest font-mono text-cyan-400 bg-cyan-400/10 border border-cyan-400/30 rounded px-2 py-0.5">
                  CURRENT
                </span>
              )}
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed mb-4 md:mb-6 font-sans">
            {exp.description}
          </p>

          <ul className="flex flex-col gap-2.5 mb-4 md:mb-6">
            {exp.bullets.map((b, i) => (
              <li key={i} className="flex gap-2.5 items-start">
                <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                </div>
                <span className="text-slate-300 text-xs md:text-sm leading-relaxed font-sans">{b}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {exp.stack.map((s) => (
              <span key={s} className="text-[11px] md:text-xs font-mono text-violet-300 bg-violet-500/10 border border-violet-500/20 rounded px-2 md:px-2.5 py-1">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate height based on number of items to ensure smooth scrolling
  const containerHeight = `${EXPERIENCE.length * 100}vh`;

  return (
    <div className="relative w-full" style={{ height: containerHeight }} ref={containerRef}>
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-4 md:px-8 overflow-hidden">
        
        {/* Section heading */}
        <div className="absolute top-14 md:top-20 w-full flex justify-center z-20">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-lg p-1.5 md:p-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              </svg>
            </div>
            <h2 className="text-white text-2xl md:text-5xl font-extrabold font-heading tracking-tight">
              Experience
            </h2>
          </div>
        </div>

        {/* Timeline progress bar — desktop only */}
        <div className="absolute left-4 md:left-12 top-1/4 bottom-1/4 w-1 bg-slate-800 rounded-full overflow-hidden z-20 hidden md:block">
          <motion.div 
            className="w-full bg-gradient-to-b from-cyan-400 to-violet-500 origin-top"
            style={{ scaleY: smoothProgress }}
          />
        </div>

        {/* Cards area — adaptive height */}
        <div className="relative w-full max-w-5xl mx-auto h-[72vh] md:h-[580px] mt-6 md:mt-0">
          {EXPERIENCE.map((exp, i) => (
            <ExperienceCard 
              key={i} 
              exp={exp} 
              index={i} 
              total={EXPERIENCE.length} 
              progress={smoothProgress} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
