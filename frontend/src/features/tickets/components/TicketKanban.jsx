import { Clock, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import TicketCard from "./TicketCard";

/**
 * TicketKanban - Multi-column Helpdesk Kanban Board
 * 
 * @param {Array} tickets - Array of ticket objects
 * @param {function} onSelectTicket - Click handler to view ticket detail
 * @param {function} onResolveTicket - Quick resolve handler
 */
export const TicketKanban = ({ tickets = [], onSelectTicket, onResolveTicket }) => {
  const normStatus = (s) => (s || "").toUpperCase().replace(/-/g, "_");

  const columns = [
    {
      id: "OPEN",
      title: "Open Queue",
      icon: Clock,
      color: "text-cyan-400 border-cyan-400/30 bg-cyan-500/10",
      tickets: tickets.filter((t) => normStatus(t.status) === "OPEN"),
    },
    {
      id: "IN_PROGRESS",
      title: "In Progress",
      icon: RefreshCw,
      color: "text-amber-400 border-amber-400/30 bg-amber-500/10",
      tickets: tickets.filter((t) => normStatus(t.status) === "IN_PROGRESS"),
    },
    {
      id: "REVIEW",
      title: "Under Review",
      icon: AlertCircle,
      color: "text-purple-400 border-purple-400/30 bg-purple-500/10",
      tickets: tickets.filter((t) => normStatus(t.status) === "REVIEW"),
    },
    {
      id: "RESOLVED",
      title: "Resolved",
      icon: CheckCircle2,
      color: "text-emerald-400 border-emerald-400/30 bg-emerald-500/10",
      tickets: tickets.filter((t) => normStatus(t.status) === "RESOLVED"),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-4">
      {columns.map((col) => {
        const Icon = col.icon;
        return (
          <div
            key={col.id}
            className="flex flex-col gap-4 p-4 rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-2xl min-h-[500px]"
          >
            {/* Column Sticky Header */}
            <div className="flex items-center justify-between px-2 py-1">
              <div className="flex items-center gap-2">
                <span className={`p-2 rounded-xl border ${col.color}`}>
                  <Icon className="w-4 h-4" />
                </span>
                <h3 className="text-sm font-bold text-white tracking-tight">
                  {col.title}
                </h3>
              </div>

              <span className="px-2.5 py-0.5 text-xs font-extrabold rounded-full bg-white/10 text-white border border-white/10">
                {col.tickets.length}
              </span>
            </div>

            {/* Column Cards Container */}
            <div className="flex-1 space-y-4 overflow-y-auto max-h-[620px] pr-1">
              {col.tickets.length === 0 ? (
                <div className="p-6 rounded-2xl bg-white/5 border border-dashed border-white/10 text-center text-xs text-slate-500 my-4">
                  No tickets in {col.title}
                </div>
              ) : (
                col.tickets.map((ticket) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onClick={onSelectTicket}
                    onResolveClick={onResolveTicket}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TicketKanban;
