import { useMemo } from "react";
import { Users, UserCheck, Clock, Star, Building2 } from "lucide-react";
import { GlassCard } from "../../../components/ui/GlassCard";

/**
 * EmployeeStatsWidget - Top Metric Cards for Employee Directory
 * Displays key HR metrics: total staff headcount, online status, average performance rating, etc.
 * 
 * @param {Array} employees - Array of employee object records
 */
export const EmployeeStatsWidget = ({ employees = [] }) => {
  const stats = useMemo(() => {
    const total = employees.length;
    const online = employees.filter((e) => e.status === "online").length;
    const meetingOrAway = employees.filter((e) => e.status === "meeting" || e.status === "away").length;
    
    // Average score calculation
    const scoreSum = employees.reduce((acc, curr) => acc + (curr.performanceScore || 0), 0);
    const avgScore = total > 0 ? (scoreSum / total).toFixed(1) : "0.0";

    // Top department breakdown
    const deptCounts = {};
    employees.forEach((e) => {
      deptCounts[e.department] = (deptCounts[e.department] || 0) + 1;
    });

    let topDept = "Engineering";
    let maxDeptCount = 0;
    Object.entries(deptCounts).forEach(([dept, count]) => {
      if (count > maxDeptCount) {
        maxDeptCount = count;
        topDept = dept;
      }
    });

    return { total, online, meetingOrAway, avgScore, topDept };
  }, [employees]);

  const cards = [
    {
      id: "total-staff",
      title: "Total Headcount",
      value: stats.total,
      subtitle: "Verified Workspace Members",
      icon: Users,
      glow: "cyan",
      badgeText: "Active Roster",
    },
    {
      id: "online-now",
      title: "Online & Active",
      value: stats.online,
      subtitle: `${stats.total > 0 ? Math.round((stats.online / stats.total) * 100) : 0}% Engagement Rate`,
      icon: UserCheck,
      glow: "blue",
      badgeText: "Live Presence",
    },
    {
      id: "busy-away",
      title: "In Syncs / Away",
      value: stats.meetingOrAway,
      subtitle: "In Calls or Stepped Away",
      icon: Clock,
      glow: "purple",
      badgeText: "Busy Status",
    },
    {
      id: "performance-score",
      title: "Avg Performance",
      value: `${stats.avgScore} / 5.0`,
      subtitle: `Top Dept: ${stats.topDept}`,
      icon: Star,
      glow: "white",
      badgeText: "Top Tier",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <GlassCard
            key={card.id}
            variant="standard"
            glow={card.glow}
            className="p-5 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Top Row: Icon & Badge */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-400/20">
                {card.badgeText}
              </span>
            </div>

            {/* Bottom Content */}
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                {card.title}
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">
                {card.value}
              </h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                {card.id === "performance-score" && <Building2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                {card.subtitle}
              </p>
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
};

export default EmployeeStatsWidget;
