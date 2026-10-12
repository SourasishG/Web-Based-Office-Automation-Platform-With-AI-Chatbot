import { Clock, Inbox } from "lucide-react";
import {
  GlassPanel,
  GlassBadge,
} from "../../../components/ui";
import TimelineItem from "./TimelineItem";

/**
 * DailyTimeline - Apple Liquid Glass Hour-by-Hour Daily Schedule Timeline
 * Displays today's sequential meetings with live time indicators, status badges, and join triggers.
 * 
 * @param {Array<object>} schedule - Daily timeline events array
 * @param {string} searchTerm - Search query filter
 * @param {string} activeTab - Active filter tab ('all', 'today', 'upcoming', 'completed')
 */
export const DailyTimeline = ({ schedule = [], searchTerm = "", activeTab = "all" }) => {
  // Normalize live meeting items
  const normalizedSchedule = schedule.map((m) => {
    const rawStatus = (m.status || "upcoming").toLowerCase().replace(/_/g, "-");
    const mappedStatus =
      rawStatus === "scheduled" ? "upcoming" : rawStatus;

    return {
      id: m.id,
      time: m.time || `${m.startTime || ""} - ${m.endTime || ""}`.trim() || "10:00 AM",
      duration: m.duration || "30 min",
      title: m.title,
      description: m.description,
      location:
        m.location ||
        (m.platform === "GOOGLE_MEET"
          ? "Google Meet"
          : m.platform === "ZOOM"
          ? "Zoom"
          : m.platform === "TEAMS"
          ? "Microsoft Teams"
          : "Virtual Room"),
      type: "video",
      status: mappedStatus,
      organizer: m.host
        ? `${m.host.firstName || ""} ${m.host.lastName || ""}`.trim()
        : m.organizer?.name || m.organizer || "Host",
      attendees: Array.isArray(m.attendees)
        ? m.attendees.map((a) => ({
            name: a.user
              ? `${a.user.firstName || ""} ${a.user.lastName || ""}`.trim()
              : a.name || "Attendee",
            src: a.user?.avatarUrl || a.avatar,
          }))
        : [],
      meetingLink: m.meetingLink,
    };
  });

  // Filter events by tab and search query
  const filteredEvents = normalizedSchedule.filter((event) => {
    // Tab Filter
    if (activeTab === "today" && (event.status === "completed" || event.status === "cancelled")) {
      return false;
    }
    if (activeTab === "upcoming" && event.status !== "upcoming" && event.status !== "in-progress") {
      return false;
    }
    if (activeTab === "completed" && event.status !== "completed") {
      return false;
    }

    // Search Query Filter
    if (!searchTerm) return true;
    const query = searchTerm.toLowerCase();
    return (
      event.title?.toLowerCase().includes(query) ||
      event.description?.toLowerCase().includes(query) ||
      event.location?.toLowerCase().includes(query) ||
      event.organizer?.toLowerCase().includes(query)
    );
  });

  return (
    <GlassPanel
      title="Daily Timeline"
      subtitle="Today's hour-by-hour operational schedule"
      icon={Clock}
      action={
        <GlassBadge variant="cyan" size="sm" dot glow>
          Live Schedule
        </GlassBadge>
      }
      variant="default"
      padding="md"
      className="h-full flex flex-col justify-between"
    >
      {/* Timeline Stream */}
      <div className="relative pl-3 sm:pl-6 space-y-6 my-2">
        {/* Continuous Vertical Liquid Timeline Guide Line */}
        <div className="absolute left-3 sm:left-6 top-3 bottom-3 w-0.5 bg-linear-to-b from-cyan-500/40 via-blue-500/20 to-transparent -translate-x-1/2 pointer-events-none" />

        {filteredEvents.length > 0 ? (
          filteredEvents.map((item, idx) => (
            <TimelineItem key={item.id || idx} item={item} />
          ))
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center text-slate-400">
            <Inbox className="w-8 h-8 text-slate-500 mb-2 stroke-[1.5]" />
            <span className="text-xs font-medium">No meetings scheduled for this filter</span>
          </div>
        )}
      </div>
    </GlassPanel>
  );
};

export default DailyTimeline;