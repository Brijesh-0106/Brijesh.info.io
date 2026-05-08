"use client";

import Image from "next/image";
import img from "../app/Utils/brijesh.png";
import Navbar from "./Navbar";
import TerminalHero from "./TerminalHero";
import { useState } from "react";
import { motion } from "framer-motion";

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
    <div className="relative min-h-screen w-full flex flex-col items-center bg-[#050508] overflow-hidden">
      {/* Dynamic Background removed to fix 404 */}

      {/* Animated Glow Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600/20 blur-[150px] pointer-events-none"
      />

      <div className="w-full max-w-6xl px-4 md:px-8 flex flex-col relative z-10">
        <div className="h-24 md:h-32" />
        <Navbar />

        {/* ── Hero body ── */}
        <div className="w-full flex flex-col lg:flex-row gap-10 lg:gap-16 items-center lg:items-stretch justify-between py-12 lg:py-4">

          {/* ── Left: identity ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 w-full lg:max-w-[480px]"
          >
            {/* Image + Name Row */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-6 w-full"
            >
              <div className="relative group shrink-0">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-40 group-hover:opacity-70 transition duration-500" />
                <Image
                  width={96}
                  height={96}
                  alt="Shah Brijesh"
                  src={img}
                  quality={95}
                  className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full border-2 border-[#151520] relative z-10 shadow-xl"
                  priority
                />
              </div>
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold tracking-tight text-white mb-1.5 font-sans drop-shadow-md">
                  Shah{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400" style={{ backgroundSize: '200% auto' }}>
                    Brijesh
                  </span>
                </h1>
                <p className="text-sm md:text-base font-semibold text-indigo-300/80 tracking-wide font-sans">
                  Software Engineer
                </p>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[#8a8a9e] mb-8 text-sm md:text-base leading-relaxed max-w-md font-sans font-light px-2 md:px-0 text-center lg:text-left"
            >
              I build full-stack web applications with a focus on modern UI/UX, AI integrations, and highly scalable architectures. Welcome to my digital workspace.
            </motion.p>
            
            {/* Status / Availability */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center justify-center lg:justify-start gap-2.5 text-xs font-medium bg-emerald-500/10 text-emerald-300/90 px-4 py-2 rounded-full border border-emerald-500/20 mb-8 w-max mx-auto lg:mx-0 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Open for new opportunities
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-row gap-3 md:gap-4 w-full sm:w-auto justify-center lg:justify-start px-2 md:px-0"
            >
              <a
                href="#projects"
                className="group relative px-5 py-3 md:px-7 md:py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/80 text-sm font-semibold overflow-hidden transition-all duration-300 hover:text-white hover:border-white/20 hover:bg-white/[0.08] shadow-[0_0_20px_rgba(255,255,255,0.02)] text-center flex-1 sm:flex-none whitespace-nowrap"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                View Work
              </a>
              <a
                href="#contact"
                className="group relative px-5 py-3 md:px-7 md:py-3.5 rounded-xl bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-sm font-semibold overflow-hidden transition-all duration-300 hover:bg-indigo-500/20 hover:border-indigo-400/40 hover:text-indigo-200 shadow-[0_0_20px_rgba(99,102,241,0.1)] text-center flex-1 sm:flex-none whitespace-nowrap"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                Hire Me
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right: terminal ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex-1 w-full min-w-0 relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-3xl blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)] animate-pulse" />
                <span className="text-[11px] font-mono text-indigo-200/50 tracking-[0.25em] uppercase">
                  Ask me anything
                </span>
              </div>

              <div className="shadow-2xl shadow-indigo-500/5 rounded-2xl border border-white/[0.05] overflow-hidden bg-[#0a0a0f]/80 backdrop-blur-xl">
                <TerminalHero
                  pendingPrompt={pendingPrompt}
                  onPromptConsumed={() => setPendingPrompt(null)}
                />
              </div>

              {/* Rotating suggestion pills */}
              <div className="flex flex-wrap gap-2.5 mt-5">
                {currentSuggestions.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSuggestionClick(prompt)}
                    className="text-[12px] font-medium font-sans text-[#8a8a9e] bg-white/[0.02] border border-white/[0.04] rounded-full px-4 py-2 hover:text-[#e0e0ff] hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all duration-300 cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
