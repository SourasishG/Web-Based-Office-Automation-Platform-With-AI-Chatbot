import { motion, AnimatePresence } from "framer-motion";
import { BellOff } from "lucide-react";
import { NotificationCard } from "./NotificationCard";

/**
 * NotificationList - Quixotic Notification Feed with Framer Motion & Pure White Empty State
 * Positioned in the lower 40% Pure White region.
 *
 * @param {Array} notifications - Filtered notification records
 * @param {function} onToggleRead - Callback to toggle read status
 * @param {function} onDelete - Callback to delete notification
 */
export const NotificationList = ({
  notifications = [],
  onToggleRead,
  onDelete,
}) => {
  if (notifications.length === 0) {
    return (
      <div className="bg-white border border-zinc-200/80 rounded-3xl shadow-sm p-12 text-center flex flex-col items-center justify-center my-4">
        <div className="w-16 h-16 rounded-3xl bg-zinc-100 border border-zinc-200 text-zinc-400 flex items-center justify-center mb-4">
          <BellOff className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-extrabold text-[#0B0B0C] tracking-tight">
          No Notifications Found
        </h3>
        <p className="text-xs text-zinc-500 max-w-sm mt-1">
          You&apos;re all caught up! No notifications match your selected filters or
          search parameters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3.5 my-2">
      <AnimatePresence mode="popLayout">
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            layout
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <NotificationCard
              notification={notif}
              onToggleRead={onToggleRead}
              onDelete={onDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationList;
