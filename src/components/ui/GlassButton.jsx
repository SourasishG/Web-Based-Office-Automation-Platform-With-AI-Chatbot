import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { animations } from "../../theme/animations";
import { glass } from "../../theme/glass";

/**
 * GlassButton - Apple Liquid Glass Interactive Button
 * 
 * @param {React.ReactNode} children - Button text/content
 * @param {'primary' | 'secondary' | 'cyan' | 'purple' | 'danger' | 'ghost' | 'outline'} variant - Visual tone
 * @param {'sm' | 'md' | 'lg' | 'xl' | 'icon'} size - Button size presets
 * @param {React.ReactNode} icon - Left icon component
 * @param {React.ReactNode} rightIcon - Right icon component
 * @param {boolean} isLoading - Loading state with liquid spinner
 * @param {boolean} isDisabled - Disabled state
 * @param {string} className - Extra Tailwind CSS utility classes
 * @param {function} onClick - Click handler
 */
export const GlassButton = ({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  rightIcon: RightIcon,
  isLoading = false,
  isDisabled = false,
  className = "",
  onClick,
  type = "button",
  ...props
}) => {
  // Size Presets
  const sizeStyles = {
    sm: "h-9 px-3.5 text-xs rounded-xl gap-1.5",
    md: "h-11 px-5 text-sm rounded-2xl gap-2",
    lg: "h-13 px-6 text-base rounded-2xl gap-2.5",
    xl: "h-15 px-8 text-lg rounded-[20px] gap-3",
    icon: "h-11 w-11 rounded-2xl p-0 justify-center items-center",
  };

  // Color & Glass Tone Variants
  const variantStyles = {
    primary: `
      bg-gradient-to-r from-blue-600/90 to-blue-500/90 hover:from-blue-500 hover:to-blue-400
      text-white shadow-[0_0_25px_-5px_rgba(0,122,255,0.5)]
      border border-blue-400/40 hover:border-blue-300/60
    `,
    secondary: `
      bg-slate-900/40 hover:bg-slate-800/60 text-slate-100
      backdrop-blur-2xl border border-white/10 hover:border-white/25
      shadow-[0_8px_20px_-4px_rgba(0,0,0,0.4)]
    `,
    cyan: `
      bg-gradient-to-r from-cyan-600/90 to-cyan-500/90 hover:from-cyan-500 hover:to-cyan-400
      text-white shadow-[0_0_25px_-5px_rgba(6,182,212,0.5)]
      border border-cyan-400/40 hover:border-cyan-300/60
    `,
    purple: `
      bg-gradient-to-r from-purple-600/90 to-purple-500/90 hover:from-purple-500 hover:to-purple-400
      text-white shadow-[0_0_25px_-5px_rgba(168,85,247,0.5)]
      border border-purple-400/40 hover:border-purple-300/60
    `,
    danger: `
      bg-gradient-to-r from-rose-600/80 to-rose-500/80 hover:from-rose-500 hover:to-rose-400
      text-white shadow-[0_0_25px_-5px_rgba(244,63,94,0.4)]
      border border-rose-400/40 hover:border-rose-300/60
    `,
    ghost: `
      bg-transparent hover:bg-white/5 text-slate-300 hover:text-white
      border border-transparent hover:border-white/10 backdrop-blur-md
    `,
    outline: `
      bg-transparent hover:bg-slate-900/40 text-slate-200 hover:text-white
      border border-white/20 hover:border-white/40 backdrop-blur-xl
    `,
  };

  const activeDisabled = isDisabled || isLoading;

  return (
    <motion.button
      type={type}
      onClick={!activeDisabled ? onClick : undefined}
      disabled={activeDisabled}
      initial={{ scale: 1 }}
      whileHover={!activeDisabled ? { scale: 1.02, y: -1 } : undefined}
      whileTap={!activeDisabled ? { scale: 0.97, y: 1 } : undefined}
      transition={animations.spring.snappy}
      className={`
        relative inline-flex items-center justify-center font-medium
        overflow-hidden transition-colors duration-200 select-none
        ${glass.specular.subtle}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${activeDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer"}
        ${className}
      `}
      {...props}
    >
      {/* Specular Light Reflection Sweep on Hover */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

      {/* Loading Spinner */}
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />
      ) : Icon ? (
        <span className="shrink-0">{React.isValidElement(Icon) ? Icon : <Icon className="w-4 h-4" />}</span>
      ) : null}

      {/* Children Text */}
      {size !== "icon" && children && (
        <span className="relative z-10 truncate">{children}</span>
      )}

      {/* Right Icon */}
      {!isLoading && RightIcon && size !== "icon" && (
        <span className="shrink-0 relative z-10">
          {React.isValidElement(RightIcon) ? RightIcon : <RightIcon className="w-4 h-4" />}
        </span>
      )}
    </motion.button>
  );
};

export default GlassButton;