import {
  GlassCard,
  SectionHeader,
} from "../../../components/ui";

import { EmployeeCard } from "../../../components/cards";

const members = [
  {
    name: "Alex Johnson",
    role: "Project Manager",
    avatar: "https://i.pravatar.cc/150?img=12",
    status: "Online",
  },
  {
    name: "Sarah Williams",
    role: "UI Designer",
    avatar: "https://i.pravatar.cc/150?img=32",
    status: "Busy",
  },
  {
    name: "David Lee",
    role: "Backend Developer",
    avatar: "https://i.pravatar.cc/150?img=18",
    status: "Away",
  },
  {
    name: "Emma Brown",
    role: "HR Executive",
    avatar: "https://i.pravatar.cc/150?img=25",
    status: "Offline",
  },
];

const TeamAvailability = () => {
  return (
    <GlassCard>
      <SectionHeader
        title="Team Availability"
        subtitle="See who's available right now."
      />

      <div className="space-y-4">
        {members.map((member) => (
          <EmployeeCard
            key={member.name}
            {...member}
          />
        ))}
      </div>
    </GlassCard>
  );
};

export default TeamAvailability;