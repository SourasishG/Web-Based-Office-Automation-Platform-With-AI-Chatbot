import React, { useState } from "react";
import { motion } from "framer-motion";
import { glass } from "../../theme/glass";
import { animations } from "../../theme/animations";

/**
 * GlassAvatar - Apple Liquid Glass User Avatar & Initials Ring
 * 
 * @param {string} src - Avatar image URL
 * @param {string} name - User display name (used for initials fallback)
 * @param {'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'} size - Avatar size preset
 * @param {'online' | 'away' | 'busy' | 'offline'} status - Presence indicator dot
 * @param {boolean} glow - Enable dynamic ambient ring glow
 * @param {function} onClick - Click handler
 * @param {string} className - Additional CSS classes
 */
export const GlassAvatar = ({
  src,
  name = "User",
  size = "md",
  status,
  glow = false,
  onClick,
  className = "",
}) => {
  const [imageError, setImageError] = useState(false);

  // Size Presets
  const sizeStyles = {
    xs: "w-6 h-6 text-[10px] rounded-lg",
    sm: "w-8 h-8 text-xs rounded-xl",
    md: "w-10 h-10 text-sm rounded-2xl",
    lg: "w-12 h-12 text-base rounded-[18px]",
    xl: "w-16 h-16 text-xl rounded-3xl",
    "2xl": "w-20 h-20 text-2xl rounded-[28px]",
  };

  // Status Indicator Dot Specs
  const statusStyles = {
    online: "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]",
    away: "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.9)]",
    busy: "bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.9)]",
    offline: "bg-slate-500 shadow-[0_0_8px_rgba(100,116,139,0.5)]",
  };

  const statusSizeStyles = {
    xs: "w-1.5 h-1.5 ring-1",
    sm: "w-2 h-2 ring-2",
    md: "w-2.5 h-2.5 ring-2",
    lg: "w-3 h-3 ring-2",
    xl: "w-3.5 h-3.5 ring-2",
    "2xl": "w-4 h-4 ring-3",
  };

  // Extract Initials (e.g. "Sourasish Ghosh" -> "SG")
  const getInitials = (str) => {
    if (!str) return "U";
    const parts = str.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
    }
    return str.substring(0, 2).toUpperCase();
  };

  return (
    <div className={`relative inline-block shrink-0 select-none ${className}`}>
      <motion.div
        onClick={onClick}
        whileHover={onClick ? { scale: 1.05 } : undefined}
        whileTap={onClick ? { scale: 0.95 } : undefined}
        transition={animations.spring.snappy}
        className={`
          relative flex items-center justify-center overflow-hidden font-semibold text-white
          bg-slate-900/60 backdrop-blur-xl border border-white/20 shadow-md
          ${glass.specular.subtle}
          ${sizeStyles[size]}
          ${glow ? "shadow-[0_0_25px_rgba(6,182,212,0.4)] border-cyan-400/50" : ""}
          ${onClick ? "cursor-pointer" : ""}
        `}
      >
        {/* Render Image or Gradient Initials */}
        {src && !imageError ? (
          <img
            src={src}
            alt={name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-blue-600/90 via-cyan-500/80 to-purple-600/90 flex items-center justify-center text-white tracking-wider">
            {getInitials(name)}
          </div>
        )}
      </motion.div>

      {/* Presence Status Dot */}
      {status && (
        <span
          className={`
            absolute bottom-0 right-0 rounded-full ring-slate-950
            ${statusStyles[status]}
            ${statusSizeStyles[size]}
          `}
        />
      )}
    </div>
  );
};

/**
 * GlassAvatarGroup - Stacked Avatar Team Display
 */
export const GlassAvatarGroup = ({ avatars = [], max = 4, size = "sm", className = "" }) => {
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <div className={`flex items-center -space-x-2.5 overflow-hidden ${className}`}>
      {visibleAvatars.map((avatar, idx) => (
        <GlassAvatar
          key={idx}
          src={avatar.src}
          name={avatar.name}
          size={size}
          status={avatar.status}
          className="ring-2 ring-slate-950/80 rounded-2xl"
        />
      ))}

      {remainingCount > 0 && (
        <div
          className={`
            relative z-10 flex items-center justify-center font-medium text-cyan-300
            bg-slate-900/80 backdrop-blur-xl border border-white/20 ring-2 ring-slate-950/80
            ${size === "xs" ? "w-6 h-6 text-[9px] rounded-lg" : ""}
            ${size === "sm" ? "w-8 h-8 text-xs rounded-xl" : ""}
            ${size === "md" ? "w-10 h-10 text-xs rounded-2xl" : ""}
          `}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export default GlassAvatar;