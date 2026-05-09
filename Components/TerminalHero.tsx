"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Line =
  | { type: "input"; text: string }
  | { type: "output"; text: string; streaming?: boolean }
  | { type: "empty" };

interface TerminalHeroProps {
  pendingPrompt?: string | null;
  onPromptConsumed?: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const DEMO_QUESTION = "what is this?";
const PROMPT_PREFIX = "visitor@brijesh.dev:~$ ";
const DEMO_REPLY = [
  "[system]: Initializing interactive portfolio...",
  "[system]: AI context injected successfully.",
  "",
  "Welcome! I'm Brijesh, a Software Engineer based in India.",
  "I build high-end, full-stack web apps with modern UI/UX and AI integrations.",
  "",
  "The terminal is live. Ask my AI assistant anything about my work or experience.",
];

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function TerminalHero({
  pendingPrompt,
  onPromptConsumed,
}: TerminalHeroProps) {
  const [lines, setLines] = useState<Line[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [demoComplete, setDemoComplete] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);   // ref on the scrollable container
  const hasRunDemo = useRef(false);

  // ── Scroll the terminal body (not the page) to the bottom ─────────────────
  const scrollToBottom = useCallback(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  // ── Ask the API and stream the response ────────────────────────────────────
  const askQuestion = useCallback(
    async (question: string) => {
      if (!question.trim() || isStreaming) return;

      setIsStreaming(true);
      setLines((prev) => [...prev, { type: "input", text: question }]);
      setLines((prev) => [...prev, { type: "output", text: "", streaming: true }]);

      try {
        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question }),
        });

        if (!res.ok || !res.body) throw new Error("Request failed");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          setLines((prev) => {
            const copy = [...prev];
            const last = copy[copy.length - 1];
            if (last.type === "output") {
              copy[copy.length - 1] = { ...last, text: last.text + chunk, streaming: true };
            }
            return copy;
          });
        }

        // Mark done
        setLines((prev) => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          if (last.type === "output") copy[copy.length - 1] = { ...last, streaming: false };
          return copy;
        });
        setLines((prev) => [...prev, { type: "empty" }]);
        
        // Auto-focus after generation
        setTimeout(() => {
          inputRef.current?.focus();
        }, 50);
      } catch {
        setLines((prev) => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          if (last.type === "output") {
            copy[copy.length - 1] = {
              type: "output",
              text: "Oops — something went wrong. Please try again.",
              streaming: false,
            };
          }
          return copy;
        });
        setLines((prev) => [...prev, { type: "empty" }]);
      } finally {
        setIsStreaming(false);
      }
    },
    [isStreaming]
  );

  // ── Demo: boot + auto-type ────────────────────────────────────────────────
  useEffect(() => {
    if (hasRunDemo.current) return;
    hasRunDemo.current = true;

    async function runDemo() {
      await sleep(500);
      for (let i = 1; i <= DEMO_QUESTION.length; i++) {
        setInputValue(DEMO_QUESTION.slice(0, i));
        await sleep(52);
      }
      await sleep(300);
      setInputValue("");

      setLines([{ type: "input", text: DEMO_QUESTION }]);

      for (const line of DEMO_REPLY) {
        await sleep(200);
        setLines((prev) => [
          ...prev,
          { type: "output", text: line, streaming: false },
        ]);
      }
      setLines((prev) => [...prev, { type: "empty" }]);

      setDemoComplete(true);
    }

    runDemo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── React to injected pending prompts ────────────────────────────────────
  useEffect(() => {
    if (!pendingPrompt || !demoComplete || isStreaming) return;
    onPromptConsumed?.();
    setInputValue("");
    askQuestion(pendingPrompt);
  }, [pendingPrompt, demoComplete, isStreaming, askQuestion, onPromptConsumed]);

  // ── Handle user submit ─────────────────────────────────────────────────────
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoComplete || isStreaming || !inputValue.trim()) return;
    const q = inputValue.trim();
    setInputValue("");
    askQuestion(q);
  };

  const focusInput = () => {
    if (demoComplete && !isStreaming) inputRef.current?.focus();
  };

  // ── Render each output line — split on \n for proper multiline ─────────────
  function renderOutputLine(line: Extract<Line, { type: "output" }>, key: number) {
    const parts = line.text.split("\n");
    return (
      <div key={key}>
        {parts.map((part, pi) => (
          <div
            key={pi}
            className="text-[#a8c999] leading-relaxed"
            style={{ minHeight: part === "" ? "0.5em" : undefined }}
          >
            {part === "" ? "\u00a0" : part}
            {/* Show streaming cursor only on the last visible part of the last line */}
            {line.streaming && pi === parts.length - 1 && (
              <span className="inline-block w-[8px] h-[13px] bg-[#22d3ee] animate-pulse ml-0.5 align-middle" />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="w-full rounded-xl overflow-hidden border border-white/[0.12] shadow-[0_0_40px_rgba(0,0,0,0.6)] cursor-text"
      onClick={focusInput}
      role="region"
      aria-label="Interactive terminal — ask Brijesh anything"
    >
      {/* ── Window chrome — macOS style ── */}
      <div className="flex items-center gap-1.5 px-4 py-3 bg-[#1a1a1a] border-b border-white/[0.08]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-auto text-[11px] font-mono text-white/25 tracking-widest select-none">
          brijesh@portfolio — bash
        </span>
      </div>

      {/* ── Terminal body ── */}
      <div
        ref={bodyRef}
        className="bg-[#0d1117] px-5 py-4 font-mono text-sm min-h-[300px] max-h-[400px] overflow-y-auto"
        style={{ lineHeight: "1.7", scrollBehavior: "auto" }}
      >
        {lines.map((line, i) => {
          if (line.type === "empty") return <div key={i} className="h-4" />;
          if (line.type === "input") {
            return (
              <div key={i} className="flex flex-wrap">
                <span className="text-[#3ddc84] shrink-0 select-none">{PROMPT_PREFIX}</span>
                <span className="text-[#79c0ff]">{line.text}</span>
              </div>
            );
          }
          return renderOutputLine(line as Extract<Line, { type: "output" }>, i);
        })}

        {/* ── Active input row ── */}
        {demoComplete && (
          <form onSubmit={handleSubmit} className="flex items-center mt-2 w-full">
            <span className="text-[#3ddc84] shrink-0 select-none">{PROMPT_PREFIX}</span>
            <div className="relative flex-1 flex items-center min-w-0">
              <span className="text-[#79c0ff] whitespace-pre">{inputValue}</span>
              {!isStreaming && (
                <span
                  className={`inline-block w-[8px] h-[15px] ml-px align-middle ${isFocused ? "bg-[#79c0ff] animate-pulse" : "bg-[#79c0ff]/30"
                    }`}
                />
              )}
              <input
                ref={inputRef}
                id="terminal-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={isStreaming || !demoComplete}
                className="absolute inset-0 w-full opacity-0 cursor-text"
                autoComplete="off"
                spellCheck={false}
                aria-label="Ask Brijesh a question"
              />
            </div>
          </form>
        )}
      </div>

      {/* ── Status bar ── */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-t border-white/[0.06]">
        <span className="text-[10px] font-mono text-white/20 tracking-widest">
          Assistant
        </span>
        <span className={`text-[10px] font-mono tracking-wide ${isStreaming ? "text-[#22d3ee]/50" : demoComplete ? "text-[#3ddc84]/50" : "text-white/20"}`}>
          {demoComplete && !isStreaming ? "● READY" : isStreaming ? "◌ GENERATING" : "◌ BOOTING"}
        </span>
      </div>
    </div>
  );
}
