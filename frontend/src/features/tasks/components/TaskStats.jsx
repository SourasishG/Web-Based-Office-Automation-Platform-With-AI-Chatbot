import {
  CheckSquare,
  Circle,
  Clock,
  Eye,
  CheckCircle2,
} from "lucide-react";

/**
 * TaskStats - Executive KPI Deck for Tasks Workspace
 * Positioned in the upper 60% Midnight Black region with lime accents.
 * 
 * @param {Array<object>} tasks - List of task objects to calculate dynamic metrics
 * @param {Array<object>|object} statsData - Optional pre-calculated stats data
 */
export const TaskStats = ({ tasks = [], statsData }) => {
  const normStatus = (s) => (s || "").toLowerCase().replace(/[\s_]+/g, "-");

  const totalCount = statsData?.total !== undefined ? statsData.total : tasks.length;
  const todoCount = statsData?.todoCount !== undefined
    ? statsData.todoCount
    : tasks.filter((t) => ["todo", "to-do"].includes(normStatus(t.status))).length;
  const inProgressCount = statsData?.inProgressCount !== undefined
    ? statsData.inProgressCount
    : tasks.filter((t) => ["in-progress", "inprogress"].includes(normStatus(t.status))).length;
  const reviewCount = statsData?.reviewCount !== undefined
    ? statsData.reviewCount
    : tasks.filter((t) => ["review", "in-review"].includes(normStatus(t.status))).length;
  const completedCount = statsData?.completedCount !== undefined
    ? statsData.completedCount
    : tasks.filter((t) => ["completed", "done"].includes(normStatus(t.status))).length;

  const defaultStats = [
    {
      id: "total",
      title: "Total Tasks",
      value: String(totalCount),
      badge: "Workload",
      icon: CheckSquare,
    },
    {
      id: "todo",
      title: "To Do",
      value: String(todoCount),
      badge: "Pending",
      icon: Circle,
    },
    {
      id: "in-progress",
      title: "In Progress",
      value: String(inProgressCount),
      badge: "Active Sprint",
      icon: Clock,
    },
    {
      id: "review",
      title: "Under Review",
      value: String(reviewCount),
      badge: "QA / Audit",
      icon: Eye,
    },
    {
      id: "completed",
      title: "Completed",
      value: String(completedCount),
      badge: "Delivered",
      icon: CheckCircle2,
    },
  ];

  const items = Array.isArray(statsData) && statsData.length > 0 ? statsData : defaultStats;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 w-full">
      {items.map((stat, idx) => {
        const Icon = stat.icon || CheckSquare;
        return (
          <div
            key={stat.id || idx}
            className="bg-[#141416] border border-white/10 rounded-3xl p-5 shadow-xl flex flex-col justify-between group hover:border-[#C6F432]/40 transition-all duration-300"
          >
            {/* Top Row: Metric Icon & Status Badge */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="w-9 h-9 rounded-2xl bg-[#C6F432]/10 border border-[#C6F432]/20 flex items-center justify-center text-[#C6F432] group-hover:scale-110 transition-transform">
                <Icon className="w-4 h-4 stroke-[2.2]" />
              </div>

              {stat.badge && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/5 border border-white/10 text-zinc-300">
                  {stat.badge}
                </span>
              )}
            </div>

            {/* Metric Value & Title */}
            <div className="space-y-1">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-none">
                {stat.value}
              </h3>
              <p className="text-xs font-medium text-zinc-400 tracking-wide mt-1">
                {stat.title}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskStats;
