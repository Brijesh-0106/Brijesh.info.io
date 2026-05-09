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

      <div className="w-full max-w-5xl px-4 md:px-8 flex flex-col relative z-10">
        <div className="h-20" />
        <Navbar />

        {/* ── Hero body ── */}
        <div className="flex-1 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-start justify-center py-12 lg:py-16">

          {/* ── Left: identity ── */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left shrink-0 lg:w-[370px]">

            {/* Avatar & Name Row */}
            <div className="flex flex-col lg:flex-row items-center gap-6 mb-8">
              {/* Avatar */}
              <div className="relative group shrink-0">
                <div className="absolute -inset-2 bg-purple-600/40 rounded-full blur-2xl group-hover:bg-purple-500/50 transition duration-500" />
                <Image
                  width={140}
                  height={140}
                  alt="Shah Brijesh"
                  src={img}
                  sizes="(max-width: 768px) 112px, 140px"
                  quality={95}
                  className="relative w-28 h-28 md:w-[140px] md:h-[140px] object-cover rounded-full border border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                  priority
                />
              </div>

              {/* Name & Title */}
              <div className="flex flex-col items-center lg:items-start mt-4 lg:mt-0">
                <h1 className="font-heading text-xl md:text-[30px] font-bold tracking-tight mb-3 leading-none text-white">
                  Shah{" "}
                  <span className="text-[#a87ffb]">
                    Brijesh
                  </span>
                </h1>
                <p className="text-sm md:text-lg font-semibold text-[#818cf8] tracking-wide">
                  Software Engineer
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-[#8b949e] text-sm md:text-lg leading-relaxed mb-8 max-w-[480px] font-sans">
              I build full-stack web applications with a focus on modern UI/UX, AI integrations, and highly scalable architectures. Welcome to my digital workspace.
            </p>

            {/* Availability badge */}
            <div className="flex items-center gap-3 text-[13px] md:text-sm font-semibold bg-[#022c16] border border-[#065f46]/50 px-5 py-2.5 rounded-full mb-8 text-[#10b981] shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <span className="bg-[#10b981] rounded-full w-2 h-2 animate-pulse shadow-[0_0_8px_#10b981]" />
              Open for new opportunities
            </div>

            {/* CTAs */}
            <div className="flex gap-4 flex-wrap justify-center lg:justify-start w-full">
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl bg-[#111118] border border-white/5 text-white text-sm md:text-base font-semibold hover:bg-white/5 hover:border-white/10 transition-all duration-300 w-full sm:w-auto text-center"
              >
                View Work
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl bg-[#1a1432] border border-[#a87ffb]/30 text-[#a87ffb] text-sm md:text-base font-semibold hover:bg-[#251b47] hover:border-[#a87ffb]/50 transition-all duration-300 w-full sm:w-auto text-center shadow-[0_0_20px_rgba(168,127,251,0.15)]"
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
