"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { GitHubIcon } from "./Icons";
import LeetCodeHeatmap from "./LeetCodeHeatmap";
import OpenSource from "./OpenSource";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((m) => m.GitHubCalendar),
  { ssr: false },
);

// External link SVG icon
function ExternalLinkIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flex-shrink-0"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function Stat({
  value,
  label,
  colorClass = "text-white",
}: {
  value: string | number;
  label: string;
  colorClass?: string;
}) {
  return (
    <div className="text-right">
      <p className={`${colorClass} text-xl font-bold font-mono leading-none`}>
        {value}
      </p>
      <p className="text-slate-400 text-[10px] font-mono font-medium mt-1 tracking-widest whitespace-nowrap uppercase">
        {label}
      </p>
    </div>
  );
}

const PANEL_CLASS = "bg-[#09090b] border border-white/5 rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-all duration-500 hover:border-white/10";

export default function Activity() {
  const [lcStats, setLcStats] = useState({
    total: 0,
    easy: 0,
    medium: 0,
    hard: 0,
  });

  useEffect(() => {
    fetch("/api/leetcode")
      .then((r) => r.json())
      .then((data) => {
        const arr = data.data.matchedUser.submitStats.acSubmissionNum;
        setLcStats({
          total: arr.find((s: any) => s.difficulty === "All")?.count || 0,
          easy: arr.find((s: any) => s.difficulty === "Easy")?.count || 0,
          medium: arr.find((s: any) => s.difficulty === "Medium")?.count || 0,
          hard: arr.find((s: any) => s.difficulty === "Hard")?.count || 0,
        });
      });
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto mt-24 px-4 md:px-8">
      {/* Section heading */}
      <div className="flex items-center gap-3 mb-8">
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
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 Z" />
          </svg>
        </div>
        <h2 className="text-white font-heading text-2xl font-bold tracking-tight">
          Code Activity
        </h2>
      </div>

      {/* ── GitHub Panel ── */}
      <div className={`${PANEL_CLASS} mb-6`}>
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/[0.02] rounded-full blur-[100px] -z-10 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-6">
          {/* Left: icon + name + profile link */}
          <div className="flex items-center gap-4">
            <div className="text-white flex items-center justify-center w-12 h-12 bg-white/5 border border-white/10 rounded-xl shrink-0 shadow-inner">
              <GitHubIcon size={24} />
            </div>
            <div>
              <p className="text-white text-sm font-bold tracking-widest font-sans mb-1 uppercase">
                Github
              </p>
              {/* Profile link */}
              <a
                href="https://github.com/Brijesh-0106"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 text-xs font-mono transition-colors duration-200"
              >
                @Brijesh-0106
                <ExternalLinkIcon />
              </a>
            </div>
          </div>

          {/* Right: stats */}
          <div className="flex gap-6 md:gap-8 justify-between md:justify-end">
            <Stat value={132} label="CONTRIBUTIONS" />
            <Stat value={32} label="REPOS" />
            <Stat value={12} label="MAX STREAK" colorClass="text-cyan-400" />
          </div>
        </div>

        {/* Calendar — 2026 only */}
        <div className="overflow-x-auto no-scrollbar pb-2">
          <GitHubCalendar
            username="Brijesh-0106"
            year={2026}
            blockMargin={4}
            blockSize={14}
            showColorLegend={true}
            colorScheme="dark"
            style={{
              color: "#94a3b8",
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "12px",
            }}
          />
        </div>
      </div>

      {/* ── LeetCode Panel ── */}
      <div className={`${PANEL_CLASS} mb-6`}>
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/[0.02] rounded-full blur-[100px] -z-10 pointer-events-none" />
        
        <LeetCodeHeatmap
          total={lcStats.total}
          easy={lcStats.easy}
          medium={lcStats.medium}
          hard={lcStats.hard}
        />
      </div>

      <div className="mt-32">
        <OpenSource />
      </div>
    </div>
  );
}
