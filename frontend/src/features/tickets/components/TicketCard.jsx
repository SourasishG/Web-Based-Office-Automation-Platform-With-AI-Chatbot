import {
  Clock,
  MessageSquare,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  Eye,
  Circle,
  AlertCircle,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

/**
 * TicketCard - Quixotic Pure White Support Ticket Card
 * Positioned in the lower 40% Pure White region with #0B0B0C typography and lime accents.
 *
 * @param {object} ticket - Support ticket data record
 * @param {function} onClick - Click handler to open detail modal
 * @param {function} onResolveClick - Quick resolve click handler
 * @param {boolean} draggable - Enable HTML5 drag for Kanban board
 */
export const TicketCard = ({
  ticket,
  onClick,
  onResolveClick,
  draggable = false,
}) => {
  if (!ticket) return null;

  const {
    id,
    ticketNumber,
    title,
    description,
    category,
    priority = "MEDIUM",
    status = "OPEN",
    requester,
    assignee,
    slaDueAt,
    slaTime,
    createdTime,
    createdAt,
  } = ticket;

  const displayId = ticketNumber || id?.slice(0, 8) || "TCK";

  const requesterName = requester
    ? `${requester.firstName || ""} ${requester.lastName || ""}`.trim() ||
      requester.name ||
      "Requester"
    : "Requester";
  const requesterAvatar =
    requester?.avatarUrl ||
    requester?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      requesterName
    )}&background=0B0B0C&color=C6F432`;

  const assigneeName = assignee
    ? `${assignee.firstName || ""} ${assignee.lastName || ""}`.trim() ||
      assignee.name ||
      null
    : null;
  const assigneeAvatar =
    assignee?.avatarUrl ||
    assignee?.avatar ||
    (assigneeName
      ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
          assigneeName
        )}&background=0B0B0C&color=C6F432`
      : null);

  const commentsCount =
    ticket._count?.comments ||
    ticket.comments?.length ||
    ticket.commentsCount ||
    0;

  const formatCategory = (cat) => {
    if (!cat) return "General";
    const map = {
      ACCESS_SECURITY: "Access & Security",
      INFRASTRUCTURE: "IT Infrastructure",
      SOFTWARE_TOOLS: "Software & Tools",
      FACILITIES: "Facilities",
      HR_OPS: "HR Operations",
    };
    return map[cat] || cat;
  };

  const getSlaLabel = () => {
    if (slaTime) return slaTime;
    if (!slaDueAt) {
      if (createdAt) {
        return new Date(createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      }
      return createdTime || "Standard SLA";
    }
    const diff = new Date(slaDueAt) - new Date();
    if (diff <= 0) return "SLA Breached";
    const hours = Math.round(diff / (1000 * 60 * 60));
    return `${hours} hrs left`;
  };

  const normPriority = (priority || "").toUpperCase();
  const normStatus = (status || "").toUpperCase().replace(/-/g, "_");

  const getPriorityBadge = () => {
    if (normPriority === "CRITICAL") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/10 text-rose-600 border border-rose-500/20">
          <ShieldAlert className="w-3 h-3" />
          Critical
        </span>
      );
    }
    if (normPriority === "HIGH") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-700 border border-amber-500/20">
          <AlertCircle className="w-3 h-3" />
          High
        </span>
      );
    }
    if (normPriority === "MEDIUM") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-700 border border-blue-500/20">
          <ArrowUp className="w-3 h-3" />
          Medium
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-zinc-100 text-zinc-600 border border-zinc-200">
        <ArrowDown className="w-3 h-3" />
        Low
      </span>
    );
  };

  const getStatusBadge = () => {
    switch (normStatus) {
      case "OPEN":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-zinc-100 text-[#0B0B0C] border border-zinc-200">
            <Circle className="w-3 h-3 text-zinc-500" />
            Open
          </span>
        );
      case "IN_PROGRESS":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-700 border border-amber-500/25">
            <Clock className="w-3 h-3" />
            In Progress
          </span>
        );
      case "REVIEW":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/10 text-purple-700 border border-purple-500/25">
            <Eye className="w-3 h-3" />
            Review
          </span>
        );
      case "RESOLVED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#C6F432]/25 text-[#244203] border border-[#C6F432]/50">
            <CheckCircle2 className="w-3 h-3 text-[#386b03]" />
            Resolved
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-zinc-100 text-zinc-700 border border-zinc-200">
            {status}
          </span>
        );
    }
  };

  const slaLabel = getSlaLabel();
  const isBreached = slaLabel.toLowerCase().includes("breached");

  return (
    <div
      draggable={draggable}
      onDragStart={(e) => {
        if (!draggable) return;
        e.dataTransfer.setData("text/plain", id);
        e.dataTransfer.effectAllowed = "move";
      }}
      onClick={() => onClick && onClick(ticket)}
      className={`bg-white border border-zinc-200/80 rounded-3xl p-5 shadow-sm hover:shadow-md hover:border-[#C6F432] transition-all duration-200 flex flex-col justify-between h-full group cursor-pointer ${
        draggable ? "active:cursor-grabbing" : ""
      }`}
    >
      <div>
        {/* Top Header: Ticket ID, Priority Badge & Status */}
        <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-extrabold text-[#0B0B0C] bg-[#C6F432]/30 px-2.5 py-0.5 rounded-full border border-[#C6F432]/60">
              {displayId}
            </span>
            {getPriorityBadge()}
          </div>

          {getStatusBadge()}
        </div>

        {/* Title & Description */}
        <h3 className="text-base font-extrabold text-[#0B0B0C] tracking-tight group-hover:text-zinc-800 transition-colors line-clamp-1">
          {title}
        </h3>
        <p className="text-xs text-zinc-600 mt-1.5 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Category Pill & SLA Countdown */}
        <div className="mt-4 flex items-center justify-between gap-2 text-xs">
          <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700">
            {formatCategory(category)}
          </span>

          <div
            className={`flex items-center gap-1.5 text-[11px] font-semibold ${
              isBreached ? "text-rose-600" : "text-zinc-600"
            }`}
          >
            <Clock
              className={`w-3.5 h-3.5 ${
                isBreached ? "text-rose-500" : "text-[#386b03]"
              }`}
            />
            <span>{slaLabel}</span>
          </div>
        </div>
      </div>

      {/* Footer: Requester / Assignee & Action Buttons */}
      <div className="mt-5 pt-3.5 border-t border-zinc-200/80 flex items-center justify-between gap-2 flex-wrap">
        {/* Requesters & Assignees Avatars */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="flex items-center gap-1.5 min-w-0"
            title={`Requested by ${requesterName}`}
          >
            <img
              src={requesterAvatar}
              alt={requesterName}
              className="w-6 h-6 rounded-full object-cover border border-zinc-200 shrink-0"
            />
            <span className="text-[11px] font-bold text-[#0B0B0C] truncate max-w-[85px]">
              {requesterName.split(" ")[0]}
            </span>
          </div>

          {assigneeName && (
            <div
              className="flex items-center gap-1 pl-2 border-l border-zinc-200"
              title={`Assigned to ${assigneeName}`}
            >
              <ArrowRight className="w-3 h-3 text-zinc-400" />
              <img
                src={assigneeAvatar}
                alt={assigneeName}
                className="w-6 h-6 rounded-full object-cover border border-zinc-200 shrink-0"
              />
            </div>
          )}
        </div>

        {/* Card Actions */}
        <div className="flex items-center gap-1.5">
          {commentsCount > 0 && (
            <span className="text-[11px] font-semibold text-zinc-500 flex items-center gap-1 mr-1">
              <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
              {commentsCount}
            </span>
          )}

          {normStatus !== "RESOLVED" && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onResolveClick && onResolveClick(ticket);
              }}
              className="px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-[#0B0B0C] text-[11px] font-bold transition-all cursor-pointer"
            >
              Resolve
            </button>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClick && onClick(ticket);
            }}
            className="px-3.5 py-1.5 rounded-full bg-[#C6F432] text-[#0B0B0C] text-[11px] font-bold shadow-xs hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
