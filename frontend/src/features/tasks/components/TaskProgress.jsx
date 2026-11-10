import { motion } from "framer-motion";

/**
 * TaskProgress - Quixotic 10% Lime Green Task Progress Meter
 * 
 * @param {number} progress - Execution percentage value (0 - 100)
 * @param {boolean} showLabel - Display percentage text label
 * @param {string} className - Additional CSS classes
 * @param {boolean} darkTrack - Use dark track for midnight black zones
 */
export const TaskProgress = ({
  progress = 0,
  showLabel = true,
  className = "",
  darkTrack = false,
}) => {
  const normalizedProgress = Math.min(100, Math.max(0, Number(progress) || 0));

  return (
    <div className={`w-full space-y-1.5 select-none ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className={darkTrack ? "text-zinc-400" : "text-zinc-500"}>Progress</span>
          <span
            className={`font-mono font-bold ${
              darkTrack ? "text-[#C6F432]" : "text-[#0B0B0C]"
            }`}
          >
            {Math.round(normalizedProgress)}%
          </span>
        </div>
      )}

      <div
        className={`w-full h-2 rounded-full overflow-hidden p-0.5 relative shadow-inner ${
          darkTrack
            ? "bg-[#1A1A1E] border border-white/10"
            : "bg-zinc-100 border border-zinc-200"
        }`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${normalizedProgress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full rounded-full bg-[#C6F432] shadow-sm relative overflow-hidden"
        />
      </div>
    </div>
  );
};

export default TaskProgress;
