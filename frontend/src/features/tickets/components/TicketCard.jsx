import { Clock, MessageSquare, ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react";
import { GlassCard } from "../../../components/ui/GlassCard";
import { GlassBadge } from "../../../components/ui/GlassBadge";
import { GlassAvatar } from "../../../components/ui/GlassAvatar";
import { GlassButton } from "../../../components/ui/GlassButton";

/**
 * TicketCard - Apple Liquid Glass Support Ticket Card
 * 
 * @param {object} ticket - Support ticket data record
 * @param {function} onClick - Click handler to open detail modal
 * @param {function} onResolveClick - Quick resolve click handler
 */
export const TicketCard = ({ ticket, onClick, onResolveClick }) => {
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
  const requesterAvatar = requester?.avatarUrl || requester?.avatar;

  const assigneeName = assignee
    ? `${assignee.firstName || ""} ${assignee.lastName || ""}`.trim() ||
      assignee.name ||
      null
    : null;
  const assigneeAvatar = assignee?.avatarUrl || assignee?.avatar;

  const commentsCount =
    ticket._count?.comments || ticket.comments?.length || ticket.commentsCount || 0;

  // Format Category
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

  // SLA Calculation
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
  const normStatus = (status || "").toUpperCase();

  // Priority Badge Tone
  const getPriorityVariant = () => {
    switch (normPriority) {
      case "CRITICAL":
        return "danger";
      case "HIGH":
        return "warning";
      case "MEDIUM":
        return "purple";
      case "LOW":
        return "cyan";
      default:
        return "ghost";
    }
  };

  // Status Badge Tone
  const getStatusBadge = () => {
    switch (normStatus) {
      case "OPEN":
        return <GlassBadge variant="cyan" size="sm">Open</GlassBadge>;
      case "IN_PROGRESS":
        return <GlassBadge variant="warning" size="sm">In Progress</GlassBadge>;
      case "REVIEW":
        return <GlassBadge variant="purple" size="sm">Review</GlassBadge>;
      case "RESOLVED":
        return (
          <GlassBadge variant="success" size="sm" icon={CheckCircle2}>
            Resolved
          </GlassBadge>
        );
      default:
        return <GlassBadge variant="ghost" size="sm">{status}</GlassBadge>;
    }
  };

  return (
    <GlassCard
      variant="standard"
      hoverable
      className="p-5 flex flex-col justify-between h-full group transition-all duration-300"
    >
      <div>
        {/* Top Header: Ticket ID, Priority Badge & Status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-400/20">
              {displayId}
            </span>
            <GlassBadge variant={getPriorityVariant()} size="sm">
              {normPriority === "CRITICAL" ? (
                <ShieldAlert className="w-3 h-3 mr-1 text-red-400 inline" />
              ) : null}
              {normPriority.charAt(0) + normPriority.slice(1).toLowerCase()}
            </GlassBadge>
          </div>

          {getStatusBadge()}
        </div>

        {/* Title & Description */}
        <h3 className="text-base font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors line-clamp-1">
          {title}
        </h3>
        <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Category Pill & SLA Countdown */}
        <div className="mt-4 flex items-center justify-between gap-2 text-xs">
          <span className="px-2.5 py-0.5 text-[11px] font-medium rounded-lg bg-white/5 border border-white/10 text-slate-300">
            {formatCategory(category)}
          </span>

          <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>{getSlaLabel()}</span>
          </div>
        </div>
      </div>

      {/* Footer: Requester / Assignee & Action Buttons */}
      <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
        {/* Requesters & Assignees Avatars */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" title={`Requested by ${requesterName}`}>
            <GlassAvatar src={requesterAvatar} name={requesterName} size="xs" />
            <span className="text-[11px] font-medium text-slate-300 truncate max-w-[90px]">
              {requesterName.split(" ")[0]}
            </span>
          </div>

          {assigneeName && (
            <div
              className="flex items-center gap-1 pl-2 border-l border-white/10"
              title={`Assigned to ${assigneeName}`}
            >
              <ArrowRight className="w-3 h-3 text-slate-500 mr-0.5" />
              <GlassAvatar src={assigneeAvatar} name={assigneeName} size="xs" />
            </div>
          )}
        </div>

        {/* Card Actions */}
        <div className="flex items-center gap-1.5">
          {commentsCount > 0 && (
            <span className="text-[11px] text-slate-400 flex items-center gap-1 mr-1">
              <MessageSquare className="w-3 h-3" /> {commentsCount}
            </span>
          )}

          {normStatus !== "RESOLVED" && (
            <GlassButton
              variant="ghost"
              size="sm"
              className="text-xs px-2.5"
              onClick={() => onResolveClick && onResolveClick(ticket)}
            >
              Resolve
            </GlassButton>
          )}

          <GlassButton
            variant="secondary"
            size="sm"
            className="text-xs px-2.5"
            onClick={() => onClick && onClick(ticket)}
          >
            View
          </GlassButton>
        </div>
      </div>
    </GlassCard>
  );
};

export default TicketCard;
