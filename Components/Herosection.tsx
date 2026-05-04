"use client";

import Image from "next/image";
import img from "../app/Utils/ChatGPT Image Apr 25, 2026, 04_50_59 PM.png";
import Navbar from "./Navbar";
import TerminalHero from "./TerminalHero";
import { useState } from "react";

// ── Suggestion sets — rotate after each answer ─────────────────────────────
const SUGGESTION_SETS = [
  [
    "What do you work on?",
    "Which tech do you love most?",
    "Are you open to hire?",
  ],
  [
    "Tell me about Review Scope",
    "What are your best projects?",
    "Show me your GitHub",
  ],
  [
    "What's your experience?",
    "Where did you study?",
    "How can I contact you?",
  ],
  [
    "What's your tech stack?",
    "Tell me about Orizen TUI",
    "Where are you on Twitter?",
  ],
];

export default function Herosection() {
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);
  const [setIndex, setSetIndex] = useState(0);

  const currentSuggestions = SUGGESTION_SETS[setIndex % SUGGESTION_SETS.length];

  const handleSuggestionClick = (prompt: string) => {
    setPendingPrompt(prompt);
    // Rotate to next set
    setSetIndex((prev) => prev + 1);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center bg-[#060608] overflow-hidden">
      {/* Very subtle background texture glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-950/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full max-w-6xl px-4 md:px-8 flex flex-col relative z-10">
        {/* Navbar needs top padding to clear the absolute-positioned nav */}
        <div className="h-20" />

        <Navbar />

        {/* ── Hero body ── */}
        <div className="flex-1 flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-center py-12 lg:py-16">

          {/* ── Left column: identity ── */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left shrink-0 lg:w-[320px]">

            {/* Avatar */}
            <div className="relative group mb-6">
              <div className="absolute -inset-0.5 bg-white/5 rounded-2xl blur-sm" />
              <Image
                width={284}
                height={284}
                alt="Shah Brijesh — Software Engineer"
                src={img}
                className="relative w-40 h-48 md:w-48 md:h-56 object-cover rounded-2xl border border-white/[0.08] shadow-xl transition-transform duration-500 group-hover:scale-[1.02]"
                priority
              />
            </div>

            {/* Name */}
            <h1 className="text-4xl md:text-[2.75rem] font-bold tracking-tight mb-1.5 text-white/85 leading-tight">
              Shah Brijesh
            </h1>

            {/* Title */}
            <p className="text-base font-medium mb-5 text-white/35 tracking-wide font-mono">
              Software Engineer
            </p>

            {/* Availability badge — muted green, not neon */}
            <div className="flex items-center gap-2 text-xs font-medium bg-white/[0.04] px-4 py-2 rounded-full border border-white/[0.08] mb-7 text-white/50">
              <span className="bg-emerald-500 rounded-full w-1.5 h-1.5 animate-pulse" />
              Open for new opportunities
            </div>

            {/* CTA links */}
            <div className="flex gap-2.5 flex-wrap justify-center lg:justify-start">
              <a
                href="#projects"
                className="px-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white/60 text-sm font-medium hover:bg-white/[0.09] hover:text-white/80 transition-all duration-200"
              >
                View Work
              </a>
              <a
                href="#contact"
                className="px-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white/60 text-sm font-medium hover:bg-white/[0.09] hover:text-white/80 transition-all duration-200"
              >
                Hire Me
              </a>
            </div>
          </div>

          {/* ── Right column: terminal ── */}
          <div className="flex-1 w-full min-w-0">

            {/* Label */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 animate-pulse" />
              <span className="text-[10px] font-mono text-white/25 tracking-[0.15em] uppercase">
                Ask me anything
              </span>
            </div>

            <TerminalHero
              pendingPrompt={pendingPrompt}
              onPromptConsumed={() => setPendingPrompt(null)}
            />

            {/* Rotating suggestion prompts */}
            <div className="flex flex-wrap gap-2 mt-3">
              {currentSuggestions.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSuggestionClick(prompt)}
                  className="text-[11px] font-mono text-white/30 bg-white/[0.03] border border-white/[0.07] rounded-full px-3 py-1.5 hover:text-white/60 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-200 cursor-pointer"
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
