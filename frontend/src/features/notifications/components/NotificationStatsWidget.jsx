import { useMemo } from "react";
import { Bell, BellRing, AlertTriangle, CheckCheck } from "lucide-react";

/**
 * NotificationStatsWidget - Quixotic Executive KPI Deck for Notification Center
 * Positioned in the upper 60% Midnight Black region with lime accents.
 *
 * @param {Array} notifications - Array of notification records
 * @param {object} statsData - Live statistics from backend stats endpoint
 */
export const NotificationStatsWidget = ({ notifications = [], statsData }) => {
  const stats = useMemo(() => {
    const total =
      statsData?.total !== undefined ? statsData.total : notifications.length;
    const unread =
      statsData?.unreadCount !== undefined
        ? statsData.unreadCount
        : notifications.filter((n) => !n.isRead).length;
    const urgent =
      statsData?.urgentCount !== undefined
        ? statsData.urgentCount
        : notifications.filter((n) => {
            const p = (n.priority || "").toLowerCase();
            return (p === "urgent" || p === "high" || p === "critical") && !n.isRead;
          }).length;
    const read =
      statsData?.readCount !== undefined
        ? statsData.readCount
        : notifications.filter((n) => n.isRead).length;

    return { total, unread, urgent, read };
  }, [notifications, statsData]);

  const cards = [
    {
      id: "total-alerts",
      title: "Total Alerts",
      value: stats.total,
      subtitle: `${stats.read} Processed / Read`,
      icon: Bell,
      badgeText: "System Activity",
    },
    {
      id: "unread-count",
      title: "Unread Notifications",
      value: stats.unread,
      subtitle: "Requires Attention",
      icon: BellRing,
      badgeText: stats.unread > 0 ? "Pending Action" : "All Caught Up",
    },
    {
      id: "urgent-priority",
      title: "Urgent & High Priority",
      value: stats.urgent,
      subtitle: "Critical Operational Alerts",
      icon: AlertTriangle,
      badgeText: stats.urgent > 0 ? "Immediate Focus" : "Clear Queue",
      urgent: stats.urgent > 0,
    },
    {
      id: "read-archived",
      title: "Acknowledged Alerts",
      value: stats.read,
      subtitle: "Read & Completed",
      icon: CheckCheck,
      badgeText: "History Log",
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
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 ${
                  card.urgent
                    ? "bg-rose-500/15 border border-rose-500/30 text-rose-400"
                    : "bg-[#C6F432]/10 border border-[#C6F432]/20 text-[#C6F432]"
                }`}
              >
                <Icon className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span
                className={`px-2.5 py-0.5 text-[11px] font-semibold tracking-wide rounded-full border ${
                  card.urgent
                    ? "bg-rose-500/15 border-rose-500/30 text-rose-300"
                    : "bg-white/5 border-white/10 text-zinc-300"
                }`}
              >
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
              <p className="text-[11px] text-zinc-500 mt-1">{card.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationStatsWidget;
