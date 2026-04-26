"use client";

import { useEffect, useState } from "react";

type DayData = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

function buildCalendarGrid(
  submissionCalendar: Record<string, number>,
): DayData[] {
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);
  oneYearAgo.setDate(oneYearAgo.getDate() - oneYearAgo.getDay()); // align to Sunday

  const days: DayData[] = [];
  const cursor = new Date(oneYearAgo);

  while (cursor <= today) {
    const ts = Math.floor(cursor.getTime() / 1000);
    // LeetCode uses midnight UTC timestamps — check ±1 day window
    const count =
      submissionCalendar[String(ts)] ||
      submissionCalendar[String(ts - 86400)] ||
      submissionCalendar[String(ts + 86400)] ||
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

const LC_COLORS = [
  "bg-[#1a1a2e]", // 0 - empty
  "bg-[#2d1b69]", // 1 - light
  "bg-[#553a9a]", // 2 - medium
  "bg-[#7c5cbf]", // 3 - strong
  "bg-[#ffa116]", // 4 - max (LC orange)
];

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

export default function LeetCodeHeatmap() {
  const [days, setDays] = useState<DayData[]>([]);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leetcode-calendar")
      .then((r) => r.json())
      .then((data) => {
        const raw: Record<string, number> = JSON.parse(
          data.submissionCalendar || "{}",
        );
        const grid = buildCalendarGrid(raw);
        setDays(grid);
        setTotalSubmissions(Object.values(raw).reduce((a, b) => a + b, 0));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[120px] flex items-center justify-center">
        <div className="w-4 h-4 border-2 border-[#ffa116] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Build week columns (each column = 7 days)
  const weeks: DayData[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  // Month labels — find where each month starts
  const monthLabels: { label: string; col: number }[] = [];
  weeks.forEach((week, wi) => {
    const firstOfMonth = week.find((d) => d.date.endsWith("-01"));
    if (firstOfMonth) {
      const month = new Date(firstOfMonth.date).getMonth();
      monthLabels.push({ label: MONTHS[month], col: wi });
    }
  });

  const activeDays = days.filter((d) => d.count > 0).length;

  return (
    <div className="w-full">
      {/* Header stats */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="text-lg">⚡</span>
          <div>
            <p className="text-white text-sm font-bold tracking-wider font-mono">
              LEETCODE
            </p>
            <p className="text-gray-500 text-xs font-mono">
              {totalSubmissions} submissions in the past year
            </p>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="text-right">
            <p className="text-white text-lg font-bold font-mono">283</p>
            <p className="text-gray-500 text-[10px] tracking-widest">SOLVED</p>
          </div>
          <div className="text-right">
            <p className="text-white text-lg font-bold font-mono">
              {activeDays}
            </p>
            <p className="text-gray-500 text-[10px] tracking-widest">
              ACTIVE DAYS
            </p>
          </div>
          <div className="text-right">
            <p className="text-[#ffa116] text-lg font-bold font-mono">TOP 6%</p>
            <p className="text-gray-500 text-[10px] tracking-widest">GLOBAL</p>
          </div>
        </div>
      </div>

      {/* Month labels */}
      <div className="relative mb-1" style={{ paddingLeft: "0px" }}>
        <div
          className="grid text-[10px] text-gray-500 font-mono"
          style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}
        >
          {monthLabels.map(({ label, col }) => (
            <span
              key={label + col}
              style={{ gridColumnStart: col + 1 }}
              className="col-span-4"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Heatmap grid */}
      <div
        className="grid gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}
      >
        {weeks.map((week, wi) =>
          week.map((day, di) => (
            <div
              key={day.date}
              title={`${day.date}: ${day.count} submissions`}
              className={`${LC_COLORS[day.level]} rounded-[2px] aspect-square w-full cursor-pointer
                transition-opacity hover:opacity-80`}
              style={{ gridColumn: wi + 1, gridRow: di + 1 }}
            />
          )),
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-1.5 mt-2 font-mono text-[10px] text-gray-500">
        <span>Less</span>
        {LC_COLORS.map((c, i) => (
          <div key={i} className={`${c} w-2.5 h-2.5 rounded-[2px]`} />
        ))}
        <span>More</span>
      </div>

      {/* Difficulty pills */}
      <div className="grid grid-cols-3 gap-3 mt-5">
        {[
          {
            label: "Easy",
            count: 169,
            color: "text-[#00b8a9]",
            dot: "bg-[#00b8a9]",
          },
          {
            label: "Medium",
            count: 105,
            color: "text-[#ffa116]",
            dot: "bg-[#ffa116]",
          },
          {
            label: "Hard",
            count: 9,
            color: "text-[#ef4743]",
            dot: "bg-[#ef4743]",
          },
        ].map(({ label, count, color, dot }) => (
          <div
            key={label}
            className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.07] rounded-lg px-3 py-2.5"
          >
            <div className={`${dot} w-2 h-2 rounded-full flex-shrink-0`} />
            <span className="text-gray-500 text-xs font-mono">{label}</span>
            <span className={`${color} text-sm font-bold font-mono ml-auto`}>
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
