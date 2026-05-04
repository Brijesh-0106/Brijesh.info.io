"use client";

import Image from "next/image";
import img from "../app/Utils/brijesh.png";
import Navbar from "./Navbar";
import TerminalHero from "./TerminalHero";
import { useState } from "react";

const SUGGESTION_SETS = [
  ["What do you work on?", "Which tech do you love most?", "Are you open to hire?"],
  ["Tell me about Review Scope", "What are your best projects?", "Show me your GitHub"],
  ["What's your experience?", "Where did you study?", "How can I contact you?"],
  ["What's your tech stack?", "Tell me about Orizen TUI", "Where are you on Twitter?"],
];

export default function Herosection() {
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);
  const [setIndex, setSetIndex] = useState(0);

  const currentSuggestions = SUGGESTION_SETS[setIndex % SUGGESTION_SETS.length];

  const handleSuggestionClick = (prompt: string) => {
    setPendingPrompt(prompt);
    setSetIndex((prev) => prev + 1);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center bg-[#08080c] overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/[0.06] rounded-full blur-[180px] pointer-events-none" />

      <div className="w-full max-w-6xl px-4 md:px-8 flex flex-col relative z-10">
        <div className="h-20" />
        <Navbar />

        {/* ── Hero body ── */}
        <div className="flex-1 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-center py-12 lg:py-16">

          {/* ── Left: identity ── */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left shrink-0 lg:w-[300px]">

            <div className="relative group mb-7">
              <div className="absolute -inset-px bg-gradient-to-br from-indigo-500/20 to-purple-500/10 rounded-2xl blur-sm" />
              <Image
                width={284}
                height={284}
                alt="Shah Brijesh — Software Engineer"
                src={img}
                sizes="(max-width: 768px) 160px, 176px"
                quality={85}
                className="relative w-40 h-48 md:w-44 md:h-52 object-cover rounded-2xl border border-white/[0.07] shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                priority
              />
            </div>

            {/* Name — Syne, large */}
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-2 leading-none text-[#f1f0f5]">
              Shah{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Brijesh
              </span>
            </h1>

            {/* Role */}
            <p className="text-xs font-medium mb-6 text-[#7a7a8c] tracking-[0.14em] uppercase font-sans">
              Software Engineer
            </p>

            {/* Availability badge */}
            <div className="flex items-center gap-2 text-xs font-medium bg-white/[0.04] px-4 py-2 rounded-full border border-white/[0.07] mb-7 text-[#7a7a8c]">
              <span className="bg-emerald-500 rounded-full w-1.5 h-1.5 animate-pulse" />
              Open for new opportunities
            </div>

            {/* CTAs */}
            <div className="flex gap-2.5 flex-wrap justify-center lg:justify-start">
              <a
                href="#projects"
                className="px-5 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[#7a7a8c] text-sm font-medium hover:bg-white/[0.08] hover:text-[#f1f0f5] hover:border-white/20 transition-all duration-200"
              >
                View Work
              </a>
              <a
                href="#contact"
                className="px-5 py-2 rounded-lg bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-sm font-medium hover:bg-indigo-500/20 hover:border-indigo-400/40 transition-all duration-200"
              >
                Hire Me
              </a>
            </div>
          </div>

          {/* ── Right: terminal ── */}
          <div className="flex-1 w-full min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/70 animate-pulse" />
              <span className="text-[10px] font-mono text-[#45454f] tracking-[0.18em] uppercase">
                Ask me anything
              </span>
            </div>

            <TerminalHero
              pendingPrompt={pendingPrompt}
              onPromptConsumed={() => setPendingPrompt(null)}
            />

            {/* Rotating suggestion pills */}
            <div className="flex flex-wrap gap-2 mt-3">
              {currentSuggestions.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSuggestionClick(prompt)}
                  className="text-[11px] font-mono text-[#45454f] bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-1.5 hover:text-[#818cf8] hover:border-indigo-400/25 hover:bg-indigo-500/5 transition-all duration-200 cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
