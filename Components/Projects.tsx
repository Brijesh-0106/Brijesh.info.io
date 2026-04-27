"use client";

import { useState } from "react";

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
    iconBg: "rgba(0,229,160,0.08)",
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
    iconBg: "rgba(0,184,255,0.08)",
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
    iconBg: "rgba(255,107,107,0.08)",
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
    iconBg: "rgba(168,85,247,0.08)",
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
      <rect width="24" height="24" rx="12" fill="black" />
      <path
        fill="white"
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
      style={{
        background: hovered ? "#111820" : "#0d1117",
        border: `1px solid ${hovered ? "rgba(0,229,160,0.25)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 14,
        padding: 22,
        display: "flex",
        flexDirection: "column",
        gap: 0,
        transition: "all 0.2s",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Top accent line on hover */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "linear-gradient(90deg, #00e5a0, #00b8ff)",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.3s ease",
        }}
      />

      {/* Header: icon + links */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: project.iconBg,
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 700,
            color: "#fff",
            fontFamily: "Space Mono, monospace",
            letterSpacing: "0.05em",
          }}
        >
          {project.icon}
        </div>

        {/* Action links */}
        <div style={{ display: "flex", gap: 10 }}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#475569",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 6,
                padding: "6px 8px",
                display: "flex",
                alignItems: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#00e5a0";
                e.currentTarget.style.borderColor = "rgba(0,229,160,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#475569";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              }}
            >
              <ExternalIcon size={13} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#475569",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 6,
                padding: "6px 8px",
                display: "flex",
                alignItems: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#475569";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              }}
            >
              <GitHubIcon size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Name */}
      <h3
        style={{
          color: "#fff",
          fontSize: 16,
          fontWeight: 700,
          fontFamily: "Syne, sans-serif",
          marginBottom: 8,
        }}
      >
        {project.name}
      </h3>

      {/* Description — short on default, long on hover */}
      <p
        style={{
          color: "#64748b",
          fontSize: 13,
          lineHeight: 1.7,
          fontFamily: "Space Mono, monospace",
          marginBottom: 16,
          flex: 1,
          display: "-webkit-box",
          WebkitLineClamp: hovered ? 4 : 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          transition: "all 0.2s",
        }}
      >
        {hovered ? project.longDesc : project.description}
      </p>

      {/* Stack tags */}
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto" }}
      >
        {project.stack.map((s) => (
          <span
            key={s}
            style={{
              fontSize: 10,
              fontFamily: "Space Mono, monospace",
              color: "#475569",
              letterSpacing: "0.08em",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 4,
              padding: "3px 8px",
              textTransform: "uppercase",
            }}
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
    <div className="w-full mx-auto mt-24 px-4" style={{ maxWidth: "70%" }}>
      {/* Section heading */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 8,
        }}
      >
        <div
          style={{
            color: "#00e5a0",
            background: "rgba(0,229,160,0.08)",
            border: "1px solid rgba(0,229,160,0.2)",
            borderRadius: 8,
            padding: 8,
            display: "flex",
          }}
        >
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
        <h2
          style={{
            color: "#fff",
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 800,
          }}
        >
          Featured Projects
        </h2>
      </div>
      <p
        style={{
          color: "#475569",
          fontSize: 13,
          fontFamily: "Space Mono, monospace",
          marginBottom: 36,
        }}
      >
        Showcasing my most ambitious full-stack and AI applications.
      </p>

      {/* Featured 3-col grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          marginBottom: featured.length && rest.length ? 16 : 0,
        }}
      >
        {featured.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>

      {/* Remaining projects — 2-col */}
      {rest.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 16,
          }}
        >
          {rest.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i + featured.length} />
          ))}
        </div>
      )}
    </div>
  );
}
