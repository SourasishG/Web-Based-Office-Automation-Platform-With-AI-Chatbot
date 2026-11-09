import { isValidElement } from "react";
import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import { GlassCard } from "../../../components/ui/GlassCard";
import { GlassBadge } from "../../../components/ui/GlassBadge";

/**
 * StatCard - Apple Liquid Glass Executive KPI Card
 * Displays high-level workplace metrics with trend badges, specular light lines, and spring hover lifts.
 * 
 * @param {string} title - Metric label (e.g., "Active Employees")
 * @param {string | number} value - Main statistical value (e.g., "248")
 * @param {string} change - Growth or change statement (e.g., "+12% this month")
 * @param {'positive' | 'negative' | 'neutral'} changeType - Trend classification
 * @param {React.ReactNode} icon - Metric Lucide icon component
 * @param {'none' | 'blue' | 'cyan' | 'purple' | 'white'} glow - Ambient glow color
 * @param {function} onClick - Optional click handler
 */
export const StatCard = ({
  title,
  value,
  change,
  changeType = "positive",
  icon: Icon,
  glow = "none",
  onClick,
}) => {
  // Determine Trend Badge Variant & Icon
  const getTrendBadge = () => {
    if (!change) return null;
    return (
      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C6F432] text-[#0B0B0C] shadow-sm flex items-center gap-1">
        <TrendingUp className="w-2.5 h-2.5 stroke-[2.5]" />
        <span>{change}</span>
      </span>
    );
  };

  return (
    <div
      onClick={onClick}
      className="bg-[#141416] border border-white/10 hover:border-white/20 rounded-2xl p-4 shadow-xl flex flex-col justify-between text-white transition-all cursor-pointer group"
    >
      {/* Top Row: Metric Icon & Trend Badge */}
      <div className="flex items-start justify-between gap-2 mb-3">
        {Icon && (
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#C6F432] group-hover:bg-[#C6F432]/20 transition-all duration-300 shrink-0">
            {isValidElement(Icon) ? Icon : <Icon className="w-4 h-4" />}
          </div>
        )}

        <div className="shrink-0">{getTrendBadge()}</div>
      </div>

      {/* Main Metric Value & Title */}
      <div className="space-y-1">
        <h3 className="text-2xl font-extrabold tracking-tight text-white leading-none">
          {value}
        </h3>
        <p className="text-xs font-semibold text-zinc-400 tracking-wide">
          {title}
        </p>
      </div>
    </div>
  );
};

export default StatCard;