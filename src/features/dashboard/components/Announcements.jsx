import {
  GlassCard,
  SectionHeader,
} from "../../../components/ui";

import { AnnouncementCard } from "../../../components/cards";

const announcements = [
  {
    title: "Office Holiday",
    message:
      "The office will remain closed next Friday due to Independence Day celebrations.",
    date: "Posted Today",
    priority: "High",
  },
  {
    title: "Server Maintenance",
    message:
      "Scheduled maintenance will take place on Saturday from 10 PM to 1 AM.",
    date: "Yesterday",
    priority: "Medium",
  },
  {
    title: "HR Policy Update",
    message:
      "A revised work-from-home policy has been published. Please review it before Monday.",
    date: "2 days ago",
    priority: "Low",
  },
];

const Announcements = () => {
  return (
    <GlassCard>
      <SectionHeader
        title="Company Announcements"
        subtitle="Latest updates from HR and Administration."
      />

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <AnnouncementCard
            key={announcement.title}
            {...announcement}
          />
        ))}
      </div>
    </GlassCard>
  );
};

export default Announcements;