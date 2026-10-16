import { Clock, Inbox, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import {
  GlassPanel,
  GlassButton,
} from "../../../components/ui";
import TimelineItem from "./TimelineItem";

/**
 * DailyTimeline - Apple Liquid Glass Hour-by-Hour Daily Schedule Timeline
 * Displays sequential meetings for any chosen date with live indicators, status badges, and join triggers.
 * 
 * @param {Array<object>} schedule - Daily timeline events array
 * @param {string} searchTerm - Search query filter
 * @param {string} activeTab - Active filter tab ('all', 'today', 'upcoming', 'completed')
 * @param {string} selectedDate - ISO date string 'YYYY-MM-DD'
 * @param {function} onDateChange - Date changer callback
 * @param {function} onOpenCalendar - Open interactive calendar callback
 */
export const DailyTimeline = ({
  schedule = [],
  searchTerm = "",
  activeTab = "all",
  selectedDate,
  onDateChange,
  onOpenCalendar,
}) => {
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

  // Date navigation helpers
  const todayStr = new Date().toISOString().split("T")[0];
  const currentDateStr = selectedDate || todayStr;
  const isToday = currentDateStr === todayStr;

  const formattedDateLabel = (() => {
    try {
      const [y, m, d] = currentDateStr.split("-").map(Number);
      const dt = new Date(y, m - 1, d);
      const str = dt.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      return isToday ? `Today • ${str}` : str;
    } catch {
      return currentDateStr;
    }
  })();

  const handlePrevDay = () => {
    if (!onDateChange) return;
    const [y, m, d] = currentDateStr.split("-").map(Number);
    const prev = new Date(y, m - 1, d - 1);
    onDateChange(prev.toISOString().split("T")[0]);
  };

  const handleNextDay = () => {
    if (!onDateChange) return;
    const [y, m, d] = currentDateStr.split("-").map(Number);
    const next = new Date(y, m - 1, d + 1);
    onDateChange(next.toISOString().split("T")[0]);
  };

  const handleTodayClick = () => {
    if (onDateChange) onDateChange(todayStr);
  };

  return (
    <GlassPanel
      title="Daily Timeline"
      subtitle={`${filteredEvents.length} operational sync${filteredEvents.length !== 1 ? "s" : ""} on schedule`}
      icon={Clock}
      action={
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Day Navigation Controls */}
          <div className="flex items-center rounded-xl bg-white/5 border border-white/10 p-0.5">
            <button
              type="button"
              onClick={handlePrevDay}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
              title="Previous Day"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handleTodayClick}
              className={`px-2 py-0.5 text-xs font-semibold rounded-md transition ${
                isToday
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {formattedDateLabel}
            </button>

            <button
              type="button"
              onClick={handleNextDay}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
              title="Next Day"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Open Calendar Dialog Button */}
          {onOpenCalendar && (
            <GlassButton
              variant="cyan"
              size="sm"
              icon={CalendarIcon}
              onClick={onOpenCalendar}
              title="Open Calendar Overview"
            >
              <span className="hidden sm:inline">Calendar</span>
            </GlassButton>
          )}
        </div>
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
            <span className="text-xs font-medium">No meetings scheduled for this date</span>
            <span className="text-[11px] text-slate-500 mt-1">
              {isToday ? "You have a clear schedule today." : `No events recorded for ${formattedDateLabel}.`}
            </span>
          </div>
        )}
      </div>
    </GlassPanel>
  );
};

export default DailyTimeline;