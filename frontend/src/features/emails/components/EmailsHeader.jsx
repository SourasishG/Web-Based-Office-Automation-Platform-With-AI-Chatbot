import { Plus, Sparkles, Filter, Search } from "lucide-react";
import { GlassDropdown } from "../../../components/ui";

/**
 * EmailsHeader - Quixotic Executive Control Bar for Internal Mail & Communications
 * Positioned in the upper 60% Midnight Black region.
 *
 * @param {string} searchTerm - Active search query
 * @param {function} onSearchChange - Search text handler
 * @param {string} categoryFilter - Active category filter ID
 * @param {function} onCategoryFilterChange - Category filter handler
 * @param {function} onComposeClick - Compose Email CTA callback
 */
export const EmailsHeader = ({
  searchTerm,
  onSearchChange,
  categoryFilter = "all",
  onCategoryFilterChange,
  onComposeClick,
}) => {
  const categoryOptions = [
    {
      id: "all",
      label: "All Categories",
      onClick: () => onCategoryFilterChange("all"),
    },
    {
      id: "Announcement",
      label: "Announcements",
      onClick: () => onCategoryFilterChange("Announcement"),
    },
    {
      id: "Project Sync",
      label: "Project Sync",
      onClick: () => onCategoryFilterChange("Project Sync"),
    },
    {
      id: "HR Memo",
      label: "HR Memos",
      onClick: () => onCategoryFilterChange("HR Memo"),
    },
    {
      id: "IT Alert",
      label: "IT Alerts",
      onClick: () => onCategoryFilterChange("IT Alert"),
    },
    {
      id: "Meeting Minutes",
      label: "Meeting Minutes",
      onClick: () => onCategoryFilterChange("Meeting Minutes"),
    },
  ];

  const getCategoryLabel = () => {
    if (categoryFilter === "all") return "Category: All";
    return `Category: ${categoryFilter}`;
  };

  return (
    <div className="bg-[#141416] border border-white/10 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col gap-4 text-white">
      {/* Top Header Row: Title & Primary Action */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            Smart Inbox
          </h2>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#C6F432]/20 text-[#C6F432] border border-[#C6F432]/30 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            AI Smart Inbox
          </span>
        </div>

        <button
          type="button"
          onClick={onComposeClick}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold tracking-tight shadow-md shadow-[#C6F432]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Compose Email</span>
        </button>
      </div>

      {/* Bottom Controls Row: Search Bar & Category Filter */}
      <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="w-full md:max-w-md">
          <div className="flex items-center bg-[#1A1A1E] border border-white/10 focus-within:border-[#C6F432]/40 rounded-full px-4 py-2 text-xs text-white shadow-inner transition-colors">
            <Search className="w-4 h-4 text-zinc-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search emails by subject, sender, tag, or content..."
              className="w-full bg-transparent border-none outline-none text-xs text-white placeholder-zinc-500 font-medium"
            />
          </div>
        </div>

        <div className="w-full md:w-auto flex items-center justify-end">
          <GlassDropdown
            trigger={
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1E] border border-white/10 hover:border-[#C6F432]/40 text-xs font-semibold text-zinc-200 transition-colors cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5 text-[#C6F432]" />
                <span>{getCategoryLabel()}</span>
              </button>
            }
            items={categoryOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailsHeader;
