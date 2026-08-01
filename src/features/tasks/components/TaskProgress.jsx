import { motion } from "framer-motion";

const TaskProgress = ({ progress }) => {
  const getColor = () => {
    if (progress >= 100) {
      return "from-green-500 to-emerald-500";
    }

    if (progress >= 75) {
      return "from-cyan-500 to-blue-500";
    }

    if (progress >= 40) {
      return "from-yellow-500 to-orange-500";
    }

    return "from-red-500 to-pink-500";
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          Progress
        </span>

        <span className="text-xs font-semibold text-white">
          {progress}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className={`h-full rounded-full bg-linear-to-r ${getColor()}`}
        />
      </div>
    </div>
  );
};

export default TaskProgress;