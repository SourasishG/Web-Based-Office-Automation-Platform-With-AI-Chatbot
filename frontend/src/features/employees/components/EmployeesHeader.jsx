import {
  Plus,
  Sparkles,
  LayoutGrid,
  Table,
  GitFork,
  Filter,
  Search,
} from "lucide-react";
import { GlassDropdown } from "../../../components/ui";

/**
 * EmployeesHeader - Quixotic Executive Control Bar for Employee Directory
 * Positioned in the upper 60% Midnight Black region.
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
  const viewTabs = [
    { id: "grid", label: "Grid View", icon: LayoutGrid },
    { id: "table", label: "Table View", icon: Table },
    { id: "orgChart", label: "Org Chart", icon: GitFork },
  ];

  const departmentTabs = [
    { id: "all", label: "All Staff" },
    { id: "Executive", label: "Executive" },
    { id: "Engineering", label: "Engineering" },
    { id: "Design", label: "Design" },
    { id: "Product", label: "Product" },
    { id: "Marketing", label: "Marketing" },
    { id: "HR", label: "HR" },
  ];

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
    <div className="bg-[#141416] border border-white/10 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col gap-4 text-white">
      {/* Top Header Row: Section Title, View Switcher & Add CTA */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            Workforce Roster
          </h2>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#C6F432]/20 text-[#C6F432] border border-[#C6F432]/30 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Verified Roster
          </span>
        </div>

        {/* Action Controls: View Mode Switcher & Add Employee Button */}
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
            onClick={onAddClick}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold tracking-tight shadow-md shadow-[#C6F432]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* Bottom Controls Row: Search Bar, Department Tabs, Status Dropdown */}
      <div className="pt-4 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="w-full lg:max-w-md">
          <div className="flex items-center bg-[#1A1A1E] border border-white/10 focus-within:border-white/20 rounded-full px-4 py-2 text-xs text-white shadow-inner">
            <Search className="w-4 h-4 text-zinc-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by name, role, department, skills, or email..."
              className="w-full bg-transparent border-none outline-none text-xs text-white placeholder-zinc-500 font-medium"
            />
          </div>
        </div>

        {/* Right Side: Department Filter Tabs & Status Filter Dropdown */}
        <div className="w-full lg:w-auto flex flex-wrap items-center gap-3 justify-between lg:justify-end">
          {/* Department Filter Pill Tabs */}
          <div className="flex items-center bg-[#1A1A1E] border border-white/10 rounded-full p-1 text-xs overflow-x-auto max-w-full">
            {departmentTabs.map((tab) => {
              const isActive = activeDepartment === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onDepartmentChange(tab.id)}
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

          {/* Status Dropdown Filter */}
          <GlassDropdown
            trigger={
              <button
                type="button"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1A1A1E] border border-white/10 hover:border-white/20 text-xs font-semibold text-zinc-300 hover:text-white transition-all shadow-sm cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5 text-[#C6F432]" />
                <span>{getStatusLabel()}</span>
              </button>
            }
            items={statusOptions}
            align="right"
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeesHeader;
