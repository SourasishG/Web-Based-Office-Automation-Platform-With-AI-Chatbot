import { Star, Inbox } from "lucide-react";
import { GlassAvatar } from "../../../components/ui/GlassAvatar";
import { GlassBadge } from "../../../components/ui/GlassBadge";
import { GlassPanel } from "../../../components/ui/GlassPanel";

/**
 * EmailList - List view of email threads with avatars, snippets, and star triggers
 * 
 * @param {Array} emails - Array of email objects
 * @param {string} selectedEmailId - ID of currently selected email
 * @param {function} onSelectEmail - Email click handler
 * @param {function} onToggleStar - Star button click handler
 */
export const EmailList = ({
  emails = [],
  selectedEmailId,
  onSelectEmail,
  onToggleStar,
}) => {
  if (!emails || emails.length === 0) {
    return (
      <GlassPanel
        variant="inset"
        padding="xl"
        className="flex flex-col items-center justify-center text-center my-4 py-16"
      >
        <div className="p-4 rounded-3xl bg-white/5 border border-white/10 text-slate-400 mb-4">
          <Inbox className="w-10 h-10" />
        </div>
        <h3 className="text-lg font-bold text-white tracking-tight">
          No Messages Found
        </h3>
        <p className="text-xs text-slate-400 max-w-sm mt-1">
          Your active folder or search filter returned no emails.
        </p>
      </GlassPanel>
    );
  }

  const getCategoryVariant = (category) => {
    switch (category) {
      case "Announcement": return "purple";
      case "Project Sync": return "cyan";
      case "HR Memo": return "success";
      case "IT Alert": return "danger";
      case "Meeting Minutes": return "blue";
      default: return "ghost";
    }
  };

  return (
    <div className="h-full overflow-y-auto pr-1 space-y-2">
      {emails.map((email) => {
        const isSelected = selectedEmailId === email.id;

        return (
          <div
            key={email.id}
            onClick={() => onSelectEmail(email)}
            className={`
              p-4 rounded-2xl transition-all duration-200 cursor-pointer select-none
              flex items-start justify-between gap-3 relative group
              ${
                isSelected
                  ? "bg-cyan-500/15 border-2 border-cyan-400/50 shadow-md shadow-cyan-500/5"
                  : email.isRead
                  ? "bg-slate-900/30 border border-white/5 hover:border-white/15 hover:bg-slate-900/50"
                  : "bg-slate-900/60 border border-cyan-500/20 hover:border-cyan-500/40 shadow-sm"
              }
            `}
          >
            {/* Unread Indicator Dot */}
            {!email.isRead && (
              <span className="absolute top-4 left-2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
            )}

            {/* Left Content: Avatar & Identity */}
            <div className="flex items-start gap-3 pl-2 min-w-0">
              <GlassAvatar
                src={email.sender.avatar}
                name={email.sender.name}
                size="md"
                className="shrink-0 mt-0.5"
              />

              <div className="min-w-0 flex-1">
                {/* Header: Sender Name & Category Badge */}
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className={`text-sm tracking-tight truncate ${!email.isRead ? "font-extrabold text-white" : "font-medium text-slate-200"}`}>
                    {email.sender.name}
                  </h4>
                  <GlassBadge
                    variant={getCategoryVariant(email.category)}
                    size="sm"
                  >
                    {email.category}
                  </GlassBadge>
                </div>

                {/* Subject */}
                <p className={`text-xs mt-1 truncate ${!email.isRead ? "font-bold text-cyan-300" : "font-medium text-slate-300"}`}>
                  {email.subject}
                </p>

                {/* Snippet Preview */}
                <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                  {email.snippet}
                </p>
              </div>
            </div>

            {/* Right Meta: Date & Star Trigger */}
            <div className="flex flex-col items-end gap-2 shrink-0">
              <span className="text-[11px] font-medium text-slate-400">
                {email.timestamp}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleStar(email.id);
                }}
                className="p-1 text-slate-400 hover:text-yellow-400 transition-colors focus:outline-none"
              >
                <Star
                  className={`w-4 h-4 ${
                    email.isStarred
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-slate-500 hover:text-yellow-400"
                  }`}
                />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EmailList;
