import React from "react";
import { Users, Briefcase, Calendar, Mail, Ticket } from "lucide-react";
import StatCard from "./StatCard";

/**
 * StatsGrid - Responsive Grid Wrapper for Executive KPI Cards
 * Maps workspace statistical indicators across a balanced 5-column responsive grid.
 * 
 * @param {Array<object>} stats - Array of metric items
 */
export const StatsGrid = ({ stats }) => {
  // Fallback / Default Metric Items matching Office Aid Platform metrics
  const defaultStats = [
    {
      id: "employees",
      title: "Employees",
      value: "248",
      change: "+12% this month",
      changeType: "positive",
      icon: Users,
      glow: "cyan",
    },
    {
      id: "projects",
      title: "Projects",
      value: "38",
      change: "+8% this month",
      changeType: "positive",
      icon: Briefcase,
      glow: "none",
    },
    {
      id: "meetings",
      title: "Meetings",
      value: "12",
      change: "+4% this week",
      changeType: "positive",
      icon: Calendar,
      glow: "none",
    },
    {
      id: "emails",
      title: "Unread Emails",
      value: "86",
      change: "+21% today",
      changeType: "neutral",
      icon: Mail,
      glow: "blue",
    },
    {
      id: "tickets",
      title: "Open Tickets",
      value: "19",
      change: "+6% this week",
      changeType: "neutral",
      icon: Ticket,
      glow: "none",
    },
  ];

  const displayStats = stats && stats.length > 0 ? stats : defaultStats;

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