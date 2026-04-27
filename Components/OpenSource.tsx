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
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        borderRadius: 6,
        padding: "3px 10px",
        fontSize: 11,
        fontFamily: "Space Mono, monospace",
        fontWeight: 700,
        letterSpacing: "0.05em",
        whiteSpace: "nowrap",
      }}
    >
      <MergedIcon size={12} />
      {status}
    </div>
  );
}

function RepoRow({ repo }: { repo: Repo }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        background: "#0d1117",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 12,
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
      {/* Repo header row — clickable to expand */}
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
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "Space Mono, monospace",
            flex: 1,
          }}
        >
          {repo.name}
        </span>

        {/* PR count */}
        <span
          style={{
            color: "#475569",
            fontSize: 12,
            fontFamily: "Space Mono, monospace",
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
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {repo.prs.map((pr, i) => (
            <div
              key={pr.number}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 20px",
                borderTop: i > 0 ? "1px solid rgba(255,255,255,0.04)" : "none",
                background: "rgba(255,255,255,0.015)",
              }}
            >
              {/* PR info */}
              <div className="relative">
                <Image
                  height={32}
                  className="rounded-full"
                  width={32}
                  src={profileImg}
                  alt="Profile Image"
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
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    color: "#e2e8f0",
                    fontSize: 13,
                    fontWeight: 500,
                    fontFamily: "Space Mono, monospace",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {pr.title}
                </p>
                <div className="flex items-center" style={{ gap: "8px" }}>
                  <p
                    style={{
                      color: "#475569",
                      fontSize: 11,
                      fontFamily: "Space Mono, monospace",
                      marginTop: 2,
                    }}
                  >
                    Pull Request #{pr.number}{" "}
                  </p>
                  <span
                    className="flex items-center text-[#475569]"
                    style={{ gap: "4px" }}
                  >
                    <span
                      className="bg-gray-500 rounded-full flex"
                      style={{
                        backgroundColor: "gray",
                        height: "5px",
                        width: "5px",
                      }}
                    ></span>{" "}
                    <span
                      className="text-[#475569] text-[11px]"
                      style={{ color: "#475569", fontSize: "11px" }}
                    >
                      Brijesh-0106
                    </span>
                  </span>
                </div>
              </div>

              {/* Status badge */}
              <StatusBadge status={pr.status} />

              <a
                href={pr.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  color: "#475569",
                  display: "flex",
                  alignItems: "center",
                  transition: "color 0.2s",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00e5a0")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
              >
                <ExternalLinkIcon size={15} />
              </a>
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

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 32,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 10,
              }}
            >
              <GitHubIcon size={22} />
            </div>
            <h2
              style={{
                color: "#fff",
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 800,
                lineHeight: 1,
              }}
            >
              Open Source Contributions
            </h2>
          </div>
          <p
            style={{
              color: "#475569",
              fontSize: 13,
              fontFamily: "Space Mono, monospace",
            }}
          >
            Building and giving back to the community.
          </p>
        </div>

        {/* Quick stats */}
        <div style={{ display: "flex", gap: 24, flexShrink: 0 }}>
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                color: "#fff",
                fontSize: 28,
                fontWeight: 700,
                fontFamily: "Space Mono, monospace",
                lineHeight: 1,
              }}
            >
              {totalPRs}
            </p>
            <p
              style={{
                color: "#475569",
                fontSize: 10,
                fontFamily: "Space Mono, monospace",
                marginTop: 4,
                letterSpacing: "0.12em",
              }}
            >
              TOTAL PRs
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                color: "#a78bfa",
                fontSize: 28,
                fontWeight: 700,
                fontFamily: "Space Mono, monospace",
                lineHeight: 1,
              }}
            >
              {mergedPRs}
            </p>
            <p
              style={{
                color: "#475569",
                fontSize: 10,
                fontFamily: "Space Mono, monospace",
                marginTop: 4,
                letterSpacing: "0.12em",
              }}
            >
              MERGED
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
    </div>
  );
}
