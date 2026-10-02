"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import cerebroIcon from "@/app/Utils/isolated_brain.png";

type Project = {
  name: string;
  description: string;
  longDesc: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  icon: string | any; // emoji, letter or image
  iconBg: string;
  previewImage?: any;
};

const PROJECTS: Project[] = [
  {
    name: "Kanvas",
    description:
      "Cloud development platform provisioning on-demand VS Code environments in AWS with active auto-scaling.",
    longDesc:
      "High-performance cloud IDE platform provisioning browser-based VS Code environments on-demand in AWS EC2. Features an Active-Heartbeat lifecycling engine with S3 cold storage and AWS Auto Scaling Groups to auto-terminate idle instances and cut cloud compute waste by 90%.",
    stack: ["React", "TypeScript", "Node.js", "AWS EC2/S3", "Redis", "Docker", "MongoDB"],
    liveUrl: "https://kanvas.advertises.co.in",
    githubUrl: "https://github.com/Brijesh-0106/Kanvas-replit",
    featured: true,
    icon: "/kanvas.svg",
    iconBg: "rgba(0,0,0)", // Orange tint (#f97316)
    previewImage: "/kanvas-preview.png",
  },
  {
    name: "Cerebro",
    description:
      "Your AI-powered second brain. Save content from anywhere, search by meaning, and chat with your knowledge base.",
    longDesc:
      "Full-stack RAG application that saves content from YouTube, Twitter, articles, and notes. Uses vector embeddings for semantic search and LLM chat to retrieve information from YOUR saved content with source citations.",
    stack: ["React", "Node.js", "MongoDB", "Pinecone", "Groq", "RAG"],
    liveUrl: "https://cerebro-secondbrain.vercel.app/",
    githubUrl: "https://github.com/Brijesh-0106/cerebro",
    featured: true,
    icon: cerebroIcon,
    iconBg: "rgba(79,57,246,0.1)", // Indigo tint (#4f39f6)
    previewImage: "/cerebro-preview.png",
  },
  {
    name: "NewsExpress",
    description:
      "AI-driven RAG news assistant with automated email digests and a Dark Luxury UI.",
    longDesc:
      "Platform for regional news filtering using NewsData.io API, featuring persistent search, seamless user experience, and server-side automation for daily email subscriptions via Supabase and GitHub Actions.",
    stack: ["React", "Supabase", "Groq", "GitHub Actions", "RAG"],
    githubUrl: "https://github.com/Brijesh-0106/NewsExpress",
    liveUrl: "https://newsaunty.vercel.app/",
    featured: true,
    icon: "/newsExpress.svg",
    iconBg: "rgba(0,0,0,0.1)", // Red tint
    previewImage: "/newExpress.png",
  },
  {
    name: "RescueKitchen",
    description:
      "A mission-driven surplus food marketplace connecting users to reduce food waste with a 'Dark Luxury' design.",
    longDesc:
      "Surplus Food Marketplace built with a premium 'Dark Luxury' UI. Features an interactive chatbot for enhanced user interaction and built for fast, responsive performance.",
    stack: ["Next.js", "React", "Tailwind CSS"],
    liveUrl: "https://rescue-kitchen.vercel.app",
    githubUrl: "https://github.com/Brijesh-0106/RescueKitchen",
    featured: true,
    icon: "/rescueKitchen.svg",
    iconBg: "rgba(34,197,94,0.1)", // Green tint
    previewImage: "/rescueKitchen.png",
  },
  {
    name: "iNoteBook",
    description:
      "A secure, high-end digital workspace designed for taking and managing notes.",
    longDesc:
      "Built on the MERN stack with secure login/signup. Cloud-based storage allows access from anywhere. Lightning-fast experience across devices with modern typography and sleek 'Dark Luxury' glassmorphism design.",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    liveUrl: "https://i-note-book-io.vercel.app",
    githubUrl: "https://github.com/Brijesh-0106/iNoteBook",
    featured: true,
    icon: "/iNotebook.svg",
    iconBg: "rgba(168,85,247,0.1)", // Purple tint
    previewImage: "/iNoteBook.png",
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
      className={`relative flex flex-col p-6 rounded-2xl transition-all duration-300 border bg-[#0f0f17] overflow-hidden ${hovered ? "border-white/20 bg-[#12121b] -translate-y-1" : "border-white/[0.06]"}`}
      style={{ cursor: "default", perspective: "1000px" }}
    >
      {/* Top accent line on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] bg-white/20 origin-left transition-transform duration-300 ease-out"
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
            className="absolute top-4 right-4 md:top-8 md:right-8 w-40 h-28 md:w-56 md:h-36 bg-[#161822] rounded-xl shadow-2xl z-20 pointer-events-none flex flex-col overflow-hidden border border-white/20"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Simulated browser/window chrome */}
            <div className="h-4 md:h-6 bg-[#1f2333] border-b border-white/[0.08] flex items-center px-2 gap-1.5 shrink-0">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-400/80" />
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-400/80" />
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-400/80" />
            </div>
            {/* Inner Content */}
            <div className="flex-1 bg-[#0a0a0f] relative overflow-hidden flex flex-col items-center justify-center">
              {project.previewImage ? (
                <Image
                  src={project.previewImage}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 160px, 224px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  priority={index === 0}
                />
              ) : (
                <>
                  <div className="text-xl md:text-3xl font-heading font-black text-slate-400 opacity-20 absolute">
                    {typeof project.icon === "string" && !project.icon.startsWith("/") ? project.icon : project.name.slice(0, 2)}
                  </div>
                </>
              )}
              <div className="mt-auto mb-2 font-heading font-bold text-[8px] md:text-xs text-slate-200 z-10 bg-slate-900/90 border border-white/10 px-2 py-1 rounded shadow-sm backdrop-blur-sm">
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
          className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-xs font-bold font-mono text-slate-200 tracking-widest relative overflow-hidden"
          style={{ background: project.iconBg }}
        >
          {typeof project.icon === "string" ? (
            project.icon.startsWith("/") ? (
              <Image src={project.icon} alt={project.name} fill className="p-2 object-contain" />
            ) : (
              project.icon
            )
          ) : (
            <Image src={project.icon} alt={project.name} width={24} height={24} className="rounded-sm" />
          )}
        </div>

        {/* Action links */}
        <div className="flex gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 bg-slate-900/80 border border-slate-800 rounded-lg p-2 flex items-center transition-colors duration-200 hover:text-slate-100 hover:border-slate-700 hover:bg-slate-800 z-30 relative"
            >
              <ExternalIcon size={14} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 bg-slate-900/80 border border-slate-800 rounded-lg p-2 flex items-center transition-colors duration-200 hover:text-slate-100 hover:border-slate-700 hover:bg-slate-800 z-30 relative"
            >
              <GitHubIcon size={15} />
            </a>
          )}
        </div>
      </div>

      {/* Name */}
      <h3 className="text-slate-100 text-base font-semibold font-heading mb-2 relative z-10">
        {project.name}
      </h3>

      {/* Description */}
      <p
        className="text-slate-400 text-xs leading-relaxed font-sans mb-5 flex-1 transition-all duration-300 relative z-10 opacity-90"
      >
        {project.longDesc}
      </p>

      {/* Stack tags */}
      <div className="flex flex-wrap gap-2 mt-auto relative z-10">
        {project.stack.map((s) => (
          <span
            key={s}
            className="text-[10px] font-mono text-slate-300 tracking-wider bg-slate-900/80 border border-slate-800 rounded px-2.5 py-1 uppercase"
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
        <div className="text-slate-300 bg-slate-900/80 border border-slate-800 rounded-lg p-2 flex">
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
        <h2 className="text-slate-100 font-heading text-2xl font-bold tracking-tight">
          Featured Projects
        </h2>
      </div>
      <p className="text-slate-400 text-xs font-[family-name:var(--font-jakarta)] mb-10">
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
