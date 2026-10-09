import { Users, Plus, Sparkles, LayoutGrid, Table, GitFork, Filter } from "lucide-react";
import {
  GlassPanel,
  GlassSearchBar,
  GlassTabs,
  GlassDropdown,
  GlassButton,
  GlassBadge,
} from "../../../components/ui";

/**
 * EmployeesHeader - Apple Liquid Glass Control Bar for Employee Directory
 * Integrates search input, view mode switcher (Grid/Table/OrgChart), department tabs, status dropdown, and Add Employee trigger.
 * 
 * @param {string} searchTerm - Active search query
 * @param {function} onSearchChange - Search text handler
 * @param {string} activeDepartment - Active department filter tab ID
 * @param {function} onDepartmentChange - Department tab switcher handler
 * @param {string} activeViewMode - Active view layout ('grid', 'table', 'orgChart')
 * @param {function} onViewModeChange - View switcher handler
 * @param {string} statusFilter - Active presence status filter ID
 * @param {function} onStatusFilterChange - Status filter handler
 * @param {function} onAddClick - Add Employee CTA trigger
 */
export const EmployeesHeader = ({
  searchTerm,
  onSearchChange,
  activeDepartment = "all",
  onDepartmentChange,
  activeViewMode = "grid",
  onViewModeChange,
  statusFilter = "all",
  onStatusFilterChange,
  onAddClick,
}) => {
  // View mode tab options
  const viewTabs = [
    { id: "grid", label: "Grid View", icon: LayoutGrid },
    { id: "table", label: "Table View", icon: Table },
    { id: "orgChart", label: "Org Chart", icon: GitFork },
  ];

  // Department filter options
  const departmentTabs = [
    { id: "all", label: "All Staff" },
    { id: "Executive", label: "Executive" },
    { id: "Engineering", label: "Engineering" },
    { id: "Design", label: "Design" },
    { id: "Product", label: "Product" },
    { id: "Marketing", label: "Marketing" },
    { id: "HR", label: "HR" },
  ];

  // Status Filter Dropdown Options
  const statusOptions = [
    { id: "all", label: "All Presence Statuses", onClick: () => onStatusFilterChange("all") },
    { id: "online", label: "Online & Active", onClick: () => onStatusFilterChange("online") },
    { id: "meeting", label: "In Meeting", onClick: () => onStatusFilterChange("meeting") },
    { id: "away", label: "Stepped Away", onClick: () => onStatusFilterChange("away") },
    { id: "offline", label: "Offline", onClick: () => onStatusFilterChange("offline") },
  ];

  const getStatusLabel = () => {
    if (statusFilter === "all") return "Presence: All";
    if (statusFilter === "online") return "Presence: Online";
    if (statusFilter === "meeting") return "Presence: In Call";
    if (statusFilter === "away") return "Presence: Away";
    return "Presence: Offline";
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
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Employee Directory
              </h1>
              <GlassBadge variant="cyan" size="sm" icon={Sparkles}>
                Verified Roster
              </GlassBadge>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage workplace team members, roles, departments, and performance index.
            </p>
          </div>
        </div>

        {/* Action Controls: View Switcher & Add Employee Button */}
        <div className="flex flex-wrap items-center gap-3">
          {/* View Mode Switcher */}
          <GlassTabs
            tabs={viewTabs}
            activeTab={activeViewMode}
            onChange={onViewModeChange}
            size="sm"
          />

          {/* Add Employee CTA */}
          <GlassButton
            variant="primary"
            size="md"
            icon={Plus}
            onClick={onAddClick}
          >
            Add Employee
          </GlassButton>
        </div>
      </div>

      {/* Bottom Controls Row: Search Bar, Department Tabs, Status Dropdown */}
      <div className="relative z-10 pt-3 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="w-full lg:max-w-md">
          <GlassSearchBar
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Search by name, role, department, skills, or email..."
            shortcutKey="⌘K"
          />
        </div>

        {/* Right Side: Department Tabs & Status Filter Dropdown */}
        <div className="w-full lg:w-auto flex flex-wrap items-center gap-2 justify-between lg:justify-end overflow-x-auto">
          {/* Department Filter Tabs */}
          <GlassTabs
            tabs={departmentTabs}
            activeTab={activeDepartment}
            onChange={onDepartmentChange}
            size="sm"
          />

          {/* Status Dropdown Filter */}
          <GlassDropdown
            trigger={
              <GlassButton variant="ghost" size="sm" icon={Filter}>
                {getStatusLabel()}
              </GlassButton>
            }
            items={statusOptions}
          />
        </div>
      </div>
    </GlassPanel>
  );
};

export default EmployeesHeader;
