import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Video, ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import { GlassPanel } from "../../../components/ui/GlassPanel";
import { GlassBadge } from "../../../components/ui/GlassBadge";
import { GlassButton } from "../../../components/ui/GlassButton";
import { GlassAvatarGroup } from "../../../components/ui/GlassAvatar";

/**
 * ScheduleWidget - Apple Liquid Glass Timeline for Today's Meetings & Events
 * Displays active & upcoming daily schedule events with attendee avatars and quick join links.
 * 
 * @param {Array<object>} schedule - Array of meeting / schedule items
 */
export const ScheduleWidget = ({ schedule }) => {
  const navigate = useNavigate();

  const defaultSchedule = [
    {
      id: "sch-1",
      title: "Backend Architecture & Database Review",
      time: "02:30 PM - 03:30 PM",
      status: "upcoming",
      location: "Zoom",
      type: "video",
      attendees: [{ name: "Aarav Sharma" }, { name: "Sourasish Ghosh" }],
    },
    {
      id: "sch-2",
      title: "Weekly Executive Leadership Sync",
      time: "10:00 AM - 11:00 AM",
      status: "completed",
      location: "Google Meet",
      type: "video",
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

  // Status Badge Helper
  const getStatusBadge = (status) => {
    if (status === "in-progress" || status === "in_progress") {
      return (
        <GlassBadge variant="cyan" size="sm" dot glow>
          In Progress
        </GlassBadge>
      );
    }
    if (status === "completed") {
      return (
        <GlassBadge variant="success" size="sm" icon={CheckCircle2}>
          Done
        </GlassBadge>
      );
    }
    return (
      <GlassBadge variant="default" size="sm">
        Scheduled
      </GlassBadge>
    );
  };

  return (
    <GlassPanel
      title="Today's Schedule"
      subtitle={`${items.length} meeting${items.length !== 1 ? "s" : ""} on your radar`}
      icon={Calendar}
      action={
        <GlassButton variant="ghost" size="sm" rightIcon={ArrowRight} onClick={() => navigate("/meetings")}>
          View All
        </GlassButton>
      }
      variant="default"
      padding="none"
      className="h-full flex flex-col justify-between"
    >
      {/* Schedule Items Timeline */}
      <div className="p-4 sm:p-5 space-y-3.5 divide-y divide-white/5">
        {items.map((item, idx) => (
          <div
            key={item.id || idx}
            className={`
              pt-3.5 first:pt-0 group transition-all duration-200
              ${item.status === "in-progress" ? "bg-cyan-500/5 -mx-4 px-4 py-3 rounded-2xl border border-cyan-400/20" : ""}
            `}
          >
            {/* Top Info Bar */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400">
                <Clock className="w-3.5 h-3.5" />
                <span className="font-mono">{item.time}</span>
              </div>
              {getStatusBadge(item.status)}
            </div>

            {/* Event Title */}
            <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors truncate">
              {item.title}
            </h4>

            {/* Bottom Meta & Attendees */}
            <div className="flex items-center justify-between mt-2.5">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Video className="w-3.5 h-3.5 text-slate-400" />
                <span>{item.location}</span>
              </div>

              <div className="flex items-center gap-3">
                {item.attendees && item.attendees.length > 0 && (
                  <GlassAvatarGroup
                    users={item.attendees}
                    max={3}
                    size="xs"
                  />
                )}

                {item.meetingLink && (
                  <a
                    href={item.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/25 border border-cyan-500/30 transition-colors"
                  >
                    <span>Join</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
};

export default ScheduleWidget;