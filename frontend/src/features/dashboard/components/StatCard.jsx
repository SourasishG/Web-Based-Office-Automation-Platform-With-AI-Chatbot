import React from "react";
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
    if (changeType === "positive") {
      return (
        <GlassBadge variant="success" size="sm" icon={TrendingUp}>
          {change}
        </GlassBadge>
      );
    }
    if (changeType === "negative") {
      return (
        <GlassBadge variant="danger" size="sm" icon={TrendingDown}>
          {change}
        </GlassBadge>
      );
    }
    return (
      <GlassBadge variant="cyan" size="sm" icon={ArrowUpRight}>
        {change}
      </GlassBadge>
    );
  };

  return (
    <GlassCard
      variant="standard"
      glow={glow}
      hoverable
      onClick={onClick}
      className="flex flex-col justify-between h-full relative overflow-hidden group"
    >
      {/* Top Row: Metric Icon & Trend Badge */}
      <div className="flex items-start justify-between gap-2 mb-4">
        {Icon && (
          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/40 group-hover:text-cyan-300 transition-all duration-300 shrink-0">
            {React.isValidElement(Icon) ? Icon : <Icon className="w-5 h-5" />}
          </div>
        )}

        <div className="shrink-0">{getTrendBadge()}</div>
      </div>

      {/* Main Metric Value & Title */}
      <div className="space-y-1">
        <h3 className="text-3xl font-extrabold tracking-tight text-white leading-none">
          {value}
        </h3>
        <p className="text-xs font-medium text-slate-400 tracking-wide">
          {title}
        </p>
      </div>

      {/* Subtle Bottom Ambient Gradient Highlight */}
      <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-gradient-to-tr from-cyan-500/10 via-blue-500/5 to-transparent rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all duration-500 pointer-events-none" />
    </GlassCard>
  );
};

export default StatCard;