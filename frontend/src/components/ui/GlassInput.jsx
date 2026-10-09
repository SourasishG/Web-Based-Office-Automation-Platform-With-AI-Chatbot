import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { glass } from "../../theme/glass";

/**
 * GlassInput - Apple Liquid Glass Form Input Field
 * 
 * @param {string} label - Input label text
 * @param {string} type - Input type (text, password, email, etc.)
 * @param {string} placeholder - Placeholder text
 * @param {string | number} value - Controlled input value
 * @param {function} onChange - Input change handler
 * @param {string} error - Error message text
 * @param {string} helperText - Optional helper text below input
 * @param {React.ReactNode} icon - Left icon component
 * @param {React.ReactNode} rightIcon - Right icon component
 * @param {boolean} isDisabled - Disabled state
 * @param {string} className - Additional CSS for input element
 * @param {string} containerClassName - Additional CSS for wrapper
 */
export const GlassInput = React.forwardRef(({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  helperText,
  icon: Icon,
  rightIcon: RightIcon,
  isDisabled = false,
  className = "",
  containerClassName = "",
  id,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  const isPassword = type === "password";
  const actualType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`w-full flex flex-col gap-1.5 ${containerClassName}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-medium text-slate-300 tracking-wide ml-1 flex items-center justify-between"
        >
          <span>{label}</span>
        </label>
      )}

      {/* Input Glass Container */}
      <motion.div
        animate={{
          scale: isFocused ? 1.005 : 1,
        }}
        transition={{ duration: 0.15 }}
        className={`
          relative flex items-center w-full rounded-2xl overflow-hidden
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
        {/* Left Icon */}
        {Icon && (
          <div className="pl-4 text-slate-400 shrink-0 pointer-events-none">
            {React.isValidElement(Icon) ? Icon : <Icon className="w-4 h-4" />}
          </div>
        )}

        {/* HTML Input */}
        <input
          ref={ref}
          id={inputId}
          type={actualType}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full h-11 bg-transparent px-4 text-sm text-slate-100 placeholder-slate-500
            focus:outline-none border-none selection:bg-cyan-500/30 selection:text-white
            ${Icon ? "pl-2.5" : ""}
            ${isPassword || RightIcon ? "pr-2.5" : ""}
            ${className}
          `}
          {...props}
        />

        {/* Right Icon / Password Toggle */}
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="pr-4 text-slate-400 hover:text-slate-200 transition-colors focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        ) : RightIcon ? (
          <div className="pr-4 text-slate-400 shrink-0">
            {React.isValidElement(RightIcon) ? RightIcon : <RightIcon className="w-4 h-4" />}
          </div>
        ) : null}
      </motion.div>

      {/* Error or Helper Message */}
      {error ? (
        <span className="text-xs text-rose-400 font-medium ml-1 animate-fadeIn">
          {error}
        </span>
      ) : helperText ? (
        <span className="text-xs text-slate-400 font-normal ml-1">
          {helperText}
        </span>
      ) : null}
    </div>
  );
});

GlassInput.displayName = "GlassInput";

export default GlassInput;