import React from "react";
import { motion } from "framer-motion";
import { animations } from "../../theme/animations";

/**
 * ProgressRing - Apple Liquid Glass Circular Progress Indicator
 * 
 * @param {number} progress - Progress percentage (0 - 100)
 * @param {number} size - Outer ring diameter in pixels
 * @param {number} strokeWidth - Ring track thickness in pixels
 * @param {'blue' | 'cyan' | 'purple' | 'emerald' | 'rose'} variant - Gradient tone
 * @param {boolean} showValue - Render center percentage label
 * @param {string} label - Optional secondary text below value (e.g. "Completed")
 * @param {React.ReactNode} children - Optional custom center element
 * @param {boolean} glow - Enable dynamic ambient neon glow behind stroke
 * @param {string} className - Extra CSS classes
 */
export const ProgressRing = ({
  progress = 0,
  size = 120,
  strokeWidth = 10,
  variant = "cyan",
  showValue = true,
  label,
  children,
  glow = true,
  className = "",
}) => {
  // Clamp progress between 0 and 100
  const normalizedProgress = Math.min(100, Math.max(0, progress));

  // Geometry calculations
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedProgress / 100) * circumference;

  // Gradient ID setup for SVG defs
  const gradientId = `liquid-ring-gradient-${variant}-${React.useId().replace(/:/g, "")}`;

  // Color mappings
  const variantGradients = {
    blue: { from: "#007AFF", to: "#38BDF8", glow: "rgba(0,122,255,0.5)" },
    cyan: { from: "#06B6D4", to: "#22D3EE", glow: "rgba(6,182,212,0.5)" },
    purple: { from: "#A855F7", to: "#C084FC", glow: "rgba(168,85,247,0.5)" },
    emerald: { from: "#10B981", to: "#34D399", glow: "rgba(16,185,129,0.5)" },
    rose: { from: "#F43F5E", to: "#FB7185", glow: "rgba(244,63,94,0.5)" },
  };

  const selectedGradient = variantGradients[variant] || variantGradients.cyan;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90 overflow-visible"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={selectedGradient.from} />
            <stop offset="100%" stopColor={selectedGradient.to} />
          </linearGradient>
        </defs>

        {/* Ambient Glow Filter Effect */}
        {glow && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth + 4}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="opacity-40 blur-md transition-all duration-700"
          />
        )}

        {/* Background Track Circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="backdrop-blur-xl"
        />

        {/* Animated Active Progress Arc */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={animations.spring.gentle}
          strokeLinecap="round"
        />
      </svg>

      {/* Center Label / Content Slot */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 z-10">
        {children ? (
          children
        ) : showValue ? (
          <>
            <span className="text-xl font-bold tracking-tight text-white leading-none">
              {Math.round(normalizedProgress)}%
            </span>
            {label && (
              <span className="text-[10px] text-slate-400 font-medium mt-1 truncate max-w-full">
                {label}
              </span>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ProgressRing;