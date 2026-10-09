import { Mail, Plus, Sparkles, Filter } from "lucide-react";
import {
  GlassPanel,
  GlassSearchBar,
  GlassDropdown,
  GlassButton,
  GlassBadge,
} from "../../../components/ui";

/**
 * EmailsHeader - Apple Liquid Glass Control Bar for Internal Mail & Communications
 * Integrates global email search, category filters, and Compose Email CTA.
 * 
 * @param {string} searchTerm - Active search query
 * @param {function} onSearchChange - Search text handler
 * @param {string} categoryFilter - Active category filter ID
 * @param {function} onCategoryFilterChange - Category filter handler
 * @param {function} onComposeClick - Compose Email CTA callback
 */
export const EmailsHeader = ({
  searchTerm,
  onSearchChange,
  categoryFilter = "all",
  onCategoryFilterChange,
  onComposeClick,
}) => {
  // Category dropdown menu items
  const categoryOptions = [
    { label: "All Categories", onClick: () => onCategoryFilterChange("all") },
    { label: "Announcements", onClick: () => onCategoryFilterChange("Announcement") },
    { label: "Project Sync", onClick: () => onCategoryFilterChange("Project Sync") },
    { label: "HR Memos", onClick: () => onCategoryFilterChange("HR Memo") },
    { label: "IT Alerts", onClick: () => onCategoryFilterChange("IT Alert") },
    { label: "Meeting Minutes", onClick: () => onCategoryFilterChange("Meeting Minutes") },
  ];

  const getCategoryLabel = () => {
    if (categoryFilter === "all") return "Category: All";
    return `Category: ${categoryFilter}`;
  };

  return (
    <GlassPanel
      variant="floating"
      padding="md"
      className="relative overflow-hidden flex flex-col gap-4"
    >
      {/* Ambient Background Radial Glow */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-linear-to-br from-cyan-500/15 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Row: Title & Primary Action */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Internal Mail System
              </h1>
              <GlassBadge variant="cyan" size="sm" icon={Sparkles}>
                AI Smart Inbox
              </GlassBadge>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Corporate messaging, executive broadcasts, and AI thread summaries.
            </p>
          </div>
        </div>

        {/* Primary Action Button: Compose Email */}
        <div className="flex items-center gap-2">
          <GlassButton
            variant="primary"
            size="md"
            icon={Plus}
            onClick={onComposeClick}
          >
            Compose Email
          </GlassButton>
        </div>
      </div>

      {/* Bottom Controls Row: Search Bar & Category Filter */}
      <div className="relative z-10 pt-3 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="w-full md:max-w-md">
          <GlassSearchBar
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Search emails by subject, sender, tag, or content..."
            shortcutKey="⌘K"
          />
        </div>

        {/* Category Filter Dropdown */}
        <div className="w-full md:w-auto flex items-center justify-end">
          <GlassDropdown
            trigger={
              <GlassButton variant="ghost" size="sm" icon={Filter}>
                {getCategoryLabel()}
              </GlassButton>
            }
            items={categoryOptions}
          />
        </div>
      </div>
    </GlassPanel>
  );
};

export default EmailsHeader;
