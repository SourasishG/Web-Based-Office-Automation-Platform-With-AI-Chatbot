import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { animations } from "../../theme/animations";

/**
 * GlassCheckbox - Apple Liquid Glass Custom Checkbox Control
 * 
 * @param {boolean} checked - Checked state
 * @param {function} onChange - Change handler callback (checked: boolean) => void
 * @param {string | React.ReactNode} label - Checkbox label text
 * @param {string | React.ReactNode} description - Optional secondary description text
 * @param {'cyan' | 'blue' | 'purple'} variant - Checked tone accent
 * @param {boolean} isDisabled - Disabled state
 * @param {string} className - Additional CSS classes
 * @param {string} id - HTML ID
 */
export const GlassCheckbox = ({
  checked = false,
  onChange,
  label,
  description,
  variant = "cyan",
  isDisabled = false,
  className = "",
  id,
  ...props
}) => {
  const checkboxId = id || (label ? `glass-check-${label.toString().toLowerCase().replace(/\s+/g, "-")}` : undefined);

  // Variant Gradient & Glow Styling
  const variantStyles = {
    cyan: "bg-gradient-to-tr from-cyan-600 to-blue-500 border-cyan-300 shadow-[0_0_18px_rgba(6,182,212,0.5)]",
    blue: "bg-gradient-to-tr from-blue-600 to-indigo-500 border-blue-300 shadow-[0_0_18px_rgba(0,122,255,0.5)]",
    purple: "bg-gradient-to-tr from-purple-600 to-pink-500 border-purple-300 shadow-[0_0_18px_rgba(168,85,247,0.5)]",
  };

  const handleToggle = () => {
    if (!isDisabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <label
      htmlFor={checkboxId}
      className={`
        inline-flex items-start gap-3 select-none cursor-pointer group
        ${isDisabled ? "opacity-40 cursor-not-allowed pointer-events-none" : ""}
        ${className}
      `}
    >
      {/* Hidden Native Accessibility Input */}
      <input
        id={checkboxId}
        type="checkbox"
        checked={checked}
        disabled={isDisabled}
        onChange={handleToggle}
        className="sr-only"
        {...props}
      />

      {/* Custom Liquid Glass Box */}
      <motion.div
        whileHover={!isDisabled ? { scale: 1.08 } : undefined}
        whileTap={!isDisabled ? { scale: 0.92 } : undefined}
        transition={animations.spring.snappy}
        className={`
          relative mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center shrink-0
          transition-all duration-200 border
          ${
            checked
              ? variantStyles[variant]
              : "bg-slate-950/60 backdrop-blur-xl border-white/20 hover:border-white/40 shadow-inner"
          }
        `}
      >
        {/* Animated Checkmark Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
          transition={animations.spring.snappy}
        >
          <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
        </motion.div>
      </motion.div>

      {/* Label & Optional Description */}
      {(label || description) && (
        <div className="flex flex-col">
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
    </label>
  );
};

export default GlassCheckbox;