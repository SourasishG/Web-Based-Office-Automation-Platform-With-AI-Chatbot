import React from "react";
import { Calendar, Plus, Sparkles, Video } from "lucide-react";
import {
  GlassPanel,
  GlassSearchBar,
  GlassTabs,
  GlassButton,
  GlassBadge,
} from "../../../components/ui";

/**
 * MeetingsHeader - Apple Liquid Glass Control Bar for Meetings
 * Provides global search, meeting status filters, and the primary schedule meeting action.
 * 
 * @param {string} searchTerm - Active search query
 * @param {function} onSearchChange - Search text change handler
 * @param {string} activeTab - Active filter tab ID ('all', 'today', 'upcoming', 'completed')
 * @param {function} onTabChange - Tab switcher handler
 * @param {function} onScheduleClick - Schedule Meeting modal trigger callback
 */
export const MeetingsHeader = ({
  searchTerm,
  onSearchChange,
  activeTab = "all",
  onTabChange,
  onScheduleClick,
}) => {
  // Filter Tabs Configuration
  const filterTabs = [
    { id: "all", label: "All Meetings" },
    { id: "today", label: "Today" },
    { id: "upcoming", label: "Upcoming" },
    { id: "completed", label: "Completed" },
  ];

  return (
    <GlassPanel
      variant="floating"
      padding="md"
      className="relative overflow-hidden flex flex-col gap-4"
    >
      {/* Background Soft Glow */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-linear-to-br from-cyan-500/15 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Row: Title & Primary Action */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 shrink-0">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Meetings & Schedule
              </h1>
              <GlassBadge variant="cyan" size="sm" icon={Sparkles}>
                Real-Time Sync
              </GlassBadge>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Organize, schedule, and join workplace video calls & syncs.
            </p>
          </div>
        </div>

        {/* Action Button: Schedule Meeting */}
        <div className="flex items-center gap-2">
          <GlassButton
            variant="primary"
            size="md"
            icon={Plus}
            onClick={onScheduleClick}
          >
            Schedule Meeting
          </GlassButton>
        </div>
      </div>

      {/* Bottom Controls Row: Search Bar & Tab Switcher */}
      <div className="relative z-10 pt-3 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="w-full md:max-w-md">
          <GlassSearchBar
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Search meetings by title, room, or attendee..."
            shortcutKey="⌘K"
          />
        </div>

        {/* Filter Tabs */}
        <div className="w-full md:w-auto overflow-x-auto">
          <GlassTabs
            tabs={filterTabs}
            activeTab={activeTab}
            onChange={onTabChange}
            size="sm"
          />
        </div>
      </div>
    </GlassPanel>
  );
};

export default MeetingsHeader;