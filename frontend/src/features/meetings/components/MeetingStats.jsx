import React from "react";
import { Video, Clock, CheckCircle2, XCircle } from "lucide-react";
import { GlassCard, GlassBadge } from "../../../components/ui";

/**
 * MeetingStats - Apple Liquid Glass Executive Meeting KPI Deck
 * Displays key statistical metrics for today's, upcoming, completed, and cancelled meetings.
 * 
 * @param {Array<object> | object} stats - Meeting statistics dataset
 */
export const MeetingStats = ({ stats }) => {
  // Fallback Meeting KPI Data
  const defaultStats = [
    {
      id: "todays",
      title: "Today's Meetings",
      value: "2",
      badge: "Active Today",
      badgeVariant: "cyan",
      icon: Video,
      glow: "cyan",
    },
    {
      id: "upcoming",
      title: "Upcoming Syncs",
      value: "5",
      badge: "Scheduled",
      badgeVariant: "primary",
      icon: Clock,
      glow: "none",
    },
    {
      id: "completed",
      title: "Completed",
      value: "12",
      badge: "This Week",
      badgeVariant: "success",
      icon: CheckCircle2,
      glow: "none",
    },
    {
      id: "cancelled",
      title: "Cancelled",
      value: "1",
      badge: "This Month",
      badgeVariant: "ghost",
      icon: XCircle,
      glow: "none",
    },
  ];

  const items = Array.isArray(stats) && stats.length > 0 ? stats : defaultStats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
      {items.map((stat, idx) => {
        const Icon = stat.icon || Video;
        return (
          <GlassCard
            key={stat.id || idx}
            variant="standard"
            glow={stat.glow || "none"}
            hoverable
            className="flex flex-col justify-between h-full relative overflow-hidden group p-5"
          >
            {/* Top Row: Icon & Status Badge */}
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

export default MeetingStats;