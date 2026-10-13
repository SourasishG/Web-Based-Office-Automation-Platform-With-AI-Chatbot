import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import ProfileHeader from "./components/ProfileHeader";
import PersonalInfo from "./components/PersonalInfo";
import ProfileStats from "./components/ProfileStats";
import SkillsCard from "./components/SkillsCard";
import RecentActivity from "./components/RecentActivity";
import EditProfileModal from "./components/EditProfileModal";

import useAuth from "../../hooks/useAuth";
import authService from "../../services/authService";

/**
 * Profile - Apple Liquid Glass Executive Profile Workspace
 * Live integration with Supabase PostgreSQL and current user authentication context
 */
const Profile = () => {
  const { user: authUser, updateUser } = useAuth();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(authUser || {});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch full live profile with counts, manager, and skills from backend
  useEffect(() => {
    let isMounted = true;

    const fetchLiveProfile = async () => {
      try {
        const liveUser = await authService.getCurrentUser();
        if (isMounted && liveUser) {
          setProfileData(liveUser);
          updateUser(liveUser);
        }
      } catch (err) {
        console.warn("Could not fetch fresh profile, using session data:", err.message);
      }
    };

    fetchLiveProfile();

    return () => {
      isMounted = false;
    };
  }, [updateUser]);

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
        {/* Header Banner */}
        <motion.div variants={itemVariants}>
          <ProfileHeader
            user={profileData}
            onEditClick={() => setIsEditModalOpen(true)}
            onMessageClick={() => navigate("/emails")}
          />
        </motion.div>

        {/* Info & Stats Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <PersonalInfo info={profileData} />
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-7">
            <ProfileStats stats={profileData?._count || profileData?.stats} />
          </motion.div>
        </div>

        {/* Skills & Audit Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <SkillsCard skills={profileData?.skills} />
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-7">
            <RecentActivity activities={profileData?.recentActivity} />
          </motion.div>
        </div>
      </motion.div>

      {/* Edit Profile Glass Modal */}
      {isEditModalOpen && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={profileData}
          onSaveSuccess={(updated) => {
            setProfileData(updated);
            updateUser(updated);
          }}
        />
      )}
    </DashboardLayout>
  );
};

export default Profile;