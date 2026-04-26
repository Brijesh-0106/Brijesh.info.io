"use client";

import { useEffect, useState } from "react";
import { LeetCodeIcon } from "./Icons";

type Level = 0 | 1 | 2 | 3 | 4;
type DayData = { date: string; count: number; level: Level };

const LC_COLORS: Record<Level, string> = {
  0: "#161b22",
  1: "#003d1f",
  2: "#006d32",
  3: "#26a641",
  4: "#39d353",
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getLevel(count: number): Level {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}
function buildGrid(calendar: Record<string, number>): DayData[] {
  // June 1 2025, aligned to nearest Sunday before it
  const start = new Date("2025-06-01");
  start.setDate(start.getDate() - start.getDay());

  // June 30 2026
  const end = new Date("2026-06-30");

  const days: DayData[] = [];
  const cursor = new Date(start);

  while (cursor <= end) {
    const ts = Math.floor(cursor.getTime() / 1000);
    const count =
      calendar[String(ts)] ||
      calendar[String(ts - 86400)] ||
      calendar[String(ts + 86400)] ||
      0;
    days.push({
      date: cursor.toISOString().split("T")[0],
      count,
      level: getLevel(count),
    });
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

interface Props {
  easy: number;
  medium: number;
  hard: number;
  total: number;
}

export default function LeetCodeHeatmap({ easy, medium, hard, total }: Props) {
  const [days, setDays] = useState<DayData[]>([]);
  const [activeDays, setActive] = useState(0);
  const [totalSubs, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leetcode-calendar")
      .then((r) => r.json())
      .then((data) => {
        const raw: Record<string, number> = JSON.parse(
          data.submissionCalendar || "{}",
        );
        setDays(buildGrid(raw));
        setActive(
          data.activeDays || Object.values(raw).filter((v) => v > 0).length,
        );
        setTotal(Object.values(raw).reduce((a: number, b: number) => a + b, 0));
      })
      .finally(() => setLoading(false));
  }, []);

  // Build week columns
  const weeks: DayData[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  // Month label positions
  const monthLabels: { label: string; index: number }[] = [];
  weeks.forEach((week, wi) => {
    week.forEach((day) => {
      if (day.date.slice(8) === "01") {
        const m = parseInt(day.date.slice(5, 7)) - 1;
        if (!monthLabels.find((ml) => ml.label === MONTHS[m])) {
          monthLabels.push({ label: MONTHS[m], index: wi });
        }
      }
    });
  });

  return (
    <div className="w-full">
      {/* ── Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        {/* Left: icon + title */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              color: "#ffa116",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              background: "rgba(255,161,22,0.08)",
              borderRadius: 8,
              flexShrink: 0,
            }}
          >
            <LeetCodeIcon size={20} />
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
              LEETCODE
            </p>
            {/* Profile link */}
            <a
              href="https://leetcode.com/u/phenomenal123"
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
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffa116")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
            >
              @phenomenal123
              {/* Inline SVG so no extra import needed */}
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
            </a>
            <p
              style={{
                color: "#475569",
                fontSize: 11,
                fontFamily: "Space Mono, monospace",
                marginTop: 4,
              }}
            >
              {loading
                ? "Loading..."
                : `${totalSubs} submissions · Jun 2025 – Jun 2026`}
            </p>
          </div>
        </div>

        {/* Right: 3 stats — explicit gap so labels never touch */}
        <div style={{ display: "flex", gap: 32 }}>
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                color: "#fff",
                fontSize: 22,
                fontWeight: 700,
                fontFamily: "Space Mono, monospace",
                lineHeight: 1,
              }}
            >
              {total}
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
              SOLVED
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                color: "#fff",
                fontSize: 22,
                fontWeight: 700,
                fontFamily: "Space Mono, monospace",
                lineHeight: 1,
              }}
            >
              {activeDays}
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
              ACTIVE DAYS
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                color: "#39d353",
                fontSize: 22,
                fontWeight: 700,
                fontFamily: "Space Mono, monospace",
                lineHeight: 1,
              }}
            >
              TOP 6%
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
              GLOBAL
            </p>
          </div>
        </div>
      </div>

      {/* ── Heatmap or loader ── */}
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 120,
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              border: "2px solid #39d353",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : (
        <>
          {/* Month labels row */}
          <div style={{ display: "flex", marginBottom: 4 }}>
            {weeks.map((_, wi) => {
              const ml = monthLabels.find((m) => m.index === wi);
              return (
                <div key={wi} style={{ flex: 1, minWidth: 0 }}>
                  {ml && (
                    <span
                      style={{
                        fontSize: 10,
                        color: "#475569",
                        fontFamily: "Space Mono, monospace",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {ml.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Grid — flex columns */}
          <div style={{ display: "flex", gap: 3, width: "100%" }}>
            {weeks.map((week, wi) => (
              <div
                key={wi}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  flex: 1,
                  minWidth: 0,
                }}
              >
                {Array.from({ length: 7 }).map((_, di) => {
                  const day = week[di];
                  return (
                    <div
                      key={di}
                      title={day ? `${day.date}: ${day.count} submissions` : ""}
                      style={{
                        backgroundColor: day
                          ? LC_COLORS[day.level]
                          : LC_COLORS[0],
                        borderRadius: 2,
                        width: "100%",
                        aspectRatio: "1 / 1",
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 4,
              marginTop: 8,
              fontSize: 10,
              color: "#475569",
              fontFamily: "Space Mono, monospace",
            }}
          >
            <span>Less</span>
            {([0, 1, 2, 3, 4] as Level[]).map((l) => (
              <div
                key={l}
                style={{
                  backgroundColor: LC_COLORS[l],
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  border: l === 0 ? "1px solid #30363d" : "none",
                }}
              />
            ))}
            <span>More</span>
          </div>
        </>
      )}

      {/* ── Difficulty pills ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 12,
          marginTop: 20,
        }}
      >
        {[
          {
            label: "Easy",
            count: easy,
            color: "#00b8a9",
            bg: "rgba(0,184,169,0.08)",
            border: "rgba(0,184,169,0.25)",
          },
          {
            label: "Medium",
            count: medium,
            color: "#ffa116",
            bg: "rgba(255,161,22,0.08)",
            border: "rgba(255,161,22,0.25)",
          },
          {
            label: "Hard",
            count: hard,
            color: "#ef4743",
            bg: "rgba(239,71,67,0.08)",
            border: "rgba(239,71,67,0.25)",
          },
        ].map(({ label, count, color, bg, border }) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: bg,
              border: `1px solid ${border}`,
              borderRadius: 8,
              padding: "10px 14px",
            }}
          >
            {/* Dot */}
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: color,
                flexShrink: 0,
              }}
            />
            {/* Label */}
            <span
              style={{
                color: "#94a3b8",
                fontSize: 12,
                fontFamily: "Space Mono, monospace",
              }}
            >
              {label}
            </span>
            {/* Count — pushed to right */}
            <span
              style={{
                color,
                fontSize: 16,
                fontWeight: 700,
                fontFamily: "Space Mono, monospace",
                marginLeft: "auto",
              }}
            >
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
