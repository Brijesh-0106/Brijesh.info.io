"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Project = {
  name: string;
  description: string;
  longDesc: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  icon: string; // emoji or letter
  iconBg: string;
};

const PROJECTS: Project[] = [
  {
    name: "Review Scope",
    description:
      "Automated code reviews that go beyond the diff. Catch bugs and enforce standards with AI.",
    longDesc:
      "AI-powered code review tool that integrates with GitHub webhooks, uses Gemini API to analyze diffs, and posts structured review comments automatically on every PR.",
    stack: ["Hono", "Webhook", "Gemini API", "Open AI"],
    liveUrl: "https://reviewscope.app",
    githubUrl: "https://github.com/Brijesh-0106/review-scope",
    featured: true,
    icon: "RS",
    iconBg: "rgba(34,211,238,0.1)", // Cyan tint
  },
  {
    name: "Orizen Flow",
    description:
      "Automatically analyze resumes, portfolios, and GitHub to identify the strongest candidates.",
    longDesc:
      "Full-stack recruitment platform that scores candidates using AI by parsing their GitHub activity, resume content, and portfolio projects. Built with Hono and Sarvam AI.",
    stack: ["Hono", "Sarvam AI", "Next.js", "PostgreSQL"],
    liveUrl: "https://orizenflow.com",
    githubUrl: "https://github.com/Brijesh-0106/orizen-flow",
    featured: true,
    icon: "OF",
    iconBg: "rgba(139,92,246,0.1)", // Violet tint
  },
  {
    name: "Orizen TUI",
    description:
      "Open-source terminal UI components for Node.js CLI applications.",
    longDesc:
      "A library of beautiful, composable terminal UI components for Node.js. Includes tables, progress bars, spinners, and input prompts — built on React Ink.",
    stack: ["React Ink", "Node.js", "TypeScript"],
    githubUrl: "https://github.com/Brijesh-0106/orizen-tui",
    featured: true,
    icon: "OT",
    iconBg: "rgba(239,68,68,0.1)",
  },
  {
    name: "DataViz Studio",
    description:
      "Drag-and-drop dashboard builder with live charts and CSV imports.",
    longDesc:
      "Visual data exploration tool. Upload CSVs, build dashboards by dragging chart blocks, and share reports via a public link.",
    stack: ["D3.js", "FastAPI", "Python", "React"],
    liveUrl: "https://dataviz.studio",
    githubUrl: "https://github.com/Brijesh-0106/dataviz",
    icon: "DV",
    iconBg: "rgba(168,85,247,0.1)",
  },
];

function ExternalIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function GitHubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <rect width="24" height="24" rx="12" fill="transparent" />
      <path
        fill="currentColor"
        d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
      />
    </svg>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex flex-col p-6 rounded-2xl transition-all duration-300 border bg-gradient-to-b from-[#0a0a0a] to-[#050505] overflow-hidden ${hovered ? "border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.1)] -translate-y-1" : "border-white/5"}`}
      style={{ cursor: "default", perspective: "1000px" }}
    >
      {/* Top accent line on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-violet-500 origin-left transition-transform duration-300 ease-out"
        style={{ transform: hovered ? "scaleX(1)" : "scaleX(0)" }}
      />

      {/* 3D Popover Image Preview */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9, rotateX: 25, rotateZ: -5 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 15, rotateZ: -2 }}
            exit={{ opacity: 0, y: 20, scale: 0.9, rotateX: 25, rotateZ: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute top-4 right-4 md:top-8 md:right-8 w-40 h-28 md:w-56 md:h-36 bg-white rounded-xl shadow-2xl z-20 pointer-events-none flex flex-col overflow-hidden border-2 border-white/20"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Simulated browser/window chrome */}
            <div className="h-4 md:h-6 bg-slate-100 border-b border-slate-200 flex items-center px-2 gap-1.5 shrink-0">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-400" />
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-400" />
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-400" />
            </div>
            {/* Inner Content */}
            <div className="flex-1 bg-slate-50 relative p-3 flex flex-col items-center justify-center">
              <div className="text-xl md:text-3xl font-heading font-black text-slate-800 opacity-20 absolute">{project.icon}</div>
              <div className="mt-auto font-heading font-bold text-[8px] md:text-xs text-slate-800 z-10 bg-white/80 px-2 py-1 rounded shadow-sm backdrop-blur-sm">
                {project.name}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header: icon + links */}
      <div className="flex items-start justify-between mb-4 relative z-10">
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-xs font-bold font-mono text-white tracking-widest shadow-inner"
          style={{ background: project.iconBg }}
        >
          {project.icon}
        </div>

        {/* Action links */}
        <div className="flex gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 bg-white/5 border border-white/10 rounded-lg p-2 flex items-center transition-all duration-200 hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-cyan-400/5 z-30 relative"
            >
              <ExternalIcon size={14} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 bg-white/5 border border-white/10 rounded-lg p-2 flex items-center transition-all duration-200 hover:text-white hover:border-white/30 hover:bg-white/10 z-30 relative"
            >
              <GitHubIcon size={15} />
            </a>
          )}
        </div>
      </div>

      {/* Name */}
      <h3 className="text-white text-lg font-bold font-heading mb-2 relative z-10">
        {project.name}
      </h3>

      {/* Description */}
      <p
        className={`text-slate-400 text-sm leading-relaxed font-mono mb-6 flex-1 transition-all duration-300 relative z-10 ${hovered ? "line-clamp-none opacity-100" : "line-clamp-3 opacity-90"}`}
      >
        {hovered ? project.longDesc : project.description}
      </p>

      {/* Stack tags */}
      <div className="flex flex-wrap gap-2 mt-auto relative z-10">
        {project.stack.map((s) => (
          <span
            key={s}
            className="text-[10px] font-mono text-slate-300 tracking-wider bg-white/5 border border-white/10 rounded px-2.5 py-1 uppercase"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <div className="w-full max-w-5xl mx-auto mt-24 px-4 md:px-8">
      {/* Section heading */}
      <div className="flex items-center gap-3 mb-2">
        <div className="text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-lg p-2 flex">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        </div>
        <h2 className="text-white font-heading text-[clamp(24px,3vw,36px)] font-extrabold tracking-tight">
          Featured Projects
        </h2>
      </div>
      <p className="text-slate-400 text-sm font-mono mb-10">
        Showcasing my most ambitious full-stack and AI applications.
      </p>

      {/* Featured 3-col grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        style={{ marginBottom: featured.length && rest.length ? 20 : 0 }}
      >
        {featured.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>

      {/* Remaining projects — 2-col */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          {rest.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i + featured.length} />
          ))}
        </div>
      )}
    </div>
  );
}
