import DashboardLayout from "../../components/layout/DashboardLayout";
import FadeInSection from "../../components/ui/FadeInSection";
import { MiniCalendar } from "../../components/calendar";

import MeetingsHeader from "./components/MeetingsHeader";
import MeetingStats from "./components/MeetingStats";
import UpcomingMeetings from "./components/UpcomingMeetings";
import DailyTimeline from "./components/DailyTimeline";

import MeetingData from "./data/MeetingData";

const Meetings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <FadeInSection delay={0}>
          <MeetingsHeader />
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <MeetingStats />
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
            <div className="xl:col-span-1">
              <MiniCalendar
                title="Calendar"
                events={MeetingData}
              />
            </div>

            <div className="xl:col-span-2">
              <UpcomingMeetings />
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.3}>
          <DailyTimeline />
        </FadeInSection>
      </div>
    </DashboardLayout>
  );
};

export default Meetings;