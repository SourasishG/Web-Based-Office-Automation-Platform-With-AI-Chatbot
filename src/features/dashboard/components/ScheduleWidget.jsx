import React from "react";
import { Calendar, Clock, Video, ArrowRight, CheckCircle2 } from "lucide-react";
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
  // Fallback Schedule Items
  const defaultSchedule = [
    {
      id: "sch-1",
      title: "Daily Engineering Stand-up",
      time: "10:00 AM - 10:30 AM",
      status: "in-progress",
      location: "Google Meet",
      type: "video",
      attendees: [
        { name: "Sourasish Ghosh" },
        { name: "Ananya Roy" },
        { name: "Rahul Sharma" },
      ],
    },
    {
      id: "sch-2",
      title: "AI Chatbot Architecture Review",
      time: "11:30 AM - 12:30 PM",
      status: "upcoming",
      location: "Conference Room B",
      type: "room",
      attendees: [
        { name: "Sourasish Ghosh" },
        { name: "Priya Patel" },
      ],
    },
    {
      id: "sch-3",
      title: "Product Roadmap & Design Sync",
      time: "03:00 PM - 04:00 PM",
      status: "upcoming",
      location: "Google Meet",
      type: "video",
      attendees: [
        { name: "Vikram Das" },
        { name: "Sourasish Ghosh" },
        { name: "Neha Sen" },
        { name: "Amit Kumar" },
      ],
    },
  ];

  const items = schedule && schedule.length > 0 ? schedule : defaultSchedule;

  // Status Badge Helper
  const getStatusBadge = (status) => {
    if (status === "in-progress") {
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
        Upcoming
      </GlassBadge>
    );
  };

  return (
    <GlassPanel
      title="Today's Schedule"
      subtitle="3 meetings scheduled for today"
      icon={Calendar}
      action={
        <GlassButton variant="ghost" size="sm" rightIcon={ArrowRight}>
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

            {/* Event Footer: Location & Attendee Avatars */}
            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 truncate">
                {item.type === "video" ? (
                  <Video className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-500 shrink-0" />
                )}
                <span className="truncate">{item.location}</span>
              </div>

              {/* Attendee Avatar Group */}
              {item.attendees && item.attendees.length > 0 && (
                <GlassAvatarGroup avatars={item.attendees} max={3} size="xs" />
              )}
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
};

export default ScheduleWidget;