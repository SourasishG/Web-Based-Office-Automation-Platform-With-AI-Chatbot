import { motion } from "framer-motion";
import {
  Megaphone,
  Pin,
} from "lucide-react";

const priorityColors = {
  High: "bg-red-500/20 text-red-400",
  Medium: "bg-yellow-500/20 text-yellow-400",
  Low: "bg-emerald-500/20 text-emerald-400",
};

const AnnouncementCard = ({
  title,
  message,
  date,
  priority,
  className = "",
}) => {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
      }}
      className={`
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-5
        backdrop-blur-xl
        ${className}
      `}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-cyan-500/20
            "
          >
            <Megaphone
              size={20}
              className="text-cyan-400"
            />
          </div>

          <h3 className="font-semibold text-white">
            {title}
          </h3>
        </div>

        <span
          className={`
            flex
            items-center
            gap-1
            rounded-full
            px-3
            py-1
            text-xs
            font-medium
            ${priorityColors[priority]}
          `}
        >
          <Pin size={12} />

          {priority}
        </span>
      </div>

      <p className="text-sm leading-6 text-slate-400">
        {message}
      </p>

      <p className="mt-4 text-xs text-slate-500">
        {date}
      </p>
    </motion.div>
  );
};

export default AnnouncementCard;