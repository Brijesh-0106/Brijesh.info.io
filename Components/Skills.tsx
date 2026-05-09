"use client";

const SKILLS = [
  "React", "Next.js", "TypeScript", "Node.js", "Express", "PostgreSQL",
  "MongoDB", "Prisma", "Tailwind CSS", "Docker", "Java", "Spring Boot",
  "Python", "AWS", "Git", "REST APIs"
];

export default function Skills() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-8 py-16 mt-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-lg p-2 flex">
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
            <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" />
          </svg>
        </div>
        <h2 className="text-[#f1f0f5] font-heading text-2xl font-bold tracking-tight">
          Technical Skills
        </h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {SKILLS.map((skill, i) => (
          <div
            key={i}
            className="flex items-center justify-center whitespace-nowrap bg-[#0f0f17] border border-white/[0.07] rounded-lg px-5 py-2.5 hover:border-indigo-400/30 hover:bg-indigo-500/[0.06] transition-all cursor-default shadow-sm hover:-translate-y-0.5"
          >
            <span className="text-[#a8a8b8] font-mono text-sm tracking-wide">
              {skill}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
