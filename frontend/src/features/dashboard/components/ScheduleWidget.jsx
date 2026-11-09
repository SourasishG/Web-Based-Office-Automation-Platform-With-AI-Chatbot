import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Video, ArrowUpRight, ArrowUp } from "lucide-react";
import { GlassAvatarGroup } from "../../../components/ui/GlassAvatar";

/**
 * ScheduleWidget - Today's Meetings & Video Syncs
 * Features meeting timeline, attendee avatars, join links, and Lime Green action CTA.
 */
export const ScheduleWidget = ({ schedule }) => {
  const navigate = useNavigate();

  const defaultSchedule = [
    {
      id: "sch-1",
      title: "Backend Architecture & Database Review",
      time: "02:30 PM - 03:30 PM",
      status: "in-progress",
      location: "Zoom Call",
      meetingLink: "https://zoom.us",
      attendees: [{ name: "Aarav Sharma" }, { name: "Sourasish Ghosh" }],
    },
    {
      id: "sch-2",
      title: "Weekly Executive Leadership Sync",
      time: "10:00 AM - 11:00 AM",
      status: "upcoming",
      location: "Google Meet",
      meetingLink: "https://meet.google.com",
      attendees: [{ name: "Sourasish Ghosh" }, { name: "Elena Rostova" }],
    },
  ];

  const items = Array.isArray(schedule) && schedule.length > 0
    ? schedule.map((m) => ({
        id: m.id,
        title: m.title,
        time: m.time || `${m.startTime || ""} - ${m.endTime || ""}`,
        status: (m.status || "scheduled").toLowerCase(),
        location: m.location || m.platform || "Video Call",
        meetingLink: m.meetingLink,
        attendees: Array.isArray(m.attendees)
          ? m.attendees.map((a) => ({ name: a.user ? `${a.user.firstName} ${a.user.lastName}` : (a.name || "Member") }))
          : [{ name: m.host ? `${m.host.firstName} ${m.host.lastName}` : "Host" }],
      }))
    : defaultSchedule;

  return (
    <div className="bg-[#141416] border border-white/10 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col justify-between text-white transition-all hover:border-white/20">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C6F432]">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-white">
              Today's Schedule
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              {items.length} meeting{items.length !== 1 ? "s" : ""} active today
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/meetings")}
          aria-label="View Full Schedule"
          className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
        >
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Schedule Items List */}
      <div className="space-y-3 my-2">
        {items.slice(0, 2).map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="flex items-center gap-1.5 text-zinc-400 font-mono text-[11px]">
                <Clock className="w-3 h-3 text-[#C6F432]" />
                {item.time}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C6F432]/20 text-[#C6F432] border border-[#C6F432]/30">
                {item.status === "in-progress" ? "Live Now" : "Upcoming"}
              </span>
            </div>

            <h4 className="text-xs font-bold text-white truncate my-1">
              {item.title}
            </h4>

            <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/5 text-[11px]">
              <span className="text-zinc-400 flex items-center gap-1">
                <Video className="w-3 h-3 text-zinc-500" />
                {item.location}
              </span>

              {item.attendees && (
                <GlassAvatarGroup users={item.attendees} max={2} size="xs" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons: Join Sync & Schedule */}
      <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-white/10">
        <button
          type="button"
          onClick={() => navigate("/meetings")}
          className="flex-1 py-2 px-3 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-[#C6F432]/20 hover:scale-102 active:scale-98 transition-all"
        >
          <span>Join Sync</span>
          <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>

        <button
          type="button"
          onClick={() => navigate("/meetings?new=true")}
          className="py-2 px-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
        >
          + Add
        </button>
      </div>
    </div>
  );
};

export default ScheduleWidget;
