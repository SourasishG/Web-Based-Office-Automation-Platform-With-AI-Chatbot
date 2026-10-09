import { motion, AnimatePresence } from "framer-motion";
import { BellOff } from "lucide-react";
import { GlassCard } from "../../../components/ui/GlassCard";
import { NotificationCard } from "./NotificationCard";

/**
 * NotificationList - Renders notification items with Framer Motion transitions and empty states
 * 
 * @param {Array} notifications - Filtered notification records
 * @param {function} onToggleRead - Callback to toggle read status
 * @param {function} onDelete - Callback to delete notification
 */
export const NotificationList = ({ notifications = [], onToggleRead, onDelete }) => {
  if (notifications.length === 0) {
    return (
      <GlassCard variant="standard" className="p-12 text-center flex flex-col items-center justify-center">
        <div className="p-4 rounded-3xl bg-white/5 border border-white/10 text-slate-400 mb-4">
          <BellOff className="w-8 h-8 text-cyan-400/70" />
        </div>
        <h3 className="text-lg font-bold text-white tracking-tight">No Notifications Found</h3>
        <p className="text-sm text-slate-400 max-w-sm mt-1">
          You're all caught up! No notifications match your selected filters or search parameters.
        </p>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            layout
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
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
