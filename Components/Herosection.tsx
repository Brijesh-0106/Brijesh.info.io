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
              <div className="relative shrink-0">
                <Image
                  width={140}
                  height={140}
                  alt="Shah Brijesh"
                  src={img}
                  sizes="(max-width: 768px) 112px, 140px"
                  quality={95}
                  className="w-28 h-28 md:w-[140px] md:h-[140px] object-cover rounded-full border border-white/10 shadow-lg"
                  priority
                />
              </div>

              {/* Name & Title */}
              <div className="flex flex-col items-center lg:items-start mt-4 lg:mt-0">
                <h1 className="font-heading text-xl md:text-[30px] font-bold tracking-tight mb-2 leading-none text-slate-100">
                  Shah Brijesh
                </h1>
                <p className="text-sm md:text-base font-medium text-slate-400 tracking-wide font-sans">
                  Software Engineer
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-[480px] font-sans">
              I build full-stack web applications with a focus on modern UI/UX, AI integrations, and scalable architectures. Welcome to my digital workspace.
            </p>

            {/* Availability badge */}
            <div className="flex items-center gap-3 text-xs md:text-sm font-medium bg-emerald-950/40 border border-emerald-800/40 px-4 py-2 rounded-full mb-8 text-emerald-400">
              <span className="bg-emerald-400 rounded-full w-2 h-2" />
              Open for new opportunities
            </div>

            {/* CTAs */}
            <div className="flex gap-3 flex-wrap justify-center lg:justify-start w-full">
              <a
                href="#projects"
                className="px-5 py-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-800 hover:text-slate-100 hover:border-slate-700 transition-all duration-200 w-full sm:w-auto text-center"
              >
                View Work
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-slate-100 text-sm font-medium shadow-lg shadow-indigo-950/50 border border-indigo-400/20 hover:border-indigo-400/40 transition-all duration-200 w-full sm:w-auto text-center"
              >
                Hire Me
              </a>
            </div>
          </div>

          {/* ── Right: terminal ── */}
          <div className="flex-1 w-full min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
              <span className="text-[10px] font-mono text-slate-500 tracking-[0.18em] uppercase">
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
                  className="text-[11px] font-mono text-slate-400 bg-slate-900/80 border border-slate-800/80 rounded-full px-3 py-1.5 hover:text-sky-300 hover:border-slate-700 hover:bg-slate-850 transition-all duration-200 cursor-pointer"
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
