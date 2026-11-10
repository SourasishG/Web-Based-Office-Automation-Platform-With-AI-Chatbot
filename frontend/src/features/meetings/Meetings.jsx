import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Plus, Loader2 } from "lucide-react";

import QuixoticTopNavbar from "../dashboard/components/QuixoticTopNavbar";
import QuixoticDock from "../dashboard/components/QuixoticDock";

import MeetingsHeader from "./components/MeetingsHeader";
import MeetingStats from "./components/MeetingStats";
import UpcomingMeetings from "./components/UpcomingMeetings";
import DailyTimeline from "./components/DailyTimeline";
import ScheduleMeetingModal from "./components/ScheduleMeetingModal";
import CalendarModal from "./components/CalendarModal";

import { meetingService } from "../../services/meetingService";
import MeetingData from "./data/MeetingData";

/**
 * Meetings - Executive Quixotic Meetings Workspace
 * Strictly aligned with Dashboard styling and theme:
 * - 60% Midnight Black (#0B0B0C) at top, 30% Pure White (#FFFFFF) at bottom
 * - 10% Lime Green (#C6F432) on primary buttons & active indicators
 * - Plus Jakarta Sans typography
 * - Floating QuixoticTopNavbar & QuixoticDock
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

  // Auto-trigger schedule modal if URL includes ?new=true
  useEffect(() => {
    if (searchParams.get("new") === "true") {
      setScheduleInitialDate("");
      setIsScheduleModalOpen(true);
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.delete("new");
          return next;
        },
        { replace: true }
      );
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
        setTimeline(liveTimeline.length > 0 ? liveTimeline : MeetingData?.dailyTimeline || []);
      } else {
        setTimeline(MeetingData?.dailyTimeline || []);
      }

      if (upcomingRes.status === "fulfilled") {
        const val = upcomingRes.value;
        const liveUpcoming = Array.isArray(val)
          ? val
          : Array.isArray(val?.data)
          ? val.data
          : val?.upcoming || [];
        setUpcoming(liveUpcoming.length > 0 ? liveUpcoming : MeetingData?.upcoming || []);
      } else {
        setUpcoming(MeetingData?.upcoming || []);
      }

      if (statsRes.status === "fulfilled") {
        const val = statsRes.value;
        setStats(val?.data || val);
      }

      if (allRes.status === "fulfilled") {
        const val = allRes.value;
        const list = val?.meetings || val?.data?.meetings || (Array.isArray(val) ? val : []);
        setAllMeetings(list.length > 0 ? list : Array.isArray(MeetingData) ? MeetingData : []);
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

      {/* Toast Alert Popup */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-6 z-50 px-4 py-3 rounded-2xl bg-[#141416] border border-[#C6F432]/50 backdrop-blur-2xl text-white text-xs font-semibold shadow-2xl flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#C6F432]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Workspace Frame */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex gap-6">
        {/* Left Floating Pill Dock */}
        <QuixoticDock />

        {/* Center Meetings Canvas */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* Executive Header Row */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            {/* Title & Status */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>Meetings</span>
                <span className="text-[#C6F432]">Workspace</span>
              </h1>
              <p className="text-xs text-zinc-400 mt-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C6F432] animate-pulse" />
                <span>Active Workplace Syncs • Real-time video conferencing & schedule</span>
              </p>
            </div>

            {/* Current Date & Time Pill + Lime Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1E] border border-white/10 text-xs font-semibold text-zinc-200 shadow-md">
                <Calendar className="w-3.5 h-3.5 text-[#C6F432]" />
                <span className="font-mono">{formattedDateTime}</span>
              </div>

              {/* Secondary Action: Calendar Overview */}
              <button
                type="button"
                onClick={() => setIsCalendarModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1E] border border-white/10 hover:border-white/20 text-xs font-semibold text-zinc-300 hover:text-white transition-all shadow-md cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C6F432]" />
                <span>Calendar</span>
              </button>

              {/* Primary Action Button: Lime Green */}
              <button
                type="button"
                onClick={() => handleOpenScheduleModal()}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold tracking-tight shadow-lg shadow-[#C6F432]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Schedule Meeting</span>
              </button>
            </div>
          </motion.div>

          {/* Upper 60% Midnight Black Zone: Stats & Control Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <MeetingStats stats={stats || MeetingData?.stats} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            <MeetingsHeader
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onScheduleClick={() => handleOpenScheduleModal()}
              onCalendarClick={() => setIsCalendarModalOpen(true)}
            />
          </motion.div>

          {/* Lower 40% Pure White Zone: Main Schedule Workspace */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="pt-2"
          >
            {loading ? (
              <div className="py-24 flex flex-col items-center justify-center text-[#C6F432] gap-3">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="text-sm font-medium text-zinc-400">
                  Synchronizing Calendar Schedule...
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-start">
                {/* Left 2 Cols: Daily Timeline */}
                <div className="lg:col-span-2">
                  <DailyTimeline
                    schedule={timeline}
                    searchTerm={searchTerm}
                    activeTab={activeTab}
                    selectedDate={selectedDate}
                    onDateChange={handleTimelineDateChange}
                    onOpenCalendar={() => setIsCalendarModalOpen(true)}
                  />
                </div>

                {/* Right 1 Col: Upcoming Meetings Sidebar */}
                <div className="lg:col-span-1">
                  <UpcomingMeetings
                    meetings={upcoming}
                    searchTerm={searchTerm}
                    onJoinMeeting={handleJoinMeeting}
                    onViewCalendar={() => setIsCalendarModalOpen(true)}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </main>
      </div>

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
    </div>
  );
};

export default Meetings;
