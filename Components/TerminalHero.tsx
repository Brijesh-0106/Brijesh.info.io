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
const DEMO_REPLY = [
  "[system]: Initializing interactive portfolio shell...",
  "",
  "Welcome! I'm Brijesh, a Software Engineer based in India.",
  "I build high-end, full-stack web apps with modern UI/UX and AI integrations.",
  "",
  "The terminal is live. Ask my AI assistant anything about my work or experience.",
];

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

function PromptPrefix() {
  return (
    <span className="inline-flex items-center shrink-0 select-none mr-2">
      <span className="text-emerald-400/90 font-medium">brijesh</span>
      <span className="text-slate-600">@</span>
      <span className="text-indigo-300 font-medium">portfolio</span>
      <span className="text-slate-600">:</span>
      <span className="text-sky-300/90 font-medium">~</span>
      <span className="text-slate-500 font-semibold ml-1">$</span>
    </span>
  );
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
        await sleep(180);
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
    const isError = line.text.startsWith("Oops — something went wrong");

    return (
      <div key={key}>
        {parts.map((part, pi) => {
          const isSystem = part.startsWith("[system]");

          let textColorClass = "text-slate-300";
          if (isError) textColorClass = "text-rose-400";
          else if (isSystem) textColorClass = "text-emerald-400/90 font-medium";

          return (
            <div
              key={pi}
              className={`leading-relaxed text-[13px] ${textColorClass}`}
              style={{ minHeight: part === "" ? "0.5em" : undefined }}
            >
              {part === "" ? "\u00a0" : part}
              {/* Show streaming cursor only on the last visible part of the last line */}
              {line.streaming && pi === parts.length - 1 && (
                <span className="inline-block w-[7px] h-[14px] bg-sky-400/90 animate-pulse ml-1 align-middle rounded-[1px]" />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className="w-full rounded-xl overflow-hidden border border-white/[0.07] bg-[#0c0e15] shadow-2xl shadow-black/60 cursor-text"
      onClick={focusInput}
      role="region"
      aria-label="Interactive terminal — ask Brijesh anything"
    >
      {/* ── Window chrome — Compact sleek macOS style ── */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#141724] border-b border-white/[0.06] select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80 transition-opacity hover:opacity-100" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80 transition-opacity hover:opacity-100" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80 transition-opacity hover:opacity-100" />
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
          <span className="text-slate-300 font-medium">brijesh@dev</span>
          <span className="text-slate-600">:</span>
          <span className="text-sky-400/80">~</span>
        </div>

        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
          bash
        </span>
      </div>

      {/* ── Terminal body ── */}
      <div
        ref={bodyRef}
        className="terminal-scrollbar bg-[#0c0e15] px-4.5 py-3.5 font-mono text-sm min-h-[300px] max-h-[400px] overflow-y-auto"
        style={{ lineHeight: "1.7", scrollBehavior: "auto" }}
      >
        {lines.map((line, i) => {
          if (line.type === "empty") return <div key={i} className="h-3" />;
          if (line.type === "input") {
            return (
              <div key={i} className="flex flex-wrap items-baseline">
                <PromptPrefix />
                <span className="text-sky-200/90 font-normal">{line.text}</span>
              </div>
            );
          }
          return renderOutputLine(line as Extract<Line, { type: "output" }>, i);
        })}

        {/* ── Active input row ── */}
        {demoComplete && (
          <form onSubmit={handleSubmit} className="flex items-center mt-2 w-full">
            <PromptPrefix />
            <div className="relative flex-1 flex items-center min-w-0">
              <span className="text-sky-200/90 font-normal whitespace-pre">{inputValue}</span>
              {!isStreaming && (
                <span
                  className={`inline-block w-[7px] h-[15px] ml-0.5 align-middle rounded-[1px] ${
                    isFocused ? "bg-sky-400/90 animate-pulse" : "bg-sky-400/30"
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
    </div>
  );
}
