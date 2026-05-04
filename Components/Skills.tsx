"use client";

import { motion } from "framer-motion";

const SKILLS = [
  "React", "Next.js", "TypeScript", "Node.js", "Express", "PostgreSQL", 
  "MongoDB", "Prisma", "Tailwind CSS", "Framer Motion", "Docker", "AWS", 
  "Redis", "GraphQL", "Python", "FastAPI"
];

export default function Skills() {
  return (
    <div className="w-full overflow-hidden py-10 mt-10 relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#020617] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#020617] to-transparent z-10" />

      <div className="flex w-fit">
        <motion.div
          animate={{ x: [0, -1035] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
          className="flex gap-4 pr-4"
        >
          {[...SKILLS, ...SKILLS, ...SKILLS].map((skill, i) => (
            <div
              key={i}
              className="flex items-center justify-center whitespace-nowrap bg-[var(--color-glass)] backdrop-blur-md border border-white/10 rounded-full px-6 py-3 shadow-[0_0_15px_rgba(34,211,238,0.05)] hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all cursor-default"
            >
              <span className="text-slate-300 font-mono text-sm tracking-wide">
                {skill}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
