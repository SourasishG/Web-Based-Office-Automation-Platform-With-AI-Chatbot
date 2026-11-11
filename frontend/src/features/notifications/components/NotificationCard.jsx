import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Trash2,
  ArrowUpRight,
  Check,
  ListTodo,
  Calendar,
  Mail,
  Ticket,
  ShieldAlert,
  AlertTriangle,
} from "lucide-react";

/**
 * NotificationCard - Quixotic Pure White Notification Card
 * Positioned in the lower 40% Pure White region with #0B0B0C typography and lime accents.
 *
 * @param {object} notification - Notification item data object
 * @param {function} onToggleRead - Toggle read status callback
 * @param {function} onDelete - Delete notification callback
 */
export const NotificationCard = ({ notification, onToggleRead, onDelete }) => {
  if (!notification) return null;

  const {
    id,
    title,
    message,
    category,
    priority,
    isRead,
    timestamp,
    createdAt,
    actionUrl,
    sender,
  } = notification;

  const displayTime = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : timestamp || "Just now";

  const senderName = sender
    ? `${sender.firstName || ""} ${sender.lastName || ""}`.trim() ||
      sender.name ||
      null
    : null;
  const senderAvatar = sender?.avatarUrl || sender?.avatar;

  const getCategoryIcon = (cat) => {
    switch ((cat || "").toLowerCase()) {
      case "tasks":
        return <ListTodo className="w-4 h-4 text-[#0B0B0C]" />;
      case "meetings":
        return <Calendar className="w-4 h-4 text-amber-600" />;
      case "emails":
        return <Mail className="w-4 h-4 text-purple-600" />;
      case "tickets":
        return <Ticket className="w-4 h-4 text-rose-600" />;
      case "system":
        return <ShieldAlert className="w-4 h-4 text-[#386b03]" />;
      default:
        return <ListTodo className="w-4 h-4 text-[#0B0B0C]" />;
    }
  };

  const getPriorityBadge = (prio) => {
    switch ((prio || "").toLowerCase()) {
      case "urgent":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/10 text-rose-600 border border-rose-500/20">
            <ShieldAlert className="w-3 h-3" />
            Urgent
          </span>
        );
      case "high":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-700 border border-amber-500/20">
            <AlertTriangle className="w-3 h-3" />
            High
          </span>
        );
      case "normal":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#C6F432]/25 text-[#244203] border border-[#C6F432]/50">
            Normal
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-zinc-100 text-zinc-600 border border-zinc-200">
            Low
          </span>
        );
    }
  };

  return (
    <div
      className={`bg-white rounded-3xl p-5 transition-all duration-200 relative group ${
        !isRead
          ? "border-2 border-[#C6F432] shadow-md"
          : "border border-zinc-200/80 shadow-sm hover:border-[#C6F432]"
      }`}
    >
      {/* Unread Lime Indicator Dot */}
      {!isRead && (
        <span className="absolute top-5 left-4 w-2.5 h-2.5 rounded-full bg-[#C6F432] ring-2 ring-[#0B0B0C]/10 animate-pulse" />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pl-4">
        {/* Left Section: Sender Avatar / Icon & Details */}
        <div className="flex items-start gap-3.5 min-w-0 flex-1">
          {senderAvatar ? (
            <img
              src={senderAvatar}
              alt={senderName || "Sender"}
              className="w-11 h-11 rounded-2xl object-cover border border-zinc-200 shrink-0 mt-0.5"
            />
          ) : (
            <div className="w-11 h-11 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0 mt-0.5">
              {getCategoryIcon(category)}
            </div>
          )}

          <div className="min-w-0 flex-1 space-y-1">
            {/* Header Meta: Category, Priority Badge, Sender Name */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-mono uppercase font-bold text-zinc-500">
                {category || "general"}
              </span>
              {getPriorityBadge(priority)}

              {senderName && (
                <span className="text-xs text-zinc-500">
                  from{" "}
                  <span className="font-bold text-[#0B0B0C]">{senderName}</span>
                </span>
              )}
            </div>

            {/* Notification Title */}
            <h3
              className={`text-sm tracking-tight text-[#0B0B0C] ${
                !isRead ? "font-extrabold" : "font-bold"
              }`}
            >
              {title}
            </h3>

            {/* Message Body */}
            <p className="text-xs text-zinc-600 leading-relaxed">{message}</p>
          </div>
        </div>

        {/* Right Section: Timestamp & Actions */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0 self-stretch pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
          <span className="text-[11px] font-semibold text-zinc-500 font-mono">
            {displayTime}
          </span>

          <div className="flex items-center gap-1.5">
            {actionUrl && (
              <Link
                to={actionUrl}
                title="Open Action"
                className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold shadow-xs hover:scale-[1.03] active:scale-[0.98] transition-all"
              >
                <span>View</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Link>
            )}

            <button
              type="button"
              onClick={() => onToggleRead(id)}
              title={isRead ? "Mark as Unread" : "Mark as Read"}
              className={`p-2 rounded-full border transition-colors cursor-pointer ${
                isRead
                  ? "bg-zinc-100 border-zinc-200 text-zinc-500 hover:text-[#0B0B0C] hover:bg-zinc-200"
                  : "bg-[#C6F432]/25 border-[#C6F432]/60 text-[#244203] hover:bg-[#C6F432]/40"
              }`}
            >
              {isRead ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => onDelete(id)}
              title="Delete Notification"
              className="p-2 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-500 hover:bg-rose-500/10 hover:text-rose-600 hover:border-rose-500/30 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
