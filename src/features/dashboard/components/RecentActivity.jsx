import {
  Mail,
  CalendarDays,
  Ticket,
  Upload,
  Bot,
} from "lucide-react";

import {
  GlassCard,
  SectionHeader,
  Button,
} from "../../../components/ui";

import ActivityCard from "../../../components/cards/ActivityCard";

const activities = [
  {
    title: "Meeting Scheduled",
    description: "Project Alpha meeting with the design team.",
    time: "10 minutes ago",
    icon: CalendarDays,
    color: "from-cyan-500 to-blue-600",
  },

  {
    title: "Support Ticket Closed",
    description: "Ticket #231 has been resolved.",
    time: "32 minutes ago",
    icon: Ticket,
    color: "from-orange-500 to-red-500",
  },

  {
    title: "New Email Received",
    description: "HR shared the updated company policy.",
    time: "1 hour ago",
    icon: Mail,
    color: "from-pink-500 to-rose-500",
  },

  {
    title: "File Uploaded",
    description: "Budget_Report_2026.pdf uploaded successfully.",
    time: "2 hours ago",
    icon: Upload,
    color: "from-violet-500 to-fuchsia-600",
  },

  {
    title: "AI Summary Generated",
    description: "Meeting notes summarized by Office AI.",
    time: "Today",
    icon: Bot,
    color: "from-green-500 to-emerald-600",
  },
];

const RecentActivity = () => {
  return (
    <GlassCard>
      <SectionHeader
        title="Recent Activity"
        subtitle="Latest updates from your workspace."
      >
        <Button
          variant="secondary"
          size="sm"
        >
          View All
        </Button>
      </SectionHeader>

      <div className="space-y-4">
        {activities.map((activity) => (
          <ActivityCard
            key={activity.title}
            {...activity}
          />
        ))}
      </div>
    </GlassCard>
  );
};

export default RecentActivity;