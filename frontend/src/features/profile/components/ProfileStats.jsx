import React from "react";
import {
  Briefcase,
  CheckSquare,
  Calendar,
  Ticket,
  TrendingUp,
  Award,
} from "lucide-react";
import { GlassCard, GlassBadge } from "../../../components/ui";

/**
 * ProfileStats - Apple Liquid Glass Executive Performance Metrics Deck
 * Renders employee KPI statistics, task accomplishments, and attendance ratings.
 * 
 * @param {Array<object>|object} stats - Array or object of user performance metrics
 */
export const ProfileStats = ({ stats }) => {
  // Fallback Executive Performance Metrics
  const defaultStats = [
    {
      id: "projects",
      title: "Projects Managed",
      value: "8",
      description: "Active & Delivered",
      trend: "+2 this quarter",
      badge: "High Output",
      badgeVariant: "cyan",
      icon: Briefcase,
      glow: "cyan",
    },
    {
      id: "tasks",
      title: "Completed Tasks",
      value: "42",
      description: "Tasks closed this month",
      trend: "98% on-time",
      badge: "Top Execution",
      badgeVariant: "success",
      icon: CheckSquare,
      glow: "none",
    },
    {
      id: "meetings",
      title: "Meetings Attended",
      value: "16",
      description: "Syncs & architecture reviews",
      trend: "100% attendance",
      badge: "Engaged",
      badgeVariant: "primary",
      icon: Calendar,
      glow: "none",
    },
    {
      id: "tickets",
      title: "Tickets Resolved",
      value: "5",
      description: "HR & IT helpdesk resolutions",
      trend: "Avg 12m response",
      badge: "Fast Response",
      badgeVariant: "purple",
      icon: Ticket,
      glow: "purple",
    },
    {
      id: "performance",
      title: "Performance Rating",
      value: "98%",
      description: "Executive review score",
      trend: "+3% vs Q2",
      badge: "Exceeds Expectations",
      badgeVariant: "success",
      icon: TrendingUp,
      glow: "none",
    },
    {
      id: "recognition",
      title: "Team Recognition",
      value: "12",
      description: "Peer commendations",
      trend: "3 this month",
      badge: "Key Contributor",
      badgeVariant: "warning",
      icon: Award,
      glow: "none",
    },
  ];

  const items = Array.isArray(stats) && stats.length > 0 ? stats : defaultStats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 w-full h-full">
      {items.map((stat, idx) => {
        const Icon = stat.icon || Briefcase;
        return (
          <GlassCard
            key={stat.id || idx}
            variant="standard"
            glow={stat.glow || "none"}
            hoverable
            className="flex flex-col justify-between h-full relative overflow-hidden group p-5"
          >
            {/* Top Bar: Metric Icon & Badge */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/40 group-hover:text-cyan-300 transition-all duration-300 shrink-0">
                <Icon className="w-5 h-5" />
              </div>

              {stat.badge && (
                <GlassBadge variant={stat.badgeVariant || "cyan"} size="sm">
                  {stat.badge}
                </GlassBadge>
              )}
            </div>

            {/* Metric Value & Title */}
            <div className="space-y-1">
              <h3 className="text-3xl font-extrabold tracking-tight text-white leading-none">
                {stat.value}
              </h3>
              <p className="text-xs font-semibold text-slate-200 tracking-wide mt-1">
                {stat.title}
              </p>
              {stat.description && (
                <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                  {stat.description}
                </p>
              )}
            </div>

            {/* Bottom Trend */}
            {stat.trend && (
              <div className="mt-4 pt-2.5 border-t border-white/10 text-[11px] font-mono text-cyan-300 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>{stat.trend}</span>
              </div>
            )}
          </GlassCard>
        );
      })}
    </div>
  );
};

export default ProfileStats;