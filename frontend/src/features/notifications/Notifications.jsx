import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../../components/layout/DashboardLayout";
import NotificationStatsWidget from "./components/NotificationStatsWidget";
import NotificationsHeader from "./components/NotificationsHeader";
import NotificationList from "./components/NotificationList";
import { notificationService } from "../../services/notificationService";
import initialNotifications from "./data/notificationData";
import { Loader2 } from "lucide-react";

/**
 * Notifications - Master Workplace Notifications Center Feature Page
 * Connected to live Express 5 backend with real-time alerts, mark all read, and filter toggles.
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

      if (notificationsRes.status === "fulfilled" && notificationsRes.value?.data) {
        const liveItems =
          notificationsRes.value.data.notifications ||
          (Array.isArray(notificationsRes.value.data) ? notificationsRes.value.data : []);
        setNotifications(liveItems);
      } else {
        setNotifications([]);
      }

      if (statsRes.status === "fulfilled" && statsRes.value?.data) {
        setStatsData(statsRes.value.data);
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
      // Category Filter
      if (activeCategory !== "all") {
        const cat = (item.category || "").toLowerCase();
        const filterCat = activeCategory.toLowerCase();
        if (cat !== filterCat) return false;
      }

      // Read Status Filter
      if (activeReadStatus === "unread" && item.isRead) {
        return false;
      }
      if (activeReadStatus === "read" && !item.isRead) {
        return false;
      }

      // Priority Filter
      if (priorityFilter !== "all") {
        const p = (item.priority || "").toLowerCase();
        const filterP = priorityFilter.toLowerCase();
        if (p !== filterP) return false;
      }

      // Search Query Filter
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
  }, [notifications, activeCategory, activeReadStatus, priorityFilter, searchTerm]);

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
    <DashboardLayout>
      <div className="space-y-4 pb-4 select-none">
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

        {/* Top Summary Metric Cards */}
        <NotificationStatsWidget
          notifications={notifications}
          statsData={statsData}
        />

        {/* Header & Control Bar */}
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

        {/* Filtered Notification Cards List */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-cyan-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-sm font-medium text-slate-400">
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
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
