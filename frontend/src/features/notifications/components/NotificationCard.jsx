import { Link } from "react-router-dom";
import { CheckCircle2, Trash2, ArrowUpRight, Check, ListTodo, Calendar, Mail, Ticket, ShieldAlert, AlertTriangle } from "lucide-react";
import { GlassCard } from "../../../components/ui/GlassCard";
import { GlassAvatar } from "../../../components/ui/GlassAvatar";
import { GlassBadge } from "../../../components/ui/GlassBadge";
import { GlassButton } from "../../../components/ui/GlassButton";

/**
 * NotificationCard - Individual Apple Liquid Glass Notification Card
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
    actionUrl,
    sender,
  } = notification;

  // Category Icon & Tone Helper
  const getCategoryIcon = (cat) => {
    switch (cat) {
      case "tasks":
        return <ListTodo className="w-4 h-4 text-cyan-400" />;
      case "meetings":
        return <Calendar className="w-4 h-4 text-amber-400" />;
      case "emails":
        return <Mail className="w-4 h-4 text-purple-400" />;
      case "tickets":
        return <Ticket className="w-4 h-4 text-rose-400" />;
      case "system":
        return <ShieldAlert className="w-4 h-4 text-emerald-400" />;
      default:
        return <ListTodo className="w-4 h-4 text-cyan-400" />;
    }
  };

  // Priority Badge Helper
  const getPriorityBadge = (prio) => {
    switch (prio) {
      case "urgent":
        return <GlassBadge variant="danger" size="sm" icon={ShieldAlert}>Urgent</GlassBadge>;
      case "high":
        return <GlassBadge variant="warning" size="sm" icon={AlertTriangle}>High</GlassBadge>;
      case "normal":
        return <GlassBadge variant="cyan" size="sm">Normal</GlassBadge>;
      default:
        return <GlassBadge variant="ghost" size="sm">Low</GlassBadge>;
    }
  };

  return (
    <GlassCard
      variant="standard"
      hoverable
      className={`
        p-5 transition-all duration-300 relative group
        ${!isRead ? "bg-slate-900/60 border border-cyan-500/30 shadow-md shadow-cyan-500/5" : "bg-slate-900/30 border border-white/5"}
      `}
    >
      {/* Unread Glow Indicator Dot */}
      {!isRead && (
        <span className="absolute top-4 left-3 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4] animate-pulse" />
      )}

      <div className="flex items-start justify-between gap-4 pl-3">
        {/* Left Section: Sender Avatar / Icon & Details */}
        <div className="flex items-start gap-3.5 min-w-0 flex-1">
          {sender?.avatar ? (
            <GlassAvatar
              src={sender.avatar}
              name={sender.name}
              size="md"
              className="shrink-0 mt-0.5"
            />
          ) : (
            <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 shrink-0">
              {getCategoryIcon(category)}
            </div>
          )}

          <div className="min-w-0 flex-1 space-y-1">
            {/* Header Meta: Category, Priority Badge, Sender Name */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-mono uppercase font-bold text-slate-400">
                {category}
              </span>
              {getPriorityBadge(priority)}

              {sender?.name && (
                <span className="text-xs text-slate-400">
                  from <span className="font-semibold text-slate-200">{sender.name}</span>
                </span>
              )}
            </div>

            {/* Notification Title */}
            <h3 className={`text-sm tracking-tight ${!isRead ? "font-extrabold text-white" : "font-semibold text-slate-200"}`}>
              {title}
            </h3>

            {/* Message Body */}
            <p className="text-xs text-slate-400 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        {/* Right Section: Timestamp & Actions */}
        <div className="flex flex-col items-end justify-between gap-3 shrink-0 self-stretch">
          <span className="text-[11px] font-medium text-slate-400">
            {timestamp}
          </span>

          <div className="flex items-center gap-1">
            {actionUrl && (
              <Link to={actionUrl}>
                <GlassButton
                  variant="ghost"
                  size="sm"
                  icon={ArrowUpRight}
                  className="text-xs px-2.5"
                  title="Open Action"
                >
                  View
                </GlassButton>
              </Link>
            )}

            <button
              type="button"
              onClick={() => onToggleRead(id)}
              title={isRead ? "Mark as Unread" : "Mark as Read"}
              className={`
                p-2 rounded-xl border transition-colors
                ${
                  isRead
                    ? "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                    : "bg-cyan-500/15 border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/30"
                }
              `}
            >
              {isRead ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={() => onDelete(id)}
              title="Delete Notification"
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default NotificationCard;
