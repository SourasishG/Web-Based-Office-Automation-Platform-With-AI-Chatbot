import React from "react";
import { Clock, Video, MapPin, CheckCircle2, Play } from "lucide-react";
import {
  GlassCard,
  GlassBadge,
  GlassButton,
  GlassAvatarGroup,
} from "../../../components/ui";

/**
 * TimelineItem - Individual Hour Event Node along the Daily Timeline Guide Line
 * Renders meeting details, status dots, attendee avatar stacks, and join triggers.
 * 
 * @param {object} item - Timeline event object
 */
export const TimelineItem = ({ item }) => {
  if (!item) return null;

  const isInProgress = item.status === "in-progress";
  const isCompleted = item.status === "completed";

  // Status Indicator Dot Marker
  const renderStatusDot = () => {
    if (isInProgress) {
      return (
        <span className="relative flex h-3.5 w-3.5 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.9)]" />
        </span>
      );
    }
    if (isCompleted) {
      return (
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
      );
    }
    return (
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-500 shadow-sm" />
    );
  };

  // Status Badge Helper
  const getStatusBadge = () => {
    if (isInProgress) {
      return <GlassBadge variant="cyan" size="sm" dot glow>In Progress</GlassBadge>;
    }
    if (isCompleted) {
      return <GlassBadge variant="success" size="sm" icon={CheckCircle2}>Completed</GlassBadge>;
    }
    return <GlassBadge variant="default" size="sm">Upcoming</GlassBadge>;
  };

  return (
    <div className="relative flex items-start gap-4 sm:gap-6 group">
      {/* Timeline Node Dot Marker */}
      <div className="absolute -left-3 sm:-left-6 top-5 -translate-x-1/2 z-10 flex items-center justify-center">
        {renderStatusDot()}
      </div>

      {/* Main Liquid Glass Event Card */}
      <GlassCard
        variant={isInProgress ? "floating" : "standard"}
        glow={isInProgress ? "cyan" : "none"}
        hoverable
        className={`
          flex-1 p-4 sm:p-5 relative overflow-hidden transition-all duration-300
          ${isInProgress ? "border-cyan-400/40 bg-slate-900/70" : "hover:border-white/20"}
        `}
      >
        {/* Top Bar: Time, Duration & Status */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-400/20">
              {item.time}
            </span>
            {item.duration && (
              <span className="text-[11px] text-slate-400 font-medium">
                ({item.duration})
              </span>
            )}
          </div>

          <div className="shrink-0">{getStatusBadge()}</div>
        </div>

        {/* Meeting Title & Description */}
        <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-cyan-300 transition-colors leading-tight">
          {item.title}
        </h3>

        {item.description && (
          <p className="text-xs text-slate-300 mt-1.5 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        )}

        {/* Event Footer: Location & Attendee Avatar Stack & Action Button */}
        <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              {item.type === "video" ? (
                <Video className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              ) : (
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              )}
              <span className="truncate max-w-37.5 sm:max-w-50">{item.location}</span>
            </div>

            {item.attendees && item.attendees.length > 0 && (
              <GlassAvatarGroup avatars={item.attendees} max={3} size="xs" />
            )}
          </div>

          {/* Join Call Trigger Button */}
          {isInProgress && item.type === "video" && (
            <GlassButton variant="cyan" size="sm" icon={Play}>
              Join Video Call
            </GlassButton>
          )}
        </div>
      </GlassCard>
    </div>
  );
};

export default TimelineItem;