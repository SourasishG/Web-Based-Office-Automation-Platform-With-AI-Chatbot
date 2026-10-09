import React, { useMemo } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ProfileHeader from "./components/ProfileHeader";
import PersonalInfo from "./components/PersonalInfo";
import ProfileStats from "./components/ProfileStats";
import SkillsCard from "./components/SkillsCard";
import RecentActivity from "./components/RecentActivity";
import ProfileData from "./data/ProfileData";

/**
 * Profile - Apple Liquid Glass Executive Profile Workspace
 */
const Profile = () => {
  // Normalize profile data
  const userProfile = useMemo(() => {
    if (ProfileData?.user) return ProfileData.user;
    return ProfileData || {};
  }, []);

  const stats = useMemo(() => {
    return ProfileData?.stats || userProfile?.stats || [];
  }, [userProfile]);

  const skills = useMemo(() => {
    return ProfileData?.skills || userProfile?.skills || [];
  }, [userProfile]);

  const activities = useMemo(() => {
    return (
      ProfileData?.recentActivity ||
      ProfileData?.activities ||
      userProfile?.recentActivity ||
      []
    );
  }, [userProfile]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 280,
        damping: 22,
      },
    },
  };

  return (
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-[1600px] space-y-6 select-none"
      >
        <motion.div variants={itemVariants}>
          <ProfileHeader user={userProfile} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <PersonalInfo info={userProfile} />
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-7">
            <ProfileStats stats={stats} />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <SkillsCard skills={skills} />
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-7">
            <RecentActivity activities={activities} />
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Profile;