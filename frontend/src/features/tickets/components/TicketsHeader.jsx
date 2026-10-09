import { Ticket, Plus, Sparkles, Filter, List, LayoutGrid } from "lucide-react";
import {
  GlassPanel,
  GlassSearchBar,
  GlassTabs,
  GlassDropdown,
  GlassButton,
  GlassBadge,
} from "../../../components/ui";

/**
 * TicketsHeader - Apple Liquid Glass Control Bar for Support Tickets
 * Integrates search input, view mode switcher (List/Kanban), category tabs, priority dropdown, and Submit Ticket CTA.
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
  // View mode tab options
  const viewTabs = [
    { id: "list", label: "List View", icon: List },
    { id: "kanban", label: "Kanban Board", icon: LayoutGrid },
  ];

  // Category filter tabs
  const categoryTabs = [
    { id: "all", label: "All Categories" },
    { id: "Access & Security", label: "Access & Security" },
    { id: "IT Infrastructure", label: "IT Infrastructure" },
    { id: "Software & Tools", label: "Software & Tools" },
    { id: "Facilities", label: "Facilities" },
    { id: "HR Operations", label: "HR Ops" },
  ];

  // Priority Dropdown Options
  const priorityOptions = [
    { label: "All Priority Tiers", onClick: () => onPriorityFilterChange("all") },
    { label: "Critical Priority", onClick: () => onPriorityFilterChange("Critical") },
    { label: "High Priority", onClick: () => onPriorityFilterChange("High") },
    { label: "Medium Priority", onClick: () => onPriorityFilterChange("Medium") },
    { label: "Low Priority", onClick: () => onPriorityFilterChange("Low") },
  ];

  const getPriorityLabel = () => {
    if (priorityFilter === "all") return "Priority: All";
    return `Priority: ${priorityFilter}`;
  };

  return (
    <GlassPanel
      variant="floating"
      padding="md"
      className="relative overflow-hidden flex flex-col gap-4"
    >
      {/* Ambient Background Glow */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-linear-to-br from-cyan-500/15 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Row: Title & Primary CTA */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 shrink-0">
            <Ticket className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                IT Helpdesk & Tickets
              </h1>
              <GlassBadge variant="cyan" size="sm" icon={Sparkles}>
                SLA Monitor
              </GlassBadge>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Submit, route, and track technical support requests, access permissions, and facility issues.
            </p>
          </div>
        </div>

        {/* View Switcher & Submit CTA */}
        <div className="flex items-center gap-3 flex-wrap">
          <GlassTabs
            tabs={viewTabs}
            activeTab={activeViewMode}
            onChange={onViewModeChange}
            size="sm"
          />

          <GlassButton
            variant="primary"
            size="md"
            icon={Plus}
            onClick={onCreateClick}
          >
            Submit Ticket
          </GlassButton>
        </div>
      </div>

      {/* Bottom Controls Row: Search Input, Category Tabs, Priority Dropdown */}
      <div className="relative z-10 pt-3 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="w-full lg:max-w-md">
          <GlassSearchBar
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Search tickets by ID, title, requester, or assignee..."
            shortcutKey="⌘K"
          />
        </div>

        {/* Category Tabs & Priority Dropdown */}
        <div className="w-full lg:w-auto flex flex-wrap items-center gap-2 justify-between lg:justify-end overflow-x-auto">
          <GlassTabs
            tabs={categoryTabs}
            activeTab={activeCategory}
            onChange={onCategoryChange}
            size="sm"
          />

          <GlassDropdown
            trigger={
              <GlassButton variant="ghost" size="sm" icon={Filter}>
                {getPriorityLabel()}
              </GlassButton>
            }
            items={priorityOptions}
          />
        </div>
      </div>
    </GlassPanel>
  );
};

export default TicketsHeader;
