import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, Edit3 } from "lucide-react";

import QuixoticTopNavbar from "../dashboard/components/QuixoticTopNavbar";
import QuixoticDock from "../dashboard/components/QuixoticDock";

import ProfileHeader from "./components/ProfileHeader";
import PersonalInfo from "./components/PersonalInfo";
import ProfileStats from "./components/ProfileStats";
import SkillsCard from "./components/SkillsCard";
import RecentActivity from "./components/RecentActivity";
import EditProfileModal from "./components/EditProfileModal";

import useAuth from "../../hooks/useAuth";
import authService from "../../services/authService";

/**
 * Profile - Executive Quixotic Profile Workspace
 * Strictly aligned with Dashboard, Projects, Tasks, Meetings, Employees, and Tickets theme:
 * - 60% Midnight Black (#0B0B0C) at top, 40% Pure White (#FFFFFF) at bottom
 * - 10% Lime Green (#C6F432) on primary buttons & active indicators
 * - Plus Jakarta Sans typography
 * - Floating QuixoticTopNavbar & QuixoticDock
 */
const Profile = () => {
  const { user: authUser, updateUser } = useAuth();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(authUser || {});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Live second-by-second ticker for current date and time
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDateTime = useMemo(() => {
    const dateStr = currentDateTime.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const timeStr = currentDateTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return `${dateStr} • ${timeStr}`;
  }, [currentDateTime]);

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
        console.warn(
          "Could not fetch fresh profile, using session data:",
          err.message
        );
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
    <div
      className="min-h-screen text-white font-sans selection:bg-[#C6F432] selection:text-[#0B0B0C] pb-16 transition-all"
      style={{
        background:
          "linear-gradient(180deg, #0B0B0C 0%, #0B0B0C 45%, #18181c 58%, #e4e4e7 82%, #FFFFFF 100%)",
      }}
    >
      {/* Top Floating Rounded Pill Navbar */}
      <QuixoticTopNavbar />

      {/* Main Workspace Frame */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex gap-6">
        {/* Left Floating Pill Dock */}
        <QuixoticDock />

        {/* Center Executive Profile Canvas */}
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex-1 min-w-0 space-y-6 select-none"
        >
          {/* Executive Header Row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>Executive</span>
                <span className="text-[#C6F432]">Profile</span>
              </h1>
              <p className="text-xs text-zinc-400 mt-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C6F432] animate-pulse" />
                <span>
                  Identity & Credentials • Performance KPIs, verified skills & audit trail
                </span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1E] border border-white/10 text-xs font-semibold text-zinc-200 shadow-md">
                <Calendar className="w-3.5 h-3.5 text-[#C6F432]" />
                <span className="font-mono">{formattedDateTime}</span>
              </div>

              <button
                type="button"
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold tracking-tight shadow-lg shadow-[#C6F432]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Edit Profile</span>
              </button>
            </div>
          </motion.div>

          {/* Upper 60% Midnight Black Zone: Header Banner, Credentials & Performance Stats */}
          <motion.div variants={itemVariants}>
            <ProfileHeader
              user={profileData}
              onEditClick={() => setIsEditModalOpen(true)}
              onMessageClick={() => navigate("/emails")}
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <motion.div variants={itemVariants} className="lg:col-span-5">
              <PersonalInfo info={profileData} />
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-7">
              <ProfileStats stats={profileData?._count || profileData?.stats} />
            </motion.div>
          </div>

          {/* Lower 40% Pure White Zone: Skills & Audit Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            <motion.div variants={itemVariants} className="lg:col-span-5">
              <SkillsCard skills={profileData?.skills} />
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-7">
              <RecentActivity activities={profileData?.recentActivity} />
            </motion.div>
          </div>
        </motion.main>
      </div>

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
    </div>
  );
};

export default Profile;
