import { useState } from "react";
import { Clock, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import TicketCard from "./TicketCard";

/**
 * TicketKanban - Quixotic Helpdesk Kanban Board with Drag-and-Drop
 * Positioned in the lower 40% Pure White region with #0B0B0C typography and lime accents.
 *
 * @param {Array} tickets - Array of ticket objects
 * @param {function} onSelectTicket - Click handler to view ticket detail
 * @param {function} onResolveTicket - Quick resolve handler
 * @param {function} onStatusChange - Status update handler for drag-and-drop
 */
export const TicketKanban = ({
  tickets = [],
  onSelectTicket,
  onResolveTicket,
  onStatusChange,
}) => {
  const [dragOverCol, setDragOverCol] = useState(null);
  const normStatus = (s) => (s || "").toUpperCase().replace(/-/g, "_");

  const columns = [
    {
      id: "OPEN",
      title: "Open Queue",
      icon: Clock,
      isResolved: false,
      tickets: tickets.filter((t) => normStatus(t.status) === "OPEN"),
    },
    {
      id: "IN_PROGRESS",
      title: "In Progress",
      icon: RefreshCw,
      isResolved: false,
      tickets: tickets.filter((t) => normStatus(t.status) === "IN_PROGRESS"),
    },
    {
      id: "REVIEW",
      title: "Under Review",
      icon: AlertCircle,
      isResolved: false,
      tickets: tickets.filter((t) => normStatus(t.status) === "REVIEW"),
    },
    {
      id: "RESOLVED",
      title: "Resolved",
      icon: CheckCircle2,
      isResolved: true,
      tickets: tickets.filter((t) => normStatus(t.status) === "RESOLVED"),
    },
  ];

  const handleDragOver = (e, colId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverCol !== colId) setDragOverCol(colId);
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverCol(null);
    }
  };

  const handleDrop = (e, colId) => {
    e.preventDefault();
    setDragOverCol(null);
    const ticketId = e.dataTransfer.getData("text/plain");
    if (ticketId && onStatusChange) {
      onStatusChange(ticketId, colId);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-4">
      {columns.map((col) => {
        const Icon = col.icon;
        const isDragTarget = dragOverCol === col.id;
        return (
          <div
            key={col.id}
            onDragOver={(e) => handleDragOver(e, col.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, col.id)}
            className={`flex flex-col rounded-3xl bg-zinc-50 border min-h-[520px] max-h-[760px] overflow-hidden shadow-sm transition-all duration-200 ${
              isDragTarget
                ? "border-[#C6F432] ring-2 ring-[#C6F432]/60 bg-[#C6F432]/5"
                : "border-zinc-200/80"
            }`}
          >
            {/* Column Sticky Header */}
            <div className="sticky top-0 z-10 px-5 py-3.5 bg-white/95 backdrop-blur-md border-b border-zinc-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border ${
                    col.isResolved
                      ? "bg-[#C6F432]/25 border-[#C6F432]/50 text-[#244203]"
                      : "bg-zinc-100 border-zinc-200 text-[#0B0B0C]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <h3 className="text-sm font-extrabold text-[#0B0B0C] tracking-tight">
                  {col.title}
                </h3>
              </div>

              <span
                className={`px-2.5 py-0.5 text-xs font-extrabold rounded-full border ${
                  col.isResolved
                    ? "bg-[#C6F432] border-[#C6F432] text-[#0B0B0C]"
                    : "bg-zinc-100 border-zinc-200 text-[#0B0B0C]"
                }`}
              >
                {col.tickets.length}
              </span>
            </div>

            {/* Column Cards Container */}
            <div className="flex-1 space-y-3.5 overflow-y-auto p-3.5">
              {col.tickets.length === 0 ? (
                <div className="p-6 rounded-2xl bg-white border border-dashed border-zinc-300 text-center text-xs text-zinc-500 my-2 font-medium">
                  No tickets in {col.title}
                </div>
              ) : (
                col.tickets.map((ticket) => (
                  <div key={ticket.id} className="h-auto">
                    <TicketCard
                      ticket={ticket}
                      onClick={onSelectTicket}
                      onResolveClick={onResolveTicket}
                      draggable
                    />
                  </div>
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
