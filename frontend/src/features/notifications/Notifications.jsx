import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, CheckCheck, Loader2 } from "lucide-react";

import QuixoticTopNavbar from "../dashboard/components/QuixoticTopNavbar";
import QuixoticDock from "../dashboard/components/QuixoticDock";

import NotificationStatsWidget from "./components/NotificationStatsWidget";
import NotificationsHeader from "./components/NotificationsHeader";
import NotificationList from "./components/NotificationList";

import { notificationService } from "../../services/notificationService";
import initialNotifications from "./data/notificationData";

/**
 * Notifications - Executive Quixotic Notifications Center
 * Strictly aligned with Dashboard, Projects, Tasks, Meetings, Employees, Tickets, and Profile theme:
 * - 60% Midnight Black (#0B0B0C) at top, 40% Pure White (#FFFFFF) at bottom
 * - 10% Lime Green (#C6F432) on primary buttons & active indicators
 * - Plus Jakarta Sans typography
 * - Floating QuixoticTopNavbar & QuixoticDock
 */
export const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeReadStatus, setActiveReadStatus] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
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

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const fetchNotificationData = useCallback(async () => {
    try {
      setLoading(true);

      const [notificationsRes, statsRes] = await Promise.allSettled([
        notificationService.getAllNotifications({ limit: 100 }),
        notificationService.getNotificationStats(),
      ]);

      if (notificationsRes.status === "fulfilled" && notificationsRes.value) {
        const resData = notificationsRes.value.data ?? notificationsRes.value;
        const liveItems =
          resData.notifications ||
          (Array.isArray(resData) ? resData : []);
        setNotifications(liveItems.length > 0 ? liveItems : initialNotifications);
      } else {
        setNotifications(initialNotifications);
      }

      if (statsRes.status === "fulfilled" && statsRes.value) {
        setStatsData(statsRes.value.data ?? statsRes.value);
      }
    } catch (err) {
      console.error("Failed to load notifications center data:", err);
      setNotifications(initialNotifications);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotificationData();
  }, [fetchNotificationData]);

  // Filtered Notifications List
  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      if (activeCategory !== "all") {
        const cat = (item.category || "").toLowerCase();
        const filterCat = activeCategory.toLowerCase();
        if (cat !== filterCat) return false;
      }

      if (activeReadStatus === "unread" && item.isRead) {
        return false;
      }
      if (activeReadStatus === "read" && !item.isRead) {
        return false;
      }

      if (priorityFilter !== "all") {
        const p = (item.priority || "").toLowerCase();
        const filterP = priorityFilter.toLowerCase();
        if (p !== filterP) return false;
      }

      if (!searchTerm.trim()) return true;

      const query = searchTerm.toLowerCase();
      const senderName = item.sender
        ? `${item.sender.firstName || ""} ${item.sender.lastName || ""}`.toLowerCase() ||
          item.sender.name?.toLowerCase() ||
          ""
        : "";

      return (
        item.title?.toLowerCase().includes(query) ||
        item.message?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query) ||
        senderName.includes(query)
      );
    });
  }, [
    notifications,
    activeCategory,
    activeReadStatus,
    priorityFilter,
    searchTerm,
  ]);

  // Handler: Toggle Read/Unread
  const handleToggleRead = async (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
    showToast("Updated notification status");

    try {
      await notificationService.markRead(id);
      const statsRes = await notificationService.getNotificationStats();
      if (statsRes?.data) setStatsData(statsRes.data);
    } catch (err) {
      console.error("Failed to toggle notification read:", err);
    }
  };

  // Handler: Delete Single Notification
  const handleDelete = async (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    showToast("Notification removed from center");

    try {
      await notificationService.deleteNotification(id);
      const statsRes = await notificationService.getNotificationStats();
      if (statsRes?.data) setStatsData(statsRes.data);
    } catch (err) {
      console.error("Failed to delete notification:", err);
    }
  };

  // Handler: Mark All Read
  const handleMarkAllRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast("All notifications marked as read!");

    try {
      await notificationService.markAllRead();
      const statsRes = await notificationService.getNotificationStats();
      if (statsRes?.data) setStatsData(statsRes.data);
    } catch (err) {
      console.error("Failed to mark all notifications read:", err);
    }
  };

  // Handler: Clear All Notifications
  const handleClearAll = async () => {
    setNotifications([]);
    showToast("All notifications cleared from center");

    try {
      await notificationService.clearAll();
      const statsRes = await notificationService.getNotificationStats();
      if (statsRes?.data) setStatsData(statsRes.data);
    } catch (err) {
      console.error("Failed to clear notifications:", err);
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

        {/* Center Notification Canvas */}
        <main className="flex-1 min-w-0 space-y-6 select-none">
          {/* Executive Header Row */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>Notification</span>
                <span className="text-[#C6F432]">Center</span>
              </h1>
              <p className="text-xs text-zinc-400 mt-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C6F432] animate-pulse" />
                <span>
                  Live Alerts • Operational dispatches, mentions & SLA reminders
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
                onClick={handleMarkAllRead}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#C6F432] text-[#0B0B0C] text-xs font-bold tracking-tight shadow-lg shadow-[#C6F432]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <CheckCheck className="w-4 h-4 stroke-[2.5]" />
                <span>Mark All Read</span>
              </button>
            </div>
          </motion.div>

          {/* Upper 60% Midnight Black Zone: Stats & Control Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <NotificationStatsWidget
              notifications={notifications}
              statsData={statsData}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            <NotificationsHeader
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              activeReadStatus={activeReadStatus}
              onReadStatusChange={setActiveReadStatus}
              priorityFilter={priorityFilter}
              onPriorityFilterChange={setPriorityFilter}
              onMarkAllRead={handleMarkAllRead}
              onClearAll={handleClearAll}
            />
          </motion.div>

          {/* Lower 40% Pure White Zone: Notification Stream */}
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
                  Loading Notification Stream...
                </span>
              </div>
            ) : (
              <NotificationList
                notifications={filteredNotifications}
                onToggleRead={handleToggleRead}
                onDelete={handleDelete}
              />
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Notifications;
