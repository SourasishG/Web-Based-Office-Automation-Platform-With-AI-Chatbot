import { useMemo } from "react";
import {
  Ticket,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

/**
 * TicketStatsWidget - Quixotic Executive KPI Deck for IT Helpdesk & Support Tickets
 * Positioned in the upper 60% Midnight Black region with lime accents.
 *
 * @param {Array} tickets - Array of support ticket records
 * @param {object} statsData - Pre-calculated metrics from backend stats endpoint
 */
export const TicketStatsWidget = ({ tickets = [], statsData }) => {
  const stats = useMemo(() => {
    const norm = (s) => (s || "").toUpperCase().replace(/-/g, "_");
    const total =
      statsData?.total !== undefined ? statsData.total : tickets.length;
    const open =
      statsData?.openCount !== undefined
        ? statsData.openCount
        : tickets.filter((t) => norm(t.status) === "OPEN").length;
    const inProgress =
      statsData &&
      (statsData.inProgressCount !== undefined ||
        statsData.reviewCount !== undefined)
        ? (statsData.inProgressCount || 0) + (statsData.reviewCount || 0)
        : tickets.filter(
            (t) => norm(t.status) === "IN_PROGRESS" || norm(t.status) === "REVIEW"
          ).length;
    const critical =
      statsData?.criticalCount !== undefined
        ? statsData.criticalCount
        : tickets.filter(
            (t) =>
              (t.priority || "").toUpperCase() === "CRITICAL" &&
              norm(t.status) !== "RESOLVED"
          ).length;
    const resolved =
      statsData?.resolvedCount !== undefined
        ? statsData.resolvedCount
        : tickets.filter((t) => norm(t.status) === "RESOLVED").length;

    return { total, open, inProgress, critical, resolved };
  }, [tickets, statsData]);

  const cards = [
    {
      id: "total-tickets",
      title: "Total Tickets",
      value: stats.total,
      subtitle: `${stats.resolved} Resolved Tickets`,
      icon: Ticket,
      badgeText: "Helpdesk Queue",
    },
    {
      id: "open-tickets",
      title: "Open & Pending",
      value: stats.open,
      subtitle: "Awaiting Agent Triage",
      icon: Clock,
      badgeText: "New Requests",
    },
    {
      id: "in-progress",
      title: "In Progress / Review",
      value: stats.inProgress,
      subtitle: "Active Investigation",
      icon: CheckCircle2,
      badgeText: "Under Way",
    },
    {
      id: "critical-issues",
      title: "Critical Escalations",
      value: stats.critical,
      subtitle: "High Priority SLA Focus",
      icon: stats.critical > 0 ? ShieldAlert : AlertTriangle,
      badgeText: stats.critical > 0 ? "Urgent Action" : "Normative",
      urgent: stats.critical > 0,
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

export default TicketStatsWidget;
