"use client";

import { motion } from "framer-motion";

const SKILLS = [
  "React", "Next.js", "TypeScript", "Node.js", "Express", "PostgreSQL",
  "MongoDB", "Prisma", "Tailwind", "Docker", "Java", "Springboot",
  "Python"
];

export default function Skills() {
  return (
    <div className="w-full overflow-hidden py-10 mt-10 relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#08080c] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#08080c] to-transparent z-10" />

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
              className="flex items-center justify-center whitespace-nowrap bg-[#0f0f17] backdrop-blur-md border border-white/[0.07] rounded-full px-6 py-3 hover:border-indigo-400/30 hover:bg-indigo-500/[0.06] transition-all cursor-default"
            >
              <span className="text-[#7a7a8c] font-mono text-sm tracking-wide">
                {skill}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
