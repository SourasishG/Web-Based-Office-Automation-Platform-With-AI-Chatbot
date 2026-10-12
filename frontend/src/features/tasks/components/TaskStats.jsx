import {
  CheckSquare,
  Circle,
  Clock,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { GlassCard, GlassBadge } from "../../../components/ui";

/**
 * TaskStats - Apple Liquid Glass Executive Task KPI Deck
 * Computes and renders task volume breakdown across Total, To Do, In Progress, Review, and Completed statuses.
 * 
 * @param {Array<object>} tasks - List of task objects to calculate dynamic metrics
 * @param {Array<object>|object} statsData - Optional pre-calculated stats data
 */
export const TaskStats = ({ tasks = [], statsData }) => {
  // Normalize Status Matcher Helper
  const getCountByStatus = (statusKeys) => {
    return tasks.filter((t) => {
      const s = (t.status || "").toLowerCase().replace(/\s+/g, "-");
      return statusKeys.some((k) => s === k);
    }).length;
  };

  const totalCount = statsData?.total !== undefined ? statsData.total : tasks.length;
  const todoCount = statsData?.todoCount !== undefined
    ? statsData.todoCount
    : getCountByStatus(["todo", "to-do", "to_do"]);
  const inProgressCount = statsData?.inProgressCount !== undefined
    ? statsData.inProgressCount
    : getCountByStatus(["in-progress", "in_progress", "inprogress"]);
  const reviewCount = statsData?.reviewCount !== undefined
    ? statsData.reviewCount
    : getCountByStatus(["review", "in-review"]);
  const completedCount = statsData?.completedCount !== undefined
    ? statsData.completedCount
    : getCountByStatus(["completed", "done"]);

  // Fallback / Dynamic KPI Cards Configuration
  const defaultStats = [
    {
      id: "total",
      title: "Total Tasks",
      value: String(totalCount),
      badge: "Tracked",
      badgeVariant: "cyan",
      icon: CheckSquare,
      glow: "cyan",
    },
    {
      id: "todo",
      title: "To Do",
      value: String(todoCount),
      badge: "Pending",
      badgeVariant: "default",
      icon: Circle,
      glow: "none",
    },
    {
      id: "in-progress",
      title: "In Progress",
      value: String(inProgressCount),
      badge: "Active",
      badgeVariant: "primary",
      icon: Clock,
      glow: "blue",
    },
    {
      id: "review",
      title: "Under Review",
      value: String(reviewCount),
      badge: "Verification",
      badgeVariant: "purple",
      icon: Eye,
      glow: "purple",
    },
    {
      id: "completed",
      title: "Completed",
      value: String(completedCount),
      badge: "Done",
      badgeVariant: "success",
      icon: CheckCircle2,
      glow: "none",
    },
  ];

  const items = Array.isArray(statsData) && statsData.length > 0 ? statsData : defaultStats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 w-full">
      {items.map((stat, idx) => {
        const Icon = stat.icon || CheckSquare;
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

export default TaskStats;