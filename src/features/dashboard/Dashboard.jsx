import DashboardLayout from "../../components/layout/DashboardLayout";

import Greeting from "./components/Greeting";
import StatsGrid from "./components/StatsGrid";
import QuickActions from "./components/QuickActions";
import RecentActivity from "./components/RecentActivity";
import AIWidget from "./components/AIWidget";
import ScheduleWidget from "./components/ScheduleWidget";
import TeamAvailability from "./components/TeamAvailability";


const Dashboard = () => {

  return (
    <DashboardLayout>

      <div className="space-y-8">

        <Greeting />

        <StatsGrid />

        <QuickActions />


        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">

          <RecentActivity />

          <AIWidget />

        </div>


        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">

          <ScheduleWidget />

          <TeamAvailability />

        </div>


      </div>

    </DashboardLayout>
  );
};


export default Dashboard;