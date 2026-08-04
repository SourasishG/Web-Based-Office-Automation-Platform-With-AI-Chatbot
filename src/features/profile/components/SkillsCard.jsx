import React from "react";
import { Code, Sparkles, Cpu, Award } from "lucide-react";
import { GlassPanel } from "../../../components/ui/GlassPanel";
import { GlassBadge } from "../../../components/ui/GlassBadge";

/**
 * SkillsCard - Apple Liquid Glass Technical Expertise Showcase
 * Renders technical proficiency progress indicators, domain skill badges, and mastery levels.
 * 
 * @param {Array<object>} skills - List of technical skill objects
 */
export const SkillsCard = ({ skills }) => {
  // Fallback Technical Skill Matrix
  const defaultSkills = [
    { name: "React 19 & Frontend Architecture", level: 98, category: "Expert", color: "from-cyan-500 to-blue-600" },
    { name: "Apple Liquid Glass UI / UX Design", level: 95, category: "Master", color: "from-purple-500 to-pink-600" },
    { name: "Tailwind CSS v4 & Framer Motion", level: 92, category: "Expert", color: "from-blue-500 to-cyan-500" },
    { name: "Node.js & REST API Architecture", level: 88, category: "Advanced", color: "from-emerald-500 to-teal-600" },
    { name: "AI & LLM Tool Integration", level: 85, category: "Advanced", color: "from-amber-500 to-orange-600" },
  ];

  const skillList = Array.isArray(skills) && skills.length > 0 ? skills : defaultSkills;

  return (
    <GlassPanel
      title="Technical Expertise"
      subtitle="Mastery & verified engineering competencies"
      icon={Code}
      action={
        <GlassBadge variant="cyan" size="sm" icon={Sparkles}>
          Verified Skills
        </GlassBadge>
      }
      variant="default"
      padding="none"
      className="h-full flex flex-col justify-between"
    >
      <div className="p-4 sm:p-5 space-y-4">
        {skillList.map((skill, idx) => (
          <div key={idx} className="space-y-1.5">
            {/* Skill Title & Level */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white tracking-tight">
                  {skill.name}
                </span>
                {skill.category && (
                  <GlassBadge
                    variant={skill.level >= 90 ? "cyan" : "primary"}
                    size="sm"
                  >
                    {skill.category}
                  </GlassBadge>
                )}
              </div>
              <span className="font-mono font-semibold text-cyan-300">
                {skill.level}%
              </span>
            </div>

            {/* Liquid Progress Line */}
            <div className="w-full h-2 rounded-full bg-slate-950/60 overflow-hidden border border-white/10 p-0.5 relative shadow-inner">
              <div
                style={{ width: `${skill.level}%` }}
                className={`h-full rounded-full bg-linear-to-r ${
                  skill.color || "from-cyan-500 to-blue-600"
                } shadow-[0_0_12px_rgba(6,182,212,0.5)] transition-all duration-700`}
              />
            </div>
          </div>
        ))}

        {/* Skill Badges Deck */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
          <GlassBadge variant="ghost" size="sm">System Design</GlassBadge>
          <GlassBadge variant="ghost" size="sm">Vite</GlassBadge>
          <GlassBadge variant="ghost" size="sm">Context API</GlassBadge>
          <GlassBadge variant="ghost" size="sm">Framer Motion</GlassBadge>
          <GlassBadge variant="ghost" size="sm">JWT Auth</GlassBadge>
          <GlassBadge variant="ghost" size="sm">Lucide Icons</GlassBadge>
        </div>
      </div>
    </GlassPanel>
  );
};

export default SkillsCard;