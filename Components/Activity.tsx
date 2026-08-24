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
  colorClass = "text-slate-100",
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
  const [lcRanking, setLcRanking] = useState<number | null>(null);

  const [ghStats, setGhStats] = useState({
    contributions: 0,
    repos: 0,
    maxStreak: 0,
  });

  const [dynamicRepos, setDynamicRepos] = useState<any[] | null>(null);

  useEffect(() => {
    // Fetch LeetCode stats
    fetch("/api/leetcode")
      .then((r) => r.json())
      .then((data) => {
        const arr = data.data?.matchedUser?.submitStats?.acSubmissionNum;
        if (arr) {
          setLcStats({
            total: arr.find((s: any) => s.difficulty === "All")?.count || 0,
            easy: arr.find((s: any) => s.difficulty === "Easy")?.count || 0,
            medium: arr.find((s: any) => s.difficulty === "Medium")?.count || 0,
            hard: arr.find((s: any) => s.difficulty === "Hard")?.count || 0,
          });
        }
        if (data.data?.matchedUser?.profile?.ranking) {
          setLcRanking(data.data.matchedUser.profile.ranking);
        }
      })
      .catch(() => { });

    // Fetch dynamic GitHub stats & PRs
    fetch("/api/github")
      .then((r) => r.json())
      .then((data) => {
        if (data.stats) {
          setGhStats(data.stats);
        }
        if (data.openSource?.repos) {
          setDynamicRepos(data.openSource.repos);
        }
      })
      .catch(() => { });
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto mt-24 px-4 md:px-8">
      {/* Section heading */}
      <div className="flex items-center gap-3 mb-8">
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
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 Z" />
          </svg>
        </div>
        <h2 className="text-slate-100 font-heading text-2xl font-bold tracking-tight">
          Code Activity
        </h2>
      </div>

      {/* ── GitHub Panel ── */}
      <div className={`${PANEL_CLASS} mb-6`}>
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-6">
          {/* Left: icon + name + profile link */}
          <div className="flex items-center gap-4">
            <div className="text-slate-200 flex items-center justify-center w-12 h-12 bg-slate-900/80 border border-slate-800 rounded-xl shrink-0">
              <GitHubIcon size={24} />
            </div>
            <div>
              <p className="text-slate-200 text-sm font-bold tracking-widest font-sans mb-1 uppercase">
                Github
              </p>
              {/* Profile link */}
              <a
                href="https://github.com/Brijesh-0106"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-200 text-xs font-mono transition-colors duration-200"
              >
                @Brijesh-0106
                <ExternalLinkIcon />
              </a>
            </div>
          </div>

          {/* Right: stats */}
          <div className="flex gap-6 md:gap-8 justify-between md:justify-end">
            {/* <Stat value={ghStats.contributions || "--"} label="CONTRIBUTIONS" /> */}
            <Stat value={ghStats.repos || "--"} label="REPOS" />
            <Stat value={ghStats.maxStreak || "--"} label="MAX STREAK" colorClass="text-zinc-200" />
          </div>
        </div>

        {/* Calendar — dynamically loads live trailing 12 months */}
        <div className="overflow-x-auto no-scrollbar pb-2">
          <GitHubCalendar
            username="Brijesh-0106"
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
        <LeetCodeHeatmap
          total={lcStats.total}
          easy={lcStats.easy}
          medium={lcStats.medium}
          hard={lcStats.hard}
          ranking={lcRanking}
        />
      </div>

      <div className="mt-32">
        <OpenSource initialRepos={dynamicRepos} />
      </div>
    </div>
  );
}
