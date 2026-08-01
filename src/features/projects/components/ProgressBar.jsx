import { motion } from "framer-motion";

const ProgressBar = ({
  progress,
  value,
  showValue = true,
  height = "h-2",
}) => {
  const percentage = value ?? progress ?? 0;

  const getProgressColor = () => {
    if (percentage >= 80) {
      return "from-green-500 to-emerald-500";
    }

    if (percentage >= 50) {
      return "from-cyan-500 to-blue-500";
    }

    if (percentage >= 30) {
      return "from-yellow-500 to-orange-500";
    }

    return "from-red-500 to-pink-500";
  };

  return (
    <div className="w-full">
      {showValue && (
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-slate-400">
            Progress
          </span>

          <span className="text-sm font-semibold text-white">
            {percentage}%
          </span>
        </div>
      )}

      <div
        className={`${height} overflow-hidden rounded-full bg-slate-800`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className={`h-full rounded-full bg-linear-to-r ${getProgressColor()}`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;