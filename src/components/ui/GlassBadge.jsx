import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { glass } from "../../theme/glass";

/**
 * GlassBadge - Apple Liquid Glass Status & Priority Badge
 * 
 * @param {React.ReactNode} children - Badge text/content
 * @param {'default' | 'primary' | 'cyan' | 'purple' | 'success' | 'warning' | 'danger' | 'ghost'} variant - Visual tone
 * @param {'sm' | 'md' | 'lg'} size - Badge size preset
 * @param {React.ReactNode} icon - Optional left icon component
 * @param {boolean} dot - Enable pulsing status dot
 * @param {boolean} glow - Enable ambient neon glow effect
 * @param {function} onRemove - Optional dismiss callback handler
 * @param {string} className - Additional CSS classes
 */
export const GlassBadge = ({
  children,
  variant = "default",
  size = "md",
  icon: Icon,
  dot = false,
  glow = false,
  onRemove,
  className = "",
  ...props
}) => {
  // Size Presets
  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px] rounded-md gap-1 font-semibold",
    md: "px-2.5 py-1 text-xs rounded-lg gap-1.5 font-medium",
    lg: "px-3.5 py-1.5 text-sm rounded-xl gap-2 font-medium",
  };

  // Variant Glass Tones
  const variantStyles = {
    default: `
      bg-slate-900/60 text-slate-200 border-white/10
      ${glow ? "shadow-[0_0_15px_rgba(255,255,255,0.15)]" : ""}
    `,
    primary: `
      bg-blue-950/60 text-blue-300 border-blue-500/40
      ${glow ? "shadow-[0_0_20px_rgba(0,122,255,0.35)]" : ""}
    `,
    cyan: `
      bg-cyan-950/60 text-cyan-300 border-cyan-500/40
      ${glow ? "shadow-[0_0_20px_rgba(6,182,212,0.35)]" : ""}
    `,
    purple: `
      bg-purple-950/60 text-purple-300 border-purple-500/40
      ${glow ? "shadow-[0_0_20px_rgba(168,85,247,0.35)]" : ""}
    `,
    success: `
      bg-emerald-950/60 text-emerald-300 border-emerald-500/40
      ${glow ? "shadow-[0_0_20px_rgba(16,185,129,0.35)]" : ""}
    `,
    warning: `
      bg-amber-950/60 text-amber-300 border-amber-500/40
      ${glow ? "shadow-[0_0_20px_rgba(245,158,11,0.35)]" : ""}
    `,
    danger: `
      bg-rose-950/60 text-rose-300 border-rose-500/40
      ${glow ? "shadow-[0_0_20px_rgba(244,63,94,0.35)]" : ""}
    `,
    ghost: `
      bg-white/5 text-slate-300 border-white/5 hover:bg-white/10
    `,
  };

  // Dot Color Mapping
  const dotColorStyles = {
    default: "bg-slate-300 shadow-[0_0_8px_rgba(255,255,255,0.8)]",
    primary: "bg-blue-400 shadow-[0_0_8px_rgba(0,122,255,0.9)]",
    cyan: "bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)]",
    purple: "bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.9)]",
    success: "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.9)]",
    warning: "bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.9)]",
    danger: "bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.9)]",
    ghost: "bg-slate-400",
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center whitespace-nowrap select-none
        backdrop-blur-xl border transition-all duration-200
        ${glass.specular.subtle}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      {/* Status Dot */}
      {dot && (
        <span className="relative flex h-2 w-2 items-center justify-center">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColorStyles[variant]}`} />
          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${dotColorStyles[variant]}`} />
        </span>
      )}

      {/* Icon */}
      {Icon && (
        <span className="shrink-0">
          {React.isValidElement(Icon) ? Icon : <Icon className="w-3.5 h-3.5" />}
        </span>
      )}

      {/* Content */}
      <span>{children}</span>

      {/* Dismiss Button */}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="hover:opacity-100 opacity-70 p-0.5 rounded-full hover:bg-white/10 transition-opacity focus:outline-none"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};

export default GlassBadge;