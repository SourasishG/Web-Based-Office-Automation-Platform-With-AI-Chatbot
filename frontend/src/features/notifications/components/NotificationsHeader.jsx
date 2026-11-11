import {
  CheckCheck,
  Trash2,
  Sparkles,
  Filter,
  Search,
} from "lucide-react";
import { GlassDropdown } from "../../../components/ui";

/**
 * NotificationsHeader - Quixotic Executive Control Bar for Notification Center
 * Positioned in the upper 60% Midnight Black region.
 *
 * @param {string} searchTerm - Active search query
 * @param {function} onSearchChange - Search text handler
 * @param {string} activeCategory - Active category filter ID
 * @param {function} onCategoryChange - Category switcher handler
 * @param {string} activeReadStatus - Read status filter ('all', 'unread', 'read')
 * @param {function} onReadStatusChange - Read status handler
 * @param {string} priorityFilter - Active priority filter ID
 * @param {function} onPriorityFilterChange - Priority filter handler
 * @param {function} onMarkAllRead - Mark all read CTA callback
 * @param {function} onClearAll - Clear all CTA callback
 */
export const NotificationsHeader = ({
  searchTerm,
  onSearchChange,
  activeCategory = "all",
  onCategoryChange,
  activeReadStatus = "all",
  onReadStatusChange,
  priorityFilter = "all",
  onPriorityFilterChange,
  onMarkAllRead,
  onClearAll,
}) => {
  const readTabs = [
    { id: "all", label: "All Alerts" },
    { id: "unread", label: "Unread" },
    { id: "read", label: "Read" },
  ];

  const categoryTabs = [
    { id: "all", label: "All Categories" },
    { id: "tasks", label: "Tasks" },
    { id: "meetings", label: "Meetings" },
    { id: "emails", label: "Emails" },
    { id: "tickets", label: "Tickets" },
    { id: "system", label: "System" },
  ];

  const priorityOptions = [
    {
      id: "all",
      label: "All Priority Levels",
      onClick: () => onPriorityFilterChange("all"),
    },
    {
      id: "urgent",
      label: "Urgent Priority",
      onClick: () => onPriorityFilterChange("urgent"),
    },
    {
      id: "high",
      label: "High Priority",
      onClick: () => onPriorityFilterChange("high"),
    },
    {
      id: "normal",
      label: "Normal Priority",
      onClick: () => onPriorityFilterChange("normal"),
    },
    {
      id: "low",
      label: "Low Priority",
      onClick: () => onPriorityFilterChange("low"),
    },
  ];

  const getPriorityLabel = () => {
    if (priorityFilter === "all") return "Priority: All";
    return `Priority: ${
      priorityFilter.charAt(0).toUpperCase() + priorityFilter.slice(1)
    }`;
  };

  return (
    <div className="bg-[#141416] border border-white/10 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col gap-4 text-white">
      {/* Top Header Row: Title & Global CTAs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            Live Alert Stream
          </h2>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#C6F432]/20 text-[#C6F432] border border-[#C6F432]/30 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Live Sync
          </span>
        </div>

        {/* Global CTAs */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onMarkAllRead}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold tracking-tight shadow-md shadow-[#C6F432]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Mark All as Read</span>
          </button>

          <button
            type="button"
            onClick={onClearAll}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-semibold transition-all cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Bottom Controls Row: Search Input, Read Tabs, Category Tabs, Priority Dropdown */}
      <div className="pt-4 border-t border-white/10 flex flex-col xl:flex-row items-center justify-between gap-3">
        {/* Search Bar & Read Status Switcher */}
        <div className="w-full xl:w-auto flex flex-col sm:flex-row items-center gap-3 flex-1">
          <div className="w-full sm:max-w-xs flex items-center bg-[#1A1A1E] border border-white/10 focus-within:border-[#C6F432]/40 rounded-full px-4 py-2 text-xs text-white shadow-inner transition-colors">
            <Search className="w-4 h-4 text-zinc-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search notifications by keyword or sender..."
              className="w-full bg-transparent border-none outline-none text-xs text-white placeholder-zinc-500 font-medium"
            />
          </div>

          <div className="flex items-center bg-[#1A1A1E] border border-white/10 rounded-full p-1 text-xs shrink-0">
            {readTabs.map((tab) => {
              const isActive = activeReadStatus === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onReadStatusChange(tab.id)}
                  className={`px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#C6F432] text-[#0B0B0C] font-bold shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Tabs & Priority Dropdown */}
        <div className="w-full xl:w-auto flex flex-wrap items-center gap-3 justify-between xl:justify-end">
          <div className="flex items-center bg-[#1A1A1E] border border-white/10 rounded-full p-1 text-xs overflow-x-auto max-w-full">
            {categoryTabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onCategoryChange(tab.id)}
                  className={`px-3 py-1 rounded-full font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#C6F432] text-[#0B0B0C] font-bold shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <GlassDropdown
            trigger={
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1E] border border-white/10 hover:border-[#C6F432]/40 text-xs font-semibold text-zinc-200 transition-colors cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5 text-[#C6F432]" />
                <span>{getPriorityLabel()}</span>
              </button>
            }
            items={priorityOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationsHeader;
