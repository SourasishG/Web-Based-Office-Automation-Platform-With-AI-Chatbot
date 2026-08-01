import { CalendarDays } from "lucide-react";

import {
  GlassCard,
  SectionHeader,
} from "../../../components/ui";

import { MeetingCard } from "../../../components/cards";

const meetings = [
  {
    title: "Daily Stand-up",
    time: "09:00 AM",
    attendees: "Engineering Team",
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Client Presentation",
    time: "11:30 AM",
    attendees: "Marketing + Client",
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "HR Interview",
    time: "02:00 PM",
    attendees: "HR Department",
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Sprint Review",
    time: "05:00 PM",
    attendees: "Product Team",
    color: "from-violet-500 to-fuchsia-600",
  },
];

const ScheduleWidget = () => {
  return (
    <GlassCard>
      <SectionHeader
        title="Today's Schedule"
        subtitle="Meetings and events for today."
      >
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-linear-to-br
            from-cyan-500
            to-blue-600
          "
        >
          <CalendarDays
            size={22}
            className="text-white"
          />
        </div>
      </SectionHeader>

      <div className="space-y-4">
        {meetings.map((meeting) => (
          <MeetingCard
            key={meeting.title}
            {...meeting}
          />
        ))}
      </div>
    </GlassCard>
  );
};

export default ScheduleWidget;