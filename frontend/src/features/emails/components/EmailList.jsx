import { Star, Inbox } from "lucide-react";

/**
 * EmailList - Quixotic Pure White Message Thread List
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
      <div className="bg-white border border-zinc-200/80 rounded-3xl shadow-sm h-full flex flex-col items-center justify-center text-center p-10">
        <div className="w-16 h-16 rounded-3xl bg-zinc-100 border border-zinc-200 text-zinc-400 flex items-center justify-center mb-4">
          <Inbox className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-extrabold text-[#0B0B0C] tracking-tight">
          No Messages Found
        </h3>
        <p className="text-xs text-zinc-500 max-w-xs mt-1">
          Your active folder or search filter returned no emails.
        </p>
      </div>
    );
  }

  const getCategoryStyle = (category) => {
    switch (category) {
      case "Announcement":
        return "bg-purple-500/10 text-purple-700 border-purple-500/20";
      case "Project Sync":
        return "bg-[#C6F432]/25 text-[#244203] border-[#C6F432]/50";
      case "HR Memo":
        return "bg-emerald-500/10 text-emerald-700 border-emerald-500/20";
      case "IT Alert":
        return "bg-rose-500/10 text-rose-600 border-rose-500/20";
      case "Meeting Minutes":
        return "bg-blue-500/10 text-blue-700 border-blue-500/20";
      default:
        return "bg-zinc-100 text-zinc-700 border-zinc-200";
    }
  };

  return (
    <div className="bg-white border border-zinc-200/80 rounded-3xl p-3.5 shadow-sm h-full overflow-y-auto space-y-2.5">
      {emails.map((email) => {
        const isSelected = selectedEmailId === email.id;

        const senderName = email.sender
          ? `${email.sender.firstName || ""} ${email.sender.lastName || ""}`.trim() ||
            email.sender.name ||
            "Colleague"
          : "Colleague";
        const senderAvatar =
          email.sender?.avatarUrl ||
          email.sender?.avatar ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            senderName
          )}&background=0B0B0C&color=C6F432`;

        const displayTime = email.createdAt
          ? new Date(email.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          : email.timestamp || email.date || "";

        const snippetText = email.snippet || email.body?.slice(0, 80) || "";

        return (
          <div
            key={email.id}
            onClick={() => onSelectEmail(email)}
            className={`p-4 rounded-2xl transition-all duration-200 cursor-pointer select-none flex items-start justify-between gap-3 relative group ${
              isSelected
                ? "bg-[#C6F432]/15 border-2 border-[#C6F432] shadow-xs"
                : email.isRead
                ? "bg-zinc-50/80 border border-zinc-200/70 hover:border-[#C6F432] hover:bg-white"
                : "bg-white border border-zinc-300 hover:border-[#C6F432] shadow-xs"
            }`}
          >
            {/* Unread Indicator Dot */}
            {!email.isRead && (
              <span className="absolute top-4 left-2.5 w-2 h-2 rounded-full bg-[#C6F432] ring-2 ring-[#0B0B0C]/10" />
            )}

            {/* Left Content: Avatar & Identity */}
            <div className="flex items-start gap-3 pl-2.5 min-w-0">
              <img
                src={senderAvatar}
                alt={senderName}
                className="w-10 h-10 rounded-full object-cover border border-zinc-200 shrink-0 mt-0.5"
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4
                    className={`text-sm tracking-tight truncate text-[#0B0B0C] ${
                      !email.isRead ? "font-extrabold" : "font-semibold"
                    }`}
                  >
                    {senderName}
                  </h4>
                  {email.category && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getCategoryStyle(
                        email.category
                      )}`}
                    >
                      {email.category}
                    </span>
                  )}
                </div>

                <p
                  className={`text-xs mt-1 truncate ${
                    !email.isRead
                      ? "font-bold text-[#0B0B0C]"
                      : "font-medium text-zinc-700"
                  }`}
                >
                  {email.subject}
                </p>

                <p className="text-xs text-zinc-500 mt-1 line-clamp-1">
                  {snippetText}
                </p>
              </div>
            </div>

            {/* Right Meta: Date & Star Trigger */}
            <div className="flex flex-col items-end gap-2 shrink-0">
              <span className="text-[11px] font-semibold text-zinc-500 font-mono">
                {displayTime}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleStar(email.id);
                }}
                aria-label="Star email"
                className="p-1 text-zinc-400 hover:text-amber-500 transition-colors focus:outline-none cursor-pointer"
              >
                <Star
                  className={`w-4 h-4 ${
                    email.isStarred
                      ? "fill-amber-400 text-amber-400"
                      : "text-zinc-400 hover:text-amber-500"
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
