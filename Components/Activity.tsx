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
      style={{ flexShrink: 0 }}
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
  color = "#fff",
}: {
  value: string | number;
  label: string;
  color?: string;
}) {
  return (
    <div style={{ textAlign: "right" }}>
      <p
        style={{
          color,
          fontSize: 22,
          fontWeight: 700,
          fontFamily: "Space Mono, monospace",
          lineHeight: 1,
        }}
      >
        {value}
      </p>
      <p
        style={{
          color: "#475569",
          fontSize: 10,
          fontFamily: "Space Mono, monospace",
          marginTop: 4,
          letterSpacing: "0.12em",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </p>
    </div>
  );
}

const PANEL_STYLE = {
  background: "#0d1117",
  border: "1px solid rgba(0,229,160,0.15)",
  borderRadius: 16,
  padding: 24,
};

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
    <div className="w-full mx-auto mt-24 px-4" style={{ maxWidth: "70%" }}>
      {/* Section heading */}

      <h2
        style={{
          color: "#fff",
          fontFamily: "Syne, sans-serif",
          fontSize: "clamp(24px, 3vw, 36px)",
          fontWeight: 800,
          marginBottom: 32,
        }}
      >
        Code Activity
      </h2>

      {/* ── GitHub Panel ── */}
      <div style={{ ...PANEL_STYLE, marginBottom: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          {/* Left: icon + name + profile link */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 8,
                flexShrink: 0,
              }}
            >
              <GitHubIcon size={20} />
            </div>
            <div>
              <p
                style={{
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  fontFamily: "Space Mono, monospace",
                  marginBottom: 4,
                }}
              >
                GITHUB
              </p>
              {/* Profile link */}
              <a
                href="https://github.com/Brijesh-0106"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  color: "#475569",
                  fontSize: 11,
                  fontFamily: "Space Mono, monospace",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00e5a0")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
              >
                @Brijesh-0106
                <ExternalLinkIcon />
              </a>
            </div>
          </div>

          {/* Right: stats */}
          <div style={{ display: "flex", gap: 32 }}>
            <Stat value={132} label="CONTRIBUTIONS" />
            <Stat value={32} label="REPOS" />
            <Stat value={12} label="MAX STREAK" color="#00e5a0" />
          </div>
        </div>

        {/* Calendar — 2026 only */}
        <div style={{ overflowX: "auto" }}>
          <GitHubCalendar
            username="Brijesh-0106"
            year={2026}
            blockMargin={4}
            blockSize={13}
            showColorLegend={true}
            colorScheme="dark"
            style={{
              color: "#475569",
              fontFamily: "Space Mono, monospace",
              fontSize: 11,
            }}
          />
        </div>
      </div>

      {/* ── LeetCode Panel ── */}
      <div style={PANEL_STYLE} className="mb-6">
        <LeetCodeHeatmap
          total={lcStats.total}
          easy={lcStats.easy}
          medium={lcStats.medium}
          hard={lcStats.hard}
        />
      </div>
      <div className="mt-40">
        <OpenSource />
      </div>
    </div>
  );
}
