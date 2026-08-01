import {
  GlassCard,
  SectionHeader,
} from "../../../components/ui";

import { DeadlineCard } from "../../../components/cards";

const deadlines = [
  {
    title: "Project Alpha Submission",
    dueDate: "Tomorrow • 5:00 PM",
    priority: "High",
  },
  {
    title: "Security Audit Report",
    dueDate: "Friday • 11:00 AM",
    priority: "Medium",
  },
  {
    title: "Sprint Planning Meeting",
    dueDate: "Monday • 10:30 AM",
    priority: "Low",
  },
  {
    title: "Monthly Finance Review",
    dueDate: "Tuesday • 3:00 PM",
    priority: "High",
  },
];

const UpcomingDeadlines = () => {
  return (
    <GlassCard>
      <SectionHeader
        title="Upcoming Deadlines"
        subtitle="Stay ahead of important tasks and meetings."
      />

      <div className="space-y-4">
        {deadlines.map((deadline) => (
          <DeadlineCard
            key={deadline.title}
            {...deadline}
          />
        ))}
      </div>
    </GlassCard>
  );
};

export default UpcomingDeadlines;