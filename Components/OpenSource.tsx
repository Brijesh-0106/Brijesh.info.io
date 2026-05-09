"use client";

import Image from "next/image";
import { useState } from "react";
import profileImg from "../app/Utils/110579053.jpg";
import { ExternalLinkIcon, GitHubIcon, MergedIcon } from "./Icons";

type PR = {
  title: string;
  number: number;
  url: string;
  status: "MERGED" | "OPEN" | "CLOSED";
};

type Repo = {
  name: string; // e.g. "fastapi/fastapi"
  repoUrl: string;
  avatarUrl: string; // repo owner avatar
  prs: PR[];
};

const CONTRIBUTIONS: Repo[] = [
  {
    name: "OpenMRS",
    repoUrl: "https://github.com/openmrs",
    avatarUrl:
      "https://imgs.search.brave.com/iMyrLULrkbrnQwczL9LpnTrR7d80zrQih1Uyt_oQAwE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90YWxr/Lm9wZW5tcnMub3Jn/L3VwbG9hZHMvZGVm/YXVsdC9vcmlnaW5h/bC8yWC84LzgwZmQ2/MDg2ZGNhMGEzYTM4/ZjlkM2I4MWZkZjQ4/MTk2ZTFmZTMwN2Yu/cG5n",
    prs: [
      {
        title: "Error When Adding a Patient Twice to the Queue",
        number: 2317,
        url: "https://github.com/openmrs/openmrs-esm-patient-management/pull/2317",
        status: "OPEN",
      },
      {
        title: "Reject future transition dates in queue",
        number: 106,
        url: "https://github.com/openmrs/openmrs-module-queue/pull/106",
        status: "OPEN",
      },
      {
        title: "Disable submit when transition time is invalid",
        number: 2421,
        url: "https://github.com/openmrs/openmrs-esm-patient-management/pull/2421",
        status: "MERGED",
      },
      {
        title: "Validate time input format in queue",
        number: 2426,
        url: "https://github.com/openmrs/openmrs-esm-patient-management/pull/2426",
        status: "MERGED",
      },
    ],
  },
];

const STATUS_STYLES: Record<
  PR["status"],
  { bg: string; color: string; border: string }
> = {
  MERGED: {
    bg: "rgba(139,92,246,0.12)",
    color: "#a78bfa",
    border: "rgba(139,92,246,0.3)",
  },
  OPEN: {
    bg: "rgba(34,197,94,0.10)",
    color: "#4ade80",
    border: "rgba(34,197,94,0.3)",
  },
  CLOSED: {
    bg: "rgba(239,68,68,0.10)",
    color: "#f87171",
    border: "rgba(239,68,68,0.3)",
  },
};

function StatusBadge({ status }: { status: PR["status"] }) {
  const s = STATUS_STYLES[status];
  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border text-[10px] font-mono font-bold tracking-wider whitespace-nowrap shrink-0"
      style={{
        background: s.bg,
        color: s.color,
        borderColor: s.border,
      }}
    >
      <MergedIcon size={10} />
      {status}
    </div>
  );
}

function RepoRow({ repo }: { repo: Repo }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        background: "#09090b",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: 16,
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = "rgba(0,229,160,0.2)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")
      }
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "16px 20px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        {/* Avatar */}
        <img
          src={repo.avatarUrl}
          alt={repo.name}
          width={32}
          height={32}
          style={{ borderRadius: 8, flexShrink: 0, background: "#161b22" }}
          onError={(e) => {
            // fallback to github icon if avatar fails
            e.currentTarget.style.display = "none";
          }}
        />

        {/* Repo name */}
        <span
          style={{
            color: "#fff",
            fontSize: 15,
            fontWeight: 700,
            fontFamily: "inherit",
            flex: 1,
          }}
        >
          {repo.name}
        </span>

        {/* PR count */}
        <span
          style={{
            color: "#94a3b8",
            fontSize: 12,
            fontFamily: "var(--font-jetbrains), monospace",
            marginRight: 12,
          }}
        >
          {repo.prs.length} PR{repo.prs.length > 1 ? "s" : ""}
        </span>

        {/* Chevron */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#475569"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
            flexShrink: 0,
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Expanded PRs */}
      {open && (
        <div className="border-t border-white/[0.06]">
          {repo.prs.map((pr, i) => (
            <div
              key={pr.number}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:px-5 sm:py-3.5 border-t border-white/[0.04] bg-white/[0.015]"
              style={{ borderTop: i === 0 ? 'none' : undefined }}
            >
              {/* Profile & Avatar */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="relative">
                  <Image
                    height={32}
                    width={32}
                    className="rounded-full border border-white/10"
                    src={profileImg}
                    alt="Profile Image"
                    sizes="32px"
                    quality={85}
                  />
                  <span
                    className="absolute"
                    style={{ bottom: "-4px", left: "20px" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                      <rect width="24" height="24" rx="12" fill="black" />
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* PR info */}
              <div className="flex-1 min-w-0">
                <p className="text-[#e2e8f0] text-[13px] font-medium font-mono line-clamp-2 sm:line-clamp-none">
                  {pr.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-[#475569] text-[11px] font-mono">
                    #{pr.number}
                  </p>
                  <div className="w-1 h-1 rounded-full bg-slate-700" />
                  <p className="text-[#475569] text-[11px] font-mono truncate">
                    Brijesh-0106
                  </p>
                </div>
              </div>

              {/* Status & Link */}
              <div className="flex items-center gap-3 ml-auto sm:ml-0">
                <StatusBadge status={pr.status} />
                <a
                  href={pr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-emerald-400 transition-colors p-1"
                >
                  <ExternalLinkIcon size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function OpenSource() {
  const totalPRs = CONTRIBUTIONS.reduce((acc, r) => acc + r.prs.length, 0);
  const mergedPRs = CONTRIBUTIONS.reduce(
    (acc, r) => acc + r.prs.filter((p) => p.status === "MERGED").length,
    0,
  );

  return (
    <div className="w-full mx-auto mt-24 px-4">
      {/* Section heading */}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white shrink-0">
              <GitHubIcon size={20} />
            </div>
            <h2 className="text-[#f1f0f5] font-heading text-2xl font-bold tracking-tight">
              Open Source
            </h2>
          </div>
          <p className="text-[#7a7a8c] text-xs font-mono ml-1">
            Building and giving back to the community.
          </p>
        </div>

        {/* Quick stats */}
        <div className="flex gap-8 md:gap-10">
          <div>
            <p className="text-[#f1f0f5] text-xl font-bold font-mono leading-none">
              {totalPRs}
            </p>
            <p className="text-[#475569] text-[9px] font-mono mt-2 tracking-[0.15em] uppercase">
              Total PRs
            </p>
          </div>
          <div>
            <p className="text-[#a78bfa] text-xl font-bold font-mono leading-none">
              {mergedPRs}
            </p>
            <p className="text-[#475569] text-[9px] font-mono mt-2 tracking-[0.15em] uppercase">
              Merged
            </p>
          </div>
        </div>
      </div>

      {/* Repo list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {CONTRIBUTIONS.map((repo) => (
          <RepoRow key={repo.name} repo={repo} />
        ))}
      </div>
    </div >
  );
}
