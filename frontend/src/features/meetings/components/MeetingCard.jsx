import { Calendar, Clock, Video, MapPin, ExternalLink } from "lucide-react";

/**
 * MeetingCard - Quixotic Pure White Meeting Tile
 * Positioned in the lower 40% Pure White region with #0B0B0C typography and lime accents.
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
    meetingLink,
  } = meeting;

  const handleJoin = (e) => {
    e.stopPropagation();
    if (onJoin) {
      onJoin(meeting);
    } else if (meetingLink) {
      window.open(meetingLink, "_blank", "noopener,noreferrer");
    } else {
      window.open("https://meet.google.com", "_blank", "noopener,noreferrer");
    }
  };

  const organizerName = organizer?.name || (typeof organizer === "string" ? organizer : "Host");
  const organizerAvatar =
    organizer?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      organizerName
    )}&background=0B0B0C&color=C6F432`;

  return (
    <div
      onClick={handleJoin}
      className="bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-[#C6F432] transition-all duration-200 group cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top Bar: Category Tag & Date Badge */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5">
            {category && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-zinc-100 text-zinc-700 border border-zinc-200">
                {category}
              </span>
            )}
          </div>

          {date && (
            <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded-md border border-zinc-200">
              <Calendar className="w-3 h-3 text-[#0B0B0C]" />
              <span>{date}</span>
            </div>
          )}
        </div>

        {/* Meeting Title */}
        <h4 className="text-sm font-bold text-[#0B0B0C] group-hover:text-black transition-colors leading-snug truncate">
          {title}
        </h4>

        {/* Time & Location Bar */}
        <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1 text-zinc-800 font-mono font-semibold">
            <Clock className="w-3.5 h-3.5 text-[#0B0B0C]" />
            <span>{time}</span>
          </div>

          <div className="flex items-center gap-1 text-zinc-600 truncate">
            {type === "video" ? (
              <Video className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            ) : (
              <MapPin className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
            )}
            <span className="truncate max-w-35 font-medium">{location}</span>
          </div>
        </div>
      </div>

      {/* Card Footer: Organizer / Attendees & Join Action */}
      <div className="mt-3.5 pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-2 truncate">
            <img
              src={organizerAvatar}
              alt={organizerName}
              className="w-5 h-5 rounded-full object-cover border border-zinc-200 shrink-0"
            />
            <span className="text-[11px] text-zinc-700 truncate font-semibold">
              {organizerName}
            </span>
          </div>

          {attendees.length > 0 && (
            <div className="flex -space-x-1.5 overflow-hidden">
              {attendees.slice(0, 2).map((a, i) => (
                <img
                  key={i}
                  src={
                    a.src ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      a.name || "U"
                    )}&background=141416&color=FFFFFF`
                  }
                  alt={a.name || "Attendee"}
                  className="w-4 h-4 rounded-full border border-white"
                />
              ))}
            </div>
          )}
        </div>

        {/* Join Trigger Action: Lime Green Button */}
        <button
          type="button"
          onClick={handleJoin}
          className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>Join</span>
          <ExternalLink className="w-3 h-3 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};

export default MeetingCard;
