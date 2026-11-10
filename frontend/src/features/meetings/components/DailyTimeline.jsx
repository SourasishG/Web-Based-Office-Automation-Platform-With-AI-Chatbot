import { Clock, Inbox, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import TimelineItem from "./TimelineItem";

/**
 * DailyTimeline - Quixotic Hour-by-Hour Daily Schedule Timeline
 * Positioned in the lower 40% Pure White region with #0B0B0C typography and lime accents.
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
    if (activeTab === "today" && (event.status === "completed" || event.status === "cancelled")) {
      return false;
    }
    if (activeTab === "upcoming" && event.status !== "upcoming" && event.status !== "in-progress") {
      return false;
    }
    if (activeTab === "completed" && event.status !== "completed") {
      return false;
    }

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
    <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-full">
      {/* Header Bar */}
      <div>
        <div className="flex flex-wrap items-center justify-between pb-4 border-b border-zinc-100 gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-[#0B0B0C]">
              <Clock className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0B0B0C] tracking-tight">
                Daily Timeline
              </h3>
              <p className="text-[11px] text-zinc-500 font-medium">
                {filteredEvents.length} operational sync{filteredEvents.length !== 1 ? "s" : ""} on schedule
              </p>
            </div>
          </div>

          {/* Day Navigation Controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-xl bg-zinc-100 border border-zinc-200 p-0.5">
              <button
                type="button"
                onClick={handlePrevDay}
                className="p-1 rounded-lg text-zinc-600 hover:text-[#0B0B0C] hover:bg-white transition cursor-pointer"
                title="Previous Day"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleTodayClick}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition cursor-pointer ${
                  isToday
                    ? "bg-[#C6F432] text-[#0B0B0C] shadow-xs"
                    : "text-zinc-700 hover:text-black hover:bg-white"
                }`}
              >
                {formattedDateLabel}
              </button>

              <button
                type="button"
                onClick={handleNextDay}
                className="p-1 rounded-lg text-zinc-600 hover:text-[#0B0B0C] hover:bg-white transition cursor-pointer"
                title="Next Day"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {onOpenCalendar && (
              <button
                type="button"
                onClick={onOpenCalendar}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-[#C6F432] text-zinc-700 hover:text-[#0B0B0C] border border-zinc-200 text-xs font-semibold transition-all cursor-pointer"
                title="Open Calendar Overview"
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Calendar</span>
              </button>
            )}
          </div>
        </div>

        {/* Timeline Stream */}
        <div className="relative pl-3 sm:pl-6 space-y-5 my-2">
          {/* Continuous Vertical Timeline Guide Line */}
          <div className="absolute left-3 sm:left-6 top-3 bottom-3 w-0.5 bg-zinc-200 -translate-x-1/2 pointer-events-none" />

          {filteredEvents.length > 0 ? (
            filteredEvents.map((item, idx) => (
              <TimelineItem key={item.id || idx} item={item} />
            ))
          ) : (
            <div className="py-14 flex flex-col items-center justify-center text-center text-zinc-400">
              <Inbox className="w-8 h-8 mb-2 stroke-[1.5]" />
              <span className="text-xs font-semibold text-zinc-600">
                No meetings scheduled for this date
              </span>
              <span className="text-[11px] text-zinc-400 mt-0.5">
                {isToday ? "You have a clear schedule today." : `No events recorded for ${formattedDateLabel}.`}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyTimeline;
