import { Inbox, Send, Star, FileText, Trash2, Tag } from "lucide-react";
import { GlassPanel } from "../../../components/ui/GlassPanel";

/**
 * EmailSidebar - Folder Navigation & Tag Shortcuts for Email Hub
 * 
 * @param {string} activeFolder - Currently active folder ID ('inbox', 'sent', 'starred', 'drafts', 'trash')
 * @param {function} onFolderChange - Folder switch handler
 * @param {object} counts - Unread and folder counters object
 */
export const EmailSidebar = ({
  activeFolder = "inbox",
  onFolderChange,
  counts = { inboxUnread: 0, starred: 0, drafts: 0 },
}) => {
  const folders = [
    { id: "inbox", label: "Inbox", icon: Inbox, count: counts.inboxUnread },
    { id: "starred", label: "Starred", icon: Star, count: counts.starred },
    { id: "sent", label: "Sent", icon: Send },
    { id: "drafts", label: "Drafts", icon: FileText, count: counts.drafts },
    { id: "trash", label: "Trash / Archive", icon: Trash2 },
  ];

  return (
    <GlassPanel variant="default" padding="sm" className="h-full flex flex-col gap-4">
      {/* Folder Navigation Menu */}
      <div className="space-y-1">
        <p className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
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
              className={`
                w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 shadow-sm"
                    : "text-slate-300 hover:bg-white/5 hover:text-white border border-transparent"
                }
              `}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                <span>{folder.label}</span>
              </div>

              {folder.count ? (
                <span
                  className={`
                    px-2 py-0.5 text-[10px] font-bold rounded-full
                    ${
                      isActive
                        ? "bg-cyan-400/30 text-cyan-200"
                        : "bg-white/10 text-slate-300"
                    }
                  `}
                >
                  {folder.count}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Categories / Tags Section */}
      <div className="pt-3 border-t border-white/10 space-y-2">
        <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Tag className="w-3 h-3 text-cyan-400" /> Categories
        </p>

        <div className="space-y-1 text-xs text-slate-300">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Announcements</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span>Project Sync</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <span>HR Memos</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            <span>IT Alerts</span>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
};

export default EmailSidebar;
