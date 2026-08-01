import Button from "../../../components/ui/Button";
import SectionHeader from "../../../components/ui/SectionHeader";

import MeetingCard from "./MeetingCard";
import MeetingData from "../data/MeetingData";

const UpcomingMeetings = () => {
  const upcomingMeetings = MeetingData
    .filter(
      (meeting) =>
        meeting.status === "Upcoming" ||
        meeting.status === "Ongoing"
    )
    .slice(0, 4);

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <SectionHeader
          title="Upcoming Meetings"
          description="Your scheduled meetings for the next few days."
        />

        <Button
          variant="secondary"
          size="sm"
        >
          View All
        </Button>
      </div>

      <div className="grid gap-6">
        {upcomingMeetings.map((meeting) => (
          <MeetingCard
            key={meeting.id}
            meeting={meeting}
          />
        ))}
      </div>
    </section>
  );
};

export default UpcomingMeetings;