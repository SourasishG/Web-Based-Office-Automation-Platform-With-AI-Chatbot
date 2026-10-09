import React from "react";
import { motion } from "framer-motion";

/**
 * ProgressBar - Apple Liquid Glass Progress Bar Line
 * Displays an animated progress track with specular highlight reflections and dynamic percentage labels.
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
        <div className="flex items-center justify-between text-xs font-medium">
          <span className="text-slate-400">Progress</span>
          <span className="text-cyan-300 font-mono font-semibold">
            {Math.round(normalizedProgress)}%
          </span>
        </div>
      )}

      {/* Progress Track */}
      <div className="w-full h-2 rounded-full bg-slate-950/60 overflow-hidden border border-white/10 p-0.5 relative shadow-inner">
        {/* Animated Active Liquid Fill Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${normalizedProgress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full bg-linear-to-r from-blue-600 via-cyan-500 to-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.6)] relative overflow-hidden"
        >
          {/* Specular Light Reflection Sweep */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;