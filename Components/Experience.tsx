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
    website: "https://tcs.com",
    linkedin: "https://linkedin.com/company/tata-consultancy-services",
    description:
      "Working as a full-stack developer building scalable web applications and backend systems.",
    bullets: [
      "Learned Angular and Spring Boot to develop core features for company projects.",
      "Spearheaded the registration module for a large-scale taxation system project for Ghana.",
      "Developed critical modules including Security Management, Configuration Management, and Workflow Management.",
    ],
    stack: ["Angular.js", "Springboot", "Java", "PostgreSQL"],
  },
  {
    role: "SDE Intern",
    company: "Learniphy",
    period: "Jan 2024 – Nov 2024",
    current: false,
    website: "https://learniphy.com",
    linkedin: "https://linkedin.com/company/learniphy",
    description:
      "Built and shipped full-stack features for an Ed-Tech LMS platform serving enterprise clients.",
    bullets: [
      "Developed an offline document XBlock to render PDFs, PPTs, Word, and Excel files within the Open edX platform.",
      "Integrated Razorpay payment gateway and Google Authentication for the PANIIT admin panel and Open edX platform.",
      "Executed end-to-end frontend and backend tasks across multiple high-impact projects.",
    ],
    stack: ["Python", "React.js", "Docker", "Open edX"],
  },
  {
    role: "B.E. in Information Technology",
    company: "GTU",
    period: "2020 – 2024",
    current: false,
    website: "https://gtu.ac.in",
    linkedin: "https://linkedin.com/school/gujarat-technological-university",
    description:
      "Completed a four-year degree in Information Technology with focus on algorithms, data structures, OS, databases, and software architecture.",
    bullets: [
      "Maintained strong academic performance throughout the program.",
      "Built several capstone projects including a full-stack web apps and a projects.",
      "Actively contributed to college tech clubs and hackathons.",
    ],
    stack: ["C", "C++", "Python", "DBMS", "OS"],
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

// ── Shared card body ───────────────────────────────────────────────────────────
function CardContent({ exp }: { exp: ExpItem }) {
  return (
    <div className="relative z-10">
      {/* Row 1: Role title */}
      <h3 className="text-base font-bold text-[#f1f0f5] font-heading leading-tight mb-2">
        {exp.role}
      </h3>

      {/* Row 2: Company + badges LEFT, period RIGHT — no wrap */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-indigo-300 font-semibold font-mono text-xs">{exp.company}</span>
          {exp.website && (
            <a href={exp.website} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
              <WebIcon />
            </a>
          )}
          {exp.linkedin && (
            <a href={exp.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-400 transition-colors">
              <LinkedInIcon />
            </a>
          )}
          {exp.current && (
            <span className="text-[10px] font-bold tracking-widest font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded px-2 py-0.5">
              CURRENT
            </span>
          )}
        </div>
        <span className="text-indigo-300 text-[11px] font-semibold font-mono whitespace-nowrap bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-400/20 shrink-0">
          {exp.period}
        </span>
      </div>

      <p className="text-[#7a7a8c] text-sm leading-relaxed mb-4 font-sans">
        {exp.description}
      </p>

      <ul className="flex flex-col gap-2.5 mb-4">
        {exp.bullets.map((b, i) => (
          <li key={i} className="flex gap-2.5 items-start">
            <div className="w-4 h-4 rounded-full bg-[#0a0a12] border border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            </div>
            <span className="text-[#7a7a8c] text-xs leading-relaxed font-sans">{b}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5">
        {exp.stack.map((s) => (
          <span key={s} className="text-[11px] font-mono text-purple-300 bg-purple-500/[0.08] border border-purple-400/[0.15] rounded px-2.5 py-1">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Section heading (shared) ───────────────────────────────────────────────────
function SectionHeading() {
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <div className="text-indigo-400 bg-indigo-400/10 border border-indigo-400/20 rounded-lg p-1.5 md:p-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        </svg>
      </div>
      <h2 className="text-white text-2xl font-bold font-heading tracking-tight">
        Experience
      </h2>
    </div>
  );
}

// ── Mobile: simple vertical timeline ──────────────────────────────────────────
// No viewport-height math. Cards stack naturally, scroll normally.
function MobileTimeline() {
  return (
    <div className="relative pl-6">
      {/* Vertical accent line */}
      <div className="absolute left-0 top-3 bottom-3 w-px bg-gradient-to-b from-indigo-500/40 via-purple-500/20 to-transparent" />

      <div className="flex flex-col gap-5">
        {EXPERIENCE.map((exp, i) => (
          <div key={i} className="relative">
            {/* Dot on the line */}
            <div className="absolute -left-6 top-5 w-2.5 h-2.5 rounded-full bg-indigo-400 border-2 border-[#08080c] shadow-[0_0_8px_rgba(129,140,248,0.5)]" />

            <div className="bg-[#0f0f17] border border-white/[0.07] rounded-2xl p-5 shadow-xl relative overflow-hidden group transition-all duration-300 hover:border-indigo-400/20">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl" />
              <CardContent exp={exp} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Desktop: animated sticky card ─────────────────────────────────────────────
function AnimatedCard({ exp, progress, index, total }: { exp: ExpItem; progress: any; index: number; total: number }) {
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

  const opacity = useTransform(progress, [p1, p2, p3, p4], opacityValues);
  const y = useTransform(progress, [p1, p2, p3, p4], yValues);
  const scale = useTransform(progress, [p1, p2, p3, p4], scaleValues);
  const pointerEvents = useTransform(opacity, (o) => (o > 0.5 ? "auto" : "none"));

  return (
    <motion.div
      style={{ opacity, y, scale, pointerEvents }}
      className="absolute inset-0 flex flex-col justify-center items-center w-full"
    >
      <div className="w-full max-w-3xl bg-[#0f0f17] backdrop-blur-xl border border-white/[0.07] rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/15 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl" />
        <CardContent exp={exp} />
      </div>
    </motion.div>
  );
}

function DesktopExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const containerHeight = `${EXPERIENCE.length * 100}vh`;

  return (
    <div className="relative w-full" style={{ height: containerHeight }} ref={containerRef}>
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-8 overflow-hidden">
        {/* Section heading */}
        <div className="absolute top-20 w-full flex justify-center z-20">
          <SectionHeading />
        </div>

        {/* Progress bar */}
        <div className="absolute left-12 top-1/4 bottom-1/4 w-1 bg-slate-800 rounded-full overflow-hidden z-20">
          <motion.div
            className="w-full bg-gradient-to-b from-cyan-400 to-violet-500 origin-top"
            style={{ scaleY: smoothProgress }}
          />
        </div>

        {/* Cards */}
        <div className="relative w-full max-w-5xl mx-auto h-[580px]">
          {EXPERIENCE.map((exp, i) => (
            <AnimatedCard
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

// ── Main export ────────────────────────────────────────────────────────────────
export default function Experience() {
  return (
    <>
      {/* ── Mobile: vertical timeline (no sticky scroll) ── */}
      <div className="md:hidden w-full px-4 mt-24">
        <div className="flex justify-center mb-8">
          <SectionHeading />
        </div>
        <MobileTimeline />
      </div>

      {/* ── Desktop: sticky scroll animation ── */}
      <div className="hidden md:block">
        <DesktopExperience />
      </div>
    </>
  );
}
