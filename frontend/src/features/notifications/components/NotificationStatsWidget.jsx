import { useMemo } from "react";
import { Bell, BellRing, AlertTriangle, CheckCheck } from "lucide-react";
import { GlassCard } from "../../../components/ui/GlassCard";

/**
 * NotificationStatsWidget - Summary metric cards for Notification Center
 * 
 * @param {Array} notifications - Array of notification records
 */
export const NotificationStatsWidget = ({ notifications = [] }) => {
  const stats = useMemo(() => {
    const total = notifications.length;
    const unread = notifications.filter((n) => !n.isRead).length;
    const urgent = notifications.filter((n) => (n.priority === "urgent" || n.priority === "high") && !n.isRead).length;
    const read = notifications.filter((n) => n.isRead).length;

    return { total, unread, urgent, read };
  }, [notifications]);

  const cards = [
    {
      id: "total-alerts",
      title: "Total Alerts",
      value: stats.total,
      subtitle: `${stats.read} Processed / Read`,
      icon: Bell,
      glow: "cyan",
      badgeText: "System Activity",
    },
    {
      id: "unread-count",
      title: "Unread Notifications",
      value: stats.unread,
      subtitle: "Requires Attention",
      icon: BellRing,
      glow: "blue",
      badgeText: stats.unread > 0 ? "Pending Action" : "All Caught Up",
    },
    {
      id: "urgent-priority",
      title: "Urgent & High Priority",
      value: stats.urgent,
      subtitle: "Critical Operational Alerts",
      icon: AlertTriangle,
      glow: stats.urgent > 0 ? "purple" : "white",
      badgeText: stats.urgent > 0 ? "Immediate Focus" : "Clear Queue",
    },
    {
      id: "read-archived",
      title: "Acknowledged Alerts",
      value: stats.read,
      subtitle: "Read & Completed",
      icon: CheckCheck,
      glow: "white",
      badgeText: "History Log",
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
              <p className="text-xs text-slate-400 mt-1">
                {card.subtitle}
              </p>
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
};

export default NotificationStatsWidget;
