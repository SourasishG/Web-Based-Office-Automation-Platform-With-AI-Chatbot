import { useMemo } from "react";
import { Users, Briefcase, Calendar, CheckSquare, Ticket } from "lucide-react";
import StatCard from "./StatCard";

/**
 * StatsGrid - Responsive Grid Wrapper for Executive KPI Cards
 * Maps workspace statistical indicators across a balanced 5-column responsive grid.
 * 
 * @param {Array<object>|object} stats - Metric array or KPI dictionary from backend
 */
export const StatsGrid = ({ stats }) => {
  const displayStats = useMemo(() => {
    // If stats is already a list of formatted cards
    if (Array.isArray(stats) && stats.length > 0) {
      return stats;
    }

    // If stats is the backend metrics object
    if (stats && typeof stats === "object" && !Array.isArray(stats)) {
      const staff = stats.staffCount ?? 5;
      const projects = stats.activeProjects ?? 2;
      const syncs = stats.todaysSyncs ?? 2;
      const tasks = stats.pendingTasks ?? 8;
      const tickets = stats.openTickets ?? 3;
      const critical = stats.criticalTickets ?? 0;
      const avgProgress = stats.averageProjectProgress ?? 50;

      return [
        {
          id: "employees",
          title: "Employees",
          value: String(staff),
          change: "100% active",
          changeType: "positive",
          icon: Users,
          glow: "cyan",
        },
        {
          id: "projects",
          title: "Active Projects",
          value: String(projects),
          change: `${avgProgress}% avg velocity`,
          changeType: "positive",
          icon: Briefcase,
          glow: "none",
        },
        {
          id: "syncs",
          title: "Today's Syncs",
          value: String(syncs),
          change: syncs > 0 ? `${syncs} scheduled today` : "No syncs today",
          changeType: "positive",
          icon: Calendar,
          glow: "none",
        },
        {
          id: "tasks",
          title: "Pending Tasks",
          value: String(tasks),
          change: "Sprint deliverables",
          changeType: "neutral",
          icon: CheckSquare,
          glow: "blue",
        },
        {
          id: "tickets",
          title: "Open Tickets",
          value: String(tickets),
          change: critical > 0 ? `${critical} critical SLA` : "SLA healthy",
          changeType: critical > 0 ? "negative" : "positive",
          icon: Ticket,
          glow: critical > 0 ? "purple" : "none",
        },
      ];
    }

    // Default Fallback
    return [
      {
        id: "employees",
        title: "Employees",
        value: "5",
        change: "Active roster",
        changeType: "positive",
        icon: Users,
        glow: "cyan",
      },
      {
        id: "projects",
        title: "Projects",
        value: "2",
        change: "+8% velocity",
        changeType: "positive",
        icon: Briefcase,
        glow: "none",
      },
      {
        id: "meetings",
        title: "Meetings",
        value: "2",
        change: "Today's agenda",
        changeType: "positive",
        icon: Calendar,
        glow: "none",
      },
      {
        id: "tasks",
        title: "Pending Tasks",
        value: "8",
        change: "Active sprint",
        changeType: "neutral",
        icon: CheckSquare,
        glow: "blue",
      },
      {
        id: "tickets",
        title: "Open Tickets",
        value: "3",
        change: "SLA monitored",
        changeType: "neutral",
        icon: Ticket,
        glow: "none",
      },
    ];
  }, [stats]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 w-full">
      {displayStats.map((stat, index) => (
        <StatCard
          key={stat.id || index}
          title={stat.title || stat.label}
          value={stat.value}
          change={stat.change || stat.trend}
          changeType={stat.changeType || (stat.isPositive ? "positive" : "neutral")}
          icon={stat.icon}
          glow={stat.glow || (index === 0 ? "cyan" : "none")}
        />
      ))}
    </div>
  );
};

export default StatsGrid;