import { useMemo } from "react";
import { Users, UserCheck, Clock, Star, Building2 } from "lucide-react";

/**
 * EmployeeStatsWidget - Quixotic Executive KPI Deck for Employee Directory
 * Positioned in the upper 60% Midnight Black region with lime accents.
 * 
 * @param {Array} employees - Array of employee object records
 * @param {object} statsData - Live aggregate statistics from backend
 */
export const EmployeeStatsWidget = ({ employees = [], statsData = null }) => {
  const stats = useMemo(() => {
    const total = statsData?.total ?? employees.length;
    const online =
      statsData?.onlineCount ??
      employees.filter(
        (e) => (e.presenceStatus || e.status || "").toLowerCase() === "online"
      ).length;
    const meetingOrAway =
      statsData &&
      typeof statsData.busyCount === "number" &&
      typeof statsData.awayCount === "number"
        ? statsData.busyCount + statsData.awayCount
        : employees.filter((e) => {
            const s = (e.presenceStatus || e.status || "").toLowerCase();
            return s === "busy" || s === "away" || s === "meeting";
          }).length;

    const scoreSum = employees.reduce(
      (acc, curr) => acc + (curr.performanceScore || 0),
      0
    );
    const avgScore =
      employees.length > 0 ? (scoreSum / employees.length).toFixed(1) : "4.9";

    const deptCounts = statsData?.departmentCounts || {};
    if (Object.keys(deptCounts).length === 0) {
      employees.forEach((e) => {
        if (e.department) {
          deptCounts[e.department] = (deptCounts[e.department] || 0) + 1;
        }
      });
    }

    let topDept = "Engineering";
    let maxDeptCount = 0;
    Object.entries(deptCounts).forEach(([dept, count]) => {
      if (count > maxDeptCount) {
        maxDeptCount = count;
        topDept = dept;
      }
    });

    return { total, online, meetingOrAway, avgScore, topDept };
  }, [employees, statsData]);

  const cards = [
    {
      id: "total-staff",
      title: "Total Headcount",
      value: stats.total,
      subtitle: "Verified Workspace Members",
      icon: Users,
      badgeText: "Active Roster",
    },
    {
      id: "online-now",
      title: "Online & Active",
      value: stats.online,
      subtitle: `${stats.total > 0 ? Math.round((stats.online / stats.total) * 100) : 0}% Engagement Rate`,
      icon: UserCheck,
      badgeText: "Live Presence",
    },
    {
      id: "busy-away",
      title: "In Syncs / Away",
      value: stats.meetingOrAway,
      subtitle: "In Calls or Stepped Away",
      icon: Clock,
      badgeText: "Busy Status",
    },
    {
      id: "performance-score",
      title: "Avg Performance",
      value: `${stats.avgScore} / 5.0`,
      subtitle: `Top Dept: ${stats.topDept}`,
      icon: Star,
      badgeText: "Top Tier",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="bg-[#141416] border border-white/10 rounded-3xl p-5 shadow-xl flex flex-col justify-between group hover:border-[#C6F432]/40 transition-all duration-300"
          >
            {/* Top Row: Icon & Badge */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="w-9 h-9 rounded-2xl bg-[#C6F432]/10 border border-[#C6F432]/20 flex items-center justify-center text-[#C6F432] group-hover:scale-110 transition-transform shrink-0">
                <Icon className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="px-2.5 py-0.5 text-[11px] font-semibold tracking-wide rounded-full bg-white/5 border border-white/10 text-zinc-300">
                {card.badgeText}
              </span>
            </div>

            {/* Bottom Content */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                {card.value}
              </h3>
              <p className="text-xs font-medium text-zinc-400 tracking-wide mt-1.5">
                {card.title}
              </p>
              <p className="text-[11px] text-zinc-500 mt-1 flex items-center gap-1">
                {card.id === "performance-score" && (
                  <Building2 className="w-3 h-3 text-[#C6F432] shrink-0" />
                )}
                <span>{card.subtitle}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EmployeeStatsWidget;
