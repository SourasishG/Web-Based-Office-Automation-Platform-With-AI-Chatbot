import { Briefcase, Play, CheckCircle2, PauseCircle } from "lucide-react";
import { GlassCard } from "../../../components/ui";

/**
 * ProjectStats - Apple Liquid Glass Executive Project KPI Deck
 * Calculates and displays project metrics across Total, Active, Completed, and On Hold status categories.
 * 
 * @param {Array<object>} projects - Raw list of projects to derive dynamic stats from
 * @param {Array<object>|object} statsData - Optional precomputed statistics data
 */
export const ProjectStats = ({ projects = [], statsData }) => {
  const normStatus = (s) => (s || "").toUpperCase().replace(/[\s-]+/g, "_");

  const totalCount =
    statsData?.total !== undefined ? statsData.total : projects.length;
  const activeCount =
    statsData?.activeCount !== undefined
      ? statsData.activeCount
      : projects.filter((p) => normStatus(p.status) === "ACTIVE").length;
  const completedCount =
    statsData?.completedCount !== undefined
      ? statsData.completedCount
      : projects.filter((p) => normStatus(p.status) === "COMPLETED").length;
  const onHoldCount =
    statsData?.onHoldCount !== undefined
      ? statsData.onHoldCount
      : projects.filter((p) => normStatus(p.status) === "ON_HOLD").length;

  const defaultStats = [
    {
      id: "total",
      title: "Total Projects",
      value: String(totalCount),
      badge: "All Tracked",
      badgeVariant: "cyan",
      icon: Briefcase,
      glow: "cyan",
    },
    {
      id: "active",
      title: "Active Projects",
      value: String(activeCount),
      badge: "In Progress",
      badgeVariant: "primary",
      icon: Play,
      glow: "none",
    },
    {
      id: "completed",
      title: "Completed",
      value: String(completedCount),
      badge: "Delivered",
      badgeVariant: "success",
      icon: CheckCircle2,
      glow: "none",
    },
    {
      id: "on-hold",
      title: "On Hold",
      value: String(onHoldCount),
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
            {/* Top Row: Icon & Status Badge */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/40 group-hover:text-cyan-300 transition-all duration-300 shrink-0">
                <Icon className="w-5 h-5" />
              </div>

              {stat.badge && (
                <span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-400/20">
                  {stat.badge}
                </span>
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