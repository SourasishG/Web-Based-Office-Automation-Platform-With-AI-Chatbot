import DashboardLayout from "../../components/layout/DashboardLayout";

import ProfileHeader from "./components/ProfileHeader";
import PersonalInfo from "./components/PersonalInfo";
import ProfileStats from "./components/ProfileStats";
import SkillsCard from "./components/SkillsCard";
import RecentActivity from "./components/RecentActivity";

const Profile = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <ProfileHeader />

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
          <PersonalInfo />
          <ProfileStats />
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
          <SkillsCard />
          <RecentActivity />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;