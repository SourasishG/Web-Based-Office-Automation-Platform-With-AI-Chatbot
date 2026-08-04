import React from "react";
import { ArrowUpDown, Sparkles, Plus } from "lucide-react";
import {
  GlassPanel,
  GlassSearchBar,
  GlassTabs,
  GlassDropdown,
  GlassButton,
  GlassBadge,
} from "../../../components/ui";

/**
 * FilterBar - Apple Liquid Glass Project Control Bar
 * Integrates search input, status filter tabs, sorting dropdown, and the create project action.
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
    <GlassPanel
      variant="floating"
      padding="md"
      className="relative overflow-hidden flex flex-col gap-4"
    >
      {/* Background Soft Glow */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-linear-to-br from-cyan-500/15 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Row: Section Title & Create CTA */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Project Portfolio
            </h1>
            <GlassBadge variant="cyan" size="sm" icon={Sparkles}>
              Live Workspace
            </GlassBadge>
          </div>
        </div>

        {/* Primary Action Button */}
        <GlassButton
          variant="primary"
          size="md"
          icon={Plus}
          onClick={onCreateClick}
        >
          New Project
        </GlassButton>
      </div>

      {/* Controls Row: Search, Status Tabs & Sorting Dropdown */}
      <div className="relative z-10 pt-3 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="w-full lg:max-w-md">
          <GlassSearchBar
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Search projects by name, description, tag..."
            shortcutKey="⌘K"
          />
        </div>

        {/* Status Tabs & Sort Dropdown Group */}
        <div className="w-full lg:w-auto flex flex-wrap items-center justify-between lg:justify-end gap-3">
          {/* Filter Tabs */}
          <div className="overflow-x-auto">
            <GlassTabs
              tabs={filterTabs}
              activeTab={statusFilter}
              onChange={onStatusFilterChange}
              size="sm"
            />
          </div>

          {/* Sort Menu Dropdown */}
          <GlassDropdown
            trigger={
              <GlassButton
                variant="outline"
                size="sm"
                icon={ArrowUpDown}
              >
                Sort: {getSortLabel()}
              </GlassButton>
            }
            items={sortOptions}
            align="right"
          />
        </div>
      </div>
    </GlassPanel>
  );
};

export default FilterBar;