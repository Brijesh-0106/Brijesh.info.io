"use client";

import { useEffect, useState } from "react";

export default function LeetCodePremium() {
  const [stats, setStats] = useState<any>(null);
  useEffect(() => {
    fetch("/api/leetcode")
      .then((res) => res.json())
      .then((data) => {
        const statsArray = data.data.matchedUser.submitStats.acSubmissionNum;

        const formatted = {
          total: statsArray.find((s) => s.difficulty === "All")?.count || 0,
          easy: statsArray.find((s) => s.difficulty === "Easy")?.count || 0,
          medium: statsArray.find((s) => s.difficulty === "Medium")?.count || 0,
          hard: statsArray.find((s) => s.difficulty === "Hard")?.count || 0,
        };

        setStats(formatted);
      });
  }, []);

  if (!stats) {
    return <div className="text-white p-6">Loading...</div>;
  }

  const total = stats.total || 1;

  return (
    <div className="bg-[#0d1117] text-white p-6 rounded-2xl border border-gray-800 shadow-lg max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">LeetCode</h2>

      <div className="mb-6">
        <p className="text-3xl font-bold">{stats.total}</p>
        <p className="text-gray-400 text-sm">Problems Solved</p>
      </div>

      {/* Easy */}
      <Bar label="Easy" value={stats.easy} total={total} color="bg-green-500" />

      {/* Medium */}
      <Bar
        label="Medium"
        value={stats.medium}
        total={total}
        color="bg-yellow-500"
      />

      {/* Hard */}
      <Bar label="Hard" value={stats.hard} total={total} color="bg-red-500" />
    </div>
  );
}

function Bar({ label, value, total, color }: any) {
  const percent = (value / total) * 100;

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="w-full bg-gray-800 h-2 rounded">
        <div
          className={`${color} h-2 rounded`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
