import { Plus, Sparkles, Calendar, Search } from "lucide-react";

/**
 * MeetingsHeader - Quixotic Executive Meeting Control Bar
 * Positioned in the upper 60% Midnight Black region.
 * 
 * @param {string} searchTerm - Active search query
 * @param {function} onSearchChange - Search text change handler
 * @param {string} activeTab - Active filter tab ID ('all', 'today', 'upcoming', 'completed')
 * @param {function} onTabChange - Tab switcher handler
 * @param {function} onScheduleClick - Schedule Meeting modal trigger callback
 * @param {function} onCalendarClick - Interactive Calendar modal trigger callback
 */
export const MeetingsHeader = ({
  searchTerm,
  onSearchChange,
  activeTab = "all",
  onTabChange,
  onScheduleClick,
  onCalendarClick,
}) => {
  const filterTabs = [
    { id: "all", label: "All Meetings" },
    { id: "today", label: "Today" },
    { id: "upcoming", label: "Upcoming" },
    { id: "completed", label: "Completed" },
  ];

  return (
    <div className="bg-[#141416] border border-white/10 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col gap-4 text-white">
      {/* Top Header Row: Section Title & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            Meetings & Sync Schedule
          </h2>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#C6F432]/20 text-[#C6F432] border border-[#C6F432]/30 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Real-Time Sync
          </span>
        </div>

        {/* Action Buttons: Calendar & Schedule */}
        <div className="flex items-center gap-3">
          {onCalendarClick && (
            <button
              type="button"
              onClick={onCalendarClick}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1A1A1E] border border-white/10 hover:border-white/20 text-xs font-semibold text-zinc-300 hover:text-white transition-all shadow-sm cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C6F432]" />
              <span>Calendar</span>
            </button>
          )}

          <button
            type="button"
            onClick={onScheduleClick}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold tracking-tight shadow-md shadow-[#C6F432]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Schedule Meeting</span>
          </button>
        </div>
      </div>

      {/* Controls Row: Search & Tab Switcher */}
      <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="w-full md:max-w-md">
          <div className="flex items-center bg-[#1A1A1E] border border-white/10 focus-within:border-white/20 rounded-full px-4 py-2 text-xs text-white shadow-inner">
            <Search className="w-4 h-4 text-zinc-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search meetings by title, room, or attendee..."
              className="w-full bg-transparent border-none outline-none text-xs text-white placeholder-zinc-500 font-medium"
            />
          </div>
        </div>

        {/* Status Filter Pill Tabs */}
        <div className="flex items-center bg-[#1A1A1E] border border-white/10 rounded-full p-1 text-xs overflow-x-auto">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`px-3.5 py-1 rounded-full font-semibold whitespace-nowrap transition-all cursor-pointer ${
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
    </div>
  );
};

export default MeetingsHeader;
