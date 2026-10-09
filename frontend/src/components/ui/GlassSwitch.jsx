import React from "react";
import { motion } from "framer-motion";
import { glass } from "../../theme/glass";
import { animations } from "../../theme/animations";

/**
 * GlassSwitch - Apple Liquid Glass Toggle Switch (iOS / VisionOS Style)
 * 
 * @param {boolean} checked - Switch ON/OFF state
 * @param {function} onChange - Change handler callback (checked: boolean) => void
 * @param {string | React.ReactNode} label - Primary label
 * @param {string | React.ReactNode} description - Optional description text
 * @param {'sm' | 'md' | 'lg'} size - Switch size preset
 * @param {'cyan' | 'blue' | 'purple'} variant - Active track glow color
 * @param {boolean} isDisabled - Disabled state
 * @param {string} className - Additional CSS classes
 * @param {string} id - HTML ID
 */
export const GlassSwitch = ({
  checked = false,
  onChange,
  label,
  description,
  size = "md",
  variant = "cyan",
  isDisabled = false,
  className = "",
  id,
  ...props
}) => {
  const switchId = id || (label ? `glass-switch-${label.toString().toLowerCase().replace(/\s+/g, "-")}` : undefined);

  // Size Specifications
  const sizeSpecs = {
    sm: { track: "w-9 h-5 rounded-full p-0.5", knob: "w-4 h-4", translate: 16 },
    md: { track: "w-12 h-6.5 rounded-full p-1", knob: "w-4.5 h-4.5", translate: 22 },
    lg: { track: "w-14 h-8 rounded-full p-1", knob: "w-6 h-6", translate: 24 },
  };

  const currentSize = sizeSpecs[size] || sizeSpecs.md;

  // Active Track Tone
  const variantStyles = {
    cyan: "bg-gradient-to-r from-blue-600 to-cyan-500 border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.45)]",
    blue: "bg-gradient-to-r from-indigo-600 to-blue-500 border-blue-300 shadow-[0_0_20px_rgba(0,122,255,0.45)]",
    purple: "bg-gradient-to-r from-purple-600 to-pink-500 border-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.45)]",
  };

  const handleToggle = () => {
    if (!isDisabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <label
      htmlFor={switchId}
      className={`
        inline-flex items-center justify-between gap-4 select-none cursor-pointer group
        ${isDisabled ? "opacity-40 cursor-not-allowed pointer-events-none" : ""}
        ${className}
      `}
    >
      {/* Label & Description Text */}
      {(label || description) && (
        <div className="flex flex-col flex-1">
          {label && (
            <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-slate-400 mt-0.5">
              {description}
            </span>
          )}
        </div>
      )}

      {/* Hidden Native Accessibility Input */}
      <input
        id={switchId}
        type="checkbox"
        checked={checked}
        disabled={isDisabled}
        onChange={handleToggle}
        className="sr-only"
        {...props}
      />

      {/* Track Container */}
      <motion.div
        whileTap={!isDisabled ? { scale: 0.95 } : undefined}
        transition={animations.spring.snappy}
        className={`
          relative shrink-0 flex items-center border transition-all duration-300
          ${currentSize.track}
          ${
            checked
              ? variantStyles[variant]
              : "bg-slate-950/60 backdrop-blur-2xl border-white/20 shadow-inner"
          }
        `}
      >
        {/* Specular Edge Highlight */}
        <span className={glass.specular.subtle} />

        {/* Gliding Liquid Thumb Knob */}
        <motion.div
          animate={{ x: checked ? currentSize.translate : 0 }}
          transition={animations.spring.snappy}
          className={`
            relative z-10 rounded-full bg-white shadow-md backdrop-blur-md
            ${currentSize.knob}
          `}
        />
      </motion.div>
    </label>
  );
};

export default GlassSwitch;