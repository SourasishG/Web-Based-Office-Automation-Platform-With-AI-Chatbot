import { useMemo } from "react";
import { Ticket, AlertTriangle, Clock, CheckCircle2, ShieldAlert } from "lucide-react";
import { GlassCard } from "../../../components/ui/GlassCard";

/**
 * TicketStatsWidget - Top Metric Cards for IT Helpdesk & Support Tickets
 * 
 * @param {Array} tickets - Array of support ticket records
 */
export const TicketStatsWidget = ({ tickets = [] }) => {
  const stats = useMemo(() => {
    const total = tickets.length;
    const open = tickets.filter((t) => t.status === "open").length;
    const inProgress = tickets.filter((t) => t.status === "in-progress" || t.status === "review").length;
    const critical = tickets.filter((t) => t.priority === "Critical" && t.status !== "resolved").length;
    const resolved = tickets.filter((t) => t.status === "resolved").length;

    return { total, open, inProgress, critical, resolved };
  }, [tickets]);

  const cards = [
    {
      id: "total-tickets",
      title: "Total Tickets",
      value: stats.total,
      subtitle: `${stats.resolved} Resolved Tickets`,
      icon: Ticket,
      glow: "cyan",
      badgeText: "Helpdesk Queue",
    },
    {
      id: "open-tickets",
      title: "Open & Pending",
      value: stats.open,
      subtitle: "Awaiting Agent Triage",
      icon: Clock,
      glow: "blue",
      badgeText: "New Requests",
    },
    {
      id: "in-progress",
      title: "In Progress / Review",
      value: stats.inProgress,
      subtitle: "Active Agent Investigation",
      icon: CheckCircle2,
      glow: "purple",
      badgeText: "Under Way",
    },
    {
      id: "critical-issues",
      title: "Critical Escalations",
      value: stats.critical,
      subtitle: "High Priority SLA Focus",
      icon: stats.critical > 0 ? ShieldAlert : AlertTriangle,
      glow: stats.critical > 0 ? "purple" : "white",
      badgeText: stats.critical > 0 ? "Urgent Action" : "Normative",
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

export default TicketStatsWidget;
