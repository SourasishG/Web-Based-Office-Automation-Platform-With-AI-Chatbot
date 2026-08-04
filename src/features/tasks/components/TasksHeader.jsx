import React from "react";
import { Plus, Sparkles, ArrowUpDown, Filter, CheckSquare } from "lucide-react";
import {
  GlassPanel,
  GlassSearchBar,
  GlassTabs,
  GlassDropdown,
  GlassButton,
  GlassBadge,
} from "../../../components/ui";

/**
 * TasksHeader - Apple Liquid Glass Control Bar for Tasks
 * Integrates global task search, status filter tabs, priority filtering, sorting, and task creation CTA.
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
    if (priorityFilter === "all") return "Priority: All";
    return `Priority: ${priorityFilter.charAt(0).toUpperCase() + priorityFilter.slice(1)}`;
  };

  const getSortLabel = () => {
    if (sortBy === "priority") return "Priority";
    if (sortBy === "progress") return "Progress";
    if (sortBy === "title") return "Title";
    return "Due Date";
  };

  return (
    <GlassPanel
      variant="floating"
      padding="md"
      className="relative overflow-hidden flex flex-col gap-4"
    >
      {/* Background Ambient Glow */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-linear-to-br from-cyan-500/15 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Row: Title & Primary CTA */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 shrink-0">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Task Command Center
              </h1>
              <GlassBadge variant="cyan" size="sm" icon={Sparkles}>
                Kanban Flow
              </GlassBadge>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Organize, assign, and track team execution across agile columns.
            </p>
          </div>
        </div>

        {/* Primary CTA */}
        <GlassButton
          variant="primary"
          size="md"
          icon={Plus}
          onClick={onCreateClick}
        >
          New Task
        </GlassButton>
      </div>

      {/* Bottom Controls Row */}
      <div className="relative z-10 pt-3 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="w-full lg:max-w-md">
          <GlassSearchBar
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Search tasks, descriptions, assignees, or tags..."
            shortcutKey="⌘K"
          />
        </div>

        {/* Status Tabs, Priority & Sort Controls */}
        <div className="w-full lg:w-auto flex flex-wrap items-center justify-between lg:justify-end gap-3">
          {/* Status Filter Tabs */}
          <div className="overflow-x-auto">
            <GlassTabs
              tabs={statusTabs}
              activeTab={statusFilter}
              onChange={onStatusFilterChange}
              size="sm"
            />
          </div>

          {/* Priority & Sort Dropdowns */}
          <div className="flex items-center gap-2">
            <GlassDropdown
              trigger={
                <GlassButton variant="outline" size="sm" icon={Filter}>
                  {getPriorityLabel()}
                </GlassButton>
              }
              items={priorityOptions}
              align="right"
            />

            <GlassDropdown
              trigger={
                <GlassButton variant="outline" size="sm" icon={ArrowUpDown}>
                  Sort: {getSortLabel()}
                </GlassButton>
              }
              items={sortOptions}
              align="right"
            />
          </div>
        </div>
      </div>
    </GlassPanel>
  );
};

export default TasksHeader;