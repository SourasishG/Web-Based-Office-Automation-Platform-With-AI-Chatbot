import { useState, useMemo } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  Plus,
  ArrowRight,
  ExternalLink,
  MapPin,
  CalendarDays,
} from "lucide-react";
import {
  GlassModal,
  GlassButton,
  GlassBadge,
} from "../../../components/ui";
import MiniCalendar from "../../../components/calendar/MiniCalendar";

/**
 * CalendarModal - Apple Liquid Glass Interactive Meeting Calendar Dialog
 * Allows browsing meetings across any month, seeing event dots, and scheduling on chosen dates.
 */
export const CalendarModal = ({
  isOpen = false,
  onClose,
  allMeetings = [],
  selectedDate,
  onSelectDate,
  onOpenScheduleModal,
  onViewDateInTimeline,
}) => {
  const [activeDate, setActiveDate] = useState(
    selectedDate || new Date().toISOString().split("T")[0]
  );

  const handleDateSelect = (dateStr) => {
    setActiveDate(dateStr);
    if (onSelectDate) onSelectDate(dateStr);
  };

  // Filter meetings for activeDate
  const dayMeetings = useMemo(() => {
    if (!activeDate) return [];
    return allMeetings.filter((m) => {
      if (!m.date) return false;
      const mDateStr = new Date(m.date).toISOString().split("T")[0];
      return mDateStr === activeDate;
    });
  }, [allMeetings, activeDate]);

  const formattedDateTitle = useMemo(() => {
    if (!activeDate) return "Selected Date";
    const [y, m, d] = activeDate.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [activeDate]);

  const handleScheduleForDate = () => {
    if (onOpenScheduleModal) {
      onOpenScheduleModal(activeDate);
    }
    onClose();
  };

  const handleViewTimeline = () => {
    if (onViewDateInTimeline) {
      onViewDateInTimeline(activeDate);
    }
    onClose();
  };

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title="Interactive Calendar"
      subtitle="Browse scheduled workspace meetings by day"
      icon={CalendarDays}
      maxWidth="2xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <GlassButton
            variant="ghost"
            size="sm"
            onClick={handleViewTimeline}
            rightIcon={ArrowRight}
          >
            View in Timeline
          </GlassButton>

          <div className="flex items-center gap-2">
            <GlassButton variant="ghost" size="sm" onClick={onClose}>
              Close
            </GlassButton>
            <GlassButton
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={handleScheduleForDate}
            >
              Schedule on This Date
            </GlassButton>
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left: Mini Calendar */}
        <div>
          <MiniCalendar
            title="Monthly Overview"
            events={allMeetings}
            selectedDate={activeDate}
            onSelectDate={handleDateSelect}
          />
        </div>

        {/* Right: Selected Date Agenda */}
        <div className="flex flex-col h-full justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-white/10">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4 text-cyan-400" />
                  <span>{formattedDateTitle}</span>
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {dayMeetings.length} meeting{dayMeetings.length !== 1 ? "s" : ""} scheduled
                </p>
              </div>

              {dayMeetings.length > 0 && (
                <GlassBadge variant="cyan" size="sm">
                  {dayMeetings.length} Event{dayMeetings.length !== 1 ? "s" : ""}
                </GlassBadge>
              )}
            </div>

            {/* Meetings list for selected date */}
            <div className="mt-3 space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {dayMeetings.length > 0 ? (
                dayMeetings.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-semibold text-cyan-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.time || `${item.startTime || ""} - ${item.endTime || ""}`}
                      </span>

                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-white/10 text-slate-300">
                        {item.platform || "VIDEO"}
                      </span>
                    </div>

                    <h5 className="text-xs font-bold text-white truncate">
                      {item.title}
                    </h5>

                    {item.description && (
                      <p className="text-[11px] text-slate-400 line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        {item.platform ? (
                          <Video className="w-3 h-3 text-blue-400" />
                        ) : (
                          <MapPin className="w-3 h-3 text-cyan-400" />
                        )}
                        <span>{item.platform || "Virtual Room"}</span>
                      </span>

                      {item.meetingLink && (
                        <a
                          href={item.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 font-semibold text-[11px]"
                        >
                          Join <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-10 text-center flex flex-col items-center justify-center text-slate-400">
                  <CalendarIcon className="w-8 h-8 text-slate-500 mb-2 stroke-[1.5]" />
                  <p className="text-xs font-medium">No meetings on this day</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Select another day or schedule a new sync
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-2">
            <GlassButton
              variant="outline"
              size="sm"
              className="w-full text-xs"
              icon={Plus}
              onClick={handleScheduleForDate}
            >
              Add Meeting for {formattedDateTitle.split(",")[0]}
            </GlassButton>
          </div>
        </div>
      </div>
    </GlassModal>
  );
};

export default CalendarModal;

