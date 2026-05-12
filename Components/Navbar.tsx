"use client";
import Link from "next/link";

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const NAV_LINKS = [
  { name: "Skills", path: "#skills" },
  { name: "Experience", path: "#experience" },
  { name: "Projects", path: "#projects" },
  { name: "Activity", path: "#activity" },
  { name: "Contact", path: "#contact" },
  { name: "Resume", path: "/Brijesh_Shah_Resume_final.pdf", isDownload: true },
];

const SOCIAL_LINKS = [
  { name: "GitHub",     url: "https://github.com/Brijesh-0106",      icon: <GitHubIcon />,   hover: "hover:text-white" },
  { name: "LinkedIn",   url: "https://linkedin.com/in/brijesh-0106", icon: <LinkedInIcon />, hover: "hover:text-blue-400" },
  { name: "Twitter / X",url: "https://x.com/BrijeshSha58142",        icon: <XIcon />,        hover: "hover:text-indigo-300" },
];

export default function Navbar() {
  return (
    <nav className="text-white absolute top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4 flex justify-center">
            <div className="relative p-[1px] rounded-full bg-gradient-to-r from-indigo-500/40 via-purple-500/20 to-indigo-500/40 shadow-[0_0_40px_rgba(99,102,241,0.15)]">
        <div className="bg-[#0a0a0f]/80 backdrop-blur-xl rounded-full px-8 py-3.5 flex items-center gap-8 border border-white/5">
          {/* Nav links */}
          <div className="hidden md:flex gap-8 items-center">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                target={item.isDownload ? "_blank" : undefined}
                download={item.isDownload ? "Brijesh_Shah_Resume_final.pdf" : undefined}
                className="text-[14px] font-medium text-slate-400 hover:text-white transition-colors duration-300 tracking-wide hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-5 bg-white/10" />

          {/* Social icons & Mobile Resume */}
          <div className="flex items-center gap-4">
            <a
              href="/Brijesh_Shah_Resume_final.pdf"
              target="_blank"
              download="Brijesh_Shah_Resume_final.pdf"
              className="md:hidden flex items-center justify-center text-[13px] font-medium px-3 py-1 rounded-full border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              Resume
            </a>
            
            <div className="md:hidden w-px h-4 bg-white/10" />

            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className={`text-[#45454f] ${s.hover} transition-colors duration-200`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
