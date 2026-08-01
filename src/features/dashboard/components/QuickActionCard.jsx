import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const QuickActionCard = ({
  title,
  description,
  icon: Icon,
  gradient,
}) => {
  return (
    <motion.button
      whileHover={{
        y: -6,
        scale: 1.04,
      }}

      transition={{
        type: "spring",
        stiffness: 280,
        damping: 18,
      }}
      whileTap={{
        scale: 0.98,
      }}
      className={`
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-linear-to-br
        ${gradient}
        p-5
        text-left
        transition
      `}
    >
      <div className="absolute inset-0 bg-black/20 opacity-0 transition group-hover:opacity-100" />

      <div className="relative z-10 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
          <Icon size={24} />
        </div>

        <ArrowRight
          size={18}
          className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
        />
      </div>

      <h3 className="relative z-10 mt-5 text-lg font-semibold">
        {title}
      </h3>

      <p className="relative z-10 mt-2 text-sm text-slate-300">
        {description}
      </p>
    </motion.button>
  );
};

export default QuickActionCard;