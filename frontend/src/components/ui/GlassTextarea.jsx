import React, { useState } from "react";
import { motion } from "framer-motion";
import { glass } from "../../theme/glass";

/**
 * GlassTextarea - Apple Liquid Glass Multiline Text Field
 * 
 * @param {string} label - Input label text
 * @param {string} placeholder - Placeholder text
 * @param {string} value - Controlled input value
 * @param {function} onChange - Change event handler
 * @param {number} rows - Number of visible text lines (default 4)
 * @param {number} maxLength - Maximum character count
 * @param {string} error - Error message text
 * @param {string} helperText - Optional helper message below textarea
 * @param {boolean} isDisabled - Disabled state
 * @param {boolean} resizable - Allow vertical user resizing
 * @param {string} className - Additional CSS for textarea element
 * @param {string} containerClassName - Additional CSS for container wrapper
 */
export const GlassTextarea = React.forwardRef(({
  label,
  placeholder,
  value = "",
  onChange,
  rows = 4,
  maxLength,
  error,
  helperText,
  isDisabled = false,
  resizable = false,
  className = "",
  containerClassName = "",
  id,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const textareaId = id || (label ? `glass-textarea-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);
  const currentLength = value ? value.length : 0;

  return (
    <div className={`w-full flex flex-col gap-1.5 ${containerClassName}`}>
      {/* Label & Character Counter Header */}
      {label && (
        <div className="flex items-center justify-between ml-1 text-xs font-medium text-slate-300 tracking-wide">
          <label htmlFor={textareaId}>{label}</label>
          {maxLength && (
            <span
              className={`text-[10px] ${
                currentLength >= maxLength ? "text-rose-400 font-bold" : "text-slate-400"
              }`}
            >
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      )}

      {/* Glass Textarea Container */}
      <motion.div
        animate={{ scale: isFocused ? 1.005 : 1 }}
        transition={{ duration: 0.15 }}
        className={`
          relative flex w-full rounded-2xl overflow-hidden
          bg-slate-950/40 backdrop-blur-2xl border transition-all duration-300
          ${glass.specular.subtle}
          ${
            error
              ? "border-rose-500/60 shadow-[0_0_20px_-3px_rgba(244,63,94,0.3)]"
              : isFocused
              ? "border-cyan-400/60 shadow-[0_0_25px_-5px_rgba(6,182,212,0.35)] bg-slate-900/50"
              : "border-white/10 hover:border-white/20 shadow-inner"
          }
          ${isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
        `}
      >
        <textarea
          ref={ref}
          id={textareaId}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          rows={rows}
          maxLength={maxLength}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full p-4 bg-transparent text-sm text-slate-100 placeholder-slate-500
            focus:outline-none border-none selection:bg-cyan-500/30 selection:text-white
            ${resizable ? "resize-y" : "resize-none"}
            ${className}
          `}
          {...props}
        />
      </motion.div>

      {/* Error or Helper Message */}
      {error ? (
        <span className="text-xs text-rose-400 font-medium ml-1 animate-fadeIn">{error}</span>
      ) : helperText ? (
        <span className="text-xs text-slate-400 font-normal ml-1">{helperText}</span>
      ) : null}
    </div>
  );
});

GlassTextarea.displayName = "GlassTextarea";

export default GlassTextarea;