import { Briefcase, Play, CheckCircle2, PauseCircle } from "lucide-react";

/**
 * ProjectStats - Executive KPI Deck for Projects Workspace
 * Positioned in the top 60% Midnight Black region with lime accents.
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
      icon: Briefcase,
    },
    {
      id: "active",
      title: "Active Projects",
      value: String(activeCount),
      badge: "In Progress",
      icon: Play,
    },
    {
      id: "completed",
      title: "Completed",
      value: String(completedCount),
      badge: "Delivered",
      icon: CheckCircle2,
    },
    {
      id: "on-hold",
      title: "On Hold",
      value: String(onHoldCount),
      badge: "Paused",
      icon: PauseCircle,
    },
  ];

  const items = Array.isArray(statsData) && statsData.length > 0 ? statsData : defaultStats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
      {items.map((stat, idx) => {
        const Icon = stat.icon || Briefcase;
        return (
          <div
            key={stat.id || idx}
            className="bg-[#141416] border border-white/10 hover:border-white/20 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col justify-between text-white transition-all group relative overflow-hidden"
          >
            {/* Top Row: Icon & Status Badge */}
            <div className="flex items-start justify-between gap-2 mb-4">
              <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-[#C6F432] group-hover:bg-[#C6F432]/20 transition-all duration-300 shrink-0">
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </div>

              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#C6F432] text-[#0B0B0C] shadow-sm">
                {stat.badge}
              </span>
            </div>

            {/* Main Metric & Title */}
            <div className="space-y-1">
              <h3 className="text-3xl font-extrabold tracking-tight text-white leading-none">
                {stat.value}
              </h3>
              <p className="text-xs font-semibold text-zinc-400 tracking-wide mt-1">
                {stat.title}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectStats;
