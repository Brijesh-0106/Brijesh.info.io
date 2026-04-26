"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import LeetCodePremium from "./LeetCodePremium";
const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false },
);
export default function Activity() {
  const [activeTab, setActiveTab] = useState<"github" | "leetcode">("github");
  return (
    <>
      {/* <div
        style={{ padding: "20px", position: "relative" }}
        className="flex flex-col gap-4 items-center"
      > */}

      {/* export default function CodingActivity() { */}

      <div className="w-full max-w-6xl mx-auto mt-20 px-4">
        {/* Title */}
        <h2 className="text-white text-2xl font-semibold mb-6">
          Coding Activity
        </h2>

        {/* Container */}
        <div className="bg-[#0d1117] border border-gray-800 rounded-2xl p-6 shadow-lg">
          {/* 🔥 Stats Row */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* GitHub Stats */}
            <div className="bg-[#0b1220] p-4 rounded-xl border border-gray-700">
              <p className="text-gray-400 text-sm">GitHub</p>
              <p className="text-white text-xl font-semibold">125</p>
              <p className="text-gray-500 text-sm">Contributions (2026)</p>
            </div>

            {/* LeetCode Stats */}
            <div className="bg-[#0b1220] p-4 rounded-xl border border-gray-700">
              <p className="text-gray-400 text-sm">LeetCode</p>
              <p className="text-white text-xl font-semibold">283</p>
              <p className="text-gray-500 text-sm">Problems Solved</p>
            </div>
          </div>

          {/* 🔥 Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("github")}
              className={`px-4 py-2 rounded-lg text-sm ${
                activeTab === "github"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-400"
              }`}
            >
              GitHub
            </button>

            <button
              onClick={() => setActiveTab("leetcode")}
              className={`px-4 py-2 rounded-lg text-sm ${
                activeTab === "leetcode"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-400"
              }`}
            >
              LeetCode
            </button>
          </div>

          {/* 🔥 Tab Content */}
          <div className="min-h-[220px]">
            {activeTab === "github" && (
              <div className="overflow-x-auto">
                <GitHubCalendar
                  username="Brijesh-0106"
                  blockMargin={5}
                  blockSize={15}
                  showColorLegend={false}
                  className="text-white"
                  year={2026}
                  colorScheme="dark"
                />
              </div>
            )}

            {activeTab === "leetcode" && (
              <div>
                <LeetCodePremium />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <div className="w-full max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-semibold text-center text-white mb-10">
            Coding Activity
          </h2>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2 bg-[#0d1117] p-6 rounded-2xl border border-gray-800 shadow-lg">
              <h3 className="text-lg text-white mb-4">GitHub</h3>

              <GitHubCalendar
                username="Brijesh-0106"
                blockMargin={5}
                blockSize={15}
                showColorLegend={false}
                className="text-white"
                year={2026}
                colorScheme="dark"
              />
            </div>

            <div className="bg-[#0d1117] p-6 rounded-2xl border border-gray-800 shadow-lg">
              <LeetCodePremium />
            </div>
          </div>
        </div> */}
      {/* </div> */}
    </>
  );
}
