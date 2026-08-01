import {
  Clock3,
  Users,
  Video,
} from "lucide-react";

import GlassCard from "../../../components/ui/GlassCard";
import Badge from "../../../components/ui/Badge";

import {
  STATUS_COLORS,
  TYPE_COLORS,
} from "../data/MeetingConstants";

const TimelineItem = ({ meeting }) => {
  return (
    <GlassCard
      className="
        relative
        flex
        gap-5
        hover:border-cyan-500/40
      "
    >
      <div
        className="
          absolute
          left-0
          top-0
          h-full
          w-1
          rounded-l-3xl
          bg-cyan-500
        "
      />

      <div className="min-w-22.5">
        <p className="text-lg font-semibold text-cyan-400">
          {meeting.time}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          {meeting.duration}
        </p>
      </div>

      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold text-white">
            {meeting.title}
          </h3>

          <Badge className={STATUS_COLORS[meeting.status]}>
            {meeting.status}
          </Badge>

          <Badge className={TYPE_COLORS[meeting.type]}>
            {meeting.type}
          </Badge>
        </div>

        <div className="mt-4 flex flex-wrap gap-5 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Video size={16} />
            <span>{meeting.platform}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users size={16} />
            <span>{meeting.participants} Participants</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock3 size={16} />
            <span>{meeting.room}</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default TimelineItem;