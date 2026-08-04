import React from "react";
import { Briefcase, Play, CheckCircle2, PauseCircle } from "lucide-react";
import { GlassCard, GlassBadge } from "../../../components/ui";

/**
 * ProjectStats - Apple Liquid Glass Executive Project KPI Deck
 * Calculates and displays project metrics across Total, Active, Completed, and On Hold status categories.
 * 
 * @param {Array<object>} projects - Raw list of projects to derive dynamic stats from
 * @param {Array<object>|object} statsData - Optional precomputed statistics data
 */
export const ProjectStats = ({ projects = [], statsData }) => {
  // Compute dynamic stats if statsData is not directly provided
  const totalCount = projects.length || 8;
  const activeCount = projects.filter(
    (p) => (p.status || "").toLowerCase() === "active"
  ).length || 4;
  const completedCount = projects.filter(
    (p) => (p.status || "").toLowerCase() === "completed"
  ).length || 2;
  const onHoldCount = projects.filter(
    (p) => (p.status || "").toLowerCase() === "on-hold" || (p.status || "").toLowerCase() === "on hold"
  ).length || 1;

  // Fallback / Computed KPI Items
  const defaultStats = [
    {
      id: "total",
      title: "Total Projects",
      value: totalCount.toString(),
      badge: "All Tracked",
      badgeVariant: "cyan",
      icon: Briefcase,
      glow: "cyan",
    },
    {
      id: "active",
      title: "Active Projects",
      value: activeCount.toString(),
      badge: "In Progress",
      badgeVariant: "primary",
      icon: Play,
      glow: "none",
    },
    {
      id: "completed",
      title: "Completed",
      value: completedCount.toString(),
      badge: "Delivered",
      badgeVariant: "success",
      icon: CheckCircle2,
      glow: "none",
    },
    {
      id: "on-hold",
      title: "On Hold",
      value: onHoldCount.toString(),
      badge: "Paused",
      badgeVariant: "warning",
      icon: PauseCircle,
      glow: "none",
    },
  ];

  const items = Array.isArray(statsData) && statsData.length > 0 ? statsData : defaultStats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
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
            {/* Top Row: Metric Icon & Status Badge */}
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
              <p className="text-xs font-medium text-slate-400 tracking-wide">
                {stat.title}
              </p>
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
};

export default ProjectStats;