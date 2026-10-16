import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import DashboardLayout from "../../components/layout/DashboardLayout";

import MeetingsHeader from "./components/MeetingsHeader";
import MeetingStats from "./components/MeetingStats";
import UpcomingMeetings from "./components/UpcomingMeetings";
import DailyTimeline from "./components/DailyTimeline";
import ScheduleMeetingModal from "./components/ScheduleMeetingModal";
import CalendarModal from "./components/CalendarModal";

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

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [timeline, setTimeline] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [allMeetings, setAllMeetings] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [scheduleInitialDate, setScheduleInitialDate] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  // Auto-trigger schedule modal if URL includes ?new=true
  useEffect(() => {
    if (searchParams.get("new") === "true") {
      setScheduleInitialDate("");
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

  const fetchMeetingData = useCallback(async (dateToQuery = selectedDate) => {
    try {
      setLoading(true);

      const [timelineRes, upcomingRes, statsRes, allRes] = await Promise.allSettled([
        meetingService.getTimeline(dateToQuery),
        meetingService.getUpcoming(),
        meetingService.getMeetingStats(),
        meetingService.getAllMeetings({ limit: 100 }),
      ]);

      if (timelineRes.status === "fulfilled") {
        const val = timelineRes.value;
        const liveTimeline = Array.isArray(val)
          ? val
          : Array.isArray(val?.data)
          ? val.data
          : val?.timeline || [];
        setTimeline(liveTimeline);
      } else {
        setTimeline([]);
      }

      if (upcomingRes.status === "fulfilled") {
        const val = upcomingRes.value;
        const liveUpcoming = Array.isArray(val)
          ? val
          : Array.isArray(val?.data)
          ? val.data
          : val?.upcoming || [];
        setUpcoming(liveUpcoming);
      } else {
        setUpcoming([]);
      }

      if (statsRes.status === "fulfilled") {
        const val = statsRes.value;
        setStats(val?.data || val);
      }

      if (allRes.status === "fulfilled") {
        const val = allRes.value;
        const list = val?.meetings || val?.data?.meetings || (Array.isArray(val) ? val : []);
        setAllMeetings(list);
      }
    } catch (err) {
      console.error("Failed to load meetings data:", err);
      setTimeline(MeetingData?.dailyTimeline || []);
      setUpcoming(MeetingData?.upcoming || []);
    } finally {
      setLoading(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    fetchMeetingData(selectedDate);
  }, [fetchMeetingData, selectedDate]);

  const handleTimelineDateChange = (newDateStr) => {
    setSelectedDate(newDateStr);
    fetchMeetingData(newDateStr);
  };

  const handleOpenScheduleModal = (dateStr) => {
    setScheduleInitialDate(dateStr || selectedDate);
    setIsScheduleModalOpen(true);
  };

  const handleMeetingCreated = (newMeeting) => {
    showToast(`Scheduled "${newMeeting.title}" successfully!`);
    fetchMeetingData(selectedDate);
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
            onScheduleClick={() => handleOpenScheduleModal()}
            onCalendarClick={() => setIsCalendarModalOpen(true)}
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
                selectedDate={selectedDate}
                onDateChange={handleTimelineDateChange}
                onOpenCalendar={() => setIsCalendarModalOpen(true)}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-1">
              <UpcomingMeetings
                meetings={upcoming}
                searchTerm={searchTerm}
                onJoinMeeting={handleJoinMeeting}
                onViewCalendar={() => setIsCalendarModalOpen(true)}
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
        initialDate={scheduleInitialDate}
      />

      {/* Interactive Calendar Modal */}
      <CalendarModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
        allMeetings={allMeetings.length > 0 ? allMeetings : [...timeline, ...upcoming]}
        selectedDate={selectedDate}
        onSelectDate={(d) => {
          setSelectedDate(d);
          fetchMeetingData(d);
        }}
        onOpenScheduleModal={(d) => handleOpenScheduleModal(d)}
        onViewDateInTimeline={(d) => {
          setSelectedDate(d);
          fetchMeetingData(d);
        }}
      />
    </DashboardLayout>
  );
};

export default Meetings;