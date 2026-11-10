import { Plus, Sparkles, ArrowUpDown, Filter, Search } from "lucide-react";
import { GlassDropdown } from "../../../components/ui";

/**
 * TasksHeader - Quixotic Executive Task Control Bar
 * Positioned in the upper 60% Midnight Black region.
 * 
 * @param {string} searchTerm - Active search query
 * @param {function} onSearchChange - Search text change handler
 * @param {string} statusFilter - Active status filter ID ('all', 'todo', 'in-progress', 'review', 'completed')
 * @param {function} onStatusFilterChange - Status filter handler
 * @param {string} priorityFilter - Active priority filter ID ('all', 'critical', 'high', 'medium', 'low')
 * @param {function} onPriorityFilterChange - Priority filter handler
 * @param {string} sortBy - Active sorting key ('dueDate', 'priority', 'progress', 'title')
 * @param {function} onSortByChange - Sort mode change handler
 * @param {function} onCreateClick - Create task callback
 */
export const TasksHeader = ({
  searchTerm,
  onSearchChange,
  statusFilter = "all",
  onStatusFilterChange,
  priorityFilter = "all",
  onPriorityFilterChange,
  sortBy = "dueDate",
  onSortByChange,
  onCreateClick,
}) => {
  // Status Filter Tabs Configuration
  const statusTabs = [
    { id: "all", label: "All Tasks" },
    { id: "todo", label: "To Do" },
    { id: "in-progress", label: "In Progress" },
    { id: "review", label: "Review" },
    { id: "completed", label: "Completed" },
  ];

  // Priority Dropdown Options
  const priorityOptions = [
    { label: "All Priorities", onClick: () => onPriorityFilterChange("all") },
    { label: "Critical Priority", onClick: () => onPriorityFilterChange("critical") },
    { label: "High Priority", onClick: () => onPriorityFilterChange("high") },
    { label: "Medium Priority", onClick: () => onPriorityFilterChange("medium") },
    { label: "Low Priority", onClick: () => onPriorityFilterChange("low") },
  ];

  // Sort Dropdown Options
  const sortOptions = [
    { label: "Sort by Due Date", onClick: () => onSortByChange("dueDate") },
    { label: "Sort by Priority", onClick: () => onSortByChange("priority") },
    { label: "Sort by Progress", onClick: () => onSortByChange("progress") },
    { label: "Sort by Title", onClick: () => onSortByChange("title") },
  ];

  const getPriorityLabel = () => {
    if (priorityFilter === "all") return "All";
    return priorityFilter.charAt(0).toUpperCase() + priorityFilter.slice(1);
  };

  const getSortLabel = () => {
    if (sortBy === "priority") return "Priority";
    if (sortBy === "progress") return "Progress";
    if (sortBy === "title") return "Title";
    return "Due Date";
  };

  return (
    <div className="bg-[#141416] border border-white/10 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col gap-4 text-white">
      {/* Top Header Row: Section Title & Create CTA */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            Kanban Command Flow
          </h2>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#C6F432]/20 text-[#C6F432] border border-[#C6F432]/30 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Live Sync
          </span>
        </div>

        {/* Primary Action Button: Lime Green */}
        <button
          type="button"
          onClick={onCreateClick}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold tracking-tight shadow-md shadow-[#C6F432]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Task</span>
        </button>
      </div>

      {/* Controls Row: Search, Status Tabs, Priority & Sort Dropdown */}
      <div className="pt-4 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="w-full lg:max-w-md">
          <div className="flex items-center bg-[#1A1A1E] border border-white/10 focus-within:border-white/20 rounded-full px-4 py-2 text-xs text-white shadow-inner">
            <Search className="w-4 h-4 text-zinc-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search tasks, descriptions, assignees..."
              className="w-full bg-transparent border-none outline-none text-xs text-white placeholder-zinc-500 font-medium"
            />
          </div>
        </div>

        {/* Status Tabs, Priority & Sort Dropdowns */}
        <div className="w-full lg:w-auto flex flex-wrap items-center justify-between lg:justify-end gap-3">
          {/* Status Filter Pill Tabs */}
          <div className="flex items-center bg-[#1A1A1E] border border-white/10 rounded-full p-1 text-xs overflow-x-auto">
            {statusTabs.map((tab) => {
              const isActive = statusFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onStatusFilterChange(tab.id)}
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

          {/* Priority Dropdown */}
          <GlassDropdown
            trigger={
              <button
                type="button"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1A1A1E] border border-white/10 hover:border-white/20 text-xs font-semibold text-zinc-300 hover:text-white transition-all shadow-sm cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5 text-[#C6F432]" />
                <span>Priority: {getPriorityLabel()}</span>
              </button>
            }
            items={priorityOptions}
            align="right"
          />

          {/* Sort Dropdown */}
          <GlassDropdown
            trigger={
              <button
                type="button"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1A1A1E] border border-white/10 hover:border-white/20 text-xs font-semibold text-zinc-300 hover:text-white transition-all shadow-sm cursor-pointer"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-[#C6F432]" />
                <span>Sort: {getSortLabel()}</span>
              </button>
            }
            items={sortOptions}
            align="right"
          />
        </div>
      </div>
    </div>
  );
};

export default TasksHeader;
