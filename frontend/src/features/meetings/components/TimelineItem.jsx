import { Video, MapPin, CheckCircle2, Play } from "lucide-react";

/**
 * TimelineItem - Quixotic Daily Timeline Event Tile
 * Positioned in the lower 40% Pure White region with #0B0B0C typography and lime accents.
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
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6F432] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C6F432] shadow-sm" />
        </span>
      );
    }
    if (isCompleted) {
      return (
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-zinc-300 shadow-sm" />
      );
    }
    return (
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0B0B0C] shadow-sm" />
    );
  };

  // Status Badge Helper
  const getStatusBadge = () => {
    if (isInProgress) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#C6F432]/25 text-[#244203] border border-[#C6F432]/50">
          <span className="w-1.5 h-1.5 rounded-full bg-[#386b03] animate-pulse" />
          In Progress
        </span>
      );
    }
    if (isCompleted) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-zinc-100 text-zinc-600 border border-zinc-200">
          <CheckCircle2 className="w-3 h-3 text-zinc-500" />
          Completed
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-zinc-100 text-[#0B0B0C] border border-zinc-200">
        Upcoming
      </span>
    );
  };

  const handleJoin = () => {
    if (item.meetingLink) {
      window.open(item.meetingLink, "_blank", "noopener,noreferrer");
    } else {
      window.open("https://meet.google.com", "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="relative flex items-start gap-4 sm:gap-6 group">
      {/* Timeline Node Dot Marker */}
      <div className="absolute -left-3 sm:-left-6 top-5 -translate-x-1/2 z-10 flex items-center justify-center">
        {renderStatusDot()}
      </div>

      {/* Main Event Card */}
      <div
        className={`flex-1 p-4 sm:p-5 rounded-2xl bg-white border transition-all duration-300 shadow-sm hover:shadow-md ${
          isInProgress
            ? "border-[#C6F432] ring-1 ring-[#C6F432]/40"
            : "border-zinc-200/80 hover:border-[#C6F432]"
        }`}
      >
        {/* Top Bar: Time, Duration & Status */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#0B0B0C] bg-zinc-100 px-2.5 py-1 rounded-lg border border-zinc-200">
              {item.time}
            </span>
            {item.duration && (
              <span className="text-[11px] text-zinc-500 font-medium">
                ({item.duration})
              </span>
            )}
          </div>

          <div className="shrink-0">{getStatusBadge()}</div>
        </div>

        {/* Meeting Title & Description */}
        <h3 className="text-sm sm:text-base font-bold text-[#0B0B0C] group-hover:text-black transition-colors leading-tight">
          {item.title}
        </h3>

        {item.description && (
          <p className="text-xs text-zinc-600 mt-1.5 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        )}

        {/* Event Footer: Location & Attendee Avatar Stack & Action Button */}
        <div className="mt-4 pt-3 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-zinc-600">
              {item.type === "video" ? (
                <Video className="w-4 h-4 text-blue-600 shrink-0" />
              ) : (
                <MapPin className="w-4 h-4 text-zinc-700 shrink-0" />
              )}
              <span className="font-medium">{item.location}</span>
            </div>

            {/* Attendee Stack */}
            {item.attendees && item.attendees.length > 0 && (
              <div className="flex items-center gap-1.5 pl-3 border-l border-zinc-200">
                <div className="flex -space-x-1.5 overflow-hidden">
                  {item.attendees.slice(0, 3).map((a, i) => (
                    <img
                      key={i}
                      src={
                        a.src ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          a.name || "U"
                        )}&background=0B0B0C&color=C6F432`
                      }
                      alt={a.name || "Attendee"}
                      className="w-5 h-5 rounded-full border border-white"
                    />
                  ))}
                </div>
                {item.attendees.length > 3 && (
                  <span className="text-[11px] font-semibold text-zinc-500">
                    +{item.attendees.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Action Trigger Button */}
          {!isCompleted && (
            <button
              type="button"
              onClick={handleJoin}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ${
                isInProgress
                  ? "bg-[#C6F432] text-[#0B0B0C] hover:scale-105 active:scale-95 shadow-[#C6F432]/30"
                  : "bg-zinc-100 hover:bg-[#C6F432] text-[#0B0B0C] hover:scale-105 active:scale-95"
              }`}
            >
              <Play className="w-3 h-3 fill-current stroke-[2]" />
              <span>{isInProgress ? "Join Now" : "Join Sync"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
