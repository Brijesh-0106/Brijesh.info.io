"use client";

import { useState } from "react";

type ExpItem = {
  role: string;
  company: string;
  period: string;
  current: boolean;
  website?: string;
  linkedin?: string;
  description: string;
  bullets: string[];
  stack: string[];
};

const EXPERIENCE: ExpItem[] = [
  {
    role: "Software Engineer",
    company: "TCS",
    period: "Nov 2024 – Present",
    current: true,
    website: "https://jsparkAI.com",
    linkedin: "https://linkedin.com/company/jspark-ai",
    description:
      "Working as a full-stack developer building scalable web applications and backend systems.",
    bullets: [
      "Built a multi-role CRM system with RBAC, enabling structured workflows.",
      "Built a weather forecast platform using IMD datasets for real-time data delivery.",
      "Contributing to end-to-end feature development across frontend and backend.",
    ],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    role: "SDE Intern",
    company: "Jspark AI",
    period: "Jan 2024 – Nov 2024",
    current: true,
    website: "https://jsparkAI.com",
    linkedin: "https://linkedin.com/company/jspark-ai",
    description:
      "Working as a full-stack developer building scalable web applications and backend systems.",
    bullets: [
      "Built a multi-role CRM system with RBAC, enabling structured workflows.",
      "Built a weather forecast platform using IMD datasets for real-time data delivery.",
      "Contributing to end-to-end feature development across frontend and backend.",
    ],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Docker"],
  },
  // Add more experience items here
];

function WebIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Experience() {
  const [expanded, setExpanded] = useState<number>(0);

  return (
    <div className="w-full mx-auto mt-24 px-4" style={{ maxWidth: "70%" }}>
      {/* Section heading */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            color: "#00e5a0",
            background: "rgba(0,229,160,0.08)",
            border: "1px solid rgba(0,229,160,0.2)",
            borderRadius: 8,
            padding: 8,
            display: "flex",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          </svg>
        </div>
        <h2
          style={{
            color: "#fff",
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 800,
          }}
        >
          Experience
        </h2>
      </div>

      {/* Timeline */}
      <div style={{ position: "relative", paddingLeft: 32 }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: 6,
            top: 8,
            bottom: 8,
            width: 1,
            background:
              "linear-gradient(to bottom, rgba(0,229,160,0.5), rgba(0,229,160,0.05))",
          }}
        />

        {EXPERIENCE.map((exp, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              marginBottom: 40,
              cursor: "pointer",
            }}
            onClick={() => setExpanded(expanded === i ? -1 : i)}
          >
            {/* Timeline dot */}
            <div
              style={{
                position: "absolute",
                left: -30,
                top: 4,
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: expanded === i ? "#00e5a0" : "#1e3a2f",
                border: `2px solid ${expanded === i ? "#00e5a0" : "#2d4a3e"}`,
                transition: "all 0.2s",
                boxShadow:
                  expanded === i ? "0 0 12px rgba(0,229,160,0.5)" : "none",
              }}
            />

            {/* Header row */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <div>
                <h3
                  style={{
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: 700,
                    fontFamily: "Syne, sans-serif",
                    marginBottom: 6,
                  }}
                >
                  {exp.role}
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      color: "#00e5a0",
                      fontSize: 13,
                      fontWeight: 600,
                      fontFamily: "Space Mono, monospace",
                    }}
                  >
                    {exp.company}
                  </span>

                  {/* Web link */}
                  {exp.website && (
                    <a
                      href={exp.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{ color: "#475569", transition: "color 0.2s" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#00e5a0")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#475569")
                      }
                    >
                      <WebIcon />
                    </a>
                  )}

                  {/* LinkedIn link */}
                  {exp.linkedin && (
                    <a
                      href={exp.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{ color: "#475569", transition: "color 0.2s" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#0077b5")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#475569")
                      }
                    >
                      <LinkedInIcon />
                    </a>
                  )}

                  {/* Current badge */}
                  {exp.current && (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        fontFamily: "Space Mono, monospace",
                        color: "#00e5a0",
                        background: "rgba(0,229,160,0.1)",
                        border: "1px solid rgba(0,229,160,0.3)",
                        borderRadius: 4,
                        padding: "2px 8px",
                      }}
                    >
                      CURRENT
                    </span>
                  )}
                </div>
              </div>

              {/* Period */}
              <span
                style={{
                  color: "#00e5a0",
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "Space Mono, monospace",
                  whiteSpace: "nowrap",
                  marginLeft: 16,
                  marginTop: 2,
                }}
              >
                {exp.period}
              </span>
            </div>

            {/* Expandable content */}
            <div
              style={{
                overflow: "hidden",
                maxHeight: expanded === i ? 600 : 0,
                opacity: expanded === i ? 1 : 0,
                transition: "max-height 0.35s ease, opacity 0.25s ease",
              }}
            >
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: 14,
                  lineHeight: 1.8,
                  fontFamily: "Space Mono, monospace",
                  marginBottom: 16,
                }}
              >
                {exp.description}
              </p>

              {/* Bullet points */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                {exp.bullets.map((b, bi) => (
                  <div
                    key={bi}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: "#1e2530",
                        border: "1px solid #2d3748",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      <div
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: "#475569",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        color: "#94a3b8",
                        fontSize: 13,
                        lineHeight: 1.7,
                        fontFamily: "Space Mono, monospace",
                      }}
                    >
                      {b}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stack tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {exp.stack.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontSize: 11,
                      fontFamily: "Space Mono, monospace",
                      color: "#00e5a0",
                      background: "rgba(0,229,160,0.06)",
                      border: "1px solid rgba(0,229,160,0.2)",
                      borderRadius: 4,
                      padding: "3px 10px",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Collapsed hint */}
            {expanded !== i && (
              <p
                style={{
                  color: "#2d4a3e",
                  fontSize: 12,
                  fontFamily: "Space Mono, monospace",
                  marginTop: 4,
                }}
              >
                click to expand ↓
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
