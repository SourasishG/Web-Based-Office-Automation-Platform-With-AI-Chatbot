import { Calendar, Inbox } from "lucide-react";
import MeetingCard from "./MeetingCard";

/**
 * UpcomingMeetings - Quixotic Upcoming Meetings Sidebar Deck
 * Positioned in the lower 40% Pure White region with #0B0B0C typography and lime accents.
 * 
 * @param {Array<object>} meetings - List of upcoming meeting objects
 * @param {string} searchTerm - Search query filter
 * @param {function} onJoinMeeting - Join callback handler
 * @param {function} onViewCalendar - Open calendar callback handler
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
    <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-full">
      {/* Header Bar */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-midnight">
              <Calendar className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-midnight tracking-tight">
                Upcoming Meetings
              </h3>
              <p className="text-[11px] text-zinc-500 font-medium">
                {filteredMeetings.length} scheduled events
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onViewCalendar}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 hover:bg-lime-accent text-zinc-700 hover:text-midnight border border-zinc-200 transition-all cursor-pointer"
            title="Open Interactive Calendar"
          >
            <Calendar className="w-3 h-3 text-midnight" />
            <span>Calendar</span>
          </button>
        </div>

        {/* Meetings Card List */}
        <div className="space-y-3">
          {filteredMeetings.length > 0 ? (
            filteredMeetings.map((meeting, idx) => (
              <MeetingCard
                key={meeting.id || idx}
                meeting={meeting}
                onJoin={onJoinMeeting}
              />
            ))
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center text-zinc-400">
              <Inbox className="w-8 h-8 mb-2 stroke-[1.5]" />
              <span className="text-xs font-medium">No upcoming meetings scheduled</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingMeetings;
