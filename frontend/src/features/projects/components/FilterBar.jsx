import { ArrowUpDown, Plus, Search, Sparkles } from "lucide-react";
import { GlassDropdown } from "../../../components/ui";

/**
 * FilterBar - Executive Project Control Bar
 * Features search input, Lime Green status tabs, sorting dropdown, and create project CTA.
 * 
 * @param {string} searchTerm - Active search query
 * @param {function} onSearchChange - Search text handler
 * @param {string} statusFilter - Active status filter ('all', 'active', 'completed', 'on-hold')
 * @param {function} onStatusFilterChange - Status filter handler
 * @param {string} sortBy - Active sorting mode ('name', 'dueDate', 'progress')
 * @param {function} onSortByChange - Sort mode change handler
 * @param {function} onCreateClick - Create Project modal callback
 */
export const FilterBar = ({
  searchTerm,
  onSearchChange,
  statusFilter = "all",
  onStatusFilterChange,
  sortBy = "name",
  onSortByChange,
  onCreateClick,
}) => {
  // Filter Tabs Config
  const filterTabs = [
    { id: "all", label: "All Projects" },
    { id: "active", label: "Active" },
    { id: "completed", label: "Completed" },
    { id: "on-hold", label: "On Hold" },
  ];

  // Sorting Dropdown Menu Options
  const sortOptions = [
    {
      id: "sort-name",
      label: "Sort by Name",
      onClick: () => onSortByChange("name"),
      shortcut: sortBy === "name" ? "Active" : undefined,
    },
    {
      id: "sort-date",
      label: "Sort by Due Date",
      onClick: () => onSortByChange("dueDate"),
      shortcut: sortBy === "dueDate" ? "Active" : undefined,
    },
    {
      id: "sort-progress",
      label: "Sort by Progress",
      onClick: () => onSortByChange("progress"),
      shortcut: sortBy === "progress" ? "Active" : undefined,
    },
  ];

  const getSortLabel = () => {
    if (sortBy === "dueDate") return "Due Date";
    if (sortBy === "progress") return "Progress";
    return "Name";
  };

  return (
    <div className="bg-[#141416] border border-white/10 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col gap-4 text-white">
      {/* Top Header Row: Section Title & Create CTA */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            Project Portfolio
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
          <span>New Project</span>
        </button>
      </div>

      {/* Controls Row: Search, Status Tabs & Sorting Dropdown */}
      <div className="pt-4 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="w-full lg:max-w-md">
          <div className="flex items-center bg-[#1A1A1E] border border-white/10 focus-within:border-white/20 rounded-full px-4 py-2 text-xs text-white shadow-inner">
            <Search className="w-4 h-4 text-zinc-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search projects by name, description, category..."
              className="w-full bg-transparent border-none outline-none text-xs text-white placeholder-zinc-500 font-medium"
            />
          </div>
        </div>

        {/* Status Tabs & Sort Dropdown Group */}
        <div className="w-full lg:w-auto flex flex-wrap items-center justify-between lg:justify-end gap-3">
          {/* Status Filter Pill Tabs */}
          <div className="flex items-center bg-[#1A1A1E] border border-white/10 rounded-full p-1 text-xs">
            {filterTabs.map((tab) => {
              const isActive = statusFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onStatusFilterChange(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full font-semibold transition-all ${
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

          {/* Sort Menu Dropdown */}
          <GlassDropdown
            trigger={
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1E] border border-white/10 hover:border-white/20 text-xs font-semibold text-zinc-300 hover:text-white transition-all shadow-sm"
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

export default FilterBar;
