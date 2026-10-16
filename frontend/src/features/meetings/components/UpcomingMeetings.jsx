import { Calendar, ArrowRight, Inbox } from "lucide-react";
import {
  GlassPanel,
  GlassBadge,
  GlassButton,
} from "../../../components/ui";
import MeetingCard from "./MeetingCard";

/**
 * UpcomingMeetings - Apple Liquid Glass Upcoming Events Sidebar Deck
 * Renders filtered upcoming meeting cards and calendar sync indicators.
 * 
 * @param {Array<object>} meetings - List of upcoming meeting objects
 * @param {string} searchTerm - Search query filter
 * @param {function} onJoinMeeting - Join callback handler
 */
export const UpcomingMeetings = ({
  meetings = [],
  searchTerm = "",
  onJoinMeeting,
  onViewCalendar,
}) => {
  const normalizedMeetings = meetings.map((m) => ({
    id: m.id,
    title: m.title,
    organizer: m.host
      ? {
          name: `${m.host.firstName || ""} ${m.host.lastName || ""}`.trim(),
          avatar: m.host.avatarUrl,
        }
      : m.organizer || { name: "Host" },
    time: m.time || `${m.startTime || ""} - ${m.endTime || ""}`.trim(),
    date: m.date
      ? new Date(m.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      : m.date,
    type: "video",
    location:
      m.location ||
      (m.platform === "GOOGLE_MEET"
        ? "Google Meet"
        : m.platform === "ZOOM"
        ? "Zoom"
        : m.platform === "TEAMS"
        ? "Microsoft Teams"
        : "Virtual"),
    status: (m.status || "upcoming").toLowerCase(),
    category: m.category || (m.platform ? m.platform.replace(/_/g, " ") : "Sync"),
    attendees: Array.isArray(m.attendees)
      ? m.attendees.map((a) => ({
          name: a.user
            ? `${a.user.firstName || ""} ${a.user.lastName || ""}`.trim()
            : a.name,
          src: a.user?.avatarUrl || a.avatar,
        }))
      : [],
    meetingLink: m.meetingLink,
  }));

  // Filter meetings by search query
  const filteredMeetings = normalizedMeetings.filter((item) => {
    if (!searchTerm) return true;
    const query = searchTerm.toLowerCase();
    return (
      item.title?.toLowerCase().includes(query) ||
      item.location?.toLowerCase().includes(query) ||
      item.organizer?.name?.toLowerCase().includes(query) ||
      item.category?.toLowerCase().includes(query)
    );
  });

  return (
    <GlassPanel
      title="Upcoming Meetings"
      subtitle={`${filteredMeetings.length} scheduled events`}
      icon={Calendar}
      action={
        <button
          type="button"
          onClick={onViewCalendar}
          className="cursor-pointer transition-transform hover:scale-105"
          title="Open Interactive Calendar"
        >
          <GlassBadge variant="cyan" size="sm" icon={Calendar}>
            Calendar Sync
          </GlassBadge>
        </button>
      }
      variant="default"
      padding="md"
      className="h-full flex flex-col justify-between"
    >
      {/* Meetings Card List */}
      <div className="space-y-3.5">
        {filteredMeetings.length > 0 ? (
          filteredMeetings.map((meeting, idx) => (
            <MeetingCard
              key={meeting.id || idx}
              meeting={meeting}
              onJoin={onJoinMeeting}
            />
          ))
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center text-slate-400">
            <Inbox className="w-8 h-8 text-slate-500 mb-2 stroke-[1.5]" />
            <span className="text-xs font-medium">No matching upcoming meetings</span>
          </div>
        )}
      </div>

      {/* Bottom Footer Action */}
      <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs text-slate-400 font-medium">Auto-synced with Calendar</span>
        <GlassButton
          variant="ghost"
          size="sm"
          rightIcon={ArrowRight}
          onClick={onViewCalendar}
        >
          View Calendar
        </GlassButton>
      </div>
    </GlassPanel>
  );
};

export default UpcomingMeetings;