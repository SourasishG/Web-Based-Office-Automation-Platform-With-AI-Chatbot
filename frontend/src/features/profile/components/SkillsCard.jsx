import { Code, Sparkles } from "lucide-react";

/**
 * SkillsCard - Quixotic Pure White Technical Expertise Showcase
 * Positioned in the lower 40% Pure White region with #0B0B0C typography and lime accents.
 *
 * @param {Array<object|string>} skills - List of technical skill items
 */
export const SkillsCard = ({ skills }) => {
  const defaultSkills = [
    { name: "React 19 & Frontend Architecture", level: 98, category: "Expert" },
    { name: "Quixotic UI / UX Systems", level: 95, category: "Master" },
    { name: "Tailwind CSS v4 & Framer Motion", level: 92, category: "Expert" },
    { name: "Node.js & REST API Architecture", level: 88, category: "Advanced" },
    { name: "AI & LLM Tool Integration", level: 85, category: "Advanced" },
  ];

  const skillList =
    Array.isArray(skills) && skills.length > 0
      ? skills.map((s, idx) => {
          if (typeof s === "string") {
            const levels = [95, 92, 88, 85, 90, 84, 89];
            const categories = ["Master", "Expert", "Advanced", "Proficient"];
            return {
              name: s,
              level: levels[idx % levels.length],
              category: categories[idx % categories.length],
            };
          }
          return s;
        })
      : defaultSkills;

  const techBadges = [
    "System Design",
    "Vite",
    "Context API",
    "Framer Motion",
    "JWT Auth",
    "Lucide Icons",
  ];

  return (
    <div className="bg-white border border-zinc-200/80 rounded-3xl p-5 sm:p-6 shadow-sm hover:border-[#C6F432] transition-all duration-200 h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-zinc-200/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-[#0B0B0C] shrink-0">
            <Code className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-base font-extrabold tracking-tight text-[#0B0B0C]">
              Technical Expertise
            </h3>
            <p className="text-[11px] text-zinc-500">
              Mastery & verified engineering competencies
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#C6F432]/25 text-[#244203] border border-[#C6F432]/50 shrink-0">
          <Sparkles className="w-3 h-3 text-[#386b03]" />
          Verified Skills
        </span>
      </div>

      {/* Skill Progress Rows */}
      <div className="py-5 space-y-4 flex-1">
        {skillList.map((skill, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-bold text-[#0B0B0C] tracking-tight truncate">
                  {skill.name}
                </span>
                {skill.category && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${
                      skill.level >= 90
                        ? "bg-[#C6F432]/25 text-[#244203] border-[#C6F432]/50"
                        : "bg-zinc-100 text-zinc-700 border-zinc-200"
                    }`}
                  >
                    {skill.category}
                  </span>
                )}
              </div>
              <span className="font-mono font-extrabold text-[#0B0B0C] shrink-0">
                {skill.level}%
              </span>
            </div>

            <div className="w-full h-2.5 rounded-full bg-zinc-100 overflow-hidden border border-zinc-200 p-0.5">
              <div
                style={{ width: `${skill.level}%` }}
                className={`h-full rounded-full transition-all duration-700 ${
                  skill.level >= 90 ? "bg-[#C6F432]" : "bg-[#0B0B0C]"
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Stack Tags */}
      <div className="pt-4 border-t border-zinc-200/80 flex flex-wrap gap-1.5">
        {techBadges.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-zinc-100 text-zinc-700 border border-zinc-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillsCard;
