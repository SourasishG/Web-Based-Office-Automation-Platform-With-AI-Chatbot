import {
  Users,
  FolderKanban,
  CalendarDays,
  Mail,
  Ticket,
  HardDrive,
} from "lucide-react";

import { StatCard } from "../../../components/ui";

const stats = [
  {
    title: "Employees",
    value: 248,
    subtitle: "+12% this month",
    icon: Users,
    color: "cyan",
  },

  {
    title: "Projects",
    value: 38,
    subtitle: "+8% this month",
    icon: FolderKanban,
    color: "purple",
  },

  {
    title: "Meetings",
    value: 12,
    subtitle: "+4% this week",
    icon: CalendarDays,
    color: "emerald",
  },

  {
    title: "Unread Emails",
    value: 86,
    subtitle: "+21% today",
    icon: Mail,
    color: "pink",
  },

  {
    title: "Open Tickets",
    value: 19,
    subtitle: "+6% this week",
    icon: Ticket,
    color: "orange",
  },

  {
    title: "Storage",
    value: "74%",
    subtitle: "+2% used",
    icon: HardDrive,
    color: "purple",
  },
];

const StatsGrid = () => {
  return (
    <section
      className="
        grid
        grid-cols-1
        gap-5
        sm:grid-cols-2
        xl:grid-cols-3
      "
    >
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          {...stat}
        />
      ))}
    </section>
  );
};

export default StatsGrid;