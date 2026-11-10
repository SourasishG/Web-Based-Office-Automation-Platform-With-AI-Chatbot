import { Video, Clock, CheckCircle2, Calendar } from "lucide-react";

/**
 * MeetingStats - Quixotic Executive Meeting KPI Deck
 * Positioned in the upper 60% Midnight Black region.
 * 
 * @param {Array<object> | object} stats - Meeting statistics dataset
 */
export const MeetingStats = ({ stats }) => {
  const todayVal = stats?.todayCount ?? stats?.todays ?? "0";
  const upcomingVal = stats?.upcomingCount ?? stats?.upcoming ?? "0";
  const completedVal = stats?.completedCount ?? stats?.completed ?? "0";
  const totalVal = stats?.total ?? "0";

  const defaultStats = [
    {
      id: "todays",
      title: "Today's Meetings",
      value: String(todayVal),
      badge: "Active Today",
      icon: Video,
    },
    {
      id: "upcoming",
      title: "Upcoming Syncs",
      value: String(upcomingVal),
      badge: "Scheduled",
      icon: Clock,
    },
    {
      id: "completed",
      title: "Completed",
      value: String(completedVal),
      badge: "Archived",
      icon: CheckCircle2,
    },
    {
      id: "total",
      title: "Total Syncs",
      value: String(totalVal),
      badge: "Workspace",
      icon: Calendar,
    },
  ];

  const items = Array.isArray(stats) && stats.length > 0 ? stats : defaultStats;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
      {items.map((stat, idx) => {
        const Icon = stat.icon || Video;
        return (
          <div
            key={stat.id || idx}
            className="bg-[#141416] border border-white/10 rounded-3xl p-5 shadow-xl flex flex-col justify-between group hover:border-[#C6F432]/40 transition-all duration-300"
          >
            {/* Top Row: Icon & Status Badge */}
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

export default MeetingStats;
