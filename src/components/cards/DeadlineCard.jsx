import { motion } from "framer-motion";
import {
  CalendarClock,
  Flag,
} from "lucide-react";

const priorityColors = {
  High: "bg-red-500 text-red-100",
  Medium: "bg-yellow-500 text-yellow-900",
  Low: "bg-emerald-500 text-emerald-100",
};

const DeadlineCard = ({
  title,
  dueDate,
  priority,
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
        items-center
        justify-between
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-4
        backdrop-blur-xl
        ${className}
      `}
    >
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-semibold text-white">
          {title}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
          <CalendarClock size={16} />

          <span>{dueDate}</span>
        </div>
      </div>

      <div
        className={`
          flex
          items-center
          gap-2
          rounded-full
          px-3
          py-1
          text-xs
          font-semibold
          ${priorityColors[priority]}
        `}
      >
        <Flag size={14} />

        <span>{priority}</span>
      </div>
    </motion.div>
  );
};

export default DeadlineCard;