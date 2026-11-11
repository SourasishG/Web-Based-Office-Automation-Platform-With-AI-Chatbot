import { Inbox, Send, Star, FileText, Trash2, Tag } from "lucide-react";

/**
 * EmailSidebar - Quixotic Pure White Folder & Tag Navigation Sidebar
 *
 * @param {string} activeFolder - Currently active folder ID ('inbox', 'sent', 'starred', 'drafts', 'trash')
 * @param {function} onFolderChange - Folder switch handler
 * @param {object} counts - Unread and folder counters object
 * @param {string} activeCategory - Optional active category filter
 * @param {function} onCategorySelect - Optional category filter handler
 */
export const EmailSidebar = ({
  activeFolder = "inbox",
  onFolderChange,
  counts = { inboxUnread: 0, starred: 0, drafts: 0 },
  activeCategory = "all",
  onCategorySelect,
}) => {
  const folders = [
    { id: "inbox", label: "Inbox", icon: Inbox, count: counts.inboxUnread },
    { id: "starred", label: "Starred", icon: Star, count: counts.starred },
    { id: "sent", label: "Sent", icon: Send },
    { id: "drafts", label: "Drafts", icon: FileText, count: counts.drafts },
    { id: "trash", label: "Trash / Archive", icon: Trash2 },
  ];

  const categories = [
    { id: "Announcement", label: "Announcements", dot: "bg-purple-500" },
    { id: "Project Sync", label: "Project Sync", dot: "bg-[#C6F432]" },
    { id: "HR Memo", label: "HR Memos", dot: "bg-emerald-500" },
    { id: "IT Alert", label: "IT Alerts", dot: "bg-rose-500" },
  ];

  return (
    <div className="bg-white border border-zinc-200/80 rounded-3xl p-4 shadow-sm h-full flex flex-col gap-5 text-[#0B0B0C]">
      {/* Folder Navigation Menu */}
      <div className="space-y-1.5">
        <p className="px-3 py-1 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
          Mail Folders
        </p>

        {folders.map((folder) => {
          const Icon = folder.icon;
          const isActive = activeFolder === folder.id;

          return (
            <button
              key={folder.id}
              type="button"
              onClick={() => onFolderChange(folder.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#C6F432] text-[#0B0B0C] shadow-sm"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-[#0B0B0C]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-[#0B0B0C]" : "text-zinc-400"
                  }`}
                />
                <span>{folder.label}</span>
              </div>

              {folder.count ? (
                <span
                  className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full ${
                    isActive
                      ? "bg-[#0B0B0C] text-[#C6F432]"
                      : "bg-zinc-100 text-[#0B0B0C] border border-zinc-200"
                  }`}
                >
                  {folder.count}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Categories / Tags Section */}
      <div className="pt-4 border-t border-zinc-200/80 space-y-2">
        <div className="flex items-center justify-between px-3">
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Tag className="w-3 h-3 text-[#386b03]" /> Categories
          </p>
          {activeCategory !== "all" && onCategorySelect && (
            <button
              type="button"
              onClick={() => onCategorySelect("all")}
              className="text-[10px] font-bold text-zinc-500 hover:text-[#0B0B0C] cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>

        <div className="space-y-1 text-xs">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() =>
                  onCategorySelect?.(isSelected ? "all" : cat.id)
                }
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors cursor-pointer text-left ${
                  isSelected
                    ? "bg-zinc-100 font-bold text-[#0B0B0C]"
                    : "text-zinc-600 font-medium hover:bg-zinc-50 hover:text-[#0B0B0C]"
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${cat.dot}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EmailSidebar;
