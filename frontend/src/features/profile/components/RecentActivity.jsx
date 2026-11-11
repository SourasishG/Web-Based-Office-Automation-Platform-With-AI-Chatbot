import {
  Activity,
  Clock,
  CheckCircle2,
  GitCommit,
  Layers,
  Sparkles,
} from "lucide-react";

/**
 * RecentActivity - Quixotic Pure White Executive Audit Timeline
 * Positioned in the lower 40% Pure White region with #0B0B0C typography and lime accents.
 *
 * @param {Array<object>} activities - List of user activity log objects
 */
export const RecentActivity = ({ activities }) => {
  const defaultActivities = [
    {
      id: "act-1",
      title: "Deployed Quixotic UI Across Workspace Modules",
      description:
        "Successfully upgraded core workspace modules to the 60:40 Midnight Black & Pure White + Lime design system.",
      timestamp: "15m ago",
      category: "Release",
      icon: Sparkles,
      isHighlight: true,
    },
    {
      id: "act-2",
      title: "Completed AI Assistant Architecture Review",
      description:
        "Finalized LLM tool calling schema and context window injection for the Office Aid assistant.",
      timestamp: "2h ago",
      category: "Architecture",
      icon: Layers,
    },
    {
      id: "act-3",
      title: "Merged PR #104: Framer Motion Spring Orchestration",
      description:
        "Enhanced dashboard entrance animations and smooth stagger physics across layout grids.",
      timestamp: "4h ago",
      category: "Git Commit",
      icon: GitCommit,
    },
    {
      id: "act-4",
      title: "Organized Q3 All-Hands Engineering Townhall",
      description:
        "Scheduled interactive briefing with engineering workforce members.",
      timestamp: "1d ago",
      category: "Executive Event",
      icon: CheckCircle2,
    },
  ];

  const logList =
    Array.isArray(activities) && activities.length > 0
      ? activities.map((act, idx) =>
          typeof act === "string"
            ? {
                id: `act-str-${idx}`,
                title: act,
                timestamp: "Recently",
                category: "Activity",
                icon: Activity,
              }
            : act
        )
      : defaultActivities;

  return (
    <div className="bg-white border border-zinc-200/80 rounded-3xl p-5 sm:p-6 shadow-sm hover:border-[#C6F432] transition-all duration-200 h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-zinc-200/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-[#0B0B0C] shrink-0">
            <Activity className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-base font-extrabold tracking-tight text-[#0B0B0C]">
              Recent Activity
            </h3>
            <p className="text-[11px] text-zinc-500">
              Executive operation & engineering audit timeline
            </p>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#C6F432] text-[#0B0B0C] shrink-0">
          Real-Time Log
        </span>
      </div>

      {/* Timeline Items */}
      <div className="relative pl-5 sm:pl-7 space-y-4 pt-5 flex-1">
        {/* Continuous Vertical Timeline Track */}
        <div className="absolute left-5 sm:left-7 top-7 bottom-4 w-0.5 bg-zinc-200 -translate-x-1/2 pointer-events-none" />

        {logList.map((item, idx) => {
          const Icon = item.icon || Activity;
          return (
            <div
              key={item.id || idx}
              className="relative flex items-start gap-4 sm:gap-5 group"
            >
              {/* Timeline Node Icon Circle */}
              <div
                className={`absolute -left-5 sm:-left-7 top-4 -translate-x-1/2 z-10 flex items-center justify-center w-7 h-7 rounded-full border shadow-xs ${
                  item.isHighlight || idx === 0
                    ? "bg-[#C6F432] border-[#C6F432] text-[#0B0B0C]"
                    : "bg-white border-zinc-300 text-[#0B0B0C]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>

              {/* Activity Tile */}
              <div className="flex-1 ml-2 p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 group-hover:border-[#C6F432] group-hover:bg-white transition-all duration-200">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h4 className="text-xs sm:text-sm font-extrabold text-[#0B0B0C] leading-snug">
                    {item.title}
                  </h4>

                  <div className="flex items-center gap-2">
                    {item.category && (
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          item.isHighlight || idx === 0
                            ? "bg-[#C6F432]/25 text-[#244203] border-[#C6F432]/50"
                            : "bg-zinc-100 text-zinc-700 border-zinc-200"
                        }`}
                      >
                        {item.category}
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1 font-semibold">
                      <Clock className="w-3 h-3 text-zinc-400" />
                      {item.timestamp}
                    </span>
                  </div>
                </div>

                {item.description && (
                  <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed mt-1">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
