import React from "react";
import { Calendar, Clock, Video, MapPin, ExternalLink } from "lucide-react";
import {
  GlassCard,
  GlassBadge,
  GlassButton,
  GlassAvatar,
  GlassAvatarGroup,
} from "../../../components/ui";

/**
 * MeetingCard - Apple Liquid Glass Upcoming Event Tile Card
 * Renders meeting event details, organizer profile, location badges, and join triggers.
 * 
 * @param {object} meeting - Meeting event object
 * @param {function} onJoin - Join call callback handler
 */
export const MeetingCard = ({ meeting, onJoin }) => {
  if (!meeting) return null;

  const {
    title,
    organizer,
    time,
    date,
    location,
    type = "video",
    category,
    attendees = [],
  } = meeting;

  return (
    <GlassCard
      variant="interactive"
      hoverable
      className="p-4 relative overflow-hidden group cursor-pointer transition-all duration-300"
    >
      {/* Top Bar: Category Tag & Date Badge */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          {category && (
            <GlassBadge variant="cyan" size="sm">
              {category}
            </GlassBadge>
          )}
        </div>

        {date && (
          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
            <Calendar className="w-3 h-3 text-cyan-400" />
            <span>{date}</span>
          </div>
        )}
      </div>

      {/* Meeting Title */}
      <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors leading-snug truncate">
        {title}
      </h4>

      {/* Time & Location Bar */}
      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
        <div className="flex items-center gap-1.5 text-cyan-400 font-mono">
          <Clock className="w-3.5 h-3.5" />
          <span>{time}</span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-400 truncate">
          {type === "video" ? (
            <Video className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          ) : (
            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          )}
          <span className="truncate max-w-35">{location}</span>
        </div>
      </div>

      {/* Card Footer: Organizer / Attendees & Join Action */}
      <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {organizer && (
            <div className="flex items-center gap-2 truncate">
              <GlassAvatar
                src={organizer.avatar}
                name={organizer.name || "Organizer"}
                size="xs"
              />
              <span className="text-[11px] text-slate-400 truncate font-medium">
                {organizer.name}
              </span>
            </div>
          )}

          {attendees.length > 0 && (
            <GlassAvatarGroup avatars={attendees} max={2} size="xs" />
          )}
        </div>

        {/* Join Trigger Action */}
        <GlassButton
          variant="ghost"
          size="sm"
          rightIcon={ExternalLink}
          onClick={(e) => {
            e.stopPropagation();
            onJoin?.(meeting);
          }}
        >
          Join
        </GlassButton>
      </div>
    </GlassCard>
  );
};

export default MeetingCard;