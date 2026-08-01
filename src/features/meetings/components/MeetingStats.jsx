import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import StatCard from "../../../components/ui/StatCard";
import MeetingData from "../data/MeetingData";

const MeetingStats = () => {
  const stats = [
    {
      title: "Today's Meetings",
      value: MeetingData.filter(
        (meeting) => meeting.date === "21 Jul 2026"
      ).length,
      icon: CalendarDays,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Upcoming",
      value: MeetingData.filter(
        (meeting) => meeting.status === "Upcoming"
      ).length,
      icon: Clock3,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Completed",
      value: MeetingData.filter(
        (meeting) => meeting.status === "Completed"
      ).length,
      icon: CheckCircle2,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Cancelled",
      value: MeetingData.filter(
        (meeting) => meeting.status === "Cancelled"
      ).length,
      icon: XCircle,
      color: "from-red-500 to-rose-600",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          {...stat}
        />
      ))}
    </section>
  );
};

export default MeetingStats;