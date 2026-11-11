import {
  Plus,
  Sparkles,
  Filter,
  List,
  LayoutGrid,
  Search,
} from "lucide-react";
import { GlassDropdown } from "../../../components/ui";

/**
 * TicketsHeader - Quixotic Executive Control Bar for Support Tickets
 * Positioned in the upper 60% Midnight Black region.
 *
 * @param {string} searchTerm - Active search query
 * @param {function} onSearchChange - Search text handler
 * @param {string} activeCategory - Active category filter ID
 * @param {function} onCategoryChange - Category tab switcher handler
 * @param {string} activeViewMode - Active view layout ('list', 'kanban')
 * @param {function} onViewModeChange - View switcher handler
 * @param {string} priorityFilter - Active priority filter ID
 * @param {function} onPriorityFilterChange - Priority filter handler
 * @param {function} onCreateClick - Submit Ticket CTA trigger
 */
export const TicketsHeader = ({
  searchTerm,
  onSearchChange,
  activeCategory = "all",
  onCategoryChange,
  activeViewMode = "list",
  onViewModeChange,
  priorityFilter = "all",
  onPriorityFilterChange,
  onCreateClick,
}) => {
  const viewTabs = [
    { id: "list", label: "List View", icon: List },
    { id: "kanban", label: "Kanban Board", icon: LayoutGrid },
  ];

  const categoryTabs = [
    { id: "all", label: "All Categories" },
    { id: "Access & Security", label: "Access & Security" },
    { id: "IT Infrastructure", label: "IT Infrastructure" },
    { id: "Software & Tools", label: "Software & Tools" },
    { id: "Facilities", label: "Facilities" },
    { id: "HR Operations", label: "HR Ops" },
  ];

  const priorityOptions = [
    {
      id: "all",
      label: "All Priority Tiers",
      onClick: () => onPriorityFilterChange("all"),
    },
    {
      id: "Critical",
      label: "Critical Priority",
      onClick: () => onPriorityFilterChange("Critical"),
    },
    {
      id: "High",
      label: "High Priority",
      onClick: () => onPriorityFilterChange("High"),
    },
    {
      id: "Medium",
      label: "Medium Priority",
      onClick: () => onPriorityFilterChange("Medium"),
    },
    {
      id: "Low",
      label: "Low Priority",
      onClick: () => onPriorityFilterChange("Low"),
    },
  ];

  const getPriorityLabel = () => {
    if (priorityFilter === "all") return "Priority: All";
    return `Priority: ${priorityFilter}`;
  };

  return (
    <div className="bg-[#141416] border border-white/10 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col gap-4 text-white">
      {/* Top Header Row: Section Title, View Switcher & Submit CTA */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            Support Queue
          </h2>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#C6F432]/20 text-[#C6F432] border border-[#C6F432]/30 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            SLA Monitor
          </span>
        </div>

        {/* View Switcher & Submit CTA */}
        <div className="flex flex-wrap items-center gap-3">
          {/* View Mode Pill Switcher */}
          <div className="flex items-center bg-[#1A1A1E] border border-white/10 rounded-full p-1 text-xs">
            {viewTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeViewMode === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onViewModeChange(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#C6F432] text-[#0B0B0C] font-bold shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Primary Action Button: Lime Green */}
          <button
            type="button"
            onClick={onCreateClick}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold tracking-tight shadow-md shadow-[#C6F432]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Submit Ticket</span>
          </button>
        </div>
      </div>

      {/* Bottom Controls Row: Search Input, Category Tabs, Priority Dropdown */}
      <div className="pt-4 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="w-full lg:max-w-md">
          <div className="flex items-center bg-[#1A1A1E] border border-white/10 focus-within:border-[#C6F432]/40 rounded-full px-4 py-2 text-xs text-white shadow-inner transition-colors">
            <Search className="w-4 h-4 text-zinc-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search tickets by ID, title, requester, or assignee..."
              className="w-full bg-transparent border-none outline-none text-xs text-white placeholder-zinc-500 font-medium"
            />
          </div>
        </div>

        {/* Category Tabs & Priority Dropdown */}
        <div className="w-full lg:w-auto flex flex-wrap items-center gap-3 justify-between lg:justify-end">
          {/* Category Pill Tabs */}
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

export default TicketsHeader;
