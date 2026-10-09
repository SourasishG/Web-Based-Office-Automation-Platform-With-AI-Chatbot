import React from "react";
import { ArrowUpRight } from "lucide-react";
import { GlassCard } from "../../../components/ui/GlassCard";

/**
 * QuickActionCard - Apple Liquid Glass Quick Action Trigger Tile
 * Interactive button card for immediate workspace shortcuts (+ Task, + Meeting, + Ticket).
 * 
 * @param {string} title - Action label
 * @param {string} description - Brief subtitle explanation
 * @param {React.ReactNode} icon - Action icon component
 * @param {function} onClick - Click action handler
 * @param {'none' | 'blue' | 'cyan' | 'purple' | 'white'} glow - Ambient hover glow color
 */
export const QuickActionCard = ({
  title,
  description,
  icon: Icon,
  onClick,
  glow = "none",
}) => {
  return (
    <GlassCard
      variant="interactive"
      glow={glow}
      hoverable
      onClick={onClick}
      className="!p-3.5 relative overflow-hidden group cursor-pointer"
    >
      <div className="flex items-center justify-between gap-2.5 w-full">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Action Icon Container */}
          {Icon && (
            <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/40 group-hover:text-cyan-300 transition-all duration-300 shrink-0">
              {React.isValidElement(Icon) ? Icon : <Icon className="w-4.5 h-4.5" />}
            </div>
          )}

          {/* Title & Description */}
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors truncate">
              {title}
            </h4>
            {description && (
              <p className="text-[11px] text-slate-400 truncate mt-0.5">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Right Arrow Indicator */}
        <div className="p-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 group-hover:text-white group-hover:bg-white/15 transition-all duration-200 shrink-0">
          <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </GlassCard>
  );
};

export default QuickActionCard;