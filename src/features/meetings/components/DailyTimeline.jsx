import SectionHeader from "../../../components/ui/SectionHeader";

import TimelineItem from "./TimelineItem";
import MeetingData from "../data/MeetingData";

const DailyTimeline = () => {
  const todaysMeetings = MeetingData.filter(
    (meeting) => meeting.date === "21 Jul 2026"
  );

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <SectionHeader
        title="Today's Timeline"
        description="Your schedule for today."
        className="mb-6"
      />

      {todaysMeetings.length > 0 ? (
        <div className="space-y-5">
          {todaysMeetings.map((meeting) => (
            <TimelineItem
              key={meeting.id}
              meeting={meeting}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-slate-700 text-slate-500">
          No meetings scheduled for today.
        </div>
      )}
    </section>
  );
};

export default DailyTimeline;