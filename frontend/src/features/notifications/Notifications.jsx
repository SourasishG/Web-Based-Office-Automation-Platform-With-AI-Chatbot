import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../../components/layout/DashboardLayout";
import NotificationStatsWidget from "./components/NotificationStatsWidget";
import NotificationsHeader from "./components/NotificationsHeader";
import NotificationList from "./components/NotificationList";

import initialNotifications from "./data/notificationData";

/**
 * Notifications - Master Workplace Notifications Center Feature Page
 * Assembles notification metrics, control bar with search/filters, interactive notification list, and toast alerts.
 */
export const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeReadStatus, setActiveReadStatus] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // Filtered Notifications List
  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      // Category Filter
      if (activeCategory !== "all" && item.category !== activeCategory) {
        return false;
      }

      // Read Status Filter
      if (activeReadStatus === "unread" && item.isRead) {
        return false;
      }
      if (activeReadStatus === "read" && !item.isRead) {
        return false;
      }

      // Priority Filter
      if (priorityFilter !== "all" && item.priority !== priorityFilter) {
        return false;
      }

      // Search Query Filter
      if (!searchTerm.trim()) return true;

      const query = searchTerm.toLowerCase();
      return (
        item.title?.toLowerCase().includes(query) ||
        item.message?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query) ||
        item.sender?.name?.toLowerCase().includes(query)
      );
    });
  }, [notifications, activeCategory, activeReadStatus, priorityFilter, searchTerm]);

  // Handler: Toggle Read/Unread
  const handleToggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          const nextReadState = !n.isRead;
          showToast(nextReadState ? "Marked notification as read" : "Marked notification as unread");
          return { ...n, isRead: nextReadState };
        }
        return n;
      })
    );
  };

  // Handler: Delete Single Notification
  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    showToast("Notification removed from center");
  };

  // Handler: Mark All Read
  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast("All notifications marked as read!");
  };

  // Handler: Clear All Notifications
  const handleClearAll = () => {
    setNotifications([]);
    showToast("All notifications cleared from center");
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 pb-4">
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
        <NotificationStatsWidget notifications={notifications} />

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
        <NotificationList
          notifications={filteredNotifications}
          onToggleRead={handleToggleRead}
          onDelete={handleDelete}
        />
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
