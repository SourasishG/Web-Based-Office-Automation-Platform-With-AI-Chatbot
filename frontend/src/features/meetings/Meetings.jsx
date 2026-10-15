import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import DashboardLayout from "../../components/layout/DashboardLayout";

import MeetingsHeader from "./components/MeetingsHeader";
import MeetingStats from "./components/MeetingStats";
import UpcomingMeetings from "./components/UpcomingMeetings";
import DailyTimeline from "./components/DailyTimeline";
import ScheduleMeetingModal from "./components/ScheduleMeetingModal";

import { meetingService } from "../../services/meetingService";
import MeetingData from "./data/MeetingData";
import { Loader2 } from "lucide-react";

/**
 * Meetings - Apple Liquid Glass Master Meetings View
 * Connected to live Express 5 backend with real-time video sync, timeline, and stats.
 */
const Meetings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const [timeline, setTimeline] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Auto-trigger schedule modal if URL includes ?new=true
  useEffect(() => {
    if (searchParams.get("new") === "true") {
      setIsScheduleModalOpen(true);
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.delete("new");
        return next;
      }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const fetchMeetingData = useCallback(async () => {
    try {
      setLoading(true);

      const [timelineRes, upcomingRes, statsRes] = await Promise.allSettled([
        meetingService.getTimeline(),
        meetingService.getUpcoming(),
        meetingService.getMeetingStats(),
      ]);

      if (timelineRes.status === "fulfilled" && timelineRes.value?.data) {
        const liveTimeline = Array.isArray(timelineRes.value.data)
          ? timelineRes.value.data
          : timelineRes.value.data.timeline || [];
        setTimeline(liveTimeline);
      } else {
        setTimeline([]);
      }

      if (upcomingRes.status === "fulfilled" && upcomingRes.value?.data) {
        const liveUpcoming = Array.isArray(upcomingRes.value.data)
          ? upcomingRes.value.data
          : upcomingRes.value.data.upcoming || [];
        setUpcoming(liveUpcoming);
      } else {
        setUpcoming([]);
      }

      if (statsRes.status === "fulfilled" && statsRes.value?.data) {
        setStats(statsRes.value.data);
      }
    } catch (err) {
      console.error("Failed to load meetings data:", err);
      setTimeline(MeetingData?.dailyTimeline || []);
      setUpcoming(MeetingData?.upcoming || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMeetingData();
  }, [fetchMeetingData]);

  const handleMeetingCreated = (newMeeting) => {
    showToast(`Scheduled "${newMeeting.title}" successfully!`);
    fetchMeetingData();
  };

  const handleJoinMeeting = (meeting) => {
    if (meeting.meetingLink) {
      window.open(meeting.meetingLink, "_blank", "noopener,noreferrer");
    } else {
      window.open("https://meet.google.com", "_blank", "noopener,noreferrer");
    }
  };

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
        {/* Toast Alert Popup */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="fixed top-20 right-6 z-50 px-4 py-3 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 backdrop-blur-2xl text-cyan-300 text-xs font-semibold shadow-xl"
            >
              ✨ {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div variants={itemVariants}>
          <MeetingsHeader
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onScheduleClick={() => setIsScheduleModalOpen(true)}
          />
        </motion.div>

        {/* Statistics */}
        <motion.div variants={itemVariants}>
          <MeetingStats stats={stats || MeetingData?.stats} />
        </motion.div>

        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-cyan-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-sm font-medium text-slate-400">
              Synchronizing Calendar Schedule...
            </span>
          </div>
        ) : (
          /* Main Workspace */
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-start">
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <DailyTimeline
                schedule={timeline}
                searchTerm={searchTerm}
                activeTab={activeTab}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-1">
              <UpcomingMeetings
                meetings={upcoming}
                searchTerm={searchTerm}
                onJoinMeeting={handleJoinMeeting}
              />
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Schedule Meeting Modal */}
      <ScheduleMeetingModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onMeetingCreated={handleMeetingCreated}
      />
    </DashboardLayout>
  );
};

export default Meetings;