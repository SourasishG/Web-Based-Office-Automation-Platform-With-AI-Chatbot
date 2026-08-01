import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const ActivityCard = ({
  title,
  description,
  time,
  icon: Icon,
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
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-linear-to-br
          ${color}
        `}
      >
        <Icon
          size={22}
          className="text-white"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          {description}
        </p>

        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <Clock size={14} />

          <span>{time}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityCard;