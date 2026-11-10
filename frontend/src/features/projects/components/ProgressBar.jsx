import { motion } from "framer-motion";

/**
 * ProgressBar - Executive Project Progress Line
 * Animated progress track with Lime Green fill and dynamic percentage label.
 * 
 * @param {number} progress - Progress value (0 - 100)
 * @param {boolean} showLabel - Display progress percentage header
 * @param {string} className - Additional CSS classes
 */
export const ProgressBar = ({
  progress = 0,
  showLabel = true,
  className = "",
}) => {
  // Clamp progress between 0 and 100
  const normalizedProgress = Math.min(100, Math.max(0, Number(progress) || 0));

  return (
    <div className={`w-full space-y-1.5 select-none ${className}`}>
      {/* Label & Percentage */}
      {showLabel && (
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-zinc-500">Progress</span>
          <span className="text-[#0B0B0C] font-mono font-bold">
            {Math.round(normalizedProgress)}%
          </span>
        </div>
      )}

      {/* Progress Track */}
      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200/80 p-0.5 relative">
        {/* Animated Active Lime Fill Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${normalizedProgress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full bg-[#C6F432] shadow-sm relative overflow-hidden"
        >
          {/* Subtle Specular Light Sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;
