import { motion } from "framer-motion";
import {
  Clock,
  Users,
} from "lucide-react";

const MeetingCard = ({
  title,
  time,
  attendees,
  color,
  className = "",
}) => {
  return (
    <motion.div
      whileHover={{
        x: 6,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
      }}
      className={`
        flex
        items-start
        gap-4
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-4
        backdrop-blur-xl
        ${className}
      `}
    >
      <div
        className={`
          mt-1
          h-3
          w-3
          rounded-full
          bg-linear-to-r
          ${color}
        `}
      />

      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-white">
          {title}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
          <Clock size={16} />

          <span>{time}</span>
        </div>

        <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
          <Users size={16} />

          <span>{attendees}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MeetingCard;