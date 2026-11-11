import { useMemo } from "react";
import {
  Briefcase,
  CheckSquare,
  Calendar,
  Ticket,
  TrendingUp,
  Award,
} from "lucide-react";

const DEFAULT_STATS = [
  {
    id: "projects",
    title: "Projects Managed",
    value: "8",
    description: "Active & Delivered",
    trend: "+2 this quarter",
    badge: "High Output",
    icon: Briefcase,
  },
  {
    id: "tasks",
    title: "Completed Tasks",
    value: "42",
    description: "Tasks closed this month",
    trend: "98% on-time",
    badge: "Top Execution",
    icon: CheckSquare,
  },
  {
    id: "meetings",
    title: "Meetings Attended",
    value: "16",
    description: "Syncs & architecture reviews",
    trend: "100% attendance",
    badge: "Engaged",
    icon: Calendar,
  },
  {
    id: "tickets",
    title: "Tickets Resolved",
    value: "5",
    description: "HR & IT helpdesk resolutions",
    trend: "Avg 12m response",
    badge: "Fast Response",
    icon: Ticket,
  },
  {
    id: "performance",
    title: "Performance Rating",
    value: "98%",
    description: "Executive review score",
    trend: "+3% vs Q2",
    badge: "Exceeds Target",
    icon: TrendingUp,
  },
  {
    id: "recognition",
    title: "Team Recognition",
    value: "12",
    description: "Peer commendations",
    trend: "3 this month",
    badge: "Key Contributor",
    icon: Award,
  },
];

/**
 * ProfileStats - Quixotic Executive Performance Metrics Deck
 * Positioned in the upper 60% Midnight Black region with lime accents.
 *
 * @param {Array<object>|object} stats - Array or object of user performance metrics
 */
export const ProfileStats = ({ stats }) => {
  const items = useMemo(() => {
    if (Array.isArray(stats) && stats.length > 0) return stats;

    const projectsVal = stats?.projects ?? stats?._count?.projectMemberships ?? 4;
    const tasksVal = stats?.tasks ?? stats?._count?.assignedTasks ?? 12;
    const meetingsVal = stats?.meetings ?? 6;
    const ticketsVal = stats?.tickets ?? stats?._count?.requestedTickets ?? 2;

    return [
      { ...DEFAULT_STATS[0], value: String(projectsVal) },
      { ...DEFAULT_STATS[1], value: String(tasksVal) },
      { ...DEFAULT_STATS[2], value: String(meetingsVal) },
      { ...DEFAULT_STATS[3], value: String(ticketsVal) },
      DEFAULT_STATS[4],
      DEFAULT_STATS[5],
    ];
  }, [stats]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 w-full h-full">
      {items.map((stat, idx) => {
        const Icon = stat.icon || Briefcase;
        return (
          <div
            key={stat.id || idx}
            className="bg-[#141416] border border-white/10 rounded-3xl p-5 shadow-xl flex flex-col justify-between h-full group hover:border-[#C6F432]/40 transition-all duration-300"
          >
            {/* Top Bar: Metric Icon & Badge */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="w-9 h-9 rounded-2xl bg-[#C6F432]/10 border border-[#C6F432]/20 flex items-center justify-center text-[#C6F432] group-hover:scale-110 transition-transform shrink-0">
                <Icon className="w-4 h-4 stroke-[2.2]" />
              </div>

              {stat.badge && (
                <span className="px-2.5 py-0.5 text-[11px] font-semibold tracking-wide rounded-full bg-white/5 border border-white/10 text-zinc-300">
                  {stat.badge}
                </span>
              )}
            </div>

            {/* Metric Value & Title */}
            <div>
              <h3 className="text-3xl font-extrabold tracking-tight text-white leading-none">
                {stat.value}
              </h3>
              <p className="text-xs font-semibold text-zinc-300 tracking-wide mt-1.5">
                {stat.title}
              </p>
              {stat.description && (
                <p className="text-[11px] text-zinc-500 mt-0.5 truncate">
                  {stat.description}
                </p>
              )}
            </div>

            {/* Bottom Trend */}
            {stat.trend && (
              <div className="mt-4 pt-2.5 border-t border-white/10 text-[11px] font-mono text-[#C6F432] flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3" />
                <span>{stat.trend}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProfileStats;
