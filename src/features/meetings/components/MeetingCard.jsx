import {
  CalendarDays,
  Clock3,
  Users,
  Video,
  MapPin,
} from "lucide-react";

import GlassCard from "../../../components/ui/GlassCard";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";

import {
  STATUS_COLORS,
  TYPE_COLORS,
} from "../data/MeetingConstants";

const MeetingCard = ({ meeting }) => {
  return (
    <GlassCard className="hover:border-cyan-500/40">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {meeting.title}
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Organized by {meeting.organizer}
          </p>
        </div>

        <Badge className={STATUS_COLORS[meeting.status]}>
          {meeting.status}
        </Badge>
      </div>

      <div className="mt-5">
        <Badge className={TYPE_COLORS[meeting.type]}>
          {meeting.type}
        </Badge>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-3 text-slate-300">
          <CalendarDays size={18} />
          <span>{meeting.date}</span>
        </div>

        <div className="flex items-center gap-3 text-slate-300">
          <Clock3 size={18} />
          <span>
            {meeting.time} • {meeting.duration}
          </span>
        </div>

        <div className="flex items-center gap-3 text-slate-300">
          <Video size={18} />
          <span>{meeting.platform}</span>
        </div>

        <div className="flex items-center gap-3 text-slate-300">
          <Users size={18} />
          <span>{meeting.participants} Participants</span>
        </div>

        <div className="flex items-center gap-3 text-slate-300">
          <MapPin size={18} />
          <span>{meeting.room}</span>
        </div>
      </div>

      <Button className="mt-6 w-full">
        Join Meeting
      </Button>
    </GlassCard>
  );
};

export default MeetingCard;