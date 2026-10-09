import { Bell, CheckCheck, Trash2, Sparkles, Filter } from "lucide-react";
import {
  GlassPanel,
  GlassSearchBar,
  GlassTabs,
  GlassDropdown,
  GlassButton,
  GlassBadge,
} from "../../../components/ui";

/**
 * NotificationsHeader - Apple Liquid Glass Control Bar for Notification Center
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
  // Read Status Tabs
  const readTabs = [
    { id: "all", label: "All Alerts" },
    { id: "unread", label: "Unread" },
    { id: "read", label: "Read" },
  ];

  // Category Tabs
  const categoryTabs = [
    { id: "all", label: "All Categories" },
    { id: "tasks", label: "Tasks" },
    { id: "meetings", label: "Meetings" },
    { id: "emails", label: "Emails" },
    { id: "tickets", label: "Tickets" },
    { id: "system", label: "System" },
  ];

  // Priority Dropdown Options
  const priorityOptions = [
    { label: "All Priority Levels", onClick: () => onPriorityFilterChange("all") },
    { label: "Urgent Priority", onClick: () => onPriorityFilterChange("urgent") },
    { label: "High Priority", onClick: () => onPriorityFilterChange("high") },
    { label: "Normal Priority", onClick: () => onPriorityFilterChange("normal") },
    { label: "Low Priority", onClick: () => onPriorityFilterChange("low") },
  ];

  const getPriorityLabel = () => {
    if (priorityFilter === "all") return "Priority: All";
    return `Priority: ${priorityFilter.charAt(0).toUpperCase() + priorityFilter.slice(1)}`;
  };

  return (
    <GlassPanel
      variant="floating"
      padding="md"
      className="relative overflow-hidden flex flex-col gap-4"
    >
      {/* Background Soft Ambient Glow */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-linear-to-br from-cyan-500/15 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Row: Title & Action CTAs */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 shrink-0">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Notification Center
              </h1>
              <GlassBadge variant="cyan" size="sm" icon={Sparkles}>
                Live Sync
              </GlassBadge>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Real-time operational alerts, task assignments, meeting invites, and security events.
            </p>
          </div>
        </div>

        {/* Global CTAs */}
        <div className="flex items-center gap-2 flex-wrap">
          <GlassButton
            variant="ghost"
            size="sm"
            icon={CheckCheck}
            onClick={onMarkAllRead}
          >
            Mark All as Read
          </GlassButton>

          <GlassButton
            variant="danger"
            size="sm"
            icon={Trash2}
            onClick={onClearAll}
          >
            Clear All
          </GlassButton>
        </div>
      </div>

      {/* Bottom Controls Row: Search Input, Read Tabs, Category Tabs, Priority Filter */}
      <div className="relative z-10 pt-3 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Search Bar & Read Filter */}
        <div className="w-full lg:max-w-xl flex flex-col sm:flex-row items-center gap-3">
          <div className="w-full sm:flex-1">
            <GlassSearchBar
              value={searchTerm}
              onChange={onSearchChange}
              placeholder="Search notifications by keyword or sender..."
              shortcutKey="⌘K"
            />
          </div>

          <GlassTabs
            tabs={readTabs}
            activeTab={activeReadStatus}
            onChange={onReadStatusChange}
            size="sm"
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

export default NotificationsHeader;
